# Sistema de Tradução - Um Porcento

Este guia explica como usar o sistema de tradução implementado no projeto Um Porcento.

## Estrutura

O sistema de tradução utiliza as seguintes tecnologias:

- **next-intl**: Biblioteca de internacionalização para Next.js
- **js-cookie**: Para gerenciar cookies de idioma
- **Componentes personalizados**: Para seleção de idioma

## Arquivos de Tradução

Os arquivos de tradução estão localizados na pasta `/locales/` e seguem a estrutura:

- `pt-BR.json`: Português (Brasil)
- `es.json`: Espanhol
- `en.json`: Inglês

Cada arquivo contém as traduções organizadas por namespace:

```json
{
  "common": {
    "login": "Login",
    "register": "Cadastre-se"
  },
  "nav": {
    "home": "Início"
  }
}
```

## Como Usar Traduções em Componentes

Para usar traduções em seus componentes:

```tsx
"use client";

import { useTranslations } from 'next-intl';

export default function MeuComponente() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t('landing.title')}</h1>
      <p>{t('landing.subtitle')}</p>
    </div>
  );
}
```

## Adicionando Novas Traduções

Para adicionar novas traduções:

1. Adicione as chaves e valores em cada arquivo de idioma (`pt-BR.json`, `es.json`, `en.json`)
2. Use a mesma estrutura de chaves em todos os arquivos
3. Acesse as traduções usando `t('namespace.chave')`

## Detecção de Idioma

O sistema detecta o idioma do usuário através de:

1. Cookie `NEXT_LOCALE` (se já existir)
2. Localização baseada no IP (país de origem)
3. Padrão: Português (pt-BR)

## Seletor de Idioma

O componente `<LanguageSelector />` foi adicionado ao header da página inicial e permite ao usuário trocar entre os idiomas disponíveis.

## Arquivos Principais

- `/locales/*.json`: Arquivos de tradução
- `/src/components/LanguageSelector.tsx`: Componente de seleção de idioma
- `/src/contexts/LocaleProvider.tsx`: Provider para gerenciar o idioma
- `/src/middleware.ts`: Middleware para detecção de idioma
- `/src/lib/locale-utils.ts`: Utilitários para detecção de idioma

---

Desenvolvido por Windsurf Engineering Team
