# Guía de Deployment en Vercel - GlobalTrip

## 📋 Prerequisitos

1. Cuenta en [Vercel](https://vercel.com) (puedes usar tu cuenta de GitHub, GitLab o Bitbucket)
2. Repositorio Git con tu código (GitHub, GitLab o Bitbucket)

## 🚀 Método 1: Deploy desde GitHub (Recomendado)

### Paso 1: Subir el código a GitHub

```bash
# Inicializar repositorio Git (si aún no lo has hecho)
cd /Users/alanfernandez/Downloads/GT-sitioweb/globaltrip-react
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit - GlobalTrip React site"

# Crear un repositorio en GitHub y conectarlo
# Ve a github.com y crea un nuevo repositorio llamado "globaltrip-react"
# Luego ejecuta:
git remote add origin https://github.com/TU_USUARIO/globaltrip-react.git
git branch -M main
git push -u origin main
```

### Paso 2: Importar en Vercel

1. Ve a [vercel.com/new](https://vercel.com/new)
2. Haz clic en "Import Git Repository"
3. Selecciona tu repositorio `globaltrip-react`
4. Vercel detectará automáticamente que es un proyecto Vite
5. **Configuración automática** (Vercel la detectará):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Haz clic en **"Deploy"**
7. ¡Espera 1-2 minutos y tu sitio estará en línea! 🎉

### Paso 3: Configurar dominio personalizado (Opcional)

1. En el dashboard de tu proyecto en Vercel, ve a "Settings" → "Domains"
2. Agrega tu dominio personalizado (ej: `www.globaltrip.com`)
3. Sigue las instrucciones para configurar los DNS

## 🚀 Método 2: Deploy con Vercel CLI

### Instalación de Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Login en Vercel
vercel login
```

### Deploy

```bash
# Navegar al directorio del proyecto
cd /Users/alanfernandez/Downloads/GT-sitioweb/globaltrip-react

# Deploy a preview (ambiente de prueba)
vercel

# Deploy a producción
vercel --prod
```

## 🔄 Actualizaciones Automáticas

Una vez conectado a GitHub:
- Cada push a la rama `main` → Deploy automático a producción
- Cada push a otras ramas → Deploy automático a preview
- Pull Requests → Preview automático con URL única

## ⚙️ Variables de Entorno (si las necesitas en el futuro)

Si necesitas agregar variables de entorno:

1. En Vercel Dashboard → Settings → Environment Variables
2. Agrega tus variables (ej: API keys)
3. En tu código React, accede con `import.meta.env.VITE_TU_VARIABLE`

## 📊 Monitoreo

Vercel te proporciona:
- ✅ Analytics de tráfico
- ✅ Logs de deployment
- ✅ Performance metrics
- ✅ SSL automático (HTTPS)
- ✅ CDN global

## 🎯 URLs de tu sitio

Después del deploy tendrás:
- **URL de producción**: `https://globaltrip-react.vercel.app`
- **URL personalizada**: Tu dominio si lo configuraste
- **URLs de preview**: Para cada branch/PR

## 🔧 Troubleshooting

### Error: "Build failed"
- Verifica que `npm run build` funcione localmente
- Revisa los logs en Vercel Dashboard

### Error: "Page not found"
- Asegúrate que el Output Directory sea `dist`
- Verifica que el build command sea `npm run build`

### Problemas con Tailwind
- Ya está configurado correctamente con `@tailwindcss/postcss`
- No requiere configuración adicional

## 📞 Soporte

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [Vite Docs](https://vitejs.dev)

---

¡Tu sitio de GlobalTrip está listo para el mundo! 🌍✨
