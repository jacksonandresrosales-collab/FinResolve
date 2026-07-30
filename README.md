# FinResolve

Plataforma para la gestión y priorización de reclamos financieros — **Banco Horizonte**.

MVP web que permite registrar, priorizar automáticamente, asignar, dar seguimiento y visualizar reclamos de clientes, con tablero operativo y alertas de SLA.

---

## Arquitectura y Tecnologías

```
React (Next.js) ──HTTP/JSON──> Java (Spring Boot) ──SQL/ORM──> MySQL
```

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Frontend | Next.js (App Router) + Tailwind CSS | 15.x |
| Backend | Spring Boot + Spring Data JPA | 3.4.x |
| Base de datos | MySQL | 8+ |
| Migraciones | Flyway | — |
| API Docs | SpringDoc OpenAPI (Swagger UI) | — |
| Build | Maven + npm | — |
| Gráficos | Recharts | — |

---

## Requisitos Previos

- **Java 21** (JDK)
- **Node.js 18+** y npm
- **MySQL 8.0+**
- **Maven 3.9+**

---

## Variables de Entorno

El backend se configura via `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/finresolve_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=tu_password
```

El frontend usa (opcional):

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

---

## Creación y Carga de MySQL

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS finresolve_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

Las tablas se crean automáticamente via Flyway al iniciar el backend.

---

## Comandos para Ejecutar

### Backend

```bash
cd backend
mvn spring-boot:run
```

API disponible en `http://localhost:8080/api`
Swagger UI: `http://localhost:8080/api/swagger-ui.html`

### Frontend

```bash
cd frontend
npm install
npx next dev -p 3000
```

App disponible en `http://localhost:3000`

---

## Ejecución de Pruebas

```bash
cd backend
mvn test
```

Cobertura mínima:
- Cálculo de prioridad (puntaje y nivel según reglas)
- Cálculo de fecha límite SLA
- Transiciones de estado válidas e inválidas

---

## Usuarios / Datos de Demostración

Los datos se cargan via Flyway (seed). Usuarios disponibles:

| Usuario | Persona | Roles |
|---------|---------|-------|
| mgalarza | María Galarza | ADMINISTRADOR, OPERADOR |
| cloor | Carlos Loor | OPERADOR |
| jocana | Jessica Ocaña | ANALISTA |
| bajana | Freddy Bajaña | ANALISTA, SUPERVISOR |

> Todos los datos son ficticios. No usar nombres, cédulas ni cuentas reales.

---

## Limitaciones y Decisiones Técnicas

- **Sin autenticación real**: se simula el usuario activo mediante un selector (UserSelector) como indica el brief.
- **Sin Spring Security**: no es necesario al no haber login real.
- **Frontend en Next.js**: se eligió App Router para escalabilidad futura.
- **Catalogo de categorías, canales y SLA en BD**: no hardcodeados en Java, permitiendo cambios sin recompilar.
- **Roles N:M**: tabla intermedia `usuario_rol` para permitir múltiples roles por usuario.

---

## Integrantes y Contribuciones

| Integrante | Contribución principal |
|------------|----------------------|
| Freddy Bajaña | Backend, reglas de negocio, BD |
| — | Frontend, componentes, UI |
| — | Datos, calidad, pruebas |

---

## Licencia

Proyecto académico — Carrera de Software, Universidad de Guayaquil.
