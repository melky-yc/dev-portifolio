import { NextResponse } from "next/server"
import { readdirSync } from "fs"
import { join } from "path"

const PROJECTS_IMAGES_DIR = join(process.cwd(), "public", "projects")
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"])

function isImageFile(filename: string): boolean {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase()
  return IMAGE_EXTENSIONS.has(ext)
}

export async function GET() {
  try {
    const files = readdirSync(PROJECTS_IMAGES_DIR, { withFileTypes: true })
    const images = files
      .filter((f) => f.isFile() && isImageFile(f.name))
      .map((f) => ({
        name: f.name,
        url: `/projects/${encodeURIComponent(f.name)}`,
      }))

    return NextResponse.json({ images })
  } catch (err) {
    return NextResponse.json(
      { error: "Pasta de imagens dos projetos não encontrada.", images: [] },
      { status: 404 }
    )
  }
}
