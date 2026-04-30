# AGENTS.md

Guia enxuto para agentes que trabalharem neste projeto.

## Visão Geral

- Site pessoal estático feito com Astro 5.
- Conteúdo principal em inglês e português do Brasil.
- Páginas públicas ficam em `src/pages`; componentes reutilizáveis em `src/components`; dados e tipos em `src/core`.
- Deploy automático para GitHub Pages via `.github/workflows/deploy.yml` em pushes para `main`.

## Comandos

- `npm install`: instala dependências.
- `npm run dev`: servidor local em `localhost:4321`.
- `npm run build`: gera o site em `dist/`.
- `npm run preview`: pré-visualiza o build localmente.
- `npm run astro -- ...`: executa comandos da CLI do Astro.

## Padrões do Projeto

- Preserve a arquitetura simples: prefira `.astro` para UI, TypeScript em `src/core` para dados/tipos e CSS local dentro dos componentes quando o estilo for específico.
- Use `src/layouts/Layout.astro` como base para novas páginas, mantendo `title`, `description`, `lang`, `favicon`, `ogImage` e `metas` quando aplicável.
- Para conteúdo bilíngue, mantenha equivalentes em inglês e `pt-br`; rotas em português vivem sob `src/pages/pt-br`.
- Para páginas de apps, reutilize `src/components/app/AppTemplate.astro` e mantenha textos, screenshots, FAQ e metadados declarados na própria página.
- Para currículo e homepage, prefira atualizar os objetos em `src/core/resume.tsx` e `src/core/homepage.ts` em vez de duplicar markup.

## Estilo e UI

- Preserve o visual limpo inspirado em Apple: muito espaço, tipografia do sistema, bordas suaves, tags/pills e transições discretas.
- Use variáveis de tema de `src/styles/global.css` (`--bg`, `--text-primary`, `--border`, etc.) em vez de cores soltas.
- Mantenha suporte a claro/escuro via atributo `data-theme`; não quebre o script inline de inicialização do tema em `Layout.astro`.
- Componentes devem continuar acessíveis: use `aria-label`, `alt`, `rel="noopener noreferrer"` em links externos e textos alternativos descritivos.
- Evite dependências novas para tarefas simples; o projeto atualmente usa Astro, `astro-icon` e `html2pdf.js`.

## Convenções de Código

- Siga o estilo existente: TypeScript estrito, imports no frontmatter Astro, props tipadas com `interface Props`.
- Indentação predominante de 4 espaços em TypeScript/CSS e tabs em alguns templates existentes; mantenha o padrão do arquivo editado.
- Prefira nomes claros e dados declarativos; não introduza abstrações globais sem necessidade real.
- Ao editar arquivos com conteúdo do portfolio/currículo, preserve informações pessoais, links e rotas existentes salvo pedido explícito.

## Verificação

- Rode `npm run build` antes de concluir mudanças de UI, rotas, conteúdo estruturado ou configuração.
- Para mudanças visuais relevantes, use `npm run dev` e confira as rotas afetadas em inglês e português.
- Não edite `dist/` manualmente; ele é artefato de build.
