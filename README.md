# Desafío Práctico 3 - NovaTech Solutions

Proyecto individual desarrollado por **Sergio Salvador Sánchez Monti**  
Curso: Desarrollo Web con Frameworks (DWF404)

## 🧰 Tecnologías utilizadas
- Spring Boot 3
- Java 17
- H2 Database
- JSON Web Token (JWT)
- HTML, CSS y Bootstrap
- JavaScript (frontend puro)

## 🚀 Ejecución del proyecto
1. Clonar el repositorio.
2. Ejecutar el backend desde IntelliJ (`BackendApplication.java`).
3. Abrir el cliente (`frontend/index.html`) en el navegador.
4. Iniciar sesión con:
   - Usuario: admin  
   - Contraseña: admin123
5. Acceder al dashboard protegido.

## 📄 Descripción técnica
El backend expone un endpoint `/login` público que genera un token JWT al autenticar correctamente.  
El frontend almacena el token y lo utiliza para acceder a endpoints protegidos bajo la cabecera `Authorization: Bearer <token>`.
