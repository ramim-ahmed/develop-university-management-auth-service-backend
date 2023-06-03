import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
async function bootstrap() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    console.log('Database connected successfully!!!');
    app.listen(config.PORT, () => {
      console.log(`server listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(`internal server error ${error}`);
  }
}

bootstrap();
