# Mora Calidad — Puerta de entrada (PWA)

Portada instalable de la aplicación de **Gestión de Calidad de MORA Packaging**.
La app real vive en Google Apps Script; este repositorio publica en GitHub Pages
(https://beatrizcerero-gh.github.io/mora-calidad/) una envoltura que:

- Muestra la app a pantalla completa dentro de un iframe (con permiso de cámara).
- Permite **instalarla con icono** en tablets y móviles ("Añadir a pantalla de inicio").
- Enseña un aviso claro de **"Sin conexión"** con botón de reintento (y recarga
  sola cuando vuelve la red) en lugar de quedarse cargando para siempre.

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | Portada: splash, iframe a la app, detección de sin conexión, registro del service worker |
| `manifest.json` | Datos de la instalación: nombre, colores, iconos, pantalla completa |
| `service-worker.js` | Guarda en caché los archivos de esta portada para que arranque sin red |
| `icon-192.png` / `icon-512.png` | Icono de la app en dos tamaños |
| `docs/` (opcional) | Copia del código de Apps Script, manual y registro de cambios, para tener historial |

## Mantenimiento

- **Si cambia la URL de despliegue** de Apps Script (nuevo `/exec`), edita la
  línea del `<iframe>` en `index.html`.
- **Si tocas `service-worker.js`**, sube el número de versión de la constante
  `CACHE` (v2 → v3...) para que los dispositivos refresquen la caché.
- Tras cada cambio, GitHub Pages tarda 1–2 minutos en publicar. En una app ya
  instalada, cierra del todo y vuelve a abrir un par de veces para que el
  service worker nuevo tome el control.

## Límite conocido (a propósito)

La app **necesita internet para funcionar**: todo el guardado pasa por los
servidores de Google y no se puede cachear desde aquí. Lo que sí protege contra
cortes es el autoguardado de borradores dentro de la propia app (ver
`CAMBIOS_desde_el_manual.md` del proyecto).
