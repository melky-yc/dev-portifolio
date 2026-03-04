"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import ptBR from "@/messages/pt-BR.json"
import en from "@/messages/en.json"

type Locale = "pt-BR" | "en"
type Messages = typeof ptBR

interface I18nContextType {
  locale: Locale
  messages: Messages
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const messagesMap: Record<Locale, Messages> = {
  "pt-BR": ptBR,
  en: en as Messages,
}

const I18nContext = createContext<I18nContextType | null>(null)

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".")
  let current: unknown = obj
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return path
    }
  }
  return typeof current === "string" ? current : path
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt-BR")
  const messages = messagesMap[locale]

  const t = useCallback(
    (key: string) => getNestedValue(messages as unknown as Record<string, unknown>, key),
    [messages]
  )

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error("useI18n must be used within I18nProvider")
  return context
}

export function useTranslation() {
  const { t, locale, setLocale } = useI18n()
  return { t, locale, setLocale }
}
