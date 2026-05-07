# Generador de Firmas de Correo Electrónico

Aplicación web para la generación, previsualización, copia y almacenamiento de firmas de correo electrónico corporativas, utilizando Supabase como backend.  
Desarrollada con HTML, CSS y JavaScript puro, incluye selección de logo, validación de campos y guardado de registros.

## 🚀 Características

- **Generación dinámica de firma** a partir de datos ingresados por el usuario.
- **Selección visual de logo** entre varias imágenes precargadas.
- **Validación de campos** (teléfono a 10 dígitos, datos obligatorios, selectores).
- **Vista previa en tiempo real** dentro de la misma página.
- **Copia al portapapeles** manteniendo formato HTML y texto plano.
- **Almacenamiento en Supabase** (evita duplicados mediante verificación previa).
- **Manejo centralizado de errores** con mensajes amigables.

## 🛠️ Tecnologías utilizadas

- HTML5
- CSS3 (diseño responsivo, grid para logo selector)
- JavaScript (ES6+)
- [Supabase JS SDK v2](https://supabase.com/docs/reference/javascript)
- Supabase (PostgreSQL como backend)

## 📁 Estructura del proyecto

```
project/
│
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── templates.js
├── Images/
└── README.md
```

## 🗄️ Configuración de Supabase

### 1. Crear un proyecto en Supabase

- Ve a [supabase.com](https://supabase.com) y crea un nuevo proyecto.
- Una vez creado, obtén tu **URL** y **anon key** desde la sección *Project Settings > API*.

### 2. Crear la tabla `tb_user_firmas`

Ejecuta la siguiente sentencia SQL en el **SQL Editor** de Supabase:

```sql
CREATE TABLE tb_user_firmas (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  apellido_paterno TEXT NOT NULL,
  apellido_materno TEXT,
  puesto TEXT,
  zona TEXT,
  telefono TEXT,
  correo TEXT,
  direccion TEXT,
  logo_seleccionado TEXT,
  firma_html TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

### 3. Configurar las credenciales en el código

Abre el archivo `js/app.js` y modifica las constantes al inicio del archivo:

```javascript
const SUPABASE_URL = 'https://tu-proyecto.supabase.co';
const SUPABASE_ANON_KEY = 'tu-anon-key-aqui';
```

> ⚠️ **Importante:** por seguridad, no subas estas claves a un repositorio público. En entornos productivos, utiliza variables de entorno o un backend proxy.

## 📦 Instalación y ejecución local

1. Clona el repositorio o descarga los archivos.
2. Coloca las imágenes de los logos en la carpeta `Images/` (los nombres de archivo deben ser `1.jpg`, `2.jpg`, ..., `6.jpg`).
3. Configura las credenciales de Supabase como se indica arriba.
4. Abre `index.html` en tu navegador (no se necesita servidor web adicional).

> La aplicación requiere conexión a internet para cargar Supabase SDK y para operaciones de base de datos.

## 📝 Uso de la aplicación

1. **Completa todos los campos** del formulario (nombre, apellidos, puesto, división, teléfono, correo, dirección CEDIS).
2. **Selecciona un diseño de logo** haciendo clic sobre la imagen deseada.
3. Puedes:
   - Hacer clic en **"Generar Firma"** solo para previsualizar.
   - Hacer clic en **"Generar & Copiar Firma"** para:
     - Validar los datos.
     - Generar la firma.
     - Copiarla al portapapeles (formato HTML).
     - Guardar el registro en Supabase (si no existe duplicado exacto).
4. **Ve a Outlook u otro cliente de correo** y pega (Ctrl+V / Cmd+V) la firma.
5. Opcionalmente, puedes usar el botón **"Copiar firma"** manualmente.

## ⚠️ Validaciones incluidas

- Teléfono: solo números y exactamente 10 dígitos.
- Campos obligatorios: nombre, apellido paterno, puesto, zona, teléfono, correo, dirección.
- Selectores: deben elegir una opción válida (no el valor por defecto).
- No se permite generar o copiar sin antes generar la firma.
- No se permiten duplicados exactos en la base de datos.

## 🧪 Pruebas y depuración

La consola del navegador (F12 > Console) muestra logs detallados de cada paso:
- Inicio/fin de funciones principales.
- Errores de validación, copia o guardado.
- Confirmación de inserción exitosa en Supabase.

## 🧩 Personalización de la plantilla

La plantilla HTML de la firma se encuentra en `js/templates.js` dentro del objeto `firmaTemplates`.  
Puedes modificar el diseño, colores, fuentes o añadir más campos (debes también actualizar la lógica de reemplazo en `generarFirma()`).

```javascript
const firmaTemplates = {
  clasica: `...tu HTML aquí...`
};
```

Los placeholders disponibles son:  
`{{nombre}}`, `{{apellidoPaterno}}`, `{{apellidoMaterno}}`, `{{puesto}}`, `{{zona}}`, `{{telefono}}`, `{{correo}}`, `{{direccion}}`, `{{logo}}`

## 🐛 Posibles errores y soluciones

| Error | Posible causa | Solución |
|-------|---------------|----------|
| `Número incorrecto. Debe tener 10 dígitos.` | El teléfono no tiene 10 números. | Ingresa solo dígitos (ej. 5512345678). |
| `Este registro ya existe en la base de datos` | Se intenta guardar el mismo combo de datos. | Es normal; el sistema evita duplicados. |
| `No se pudo copiar la firma` | El navegador bloquea el acceso al portapapeles o la vista previa está vacía. | Genera la firma primero; asegura que la página se sirva por HTTPS en producción. |
| `Failed to fetch` al guardar | URL/Key incorrectas o Supabase caído. | Verifica las constantes y la conectividad. |
| `Logo no se muestra en vista previa` | Ruta de la imagen incorrecta o no existe el archivo. | Ajusta `value` de los radios con la ruta correcta (ej. `Images/1.jpg`). |

## 📌 Notas adicionales

- El campo `timestamp` se registra automáticamente al guardar.
- La función `mainFirma()` orquesta todo el flujo con un pequeño retardo (`setTimeout`) para asegurar la copia antes del guardado.
- Se utiliza `ClipboardItem` moderno con fallback a `document.execCommand` para compatibilidad.

---

Desarrollado para generación interna de firmas corporativas.  
Para dudas o mejoras, revisa la consola del navegador y la documentación de Supabase.