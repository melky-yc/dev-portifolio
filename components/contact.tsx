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

const sectionHeader = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const linksContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const linkItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const formReveal = {
  hidden: { opacity: 0, y: 30, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
}

const contactLinks = [
  {
    icon: Mail,
    label: "melchisedeksl@gmail.com",
    href: "mailto:melchisedeksl@gmail.com",
  },
  {
    icon: Linkedin,
    label: "linkedin.com/in/melchisedeksl",
    href: "https://linkedin.com/in/melchisedeksl",
  },
  {
    icon: Phone,
    label: "+55 86 99411-4087",
    href: "tel:+5586994114087",
  },
]

const contactSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t("contact.name_error")).max(120),
    email: z.string().email(t("contact.email_error")).max(320),
    message: z.string().min(10, t("contact.message_error")).max(5000),
  })

type ContactFormData = z.infer<ReturnType<typeof contactSchema>>

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

  const inputClass =
    "rounded-md border border-input bg-background px-4 py-2.5 text-sm text-foreground transition-colors duration-200 placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
  const inputErrorClass = "border-destructive focus:border-destructive"

  return (
    <section
      id="contato"
      className="py-24 px-6"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="text-center"
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2
            id="contact-title"
            className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            {t("contact.headline")}
          </h2>
          <p className="mt-3 text-pretty text-muted-foreground">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4"
          variants={linksContainer}
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
                className="group flex items-center gap-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                variants={linkItem}
              >
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span>{link.label}</span>
              </motion.a>
            )
          })}
        </motion.div>

        <motion.form
          className="mt-12 flex flex-col gap-4"
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
                className={cn(inputClass, errors.name && inputErrorClass)}
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
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
                className={cn(inputClass, errors.email && inputErrorClass)}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
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
                inputClass,
                errors.message && inputErrorClass
              )}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="text-xs text-destructive">{errors.message.message}</p>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full gap-2 sm:w-auto sm:self-end"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("contact.send")}
              </>
            ) : (
              t("contact.send")
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  )
}
