import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('NEWS FEED TEST')
    .setDescription('NEWS FEED TEST')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  app.use(
    '/documentation',
    apiReference({
      spec: {
        content: document,
      },
    }),
  );
}
