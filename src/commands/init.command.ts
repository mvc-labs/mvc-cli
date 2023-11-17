import { Command, CommandRunner, InquirerService } from 'nest-commander'
import { writeFile } from 'fs'
import { resolve } from 'path'

interface InitBody {
  memonic: string
  accountPath: string
  network: string
}

@Command({
  name: 'init',
  description: 'A command for initiating your wallet account.',
})
export class InitCommand extends CommandRunner {
  constructor(private readonly inquirer: InquirerService) {
    super()
  }
  async run(): Promise<void> {
    try {
      const answer = await this.inquirer.ask<InitBody>('init_questions', undefined)
      const path = resolve('./') + '/account.json'
      writeFile(path, JSON.stringify(answer, null, 2), (err) => {
        if (err) {
          console.log('Failed to write wallet account config to file')
          return
        }
        console.log('Updated wallet account config file successfully')
      })
    } catch (error) {
      console.log('err', error)
    }
  }
}
