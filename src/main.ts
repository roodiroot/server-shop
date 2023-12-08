import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as path from 'path';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const PORT = process.env.PORT || 5001
    app.enableCors({
      origin: ["http://localhost:3000"],
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true
    });
    app.use(cookieParser())
    app.useStaticAssets(path.join(__dirname, "..", "static"))
    app.setGlobalPrefix('api')
    await app.listen(PORT);
}
bootstrap();
