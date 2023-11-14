import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HelloCommand } from './hello/hello.command'
import { SendCommand } from './hello/send.command'
import { GetbalanceCommand } from './hello/getbalance.command'
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, HelloCommand, SendCommand, GetbalanceCommand],
})
export class AppModule {}
