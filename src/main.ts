import { NestFactory } from '@nestjs/core';

import { MainModule } from './modules/main.module';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  if (process.env.MODE !== 'prod') setupSwagger(app);

  await app.listen(3000);
}
bootstrap();
