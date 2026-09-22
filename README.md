# Royal Cut Cali — Landing Page

Landing page one-page, responsive y optimizada para conversión por WhatsApp.

## 🚀 Cómo usar

1. Descarga los archivos (`index.html`, `styles.css`, `main.js`).
2. Colócalos en la misma carpeta.
3. Abre `index.html` en el navegador (o súbelos a cualquier hosting estático: Netlify, Vercel, GitHub Pages, Hostinger, etc.).

No requiere build ni dependencias. Solo fuentes de Google (carga por CDN).

## 📝 Personalización rápida

### Cambiar el número de WhatsApp
En `main.js`, dentro del objeto `CONFIG`:

```js
const CONFIG = {
  phone: "573177550472", // ← tu número sin "+"
  ...
};