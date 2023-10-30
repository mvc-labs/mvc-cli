import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HelloCommand } from './hello/hello.command'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, HelloCommand],
})
export class AppModule {}
