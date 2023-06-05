import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { errorLogger, infoLogger } from './app/shared/logger';
async function bootstrap() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    infoLogger.info('Database connected successfully!!!');
    app.listen(config.PORT, () => {
      infoLogger.info(`server listening on port ${config.PORT}`);
    });
  } catch (error) {
    errorLogger.error(`internal server error ${error}`);
  }
}

bootstrap();
