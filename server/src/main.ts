import * as process from 'node:process';
import * as config from 'config';
import { createApp } from './app-bootstrap';

const HOST = config.get('host');
const PORT = config.get('port');

async function bootstrap() {
  const app = await createApp();

  console.log(`Server starting up on ${HOST ? HOST + ':' + PORT : PORT}`);
  if (HOST) {
    await app.listen(PORT, HOST);
  } else {
    await app.listen(PORT);
  }
}

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection', err);
});

bootstrap();
