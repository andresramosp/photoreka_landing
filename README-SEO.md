# Guía de SEO para Photoreka

## ⚠️ Importante: URLs con WWW

**El sitio principal usa `https://www.photoreka.com` (con www)**

- ✅ Todas las URLs canónicas apuntan a www.photoreka.com
- ✅ Open Graph y Twitter Cards usan www.photoreka.com
- ✅ El sitemap.xml usa www.photoreka.com
- ℹ️ La versión sin www (photoreka.com) redirige automáticamente

Esto es importante para SEO - Google indexará la versión con www como canónica.

## 📝 Cómo Editar Meta Tags y Configuración SEO

### Archivo Principal de Configuración

Todos los meta tags, descripciones, y configuraciones SEO están centralizados en:

**`app/config/seo.ts`**

Este archivo contiene:

- ✅ Títulos de página
- ✅ Descripciones (meta description)
- ✅ Keywords
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ JSON-LD (datos estructurados para Google)
- ✅ Imágenes sociales

### Estructura del Archivo

```typescript
export const seoConfig = {
  // 1. Configuración Global
  siteName: "Photoreka",
  siteUrl: "https://www.photoreka.com",
  defaultOgImage: "/og-image.jpg",

  // 2. Redes Sociales
  social: {
    twitter: "@photoreka",
    facebook: "photoreka",
  },

  // 3. Configuración por Página
  pages: {
    home: {
      title: "...",
      description: "...",
      keywords: "...",
      ogImage: "/og-home.jpg",
    },
    terms: {
      title: "...",
      description: "...",
    },
  },
};
```

## 🎯 Cómo Agregar una Nueva Página con SEO

### 1. Agregar configuración en `app/config/seo.ts`

```typescript
pages: {
  about: {
    title: "About Photoreka - Photography Curation Platform",
    description: "Learn about Photoreka's mission to help photographers...",
    keywords: "about photoreka, photography platform, our mission",
    ogImage: "/og-about.jpg",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Photoreka",
    }
  }
}
```

### 2. En tu página Vue (`pages/about.vue`)

```vue
<script setup>
// Simplemente llama al composable con la clave de configuración
useSEO("about");
</script>
```

¡Eso es todo! El composable automáticamente aplicará todos los meta tags.

## 🖼️ Imágenes para Redes Sociales

### Ubicación

Coloca tus imágenes en `/public/`:

- `/public/og-image.jpg` - Imagen por defecto (1200x630px)
- `/public/og-home.jpg` - Imagen específica para home
- `/public/twitter-card.jpg` - Imagen para Twitter

### Tamaños Recomendados

- **Open Graph**: 1200x630px (Facebook, LinkedIn)
- **Twitter Card**: 1200x675px
- **Favicon**: 32x32px, 180x180px (Apple Touch Icon)

## 🔍 SEO Features Implementados

### ✅ Meta Tags Básicos

- Title
- Description
- Keywords
- Canonical URL
- Language

### ✅ Open Graph (Facebook, LinkedIn, WhatsApp)

- og:title
- og:description
- og:image
- og:url
- og:type
- og:site_name

### ✅ Twitter Cards

- twitter:card
- twitter:title
- twitter:description
- twitter:image
- twitter:site

### ✅ JSON-LD (Structured Data)

Datos estructurados para Google:

- WebApplication schema para home
- AboutPage, FAQPage, etc.

### ✅ Technical SEO

- Canonical URLs
- Sitemap.xml
- Robots.txt
- Meta robots tags
- SSR (Server Side Rendering) habilitado
- Prerendering para páginas estáticas

## 📊 Herramientas para Validar SEO

### 1. Open Graph

- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

### 2. Twitter Cards

- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 3. General SEO

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### 4. Schema Markup

- [Schema.org Validator](https://validator.schema.org/)

## 🚀 Checklist de SEO

- [ ] Títulos únicos por página (50-60 caracteres)
- [ ] Descripciones únicas (150-160 caracteres)
- [ ] Imágenes OG creadas (1200x630px)
- [ ] Favicon agregado
- [ ] Sitemap.xml actualizado
- [ ] Robots.txt configurado
- [ ] URLs canónicas configuradas
- [ ] JSON-LD agregado para páginas importantes
- [ ] Probado en Facebook Debugger
- [ ] Probado en Twitter Card Validator
- [ ] Probado en Google Rich Results

## 🛠️ Configuración Avanzada

### Sobrescribir SEO en una Página Específica

Si necesitas sobrescribir la configuración para una instancia específica:

```vue
<script setup>
useSEO("home", {
  title: "Título personalizado",
  description: "Descripción personalizada",
  ogImage: "/imagen-especial.jpg",
});
</script>
```

### SEO Dinámico (por ejemplo, basado en parámetros)

```vue
<script setup>
const route = useRoute();
const projectId = route.params.id;

useSEO(undefined, {
  title: `Proyecto ${projectId} - Photoreka`,
  description: `Ver detalles del proyecto ${projectId}`,
  canonicalUrl: `https://www.photoreka.com/projects/${projectId}`,
});
</script>
```

## 📈 Nuxt 4 + SSR

La configuración ya está optimizada para Nuxt 4 con SSR:

- ✅ `ssr: true` activado
- ✅ Prerendering de páginas estáticas
- ✅ `routeRules` para optimización por ruta
- ✅ Payload optimizado
- ✅ Compresión de assets

## 🔄 Actualizar el Sitemap

El sitemap está en `/public/sitemap.xml`. Para actualizarlo:

1. Edita manualmente el archivo
2. O instala `@nuxtjs/sitemap` para generación automática:

```bash
npm install @nuxtjs/sitemap
```

Luego en `nuxt.config.ts`:

```typescript
modules: [
  '@nuxtjs/sitemap'
],
sitemap: {
  hostname: 'https://www.photoreka.com'
}
```

## 💡 Tips Adicionales

1. **Títulos únicos**: Cada página debe tener un título único
2. **Descripciones atractivas**: Escribe descripciones que inviten a hacer clic
3. **Keywords naturales**: No abuses de keywords, úsalas naturalmente
4. **Imágenes optimizadas**: Comprime las imágenes OG antes de subirlas
5. **Testa regularmente**: Usa las herramientas de validación frecuentemente
6. **Mobile-first**: Asegúrate que todo se vea bien en móvil
7. **Core Web Vitals**: Monitorea velocidad de carga con PageSpeed Insights

## 📞 Soporte

Para más información sobre SEO en Nuxt 4:

- [Nuxt SEO Kit](https://nuxtseo.com/)
- [Documentación Nuxt 4](https://nuxt.com/docs)
