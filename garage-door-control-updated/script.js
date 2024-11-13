// Conexión con el servidor MQTT usando WebSocket
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("toggle-door");
    const statusText = document.getElementById("status");

    // Cambia esta URL al broker MQTT que estés usando
    const client = mqtt.connect("wss://broker.hivemq.com:8000/mqtt");

    client.on("connect", () => {
        console.log("Conectado al servidor MQTT");
        statusText.textContent = "Estado: Conectado";
    });

    client.on("error", (error) => {
        console.error("Error de conexión:", error);
        statusText.textContent = "Estado: Error de conexión";
    });

    button.addEventListener("click", () => {
        if (client.connected) {
            client.publish("garage/door", "toggle");
            console.log("Mensaje enviado para abrir/cerrar la puerta");
            statusText.textContent = "Mensaje enviado: Abrir/Cerrar Puerta";
        } else {
            console.log("No conectado al servidor MQTT");
            statusText.textContent = "Estado: No conectado";
        }
    });
});