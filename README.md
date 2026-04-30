# Personal Website

Site pessoal estático de Adriano Souza Costa, construído com Astro. O projeto concentra homepage, currículo, páginas de apps, SEO estruturado e conteúdo em inglês e português do Brasil.

## Stack

- Astro para páginas e componentes estáticos.
- TypeScript para dados, tipos e helpers.
- CSS global com variáveis de tema para claro/escuro.
- `astro-icon` para ícones.
- `html2pdf.js` para geração/exportação de PDF no currículo.
- GitHub Pages para deploy automático.

## Estrutura do Projeto

```text
.
├── .github/workflows/deploy.yml   # Build e deploy no GitHub Pages
├── CNAME                          # Domínio customizado do GitHub Pages
├── astro.config.mjs               # Configuração do Astro e URL canônica do site
├── package.json                   # Scripts, versão, engines e dependências
├── scripts/                       # Utilitários de verificação do projeto
├── src/
│   ├── components/                # Componentes Astro reutilizáveis
│   │   ├── app/                   # Template compartilhado das páginas de apps
│   │   └── resume/                # Seções do currículo
│   ├── core/                      # Conteúdo, tipos, SEO e modelos de dados
│   ├── icons/                     # Ícones SVG locais
│   ├── layouts/                   # Layout base com metatags, navegação e tema
│   ├── pages/                     # Rotas públicas do site
│   └── styles/                    # Estilos globais e variáveis de tema
└── dist/                          # Artefato gerado pelo build
```

`dist/` é gerado automaticamente e não deve ser editado manualmente.

## Rotas Principais

- `/`: homepage em inglês.
- `/pt-br/`: homepage em português do Brasil.
- `/resume/`: currículo em inglês.
- `/resume/pt-br/`: currículo em português do Brasil.
- `/apps/{app}/`: páginas públicas de apps em inglês.
- `/pt-br/apps/{app}/`: páginas públicas de apps em português do Brasil.
- `/robots.txt` e `/sitemap.xml`: gerados por rotas TypeScript em `src/pages`.

As páginas de apps hoje seguem o padrão de `DuoTake`, `KuboRush` e `LoopSize`, com conteúdo e metadados definidos na própria página e renderização compartilhada por `src/components/app/AppTemplate.astro`.

## Organização do Conteúdo

O projeto favorece dados declarativos em `src/core` em vez de duplicar markup nas páginas:

- `homepage.ts`: textos da homepage em inglês e pt-BR.
- `profile.ts`: bio, descrição, papel profissional e skills.
- `projects.ts`: lista de projetos exibidos na homepage e no currículo.
- `resume.tsx`: dados estruturados do currículo.
- `seo.ts`: URLs absolutas, alternates, JSON-LD e helpers de SEO.
- `types.tsx`: tipos compartilhados.

Para conteúdo bilíngue, mantenha equivalentes em `en` e `pt-br`. As rotas em português ficam sob `src/pages/pt-br`, exceto o currículo em português, que segue o padrão atual em `src/pages/resume/pt-br`.

## Layout, Tema e SEO

`src/layouts/Layout.astro` é a base das páginas. Ele centraliza:

- metatags padrão, Open Graph e Twitter Card;
- URLs canônicas e alternates por idioma;
- JSON-LD quando fornecido pela página;
- navegação principal;
- carregamento de analytics;
- script inline de inicialização do tema claro/escuro.

Ao criar uma página nova, reutilize esse layout e preencha `title`, `description`, `lang`, `canonicalPath`, `alternateLocales`, `ogImage`, `favicon`, `metas` e `jsonLd` quando aplicável.

Os estilos globais vivem em `src/styles/global.css`. Prefira as variáveis de tema existentes, como `--bg`, `--text-primary`, `--text-secondary`, `--border` e similares, para preservar consistência entre claro e escuro.

## Comandos

Execute os comandos a partir da raiz do projeto.

| Comando | Ação |
| :-- | :-- |
| `npm install` | Instala as dependências. |
| `npm run dev` | Inicia o servidor local em `localhost:4321`. |
| `npm run build` | Gera o site de produção em `dist/`. |
| `npm run preview` | Pré-visualiza localmente o build gerado. |
| `npm run verify:analytics` | Faz build e roda a verificação de analytics. |
| `npm run astro -- ...` | Executa comandos da CLI do Astro. |

## Fluxo de Desenvolvimento

1. Instale dependências com `npm install`.
2. Rode `npm run dev` para trabalhar localmente.
3. Edite páginas em `src/pages`, componentes em `src/components` e dados compartilhados em `src/core`.
4. Para mudanças de conteúdo bilíngue, atualize inglês e português no mesmo fluxo.
5. Antes de concluir alterações de UI, rotas, conteúdo estruturado ou configuração, rode `npm run build`.

## Deploy

O deploy é automático via `.github/workflows/deploy.yml` em pushes para `main` ou execução manual pelo GitHub Actions. O workflow usa `withastro/action@v3`, Node 22 e publica o build no GitHub Pages.

O domínio canônico configurado é `https://adrianosouzacosta.com.br`, definido em `astro.config.mjs` e no arquivo `CNAME`.

## Convenções

- Preserve a arquitetura simples do Astro: páginas em `src/pages`, componentes em `src/components` e dados em `src/core`.
- Prefira `.astro` para UI e TypeScript para dados, tipos e helpers.
- Use `src/components/app/AppTemplate.astro` para novas páginas de apps.
- Mantenha links externos com `rel="noopener noreferrer"` quando abrirem em nova aba.
- Use textos alternativos descritivos para imagens.
- Evite novas dependências para mudanças simples.
