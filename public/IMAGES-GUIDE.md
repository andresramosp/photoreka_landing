# Instrucciones para Imágenes de Redes Sociales

Crea las siguientes imágenes y colócalas en la carpeta `/public/`:

## Imágenes Necesarias

### 1. Open Graph Image (og-image.jpg)

- **Tamaño**: 1200 x 630 píxeles
- **Formato**: JPG o PNG
- **Peso**: Menos de 300KB
- **Uso**: Facebook, LinkedIn, WhatsApp
- **Contenido sugerido**: Logo de Photoreka + tagline principal

### 2. Open Graph Home (og-home.jpg)

- **Tamaño**: 1200 x 630 píxeles
- **Formato**: JPG o PNG
- **Peso**: Menos de 300KB
- **Uso**: Página principal
- **Contenido sugerido**: Screenshot de la app o hero visual

### 3. Open Graph Terms (og-terms.jpg)

- **Tamaño**: 1200 x 630 píxeles
- **Formato**: JPG o PNG
- **Peso**: Menos de 300KB
- **Uso**: Página de términos
- **Contenido sugerido**: Documento legal genérico o logo simple

### 4. Twitter Card (twitter-card.jpg)

- **Tamaño**: 1200 x 675 píxeles (ratio 16:9)
- **Formato**: JPG o PNG
- **Peso**: Menos de 300KB
- **Uso**: Twitter/X

### 5. Favicon

- **favicon.ico**: 32x32px, 16x16px (multi-size ICO)
- **apple-touch-icon.png**: 180x180px
- **Formato**: ICO o PNG

## Herramientas Recomendadas

1. **Canva** (https://canva.com)
   - Tiene plantillas para Open Graph
   - Fácil de usar

2. **Figma** (https://figma.com)
   - Más profesional
   - Control total del diseño

3. **Favicon Generator** (https://realfavicongenerator.net/)
   - Para generar todos los favicons necesarios

## Tips de Diseño

1. **Texto legible**: Usa fuentes grandes y contrastadas
2. **Branding claro**: Logo visible
3. **Evita bordes**: Las plataformas pueden recortar
4. **Zona segura**: Mantén contenido importante en el centro
5. **Alto contraste**: Para que se vea bien en cualquier fondo
6. **Optimiza peso**: Comprime las imágenes sin perder calidad

## Ejemplo de Estructura

```
public/
├── og-image.jpg          # Imagen por defecto (1200x630)
├── og-home.jpg           # Página principal (1200x630)
├── og-terms.jpg          # Términos (1200x630)
├── twitter-card.jpg      # Twitter (1200x675)
├── favicon.ico           # Favicon principal
└── apple-touch-icon.png  # iOS icon (180x180)
```

## Validación

Después de crear las imágenes, valida que se vean correctamente:

1. **Facebook**: https://developers.facebook.com/tools/debug/
2. **Twitter**: https://cards-dev.twitter.com/validator
3. **LinkedIn**: https://www.linkedin.com/post-inspector/

## Colores de Marca de Photoreka

(Ajusta según tu brand guide)

- Primary: #...
- Secondary: #...
- Background: #0f0f13, #16161a
- Text: White/Light colors
