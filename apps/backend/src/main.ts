import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './common/configurations';
import { CorsConfig } from './common/configurations/cors.config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors(CorsConfig.getCorsOptions());
  SwaggerConfig.setUp(app)
  const PORT = process.env.PORT;
  await app.listen(PORT || 8080);
}

bootstrap();
