FROM openjdk:17
WORKDIR /app
COPY . /app
RUN ./gradlew build
CMD ["java", "-jar", "build/libs/TelegramAIBot.jar"]
