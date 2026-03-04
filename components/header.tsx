"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useTranslation } from "@/lib/i18n"
import { useTransitionOverlay } from "@/components/transition-overlay"
import { Menu, Sun, Moon, User, Briefcase, Code2, FolderKanban, Mail, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

const navItems = [
  { key: "about", href: "#sobre", icon: User },
  { key: "experience", href: "#experiencia", icon: Briefcase },
  { key: "skills", href: "#habilidades", icon: Code2 },
  { key: "projects", href: "#projetos", icon: FolderKanban },
  { key: "contact", href: "#contato", icon: Mail },
]

export function Header() {
  const { t, locale, setLocale } = useTranslation()
  const { theme, setTheme } = useTheme()
  const { triggerTransition } = useTransitionOverlay()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const toggleTheme = () =>
    triggerTransition(() => setTheme(theme === "dark" ? "light" : "dark"))
  const toggleLocale = () =>
    triggerTransition(() => setLocale(locale === "pt-BR" ? "en" : "pt-BR"))

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a
          href="#"
          className="flex items-center transition-opacity duration-200 hover:opacity-70"
          aria-label="Melchisedek Lima"
        >
          <Image
            src={mounted && theme === "light" ? "/icons/logo-light.svg" : "/icons/logo.svg"}
            alt="Melchisedek Lima"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleLocale}
            className="hidden rounded-md px-2 py-1 text-xs font-semibold tracking-wide text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground md:block"
            aria-label="Toggle language"
          >
            {locale === "pt-BR" ? "EN" : "PT"}
          </button>

          {mounted && (
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative overflow-hidden text-muted-foreground hover:text-foreground"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: 90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, scale: 0, opacity: 0 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    exit={{ rotate: -90, scale: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="text-muted-foreground hover:text-foreground md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] max-w-xs bg-background p-0 sm:w-[80vw] sm:max-w-sm"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex flex-col pt-16 pb-6">
                <nav
                  className="flex flex-col gap-1 px-4"
                  aria-label="Mobile navigation"
                >
                  {navItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <a
                        key={item.key}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
                        {t(`nav.${item.key}`)}
                      </a>
                    )
                  })}
                </nav>
                <div className="mt-4 border-t border-border px-4 pt-4">
                  <button
                    onClick={toggleLocale}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Languages className="h-5 w-5 shrink-0" />
                    {locale === "pt-BR" ? "Switch to English" : "Mudar para Português"}
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
