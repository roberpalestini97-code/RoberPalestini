# Despliegue desde cero en Vercel

Todo el portfolio se despliega como **un solo proyecto de Vercel**:

- **El sitio (React)** se genera desde la raíz del repo.
- **El formulario de contacto** es una función serverless en `/api/contact`, en el mismo dominio.
  Usa el código de `Server/`.

Al estar todo en el mismo dominio no hay que configurar CORS ni la URL de la API. Solo hacen
falta las credenciales de Gmail.

Los mensajes del formulario llegan a **roberpalestini97@gmail.com**. Si el visitante deja su
email, también le llega un "gracias", y al tocar *Responder* le contestás directo.

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

   `CONTACT_TO` no hace falta: por defecto los mensajes van a roberpalestini97@gmail.com.

5. **Deploy**. Tarda unos 2 minutos.

> Si agregás o cambiás variables después del primer deploy, andá a **Deployments → ⋯ → Redeploy**
> para que se apliquen.

## Paso 4: verificar (3 min)

1. Abrí `https://<tu-proyecto>.vercel.app/api/health`. Tiene que mostrar `{"status":"ok"}`.
2. Abrí el sitio, andá a **Projects → Get in touch** y enviá un mensaje con tu nombre, tu
   celular y otro email tuyo.
3. Revisá **roberpalestini97@gmail.com**: tiene que llegar *"New portfolio contact: …"*.
   La primera vez fijate también en **Spam** y marcalo "No es spam".
4. Recargá directamente `https://<tu-proyecto>.vercel.app/resume`: no tiene que dar 404.

### Checklist

- [ ] `/api/health` responde `{"status":"ok"}`
- [ ] Mensaje con email: llegan 2 correos (a vos y al visitante)
- [ ] Mensaje sin email: te llega solo el tuyo
- [ ] Datos inválidos: el formulario marca los campos y no envía
- [ ] Los 4 botones de contacto abren el formulario (Home, About, footer, Projects)
- [ ] Recargar `/about`, `/project` y `/resume` funciona

## Paso 5: actualizar tu nueva URL

La URL vieja (`connectwithme.vercel.app`) ya no es tuya. Cuando tengas la nueva:

- **CV en PDF:** tu CV (`src/Assets/curriculum.pdf`) todavía dice `Portfolio: connectwithme.vercel.app`.
  Generá el PDF con la URL nueva y reemplazá ese archivo.
- **LinkedIn y otros perfiles:** cambiá el link del portfolio.
- **Opcional, dominio propio:** en Vercel, **Settings → Domains → Add** (por ejemplo `robertopalestini.dev`)
  y seguí las instrucciones de DNS que te muestra.

## Problemas comunes

| Síntoma | Causa | Solución |
| --- | --- | --- |
| El formulario dice "couldn't be sent" y `/api/contact` da **503** | Faltan `SMTP_HOST`, `SMTP_USER` o `SMTP_PASS` | Cargarlas en **Settings → Environment Variables** y hacer **Redeploy** |
| `/api/contact` da **502** | Gmail rechazó el login | Usar la **contraseña de aplicación**, no la contraseña normal; revisar que `SMTP_USER` sea exacto |
| El build falla con `ERR_OSSL_EVP_UNSUPPORTED` | No se aplicó el `.npmrc` | Verificar que `.npmrc` esté en el repo (ya está) y que **Node.js Version** sea 22.x en **Settings → General** |
| **429** | Más de 5 envíos en 15 min desde la misma IP | Es la protección anti-spam; esperar |
| No llega nada pero la respuesta es 200 | Filtro de Gmail | Revisar **Spam** y **Todos los correos**; marcar como "No es spam" |

Para ver errores del servidor: **Vercel → tu proyecto → Logs**, filtrando por `/api/contact`.

## Desarrollo local

```bash
# Terminal 1: API
cd Server
cp .env.example .env    # completar SMTP_* (o MAIL_TRANSPORT=json para no enviar de verdad)
npm install
npm run start-server    # http://localhost:3600
npm test                # tests del formulario

# Terminal 2: sitio
npm install
npm start               # http://localhost:3000 (redirige /api al puerto 3600)
```

## Estructura del deploy

```
vercel.json        → build de CRA, instala Server/, rewrites para la SPA
api/contact.js     → función serverless: usa Server/app.js
api/health.js      → chequeo rápido de que las funciones están vivas
Server/            → Express: validación, anti-spam y envío con nodemailer
src/               → el sitio (React)
```
