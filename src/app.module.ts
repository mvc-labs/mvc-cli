import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HelloCommand } from './commands/hello.command'
import { SendCommand } from './commands/send.command'
import { GetbalanceCommand } from './commands/getbalance.command'
import { FtTransferCommand } from './commands/ftTransfer.command'
import { FtRegisterCommand } from './commands/ftRegister.command'
import { FtRegisterQuestions } from './questions/ftRegister.question'
@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    HelloCommand,
    SendCommand,
    GetbalanceCommand,
    FtTransferCommand,
    FtRegisterCommand,
    FtRegisterQuestions,
  ],
})
export class AppModule {}
