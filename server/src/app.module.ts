import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CheckinsModule } from './checkins/checkins.module';
import { CheckoutsModule } from './checkouts/checkouts.module';
// import { RequestsModule } from './requests/requests.module';
// import { ResponsesModule } from './responses/responses.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: Number (process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: true,
      entities: ['dist/**/*.entity.js'],
    }),
    AuthModule,
    UsersModule,
    CheckinsModule,
    CheckoutsModule,
    // RequestsModule,
    // ResponsesModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}