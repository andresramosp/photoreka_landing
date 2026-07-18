# SEO MCP Setup — Google Search Console + GA4

Conecta Claude Code a Search Console y Google Analytics 4 en modo **solo lectura**.
Un único service account sirve para ambos.

## Ya está hecho (no toques nada de esto)

- `.mcp.json` — declara los servidores `gsc` y `ga4`
- `.gitignore` — ignora `.credentials/` (las credenciales NUNCA se commitean)
- `.credentials/` — carpeta vacía esperando el JSON
- `pipx` instalado (lo necesita el MCP oficial de GA4)

## Lo que tienes que hacer tú

### 1. Google Cloud — proyecto y APIs

En https://console.cloud.google.com:

1. Crea un proyecto (o reutiliza uno). Anota el **Project ID**.
2. Ve a **APIs & Services → Library** y activa estas tres:
   - `Google Search Console API`
   - `Google Analytics Admin API`
   - `Google Analytics Data API`

### 2. Service account + clave JSON

1. **APIs & Services → Credentials → Create Credentials → Service Account**
2. Nombre: `photoreka-seo-readonly`. **No le asignes ningún rol de IAM** — los permisos
   se conceden dentro de GSC y GA, no aquí.
3. Abre el service account → pestaña **Keys → Add Key → Create new key → JSON**.
4. Guarda el archivo descargado como:

   ```
   c:\Users\andre\Desktop\Photoreka\App\Landing\.credentials\google-seo.json
   ```

5. Copia el **email** del service account (`...@<project-id>.iam.gserviceaccount.com`).

### 3. Dar acceso en Search Console

En https://search.google.com/search-console, propiedad `photoreka.com`:

**Settings → Users and permissions → Add user**
- Email: el del service account
- Permiso: **Full**

> "Full" cubre datos de rendimiento y sitemaps. La API de URL Inspection puede exigir
> **Owner**; si la quieres, añádelo como propietario delegado en
> *Settings → Ownership verification → delegated owners*.

### 4. Dar acceso en GA4

En https://analytics.google.com, en la propiedad de Photoreka:

**Admin → Property access management → `+` → Add users**
- Email: el del service account
- Rol: **Viewer** (nada más — no necesita más)

### 5. Activar en Claude Code

Reinicia Claude Code. Te pedirá aprobar los servidores MCP del proyecto: acepta.
Comprueba con `/mcp` que `gsc` y `ga4` aparecen conectados.

## Seguridad

- El JSON de credenciales vive solo en tu disco, en `.credentials/`, ya ignorado por git.
- El service account no tiene roles de IAM: fuera de GSC/GA no puede hacer nada.
- Ambos MCP son de solo lectura. No pueden modificar tu configuración de GSC ni de GA.
- Si el JSON se filtra alguna vez: **Cloud Console → el service account → Keys → borra la clave**.
