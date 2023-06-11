import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';
import { errorLogger, infoLogger } from './shared/logger';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;
async function bootstrap() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    infoLogger.info('Database connected successfully!!!');

    server = app.listen(config.PORT, () => {
      infoLogger.info(`server listening on port ${config.PORT}`);
    });
  } catch (error) {
    errorLogger.error(`internal server error ${error}`);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  infoLogger.info('SIGTERM IS RECEVIED');
  if (server) {
    server.close();
  }
});
