# dev-portfolio

Portfólio de Melchisedek Lima — Desenvolvedor Full Stack. Next.js, React, Tailwind CSS, Framer Motion.

## Rodar localmente

```bash
npm install
cp .env.example .env.local
# Edite .env.local e adicione RESEND_API_KEY (para o formulário de contato)
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Deploy na Vercel

1. **Conecte o repositório**
   - Acesse [vercel.com](https://vercel.com) e faça login (com a mesma conta GitHub).
   - **Add New** → **Project** e importe o repositório `dev-portfolio`.

2. **Variáveis de ambiente**
   - Em **Settings** → **Environment Variables** adicione:
     - `RESEND_API_KEY` — sua chave da [Resend](https://resend.com) (formulário de contato).
     - `CONTACT_EMAIL` — e-mail que receberá as mensagens (ex.: `melchisedeksl@gmail.com`).
     - (Opcional) `FROM_EMAIL` — remetente; em produção use um domínio verificado no Resend.

3. **Deploy**
   - Clique em **Deploy**. A Vercel detecta Next.js e usa `npm run build` + `npm start`.

4. **Domínio**
   - Em **Settings** → **Domains** você pode adicionar um domínio customizado.

## Scripts

| Comando      | Descrição           |
| ------------ | ------------------- |
| `npm run dev`  | Servidor de desenvolvimento |
| `npm run build` | Build para produção  |
| `npm run start` | Servidor de produção |
| `npm run lint`  | ESLint              |

## Stack

- **Next.js 16** (App Router)
- **React 19**, **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion**, **Resend** (e-mail)
