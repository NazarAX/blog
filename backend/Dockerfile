# ---- build stage (Java 25 JDK) ----
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

# Pre-copy gradle wrapper and build files to leverage Docker cache for deps
COPY gradlew gradle/ ./
COPY settings.gradle build.gradle ./

# Make wrapper executable and pre-fetch dependencies (no source yet)
RUN chmod +x gradlew \
 && ./gradlew --no-daemon dependencies || true

# Now copy source and build the fat jar
COPY src ./src
COPY gradlew ./
COPY gradle/wrapper/ ./gradle/wrapper/
RUN ./gradlew --no-daemon clean bootJar

# ---- runtime stage (Java 25 JRE) ----
FROM eclipse-temurin:25-jre
WORKDIR /app

# Sensible container defaults
ENV JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=70 -XX:+UseG1GC -Dfile.encoding=UTF-8"

# Copy the boot jar
COPY --from=build /app/build/libs/*.jar /app/app.jar

EXPOSE 8080

# (optional) requires spring-boot-starter-actuator
HEALTHCHECK --interval=30s --timeout=3s --retries=5 \
  CMD wget -qO- http://127.0.0.1:8080/actuator/health || exit 1

ENTRYPOINT ["java","-jar","/app/app.jar"]
