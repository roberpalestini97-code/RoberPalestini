# Despliegue del portfolio

El repo tiene dos apps que se despliegan por separado en **Vercel**:

| App | Carpeta | Qué hace | URL sugerida |
| --- | --- | --- | --- |
| Front (React) | `/` | El sitio | `https://connectwithme.vercel.app` |
| API (Express) | `/Server` | `POST /contact` envía los emails (y likes/ranks) | `https://<tu-api>.vercel.app` |

El formulario de contacto (SweetAlert) hace `POST {REACT_APP_API_URL}/contact` con
`{ name, phone, email? }`. La API valida, frena spam (honeypot y 5 envíos cada 15 min por IP) y:

1. Te envía un email a **roberpalestini97@gmail.com** (es el valor por defecto; `CONTACT_TO` solo hace falta si algún día querés cambiarlo) con nombre, teléfono (con link a WhatsApp) y email. Si el visitante dejó su email, el *Responder* va directo a él.
2. Si el visitante dejó email, le envía un "gracias" (se apaga con `SEND_CONFIRMATION=false`).

---

## Paso 0: credenciales de email (Gmail)

1. En tu cuenta de Google activá la **verificación en 2 pasos**.
2. Andá a **Cuenta de Google → Seguridad → Contraseñas de aplicaciones** y creá una para "Portfolio".
3. Guardá la contraseña de 16 caracteres: es tu `SMTP_PASS`. Nunca la subas al repo.

> Gmail permite unos 500 envíos por día, de sobra para un portfolio. Si algún día preferís
> Resend, Brevo o SendGrid, usan SMTP igual: solo cambian `SMTP_HOST`, `SMTP_USER` y `SMTP_PASS`.

## Paso 1: subir la rama a `main`

Vercel despliega a producción desde la rama principal. Mergeá `ccr-e594c8b2-d1rodt` a `main`
(por PR o merge directo).

## Paso 2: desplegar la API

1. En vercel.com: **Add New → Project** e importá el repo.
2. **Root Directory:** `Server`. **Framework Preset:** Other. Dejá vacíos los comandos de build.
3. **Environment Variables** (Production):

   | Variable | Valor |
   | --- | --- |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `465` |
   | `SMTP_SECURE` | `true` |
   | `SMTP_USER` | `roberpalestini97@gmail.com` |
   | `SMTP_PASS` | la contraseña de aplicación del paso 0 |
   | `MAIL_FROM` | `Portfolio <roberpalestini97@gmail.com>` |
   | `CONTACT_TO` | opcional: si no está, va a `roberpalestini97@gmail.com` |
   | `ALLOWED_ORIGINS` | `https://connectwithme.vercel.app` (la URL final del front; si tenés varias, separalas con coma) |
   | `MONGODB_URI` | opcional, solo para likes/ranks |

4. Deploy. Anotá la URL, por ejemplo `https://rober-portfolio-api.vercel.app`.
5. Probá que responda:

   ```bash
   curl https://<tu-api>.vercel.app/
   # {"message":"Server Running"}

   curl -X POST https://<tu-api>.vercel.app/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Prueba","phone":"+54 9 223 343 1845","email":"tu-otro-mail@ejemplo.com"}'
   # {"status":200,"message":"Message sent"}  → revisá tu bandeja de entrada
   ```

## Paso 3: desplegar el front

1. **Add New → Project**, mismo repo.
2. **Root Directory:** `/` (raíz). **Framework Preset:** Create React App
   (build `npm run build`, output `build`). El `.npmrc` ya resuelve el problema de OpenSSL de
   CRA 4 con Node 18, 20 o 22.
3. **Environment Variables:** `REACT_APP_API_URL` = `https://<tu-api>.vercel.app`, sin `/` al final.
   Como CRA mete esta variable dentro del build, si la cambiás tenés que **redesplegar**.
4. Deploy. En **Settings → Domains** asigná `connectwithme.vercel.app` o tu dominio.
5. El `vercel.json` de la raíz hace que `/about`, `/project` y `/resume` funcionen también al recargar la página.

## Paso 4: cerrar CORS

Si la URL final del front no es la que pusiste en `ALLOWED_ORIGINS`, actualizala en la API y
redesplegá la API. Sin esto, el navegador bloquea el envío del formulario.

## Paso 5: checklist final

- [ ] Abrir el sitio, tocar **Get in touch** y enviar un mensaje con email: llegan 2 emails (a vos y al visitante).
- [ ] Enviar otro sin email: te llega solo el tuyo, y el *Responder* no apunta a nadie.
- [ ] Probar datos inválidos: el formulario marca los campos en rojo y no envía.
- [ ] Revisar la carpeta de spam la primera vez y marcar "No es spam".
- [ ] Probar los otros botones de contacto (ícono en Home, link en About, ícono en el footer).
- [ ] Recargar directamente en `/project` y `/resume`: no debe dar 404.

## Problemas comunes

| Síntoma | Causa | Solución |
| --- | --- | --- |
| El formulario dice "couldn't be sent" y la API responde **503** | Faltan variables SMTP | Revisar `SMTP_HOST`, `SMTP_USER` y `SMTP_PASS` en Vercel, y redesplegar |
| La API responde **502** | Gmail rechazó el login | Usar una **contraseña de aplicación**, no tu contraseña normal; verificar `SMTP_USER` |
| La consola del navegador muestra un error de CORS | El origen no está permitido | Agregar la URL exacta del front a `ALLOWED_ORIGINS` |
| El formulario apunta a `localhost:3600` en producción | Falta `REACT_APP_API_URL` en el build | Configurarla en el proyecto del front y redesplegar |
| **429** | Más de 5 envíos en 15 min desde la misma IP | Esperar; es la protección anti-spam |

## Desarrollo local

```bash
# API
cd Server
cp .env.example .env   # completar SMTP_* (o MAIL_TRANSPORT=json para no enviar de verdad)
npm install
npm run start-server   # http://localhost:3600
npm test               # tests del formulario de contacto

# Front (otra terminal)
cp .env.example .env   # REACT_APP_API_URL=http://localhost:3600
npm install
npm start              # http://localhost:3000
```

## Alternativa: front en AWS Amplify

El repo ya trae `amplify.yml`. Si preferís Amplify para el front:

- Cargá `REACT_APP_API_URL` en **Environment variables**.
- En **Rewrites and redirects** agregá: origen `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|pdf)$)([^.]+$)/>`, destino `/index.html`, tipo `200 (Rewrite)`.
- Agregá el dominio de Amplify a `ALLOWED_ORIGINS` en la API.
