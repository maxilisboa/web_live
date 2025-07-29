# Seguimiento del Desarrollo - Web Seguros

## Última actualización: 28-02-2025

### Iteración Actual: 1 - Estructura Base

### Tareas en Progreso
- [ ] Optimización HTML
  - [ ] Revisar estructura semántica
  - [ ] Mejorar accesibilidad
  - [ ] Optimizar meta tags

- [ ] Mejoras CSS
  - [ ] Reorganizar estilos
  - [ ] Implementar variables CSS
  - [ ] Optimizar especificidad

- [ ] Responsive Design
  - [ ] Definir breakpoints
  - [ ] Implementar mobile-first
  - [ ] Testear en diferentes dispositivos

### Estructura Actual del Proyecto
C:\Live\web_live\
├── assets\
│   ├── css\
│   ├── js\
│   └── images\
├── index.html
├── project_info.md
└── progress.md

### Próximos Pasos
1. Completar tareas de Iteración 1
2. Preparar ambiente para Iteración 2
3. Documentar cambios realizados

### Notas de Desarrollo
- Mantener compatibilidad con futura integración Next.js
- Priorizar rendimiento y SEO
- Seguir mejores prácticas de PHP para el formulario

### Testing
- [ ] Cross-browser compatibility
- [ ] Responsive design
- [ ] Formulario de contacto
- [ ] Tiempo de carga


Estamos creando el login para comenzar con el cotizador on line

este es el prompt:
/*
🤖 PROYECTO: BACKEND COTIZADOR DE SEGUROS CON LOGIN Y DASHBOARD PROTEGIDO

OBJETIVO:
Construir un backend en Node.js + Express con sistema de login por sesiones,
rutas protegidas y un dashboard simple con links a otras herramientas (cotizador, simulador, comisiones).

TECNOLOGÍAS:
- Node.js
- Express
- express-session
- body-parser
- HTML + CSS básico para login y dashboard
- Archivo plano JSON como base de datos de usuarios (sin base de datos real por ahora)
- Preparado para deploy en Render.com (usar process.env.PORT)

ESTRUCTURA DE CARPETAS ESPERADA:

cotizador-backend/
├── /routes/
│   └── auth.js               # Maneja /auth/login y /auth/logout
├── /middleware/
│   └── authMiddleware.js     # Verifica sesión activa
├── /users/
│   └── usuarios.json         # Lista de usuarios autorizados
├── /public/
│   ├── login.html            # Formulario simple de login
│   ├── dashboard.html        # Vista protegida con menú
│   └── estilos.css           # (opcional)
├── .gitignore
├── package.json
├── server.js
└── README.md

FUNCIONALIDADES A IMPLEMENTAR:

1. Login por sesión:
   - Formulario HTML POST a /auth/login
   - Verifica email + contraseña contra usuarios.json
   - Si son válidos, guarda req.session.user
   - Si no, muestra mensaje de error

2. Middleware de autenticación:
   - Revisa que req.session.user exista
   - Si no está logueado, redirige a /login

3. Rutas:
   - GET /login → devuelve login.html
   - POST /auth/login → valida credenciales
   - GET /dashboard → protegido, devuelve dashboard.html
   - GET /auth/logout → destruye sesión y redirige a /login

4. Usuario ejemplo para pruebas:
   email: admin@cotizador.cl
   password: 123456

5. Archivo .gitignore debe ignorar node_modules/ y .env

6. El sistema debe ser compatible con Render.com:
   - Usar `process.env.PORT || 3000`
   - No hardcodear el puerto

7. Estilos opcionales en /public/estilos.css

RESULTADO ESPERADO:
- Cuando el usuario ingresa a /login y se loguea correctamente, accede a /dashboard
- En dashboard.html debe haber links a:
   - /cotizador.html
   - /simulador.html
   - /comisiones.html
   - /auth/logout

Copilot debe generar el backend completo basado en estas instrucciones.
*/
