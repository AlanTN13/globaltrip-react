#!/bin/bash

# 🚀 Script de comandos rápidos para GlobalTrip React

echo "🌟 GlobalTrip - Comandos Rápidos"
echo "================================"
echo ""
echo "Selecciona una opción:"
echo ""
echo "1) 🔧 Instalar dependencias"
echo "2) 🚀 Iniciar servidor de desarrollo"
echo "3) 📦 Build de producción"
echo "4) 👀 Preview del build"
echo "5) 🌐 Deploy a Vercel (preview)"
echo "6) 🌐 Deploy a Vercel (producción)"
echo "7) 🧹 Limpiar node_modules y reinstalar"
echo "8) ❌ Salir"
echo ""
read -p "Opción: " option

case $option in
    1)
        echo "📦 Instalando dependencias..."
        npm install
        ;;
    2)
        echo "🚀 Iniciando servidor de desarrollo..."
        echo "Abrirá en http://localhost:5173"
        npm run dev
        ;;
    3)
        echo "📦 Creando build de producción..."
        npm run build
        echo "✅ Build completado en ./dist"
        ;;
    4)
        echo "👀 Iniciando preview del build..."
        npm run preview
        ;;
    5)
        echo "🌐 Deploying a Vercel (preview)..."
        vercel
        ;;
    6)
        echo "🌐 Deploying a Vercel (producción)..."
        vercel --prod
        ;;
    7)
        echo "🧹 Limpiando node_modules..."
        rm -rf node_modules package-lock.json
        echo "📦 Reinstalando dependencias..."
        npm install
        ;;
    8)
        echo "👋 ¡Hasta luego!"
        exit 0
        ;;
    *)
        echo "❌ Opción inválida"
        exit 1
        ;;
esac
