import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: '*', // Hoặc liệt kê các domain cụ thể
    methods: 'GET,POST,PUT,DELETE',
  };
  app.enableCors(corsOptions);
  app.enableCors()
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    console.log('Step 4: serializeUser', user);
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    console.log('id', id);
    done(null, id);
  });
  console.log(`NestJS v2 đang chạy trên port 3001`);
  await app.listen(3001);
}
bootstrap();
