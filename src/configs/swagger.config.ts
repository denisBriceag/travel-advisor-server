import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Travel Advisor')
  .setDescription('Travel Advisor')
  .setVersion('0.1')
  .build();
