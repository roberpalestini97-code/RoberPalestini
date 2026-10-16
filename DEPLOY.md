# Despliegue desde cero en Vercel

Todo el portfolio se despliega como **un solo proyecto de Vercel**:

- **El sitio (React)** se genera desde la raíz del repo.
- **El formulario de contacto** (`/api/contact`) y **los likes** (`/api/likes`) son funciones
  serverless en el mismo dominio. Usan el código de `Server/`.

Al estar todo en el mismo dominio no hay que configurar CORS ni la URL de la API.

| Función | Qué necesita |
| --- | --- |
| Formulario de contacto | Contraseña de aplicación de Gmail (paso 1) |
| Likes ❤️ | Base de datos Upstash Redis, gratis y conectada desde Vercel (paso 4) |
| Estadísticas de visitas | Activar Web Analytics en Vercel (paso 5) |
| Modo claro/oscuro, ES/EN, WhatsApp, páginas de proyecto | Nada, funcionan solas |

Los mensajes del formulario llegan a **roberpalestini97@gmail.com**. Si el visitante deja su
email, también le llega un "gracias" en su idioma (español o inglés).

---

## Paso 1: contraseña de aplicación de Gmail (5 min)

1. Entrá a https://myaccount.google.com con **roberpalestini97@gmail.com**.
2. **Seguridad → Verificación en 2 pasos**: activala si no lo está.
3. **Seguridad → Contraseñas de aplicaciones** (o buscá "contraseñas de aplicaciones" arriba).
4. Creá una con el nombre "Portfolio" y copiá la clave de 16 letras. Es tu `SMTP_PASS`.
   No la compartas ni la subas al repo.

## Paso 2: pasar los cambios a `main`

Vercel publica en producción lo que está en la rama principal. Mergeá
`ccr-e594c8b2-d1rodt` a `main` (por PR en GitHub o merge directo).

## Paso 3: cuenta y proyecto nuevos en Vercel (5 min)

1. Entrá a https://vercel.com/signup y elegí **Continue with GitHub**, así la cuenta queda atada a
   tu GitHub y no perdés el acceso.
2. **Add New → Project** → elegí el repo `RoberPalestini` → **Import**.
   Si no aparece, tocá **Adjust GitHub App Permissions** y dale acceso al repo.
3. En la pantalla de configuración:
   - **Project Name:** el que quieras. Define la URL, por ejemplo `roberto-palestini` → `roberto-palestini.vercel.app`.
   - **Root Directory:** dejala en `./` (la raíz).
   - **Build & Output Settings:** no toques nada; lo toma del `vercel.json` del repo.
4. Abrí **Environment Variables** y cargá:

   | Name | Value |
   | --- | --- |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `465` |
   | `SMTP_SECURE` | `true` |
   | `SMTP_USER` | `roberpalestini97@gmail.com` |
   | `SMTP_PASS` | la clave de 16 letras del paso 1 |
   | `MAIL_FROM` | `Portfolio <roberpalestini97@gmail.com>` |

   Opcionales:

   | Name | Para qué |
   | --- | --- |
   | `SITE_URL` | Tu dominio final, por ejemplo `https://robertopalestini.dev`. Se usa en el mapa del sitio y en la vista previa al compartir. Si no está, se usa el dominio de Vercel. |
   | `LIKES_SALT` | Cualquier texto secreto. Hace más privado el control de "un like por persona". |

5. **Deploy**. Tarda unos 2 minutos.

> Si agregás o cambiás variables después del primer deploy, andá a **Deployments → ⋯ → Redeploy**
> para que se apliquen.

## Paso 4: base de datos para los likes (3 min)

1. En tu proyecto de Vercel, andá a la pestaña **Storage → Create Database**.
2. Elegí **Upstash → Upstash for Redis** (plan **Free**), la región más cercana (por ejemplo `São Paulo`) y **Create**.
3. Cuando te pregunte, **conectala a tu proyecto** (Production, Preview y Development).
   Vercel carga solas las variables `KV_REST_API_URL` y `KV_REST_API_TOKEN`.
4. **Deployments → ⋯ → Redeploy**.

Sin este paso el sitio funciona igual, pero los corazones no muestran números.

## Paso 5: estadísticas de visitas (1 min)

En tu proyecto de Vercel, pestaña **Analytics → Enable**. El sitio ya trae el script; a partir
del próximo deploy vas a ver visitas, páginas más vistas, países y dispositivos.

## Paso 6: verificar (5 min)

1. Abrí `https://<tu-proyecto>.vercel.app/api/health`. Tiene que mostrar `{"status":"ok"}`.
2. Abrí `https://<tu-proyecto>.vercel.app/api/likes`. Tiene que mostrar `"enabled":true`.
3. Abrí el sitio, andá a **Projects → Get in touch** y enviá un mensaje con tu nombre, tu
   celular y otro email tuyo. Revisá **roberpalestini97@gmail.com**, y la primera vez también **Spam**.
