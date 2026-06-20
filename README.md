# React Product Catalog

Aplicación web Full Stack desarrollada con el stack MERN (MongoDB, Express, React y Node.js) para la administración de un catálogo de productos. Permite crear, consultar, actualizar y eliminar productos, optimizando el rendimiento mediante consultas avanzadas a la base de datos.

Este proyecto fue desarrollado como parte de mi proceso de aprendizaje, tomando como base inicial el primer proyecto del curso **"MERN Crash Course"** de Traversy Media y extendiéndolo significativamente con funcionalidades avanzadas propias de un entorno de producción.

**[Ver Demo en Vivo (Render)](https://react-product-catalog.onrender.com)**

---

## Características

### Funcionalidades Base

* **CRUD Completo:** Creación, lectura, actualización y eliminación de productos.
* **Persistencia de Datos:** Almacenamiento en MongoDB.
* **Interfaz Personalizada:** Ajustes visuales respecto al proyecto original.

### Funcionalidades (Implementación propia)

* **Gestión de Inventario:** Control de disponibilidad mediante un campo de stock.
* **Búsqueda Optimizada (Debounce):** Implementación de retraso intencional en el buscador para reducir la carga de peticiones al servidor.
* **Filtros Dinámicos Combinados:** Rango de precios, disponibilidad de stock y ordenamiento de resultados (precio y antigüedad).
* **Paginación del Lado del Servidor:** Sistema de carga de productos por bloques utilizando `limit` y `skip` para optimizar memoria y rendimiento.

---

## Tecnologías Utilizadas

### Frontend

* React
* Vite
* Chakra UI
* Zustand
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### Despliegue

* Render

---

## Instalación y Uso Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/keving259/react-product-catalog.git
cd react-product-catalog
```

### 2. Instalar dependencias

```bash
npm install
npm install --prefix frontend
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
MONGO_URI=tu_cadena_de_conexion_aqui
PORT=5000
NODE_ENV=development
```

### 4. Ejecutar en entorno de desarrollo

```bash
npm run dev
```

### 5. Generar build de producción

```bash
npm run build
```

### 6. Ejecutar en producción

```bash
npm start
```

---

## Errores y Soluciones

Durante el desarrollo me enfrenté a algunos problemas técnicos de configuración que resolví de la siguiente manera.

### 1. Compatibilidad entre Vite y Node.js

**Problema**

```text
You are using Node.js 18.20.3.
Vite requires Node.js version 20.19+ or 22.12+.
TypeError: crypto.hash is not a function
```

**Solución**

Las versiones recientes de Vite ya no son compatibles con Node.js 18. La solución consistió en actualizar el entorno local a **Node.js v24.13.1** y reinstalar las dependencias.

### 2. Conexión a MongoDB Atlas

**Problema**

```text
Error: querySrv ECONNREFUSED
_mongodb._tcp.cluster0.mongodb.net
```

**Solución**

Tras investigar el comportamiento de las consultas DNS de Node.js, configuré servidores DNS explícitos utilizando el módulo nativo de Node:

```javascript
import { setServers } from "node:dns/promises";

setServers(["1.1.1.1", "8.8.8.8"]);
```

---

## Aprendizajes

Este proyecto me permitió consolidar y llevar a la práctica:

* Desarrollo Full Stack conectando React con Express.
* Creación y consumo de APIs REST.
* Gestión de estado global con Zustand.
* Integración y modelado de datos con MongoDB Atlas.
* Implementación de filtros, búsqueda optimizada y paginación.
* Resolución de problemas de compatibilidad y conectividad de red.
* Despliegue de aplicaciones en la nube mediante Render.

---

## Referencia y Créditos

La versión inicial de este proyecto fue desarrollada siguiendo el tutorial de Burak Orkmez (@codesistency). A partir de esa base se agregaron funcionalidades propias como:

* Gestión de stock.
* Búsqueda optimizada con debounce.
* Filtros avanzados.
* Ordenamiento de resultados.
* Paginación del lado del servidor.
* Mejoras visuales en la interfaz.

### Recursos originales

- YouTube: https://www.youtube.com/watch?v=MDZC8VDZnV8
- GitHub: https://github.com/burakorkmez

## Autor

**Kevin Cisneros**

GitHub: https://github.com/keving259
