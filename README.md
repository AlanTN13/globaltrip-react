# GlobalTrip - Sitio Web en React

Sitio web profesional de GlobalTrip desarrollado con React, Vite y Tailwind CSS, listo para deployment en Vercel.

## 🚀 Características

- ⚡️ **Vite** - Build tool ultrarrápido
- ⚛️ **React 18** - Última versión de React
- 🎨 **Tailwind CSS** - Estilos modernos y responsive
- 📱 **Responsive Design** - Optimizado para móvil, tablet y desktop
- 🌙 **Dark Mode Ready** - Preparado para modo oscuro
- 🎯 **SEO Optimizado** - Meta tags y estructura semántica

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build de producción
npm run preview
```

## 🌐 Deploy en Vercel

### Opción 1: Desde la interfaz de Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "Add New Project"
3. Importa tu repositorio de GitHub/GitLab/Bitbucket
4. Vercel detectará automáticamente que es un proyecto Vite
5. Haz clic en "Deploy"

### Opción 2: Usando Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 📁 Estructura del Proyecto

```
globaltrip-react/
├── src/
│   ├── components/
│   │   ├── Header.jsx      # Navegación principal
│   │   ├── Hero.jsx        # Sección hero
│   │   ├── Services.jsx    # Lista de servicios
│   │   ├── WhyUs.jsx       # Valores de la empresa
│   │   └── Footer.jsx      # Footer con CTA
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── index.html              # HTML base
├── tailwind.config.js      # Configuración de Tailwind
├── postcss.config.js       # Configuración de PostCSS
├── vite.config.js          # Configuración de Vite
└── vercel.json            # Configuración de Vercel
```

## 🎨 Personalización

### Colores

Los colores principales están definidos en `tailwind.config.js`:

```javascript
colors: {
  "primary": "#0b4e89",
  "background-light": "#ffffff",
  "background-dark": "#19202e",
  "text-main": "#1F2933",
  "text-light": "#617789",
}
```

### Fuentes

El proyecto usa **Manrope** como fuente principal y **Material Symbols** para los iconos.

## 📝 Componentes

- **Header**: Navegación sticky con menú móvil funcional
- **Hero**: Sección principal con CTA y imagen destacada
- **Services**: Lista de servicios con iconos y descripciones
- **WhyUs**: Grid de valores de la empresa
- **Footer**: CTA final con enlaces de contacto

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Crea el build de producción
- `npm run preview` - Preview del build de producción
- `npm run lint` - Ejecuta el linter

## 📱 Responsive

El sitio está optimizado para:
- 📱 Móviles (< 640px)
- 📱 Tablets (640px - 1024px)
- 💻 Desktop (> 1024px)

## 🌟 Próximos Pasos

1. Conectar formularios de contacto
2. Agregar animaciones con Framer Motion
3. Implementar modo oscuro completo
4. Agregar más páginas (Servicios detallados, Sobre nosotros, etc.)
5. Integrar analytics

## 📄 Licencia

© 2026 GlobalTrip. Todos los derechos reservados.
