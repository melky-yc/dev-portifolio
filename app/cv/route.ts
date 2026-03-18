import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const cvUrl = process.env.CV_URL?.trim();
  if (!cvUrl) {
    return NextResponse.json(
      {
        error: "CV não configurado.",
        hint: "Defina a env CV_URL na Vercel com o link público do seu PDF.",
      },
      { status: 404 }
    );
  }

  return NextResponse.redirect(cvUrl, { status: 302 });
}

