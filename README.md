# 📋 ProjectManagement — Frontend

> Aplicación web para la gestión de proyectos y tareas, construida con React 19 y TypeScript.

🌐 **Demo en vivo:** [frontend-management-project.vercel.app](https://frontend-management-project.vercel.app/)

---

## 📖 Descripción

ProjectManagement es una aplicación frontend que permite a los usuarios gestionar proyectos y tareas de forma visual e intuitiva. Incluye funcionalidades como autenticación, gestión de tareas con drag & drop, formularios validados y notificaciones en tiempo real.

---

## 🚀 Tecnologías utilizadas

| Tecnología | Versión | Descripción |
|---|---|---|
| React | 19 | Librería principal de UI |
| TypeScript | 5.9 | Tipado estático |
| Vite | 7 | Bundler y dev server |
| Tailwind CSS | 3.4 | Estilos utilitarios |
| React Router DOM | 7 | Enrutamiento |
| TanStack Query | 5 | Fetching y caché de datos |
| Axios | 1.13 | Cliente HTTP |
| React Hook Form | 7 | Manejo de formularios |
| Zod | 4 | Validación de esquemas |
| DnD Kit | 6 | Drag and drop |
| Headless UI | 2 | Componentes accesibles |
| React Toastify | 11 | Notificaciones |

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
