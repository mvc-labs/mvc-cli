import { Command, CommandRunner, InquirerService } from 'nest-commander'
import { readFile, writeFile, access } from 'fs'
import { resolve } from 'path'
interface TaskBody {
  name: string
  genesis: string
  decimal: string
  codehash: string
}

const ftList = [
  {
    name: 'msp',
    genesis: 'b2d75931958114e48c9927160f80363eae78e2dc',
    decimal: '1e8',
    codehash: 'a2421f1e90c6048c36745edd44fad682e8644693',
  },
]

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
      const answer = await this.inquirer.ask<TaskBody>('ft_questions', undefined)
      const path = resolve(__dirname) + '/tokenRegister.json'
      access(path, (err) => {
        if (err) {
          writeFile(path, JSON.stringify(ftList), function (err_new) {
            if (err_new) throw err_new
            console.log('File <tokenRegister.json> is created')
          })
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
      // const path = require.resolve('./tokenConfig.json')
    } catch (error) {
      console.log('err', error)
    }
  }
}
