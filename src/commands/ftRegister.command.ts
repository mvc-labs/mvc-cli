import { Command, CommandRunner, InquirerService } from 'nest-commander'
import { readFile, writeFile } from 'fs'

@Command({
  name: 'ftRegister',
})
export class FtRegisterCommand extends CommandRunner {
  constructor(private readonly inquirer: InquirerService) {
    super()
  }
  async run(): Promise<void> {
    try {
      const answer = await this.inquirer.ask<{ task1: string; task2: string }>('task-questions', undefined)
      console.log('answer is', answer)
      const path = require.resolve('./tokenConfig.json')
      // const config = JSON.parse(readFileSync(path, 'utf8'))
      // config.push({ ...answer, codehash: 'a2421f1e90c6048c36745edd44fad682e8644693' })
      // writeFileSync(path, JSON.stringify(config, null, 2), 'utf8')
      readFile(path, 'utf8', (error, data) => {
        if (error) {
          console.log(error)
          return
        }
        const parsedData = JSON.parse(data)
        parsedData.push({ ...answer, codehash: 'a2421f1e90c6048c36745edd44fad682e8644693' })
        writeFile(path, JSON.stringify(parsedData, null, 2), (err) => {
          if (err) {
            console.log('Failed to write updated new ft config to file')
            return
          }
          console.log('Updated token config file successfully')
        })
      })
    } catch (error) {
      console.log('err', error)
    }
  }
}
