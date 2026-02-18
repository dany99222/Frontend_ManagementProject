# 📋 ProjectManagement — Frontend

> Aplicación web para la gestión de proyectos y tareas, construida con React 19 y TypeScript.

🌐 **Demo en vivo:** [frontend-management-project.vercel.app](https://frontend-management-project.vercel.app/)

---

## 📖 Descripción

ProjectManagement es una aplicación frontend que permite a los usuarios gestionar proyectos y tareas de forma visual e intuitiva. Incluye funcionalidades como autenticación, gestión de tareas con drag & drop, formularios validados y notificaciones en tiempo real.

---

## 🚀 Technologies & Tools

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![DnD Kit](https://img.shields.io/badge/DnD_Kit-000000?style=for-the-badge&logoColor=white)
![Headless UI](https://img.shields.io/badge/Headless_UI-66E3FF?style=for-the-badge&logo=headlessui&logoColor=black)
![React Toastify](https://img.shields.io/badge/React_Toastify-FFCD00?style=for-the-badge&logoColor=black)

---

## 📁 Estructura del proyecto

```
frontend/
├── src/
│   ├── api/            # Llamadas a la API
│   ├── components/     # Componentes reutilizables
│   ├── layouts/        # Layouts de la aplicación
│   ├── lib/            # Configuración de librerías externas
│   ├── hooks/          # Custom hooks
│   ├── types/          # Tipos TypeScript
│   ├── locales/        # Archivos de internacionalización (i18n)
│   ├── utils/          # Funciones utilitarias
│   ├── views/          # Vistas/páginas
│   └── main.tsx        # Punto de entrada
├── public/
├── index.html
├── vite.config.ts
└── package.json
```

---

## ⚙️ Instalación y uso

### Prerrequisitos

- Node.js >= 18
- npm o yarn

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/dany99222/frontend.git
cd frontend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita el archivo .env con la URL de tu backend

# 4. Iniciar en modo desarrollo
npm run dev
```

### Scripts disponibles

```bash
npm run dev       # Inicia el servidor de desarrollo
npm run build     # Compila para producción
npm run preview   # Previsualiza el build de producción
npm run lint      # Ejecuta ESLint
```

---

## 🌍 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:4000/api
```

---

## 📦 Deploy

El frontend está desplegado en **Vercel**. Cada push a la rama `main` activa un deploy automático.

---

## 👤 Autor

**dany99222**
- GitHub: [@dany99222](https://github.com/dany99222)

---

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.
