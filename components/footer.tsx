"use client"

import Image from "next/image"
import { useTranslation } from "@/lib/i18n"
import { motion } from "framer-motion"

const navItems = [
  { key: "about", href: "#sobre" },
  { key: "experience", href: "#experiencia" },
  { key: "skills", href: "#habilidades" },
  { key: "projects", href: "#projetos" },
  { key: "contact", href: "#contato" },
]

const footerReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Footer() {
  const { t } = useTranslation()

  return (
    <motion.footer
      className="border-t border-border py-12 px-6"
      variants={footerReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-6" aria-label="Footer navigation">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <a href="#" className="opacity-80 transition-opacity hover:opacity-100" aria-label="Melchisedek Lima">
          <Image src="/icons/logo.svg" alt="" width={32} height={32} className="h-8 w-8" />
        </a>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Melchisedek Lima. {t("footer.rights")}
          </p>
          <p className="text-xs text-muted-foreground/50">
            {t("footer.made_with")}
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
