import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { writeFileSync } from "fs";
import path = require('path');
import express from 'express';
import swaggerUi from 'swagger-ui-express';
//import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../src/swaggerDocs/one/swagger.json';
import swaggerSpecJson from '../src/swaggerDocs/two/swagger-spec.json';
const read = require("fs-readdir-recursive");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**const config = new DocumentBuilder()
  .setTitle('Booking App')
  .setDescription('Booking API description')
  .setVersion('0.0.1')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  const outputPath = path.resolve(process.cwd(), 'swagger.json');
  writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8'});
  **/


  /**const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
      },
      servers: [
        {
          url: "http://localhost:8080",
        },
      ],
    },
    apis: ["./src/assignBooking/*.js"],
  };

  const specs = swaggerJsDoc(options);
  **/

  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecJson));


  await app.listen(8080);

  const foundFiles = read("swagger");
  console.log(foundFiles);


}

bootstrap();
