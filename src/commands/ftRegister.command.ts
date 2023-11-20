import { Command, CommandRunner, InquirerService } from 'nest-commander'
import { readFile, writeFile, access } from 'fs'
import { resolve } from 'path'
interface TokenBody {
  name: string
  genesis: string
  decimal: string
  codehash: string
}

@Command({
  name: 'ft-register',
  description: 'A command for registering a fungible token, just answer the following series of questions.',
})
export class FtRegisterCommand extends CommandRunner {
  constructor(private readonly inquirer: InquirerService) {
    super()
  }
  async run(): Promise<void> {
    try {
      const answer = await this.inquirer.ask<TokenBody>('ft_questions', undefined)
      const path = resolve('./') + '/tokenRegister.json'
      console.log('register token to path: ', path)
      access(path, (err) => {
        if (err) {
          console.log('File <tokenRegister.json> is not created, Please run mvc-cli ft-usual-register')
        }
        readFile(path, 'utf8', (error, data) => {
          if (error) {
            console.log(error)
            return
          }
          const parsedData = JSON.parse(data)
          parsedData.push(answer)
          writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) {
              console.log('Failed to write updated new ft config to file')
              return
            }
            console.log('Updated token config file successfully')
          })
        })
      })
      // const path = require.resolve('./tokenRegister.json')
    } catch (error) {
      console.log('err', error)
    }
  }
}
