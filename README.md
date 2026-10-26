This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Registro de vagas

A tela está disponível em `/vagas/registrar`, conforme o frame `4:18328` do Figma.
Inclui formulário responsivo, campos obrigatórios, validação de salário,
preenchimento de exemplo e confirmação para descartar os dados ao cancelar.
O menu pode ser recolhido; os destinos de outras telas estão desabilitados.
Continuar valida o formulário, mas não publica nem persiste uma vaga:
revisão, publicação e integração com a API ficam para uma próxima entrega.

Para conferir: execute `npm ci`, `npm run lint` e `npm run build`.
No navegador, verifique a rota em desktop e celular, envie o formulário vazio,
preencha o exemplo e teste cancelar com confirmação e sem confirmação.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
