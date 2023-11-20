import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HelloCommand } from './commands/hello.command'
import { SendCommand } from './commands/send.command'
import { GetbalanceCommand } from './commands/getBalance.command'
import { FtTransferCommand } from './commands/ftTransfer.command'
import { FtRegisterCommand } from './commands/ftRegister.command'
import { FtRegisterQuestions } from './questions/ftRegister.question'
import { InitCommand } from './commands/init.command'
import { InitQuestions } from './questions/init.question'
import { GetFtBalanceCommand } from './commands/getFtBalance.command'
import { GetNftCollectionCommand } from './commands/getNftCollection.command'
import { GetAddressCommand } from './commands/getAddress.command'
import { FtUsualRegisterCommand } from './commands/ftUsualRegister.command'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    HelloCommand,
    SendCommand,
    GetAddressCommand,
    GetbalanceCommand,
    GetFtBalanceCommand,
    GetNftCollectionCommand,
    FtUsualRegisterCommand,
    FtTransferCommand,
    FtRegisterCommand,
    FtRegisterQuestions,
    InitCommand,
    InitQuestions,
  ],
})
export class AppModule {}
