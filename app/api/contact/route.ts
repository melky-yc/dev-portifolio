import { NextResponse } from "next/server"
import { Resend } from "resend"
import { z } from "zod"
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit"
import { buildContactEmailHtml } from "@/lib/contact-email"

const resend = new Resend(process.env.RESEND_API_KEY)

const ContactSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(120, "Nome muito longo"),
  email: z.string().email("E-mail inválido").max(320, "E-mail muito longo"),
  message: z
    .string()
    .min(10, "Mensagem muito curta")
    .max(5000, "Mensagem muito longa"),
})

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "melchisedeksl@gmail.com"
const FROM_EMAIL = process.env.FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>"

export async function POST(request: Request) {
  const identifier = getClientIdentifier(request)
  const rate = checkRateLimit(identifier)

  if (!rate.ok) {
    return NextResponse.json(
      { error: "Muitos envios. Aguarde um minuto antes de tentar novamente." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rate.resetIn / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      }
    )
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Serviço de e-mail não configurado." },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 }
    )
  }

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors
    const message = first.name?.[0] ?? first.email?.[0] ?? first.message?.[0] ?? "Dados inválidos."
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const { name, email, message } = parsed.data

  try {
    const html = buildContactEmailHtml(name, email, message)
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `Contato do portfolio: ${name}`,
      html,
    })

    if (error) {
      return NextResponse.json(
        { error: "Falha ao enviar. Tente novamente mais tarde." },
        { status: 502 }
      )
    }

    return NextResponse.json(
      { success: true },
      {
        headers: {
          "X-RateLimit-Remaining": String(rate.remaining),
        },
      }
    )
  } catch {
    return NextResponse.json(
      { error: "Erro interno. Tente novamente mais tarde." },
      { status: 500 }
    )
  }
}
