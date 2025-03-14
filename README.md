# Descripción del Proyecto
Este proyecto de estudio tiene como objetivo explorar la integración entre Django y Vue.js utilizando hidración en el cliente. La aplicación está diseñada para emplear Django como backend, utilizando Django Rest Framework (DRF) para la exposición de API RESTful, mientras que Vue.js se encarga de la capa de interfaz de usuario.

La particularidad de este proyecto radica en su enfoque en la hidración de Django templates mediante Vue.js. Esto permite que el servidor genere HTML inicial estático que luego es "hidratado" por Vue.js en el cliente, convirtiéndolo en una aplicación interactiva.

El proyecto sirve como un experimento para comprender cómo ambas tecnologías pueden combinarse eficazmente, aprovechando las fortalezas de cada una:

- **Django** para la gestión de datos, la seguridad y la generación de plantillas.
- **Vue.js** para construir componentes de interfaz de usuario reactivos y modernos.

# Guía de Instalación
Sigue estos pasos para preparar el entorno de desarrollo:

### Backend: Django
1. Clonar el repositorio:
```bash
git clone https://github.com/ignacio-nava/django-vue.git
cd django-vue
```
2. Crear un entorno virtual y activarlo :
```bash
python -m venv venv
source venv/bin/activate   # En Windows: venv\Scripts\activate
```
3. Instalar las dependencias de Django: :
```bash
pip install -r requirements.txt
```
4. Crear las migraciones de la base de datos:
```bash
python manage.py makemigrations
```
5. Realizar las migraciones de la base de datos:
```bash
python manage.py migrate
```
6. Crear un superusuario para acceder al panel de administración de Django:
```bash
python manage.py createsuperuser
```
7. Iniciar el servidor de desarrollo:
```bash
python manage.py runserver
```

### Frontend: Vue.js
1. Navega al directorio del frontend:
```bash
cd frontend
```
2. Instala las dependencias de Vue.js:
```bash
npm install
```
3. Inicia el servidor de desarrollo de Vite:
```bash
npm run dev
```

### Nota importante para el desarrollo
Es necesario que tanto el servidor de desarrollo de Django como el de Vue.js estén corriendo simultáneamente. 
Para ello, utiliza dos terminales separadas: una para ejecutar el servidor de Django (`python manage.py runserver`) y otra para iniciar el servidor de Vite (`npm run dev`).

# Guía de Uso
La aplicación implementa un CRUD funcional para gestionar publicaciones (posts). A continuación, se detallan las operaciones disponibles y cómo interactuar con ellas:

### 1. Crear una publicación:

- Inicia sesión en la aplicación con tus credenciales.
- Navega a la sección de creación de posts en la interfaz de usuario.
- Completa el formulario con el título y el contenido de la publicación.

### 2. Leer publicaciones:

- La página principal muestra una lista de publicaciones existentes.
- Haz clic en el título de cualquier publicación para ver sus detalles.

### 3. Actualizar una publicación:

- Accede al detalle de una publicación que te pertenezca.
- Haz clic en el botón "Editar" para habilitar el formulario de edición.
- Realiza los cambios necesarios y guarda la publicación.

### 4. Eliminar una publicación:

- Desde el detalle de una publicación, haz clic en el botón "Eliminar".
- Confirma la acción en el cuadro de diálogo para borrar la publicación.

### Consideraciones

- Solo los usuarios autenticados pueden crear, actualizar o eliminar publicaciones.
- Las publicaciones que no te pertenecen solo están disponibles para lectura.

# Estructura del Proyecto
El proyecto está dividido en dos partes principales: el backend (Django) y el frontend (Vue.js). A continuación se detalla la estructura general:

### Backend (Django)
- `manage.py`: Archivo de gestión principal para ejecutar comandos de Django.
- `requirements.txt`: Lista de dependencias necesarias para el backend.
- `core/`: Carpeta principal del proyecto Django.
  - `settings.py`: Configuración del proyecto.
  - `env.py`: Archivo creado automaticaticame la primera vez que se emplea el archivo `manage.py`
  - `urls.py`: Configuración de las rutas del backend.
  - `wsgi.py`: Configuración para el despliegue en servidores WSGI.
- `posts/`: Carpeta de la aplicación principal.
  - `models.py`: Definición de modelos de datos.
  - `views.py`: Controladores que manejan la lógica de negocio.
  - `serializers.py`: Serializadores para convertir datos a/desde JSON.
  - `urls.py`: Configuración de rutas específicas de la aplicación.
  - `forms.py`: Formulario usado para la creación de los posts.
  - `templatetags/`: Tags personalizados para las plantillas de Django.
- `templates/`: Plantillas HTML utilizadas por el backend.
- `static_dev/`: Archivos estáticos generados o utilizados por Django.

### Frontend (Vue.js)
- `frontend/`: Carpeta principal del frontend.
  - `vite.config.ts`: Configuración de Vite para el proyecto Vue.js.
  - `package.json`: Lista de dependencias y scripts del frontend.
  - `src/`: Código fuente del frontend.
    - `api/`: Definición de funciones para consumir APIs del backend.
    - `components/`: Componentes reutilizables de Vue.js.
    - `views/`: Vistas principales de la aplicación.
    - `types/`: Definiciones de tipos TypeScript utilizadas en el proyecto.
    - `entrypoints/`: Archivos que actúan como puntos de entrada para hidratar las plantillas de Django.
      - Estos archivos son llamados directamente desde los templates usando la etiqueta `{% vue_tag %}`.
      - Ejemplo:
      ```html
      {% block script %}
          {{ block.super }}
          {% vue_tag 'postsList' %}
      {% endblock %}
      
      ```

### Integración entre Backend y Frontend
- **Hidratación** Los templates de Django incluyen etiquetas personalizadas para cargar los scripts generados por Vue.js desde la carpeta `/entrypoints/`, logrando la hidratación en el cliente.
- **APIs RESTful**: El backend expone endpoints que son consumidos por el frontend utilizando las funciones definidas en `/frontend/src/api/`.

# Simulación de Producción en Desarrollo
Para simular el entorno de producción durante el desarrollo:

1. Ejecuta el comando para construir el frontend:

```bash
npm run build
```
Esto generará los archivos JavaScript en el directorio `static_dev/js/`.

2. Usa el comando de Django para recopilar archivos estáticos:

```bash
python manage.py collectstatic
```
Esto consolidará todos los archivos estáticos en la carpeta `static/`.

3. Configura el entorno para probar con `DEBUG = False`. Edita el archivo `env.py`, que se genera automáticamente al usar `manage.py` por primera vez, y agrega:

```python
DEBUG = False
```
Inicia el servidor de desarrollo con la opción `--insecure`:

```bash
python manage.py runserver --insecure
```

Esta configuración permite probar el comportamiento del proyecto en un entorno similar al de producción.
