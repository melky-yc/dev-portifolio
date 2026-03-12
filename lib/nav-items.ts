/** Links de navegação compartilhados entre Header e Footer. Use t(`nav.${item.key}`) para o label. */

export const navItems = [
  { key: "about", href: "#sobre" },
  { key: "experience", href: "#experiencia" },
  { key: "skills", href: "#habilidades" },
  { key: "projects", href: "#projetos" },
  { key: "contact", href: "#contato" },
] as const
