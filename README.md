# ZOTO-SERVER API REST en Node.js

Descripción de los diferentes endpoints, url de acceso y observaciones generales de cada uno.

## Endpoints

### Usuarios

#### GET

- **Recuperar contraseña**

  URL: `http://localhost:3000/api/users/password_recovery`

  Observaciones:

  - Requiere email

- **Obtener todos los usuarios**

  URL: `http://localhost:3000/api/users`

  Observaciones:

  - Requiere token

- **Obtener un usuario por su id**

  URL: `http://localhost:3000/api/users/:id`

  Observaciones:

  - Requiere token

#### POST

- **Crear un nuevo usuario**

  URL: `http://localhost:3000/api/users`

  Observaciones:

  - Requiere 4 campos y son obligatorios: `user_name`, `adress`, `email` y `user_password`

- **Iniciar sesión**

  URL: `http://localhost:3000/api/users/login`

  Observaciones:

  - Requiere campos y son obligatorios: `email` y `user_password`

#### PATCH

- **Actualizar contraseña de usuario**

  URL: `http://localhost:3000/api/users/update_password`

  Observaciones:

  - Requiere token
  - Requiere 1 campo obligatorio: `id` y `newPassword`

### Objetos

#### GET

- **Obtener todos los objetos**

  URL: `http://localhost:3000/api/objects`

  Observaciones:

  - Requiere token

- **Obtener un objeto por su id**

  URL: `http://localhost:3000/api/objects/:id`

  Observaciones:

  - Requiere token

#### POST

- **Crear un nuevo objecto**

  URL: `http://localhost:3000/api/objects`

  Observaciones:

  - Requiere 5 campos y son obligatorios: `userId`, `objectName`, `objectDescription`, `objectImage` y `quantity`

#### DELETE

- **Eliminar un objeto por su id**

  URL: `http://localhost:3000/api/objects/:id`

  Observaciones:

  - Requiere token

### Publicaciones

#### GET

- **Obtener todas las publicaciones**

  URL: `http://localhost:3000/api/publications`

  Observaciones:

  - Requiere token

- **Obtener todas las publicaciones de un usuario por su id**

  URL: `http://localhost:3000/api/publications_by_user/:id`

  Observaciones:

  - Requiere token

- **Obtener una publicación por su id**

  URL: `http://localhost:3000/api/publications/:id`

  Observaciones:

  - Requiere token

#### POST

- **Crear una nueva publicación**

  URL: `http://localhost:3000/api/publications`

  Observaciones:

  - Requiere 4 campos y son obligatorios: `userId`, `objectId`, `publicationDescription` y `createDate`
  - El formato para el campo createDate es el siguiente: `AAAA-MM-DD HH:MM:SS` ejemplo => `2023-11-20 21:26:00`

#### DELETE

- **Eliminar una publicación por su id**

  URL: `http://localhost:3000/api/publications/:id`

  Observaciones:

  - Requiere token
