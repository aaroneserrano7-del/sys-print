# SYS PRINT

Sitio estático profesional de SYS PRINT, diseñado con HTML, CSS y JavaScript nativos. No depende de un servidor Node en producción ni recopila datos mediante un backend: el formulario prepara una consulta y abre WhatsApp del negocio.

El contacto oficial es `812 442 7052`. Para WhatsApp se utiliza exclusivamente `https://wa.me/528124427052`.

## Arquitectura

```text
SYS PRINT
│
├── Seguridad
│   ├── CSP
│   ├── Headers
│   └── Variables de entorno
│
├── Performance
│   ├── CDN
│   ├── Cache
│   └── Assets
│
├── Responsive
│   ├── Mobile
│   ├── Desktop
│   └── Tablet
│
└── SEO
    ├── Local
    ├── Search
    └── Metadata
```

## Cómo instalar

Se recomienda Node.js LTS para ejecutar los comandos de desarrollo y validación.

```bash
git clone <URL_DEL_REPOSITORIO>
cd "SYS PRINT V2"
npm install
```

Actualmente no hay dependencias de producción. `npm install` crea el entorno estándar de Node sin añadir un framework al sitio. El servidor estático de desarrollo se descarga bajo demanda con una versión fijada; no forma parte del deploy.

## Cómo ejecutar

```bash
npm run dev
```

Abre `http://localhost:3000`. El comando usa un servidor estático local; no se utiliza en Netlify.

## Cómo construir

```bash
npm run build
```

El sitio no se compila ni transpila: se publica como archivos estáticos. El build valida la sintaxis de `script.js`; Netlify publica la raíz del proyecto. Antes de un deploy, además comprueba manualmente `index.html`, `404.html`, imágenes y los enlaces de WhatsApp.

## Estructura

```text
/
├── index.html        # Página principal semántica
├── 404.html          # Página no encontrada
├── style.css         # Sistema visual y reglas responsive
├── script.js         # Menú, FAQ, revelados y formulario WhatsApp
├── logo-header.jpg   # Logo optimizado para interfaz
├── banner-1440.jpg   # Banner optimizado para el Hero
├── Logo.png          # Fuente original del logotipo, conservada
├── banner.png        # Fuente original del banner, conservada
├── _headers          # Headers de seguridad y cache de Netlify
├── _redirects        # Redirecciones estáticas
├── netlify.toml      # Build y directorio de publicación
├── robots.txt        # Directivas de rastreo
├── sitemap.xml       # Sitemap del sitio publicado
├── .env.example      # Plantilla segura para futuros secretos
├── .gitattributes    # Finales de línea consistentes para Git y Netlify
└── package.json      # Comandos locales
```

## Variables de entorno

La versión actual no necesita variables de entorno. Nunca agregues secretos a HTML, CSS, JavaScript del navegador ni al repositorio. Si se crea una función de servidor en el futuro:

1. Añade solo el nombre de la variable, sin valor, en `.env.example`.
2. Define el valor real en **Netlify → Site configuration → Environment variables**.
3. Mantén `.env` y `.env.*` fuera de Git (ya están incluidos en `.gitignore`).
4. Si un secreto llegó a un commit o a un deploy, revócalo y rótalo; borrarlo del archivo actual no basta.

## Deploy en Netlify

1. Sube este proyecto a un repositorio Git.
2. En Netlify, selecciona **Add new site → Import an existing project** y conecta el repositorio.
3. Netlify detectará `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `.`
4. No configures una función ni un servidor persistente para el sitio actual.
5. Revisa el Deploy Preview antes de publicar en producción.
6. Tras cada deploy, prueba inicio, 404, menú móvil, formulario y todos los enlaces de WhatsApp.

Netlify entrega los archivos desde CDN y aplica `_headers` y `_redirects`. En la versión actual no se requiere `server.js`: el contacto se resuelve directamente por WhatsApp.

## Configuración de dominio

1. Agrega el dominio en **Domain management** de Netlify.
2. Configura los registros DNS exactamente como Netlify indique; no supongas valores de A, CNAME o nameservers.
3. Elige una URL canónica (con o sin `www`) y redirige la otra desde Netlify.
4. Espera a que Netlify confirme el certificado HTTPS.
5. La versión actual usa `https://sysprint.netlify.app/` como URL canónica, Open Graph y sitemap. Cuando exista un dominio propio, actualiza esas referencias y la URL del sitemap en `robots.txt` en el mismo cambio.

