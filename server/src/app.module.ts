import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

const url = 'mongodb://localhost:27018/managetimeworking';

@Module({
  imports: [
    MongooseModule.forRoot(url,{useNewUrlParser: true, useUnifiedTopology: true }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
})

export class AppModule {}
