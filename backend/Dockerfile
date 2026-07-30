# ==========================================
# Etapa 1: Construcción (Build)
# ==========================================
FROM maven:3.9.6-eclipse-temurin-21-jammy AS builder
WORKDIR /app

# 1. Copiamos el archivo de configuración de Maven
COPY pom.xml .

# 2. Descargamos las dependencias (Esto se cachea para que los builds sean más rápidos)
RUN mvn dependency:go-offline -B

# 3. Copiamos el código fuente de la aplicación
COPY src ./src

# 4. Compilamos el proyecto y creamos el archivo .jar ejecutable
RUN mvn clean package -DskipTests

# ==========================================
# Etapa 2: Ejecución (Run)
# ==========================================
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app

# 1. Copiamos ÚNICAMENTE el archivo .jar desde la etapa de construcción
COPY --from=builder /app/target/*.jar app.jar

# 2. Exponemos el puerto que usa Spring Boot (8080)
EXPOSE 8080

# 3. Comando para ejecutar la aplicación al iniciar el contenedor
ENTRYPOINT ["java", "-jar", "app.jar"]