El header HSTS se entrega para HTTPS de Netlify sin `includeSubDomains` ni `preload`. Ambas opciones solo deben evaluarse después de verificar que el dominio raíz y todos los subdominios necesarios funcionen exclusivamente mediante HTTPS.

## Netlify Functions

No hay Netlify Functions activas porque el sitio no cuenta con backend ni necesita conservar información de formularios. Esto reduce superficie de ataque y mantenimiento.

Si en el futuro se necesita enviar formularios, crear un endpoint bajo `netlify/functions/` que valide y limite cada solicitud en servidor, use variables de entorno para proveedores externos, devuelva errores genéricos y no exponga secretos. No intentes ejecutar un servidor Express persistente dentro de Netlify.

## Seguridad

`_headers` establece una política CSP restrictiva para los recursos actuales y también configura `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y HSTS. La CSP permite solo recursos propios; no cargues fuentes, scripts, analítica, iframes o imágenes externas sin actualizar y probar la política primero.

El formulario valida nombre y mensaje en navegador y abre una conversación de WhatsApp; no almacena ni transmite datos a un endpoint de SYS PRINT. Si se añade backend, la validación del navegador no sustituye la validación, sanitización, límites de tamaño, protección anti-spam y rate limiting del servidor.

Los CSS, JS y HTML se revalidan en cada solicitud. Las imágenes se almacenan en caché hasta siete días; el banner de carga inicial se redujo de 1.5 MiB a aproximadamente 133 KiB y el logo de interfaz de 916 KiB a aproximadamente 39 KiB. Si un asset cambia, renómbralo y actualiza su referencia para evitar servir una versión anterior desde CDN.

## Cómo actualizar

1. Crea una rama y realiza el cambio.
2. Mantén el teléfono visible como `812 442 7052` y el enlace WhatsApp como `https://wa.me/528124427052` en cada CTA de contacto.
3. Ejecuta `npm run build`.
4. Prueba 320 px, 360 px, 390 px, 430 px, 1366 px, 1440 px y 1920 px de ancho, sin scroll horizontal.
5. Revisa navegación con teclado, focus visible, menú con Escape, FAQ, formulario, enlaces, 404, consola y Network.
6. Revisa el Deploy Preview de Netlify y sus headers antes de fusionar.
7. Para reemplazar logo o banner, conserva sus proporciones, optimiza el archivo y cambia su nombre antes de enlazarlo.

## Troubleshooting

| Problema | Revisión |
| --- | --- |
| El menú móvil no cierra | Comprueba que `script.js` cargue sin errores en la consola. |
| WhatsApp no abre | Confirma que el enlace sea exactamente `https://wa.me/528124427052` y que el navegador permita ventanas nuevas. |
| El formulario no continúa | Los campos Nombre y mensaje son obligatorios; no existe envío a backend. |
| Un recurso queda bloqueado en producción | Revisa la consola y actualiza `_headers` únicamente con el origen y la directiva imprescindibles. |
| Persisten imágenes antiguas | Publica la imagen con un nombre nuevo y cambia la referencia HTML. |
| Una ruta no existe | Comprueba `404.html` en el Deploy Preview. |
| El build falla | Ejecuta `node --version`, usa Node LTS y después `npm run build`. |

## Checklist de publicación

- [ ] Desktop: 1366×768, 1440×900 y 1920×1080.
- [ ] Mobile: 320×568, 360×800, 390×844 y 430×932.
- [ ] Chrome, Edge y Firefox: navegación, FAQ, formulario, llamadas y WhatsApp.
- [ ] Sin errores de consola, recursos fallidos ni scroll horizontal.
- [ ] Página 404, redirects, headers y CSP comprobados en Netlify.
- [ ] Lighthouse revisado para rendimiento, accesibilidad, buenas prácticas y SEO.
