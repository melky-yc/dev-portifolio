"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslation } from "@/lib/i18n"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Linkedin, Phone, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  fadeSlideUpBlur,
  containerStagger,
  linkItemReveal,
  formReveal,
} from "@/lib/motion-variants"

const contactLinks = [
  {
    icon: Mail,
    label: "E-mail",
    value: "melchisedeksl@gmail.com",
    href: "mailto:melchisedeksl@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/melchisedeksl",
    href: "https://linkedin.com/in/melchisedeksl",
  },
  {
    icon: Phone,
    label: "Telefone",
    value: "+55 86 99411-4087",
    href: "tel:+5586994114087",
  },
] as const

const contactSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t("contact.name_error")).max(120),
    email: z.string().email(t("contact.email_error")).max(320),
    message: z.string().min(10, t("contact.message_error")).max(5000),
  })

type ContactFormData = z.infer<ReturnType<typeof contactSchema>>

const inputBaseClass =
  "rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors duration-200 placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
const inputErrorClass = "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30"

export function Contact() {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const schema = contactSchema(t)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json().catch(() => ({}))

      if (!res.ok) {
        if (res.status === 429) {
          toast.error(t("contact.rate_limit"))
          return
        }
        toast.error(json.error ?? t("contact.send_error"))
        return
      }

      toast.success(t("contact.send_success"))
      reset()
    } catch {
      toast.error(t("contact.send_error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contato"
      className="px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-16"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Coluna esquerda: título + cards de contato */}
          <div>
            <motion.div
              className="text-center lg:text-left"
              variants={fadeSlideUpBlur}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={0}
            >
              <h2
                id="contact-title"
                className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl"
              >
                {t("contact.headline")}
              </h2>
              <p className="mt-3 text-pretty text-muted-foreground">
                {t("contact.subtitle")}
              </p>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-col gap-3"
              variants={containerStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {contactLinks.map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={linkItemReveal}
                    className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-border/60 hover:bg-card/80"
                  >
                    <div className="rounded-lg bg-primary/10 p-2">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{link.label}</p>
                      <p className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                        {link.value}
                      </p>
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>
          </div>

          {/* Coluna direita: formulário */}
          <motion.form
            className="flex flex-col gap-4"
            variants={formReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  {t("contact.name")}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={t("contact.name_placeholder")}
                  disabled={isSubmitting}
                  {...register("name")}
                  className={cn(inputBaseClass, errors.name && inputErrorClass)}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  {t("contact.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={t("contact.email_placeholder")}
                  disabled={isSubmitting}
                  {...register("email")}
                  className={cn(inputBaseClass, errors.email && inputErrorClass)}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                {t("contact.message")}
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder={t("contact.message_placeholder")}
                disabled={isSubmitting}
                {...register("message")}
                className={cn(
                  "resize-none",
                  inputBaseClass,
                  errors.message && inputErrorClass
                )}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="text-xs text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  {t("contact.sending")}
                </>
              ) : (
                t("contact.submit")
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
