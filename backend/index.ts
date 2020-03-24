import http from 'http';
import enviroment from './src/config/enviroments';
import moment from 'moment';
import 'moment/locale/pt-br';
moment.locale('pt-br');
import app from './src/app';
import { normalizePort, onError, onListening } from './src/utils/utils';

const server = http.createServer(app);
const port = normalizePort(enviroment.serverPort);

console.log(`Servidor ativo com o modo ${process.env.NODE_ENV || 'development'}`);

server.listen(port);
server.on('error', onError(server));
server.on('listening', onListening(server));