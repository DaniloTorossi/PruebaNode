
import { createServer } from "http";

const server = createServer((req, res) => {
    res.end('Prueba de servidor')});
    server.listen(8080,() => {ç
    console.log('Servidor corriendo en el puerto 8080');});