4. Dale ❤️ a un proyecto, recargá la página: el número se mantiene.

### Checklist

- [ ] `/api/health` responde `{"status":"ok"}`
- [ ] `/api/likes` responde `"enabled":true`
- [ ] Mensaje con email: llegan 2 correos (a vos y al visitante)
- [ ] Mensaje sin email: te llega solo el tuyo
- [ ] Datos inválidos: el formulario marca los campos y no envía
- [ ] Likes: suman, se mantienen al recargar y no dejan votar dos veces
- [ ] Botón ☀️/🌙 y botón EN/ES: cambian todo el sitio y se recuerdan al volver
- [ ] Botón de WhatsApp: abre el chat con el mensaje armado
- [ ] Cada tarjeta de proyecto abre su caso de estudio (`/project/solquerandi`, etc.)
- [ ] Recargar `/about`, `/project`, `/resume` y `/project/videocotizacion` funciona
- [ ] `/sitemap.xml` y `/robots.txt` existen
- [ ] Vista previa al compartir: pegá la URL en https://www.opengraph.xyz y tiene que verse la imagen del portfolio

## Paso 7: cuando tengas la URL definitiva

- **CV en PDF:** reemplazá **solo** el archivo `public/Roberto_Palestini_CV.pdf` por el nuevo, con
  el mismo nombre. Todo el sitio apunta ahí, no hay que tocar código. El link directo queda
  `https://<tu-dominio>/Roberto_Palestini_CV.pdf`, ideal para LinkedIn.
- **`SITE_URL`:** cargala en Vercel con el dominio final y hacé **Redeploy**.
- **LinkedIn y otros perfiles:** cambiá el link del portfolio.
- **Opcional, dominio propio:** **Settings → Domains → Add** (por ejemplo `robertopalestini.dev`)
  y seguí las instrucciones de DNS que te muestra Vercel.
- **Google:** en https://search.google.com/search-console agregá el dominio y enviá `/sitemap.xml`.

## Problemas comunes

| Síntoma | Causa | Solución |
| --- | --- | --- |
| El formulario dice "couldn't be sent" y `/api/contact` da **503** | Faltan `SMTP_HOST`, `SMTP_USER` o `SMTP_PASS` | Cargarlas en **Settings → Environment Variables** y hacer **Redeploy** |
| `/api/contact` da **502** | Gmail rechazó el login | Usar la **contraseña de aplicación**, no la contraseña normal; revisar que `SMTP_USER` sea exacto |
| Los corazones no muestran números | Falta la base de datos de likes | Hacer el paso 4 y **Redeploy** |
| El build falla en la instalación (`ERESOLVE`) | No se aplicó el `.npmrc` | Verificar que `.npmrc` esté en el repo (ya está, con `legacy-peer-deps=true`) |
| El build falla con `ERR_OSSL_EVP_UNSUPPORTED` | Ídem | Ídem, y que **Node.js Version** sea 22.x en **Settings → General** |
| **429** | Demasiados envíos o likes seguidos desde la misma IP | Es la protección anti-spam; esperar |
| No llega nada pero la respuesta es 200 | Filtro de Gmail | Revisar **Spam** y **Todos los correos**; marcar como "No es spam" |

Para ver errores del servidor: **Vercel → tu proyecto → Logs**, filtrando por `/api/`.

## Desarrollo local

```bash
# Terminal 1: API (likes en memoria, sin base de datos)
cd Server
cp .env.example .env    # completar SMTP_* (o MAIL_TRANSPORT=json para no enviar de verdad)
npm install
npm run start-server    # http://localhost:3600
npm test                # tests de contacto y likes

# Terminal 2: sitio
npm install
npm start               # http://localhost:3000 (redirige /api al puerto 3600)
npm test                # tests de traducciones y de la app
```

## Estructura

```
vercel.json                     → build de CRA, instala Server/, rewrites para la SPA
api/contact.js, api/likes.js    → funciones serverless: usan Server/app.js
api/health.js                   → chequeo rápido
Server/                         → Express: contacto (nodemailer) y likes (Upstash Redis)
Server/data/likeable.json       → lista de proyectos que aceptan likes (agregá ahí los nuevos)
scripts/postbuild.js            → sitemap.xml, robots.txt, URLs de SEO y Vercel Analytics
public/Roberto_Palestini_CV.pdf → el CV que se descarga (reemplazá solo este archivo)
src/data/cv.js                  → datos del CV en inglés y español
src/data/projects.js            → proyectos y casos de estudio en inglés y español
src/i18n/ui.js                  → textos de la interfaz en inglés y español
src/theme.css                   → colores del modo claro y oscuro
```
