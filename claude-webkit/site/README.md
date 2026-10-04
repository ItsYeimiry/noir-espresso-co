# Noir Espresso Co. — plantilla web de cafetería de lujo

Next.js 16 · Tailwind CSS 4 · TypeScript · GSAP + Lenis · motion · Radix. Bilingüe (ES en `/`, EN en `/en`), tema oscuro por defecto con tema claro, reservas por WhatsApp, SEO con JSON-LD `CafeOrCoffeeShop`.

## Arrancar

```bash
npm install
npm run dev        # desarrollo en http://localhost:3000
npm run build && npm start   # producción
npm run export     # HTML estático en out/ (sin servidor Node)
npm run images     # regenera las imágenes de demo
```

## Personalizar para un cliente

Todo el contenido está en **`src/content.config.ts`**:

| Qué | Dónde |
| --- | --- |
| Nombre, URL, moneda, horario, dirección, email, teléfono, redes | `site` |
| **Número de WhatsApp** que recibe las reservas (solo dígitos, con prefijo de país) | `site.whatsapp` |
| Menú de cafés (10) y postres (10): nombres, notas, precios, ficha técnica | `coffees`, `pastries` |
| Todos los textos de la interfaz en ES y EN | `ui` |
| Quitar el crédito del pie de página | `site.showCredit = false` |

Colores y tipografía: tokens al inicio de `src/app/globals.css` (OKLCH). Fuentes en `src/lib/fonts.ts`.

## Imágenes

Las imágenes actuales son **fondos de demostración** generados localmente, no fotografías. Cada archivo es una ranura: sustituye el JPG por la foto real **con el mismo nombre** y la web la usa sin tocar código.

| Carpeta | Uso | Tamaño recomendado |
| --- | --- | --- |
| `public/images/hero/hero.jpg` | Portada | 2400×1500 |
| `public/images/tiles/*.jpg` | Accesos por categoría | 1600×1200 |
| `public/images/coffee/*.jpg` | Cada café (vertical) | 1400×1750 |
| `public/images/pastry/*.jpg` | Cada postre (cuadrada) | 1200×1200 |
| `public/images/method/*.jpg` | Sección «El método» | 1400×1750 |
| `public/images/visit/space.jpg` | Fondo de reservas | 2400×1500 |

Si cambias el nombre de un archivo, actualiza su ruta en `src/content.config.ts`.

## Estructura

```
src/content.config.ts      contenido único (ES/EN)
src/app/(es)/ , (en)/en/   las dos páginas y sus layouts raíz
src/components/site/       secciones: Hero, Statement, Tiles, CoffeeShowcase, Method, PastryList, Reservation, Footer
src/components/ui/         button y dialog (estilo shadcn, sobre Radix)
scripts/                   generador de imágenes de demostración
```

## Despliegue

- **Vercel / Netlify / Cloudflare Pages**: importa el repositorio (carpeta `site`) o sube `out/` tras `npm run export`.
- Hosting estático genérico: el servidor debe servir `en.html` en la ruta `/en`.
- Antes de publicar, cambia `site.url` en `content.config.ts` por el dominio real (afecta a canonical, sitemap y JSON-LD).

## Accesibilidad y movimiento

Respeta `prefers-reduced-motion` (sin scroll suave, sin escena fijada, sin parallax). Formularios con etiquetas visibles, foco visible, navegación completa por teclado y diálogos con gestión de foco.
