import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlebarsAdapter, MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CheckinsModule } from './checkins/checkins.module';
import { CheckoutsModule } from './checkouts/checkouts.module';
import { LogsModule } from './logs/logs.module';
import { RequestsModule } from './requests/requests.module';
import { ResponsesModule } from './responses/responses.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TimesModule } from './times/times.module';
import { LeavesModule } from './leaves/leaves.module';
import { ChecksModule } from './checks/checks.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

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
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        tls: {
          ciphers: 'SSLv3',
        },
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ID, // generated ethereal user
          pass: process.env.EMAIL_PASS, // generated ethereal password
        },
        // logger: true,
        // debug: true 
      },
      defaults: {
        from:'"Linh Bui" <linhbq.intern@gmail.com>',
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    UsersModule,
    CheckinsModule,
    CheckoutsModule,
    LogsModule,
    RequestsModule,
    ResponsesModule,
    AdminModule,
    TimesModule,
    LeavesModule,
    ChecksModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})

export class AppModule {}