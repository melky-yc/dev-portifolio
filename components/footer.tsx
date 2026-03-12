"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useTranslation } from "@/lib/i18n"
import { motion } from "framer-motion"
import { navItems } from "@/lib/nav-items"
import { SiGithub, SiGmail, SiWhatsapp } from "react-icons/si"
import { Linkedin } from "lucide-react"
import { fadeIn } from "@/lib/motion-variants"

const socials = [
  { Icon: SiGithub, href: "https://github.com/melchisedeksl", label: "GitHub" },
  { Icon: Linkedin, href: "https://linkedin.com/in/melchisedeksl", label: "LinkedIn" },
  { Icon: SiGmail, href: "mailto:melchisedeksl@gmail.com", label: "E-mail" },
  { Icon: SiWhatsapp, href: "https://wa.me/5586994114087", label: "WhatsApp" },
] as const

export function Footer() {
  const { t } = useTranslation()
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const logoSrc =
    mounted && (resolvedTheme ?? theme) === "light"
      ? "/icons/logo-light.svg"
      : "/icons/logo.svg"

  return (
    <motion.footer
      className="border-t border-border bg-card/40 py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
      custom={0}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* Coluna 1: Logo + tagline */}
          <div className="flex flex-col items-center sm:items-start">
            <a
              href="#"
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="Melchisedek Lima"
            >
              <Image
                src={logoSrc}
                alt="Melchisedek Lima"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </a>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Coluna 2: Links de navegação */}
          <nav
            className="flex flex-col items-center sm:items-start"
            aria-label={t("footer.nav_label")}
          >
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(`nav.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Coluna 3: Redes sociais */}
          <div className="flex flex-col items-center sm:items-start">
            <p className="mb-3 text-sm font-medium text-foreground">
              {t("footer.connect")}
            </p>
            <div className="flex flex-wrap gap-1">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-lg p-2 text-muted-foreground transition-all hover:bg-accent hover:text-foreground [&_svg]:size-[18px]"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
