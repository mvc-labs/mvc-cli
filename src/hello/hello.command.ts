import { Command, CommandRunner } from 'nest-commander'

@Command({
  name: 'hello',
  options: { isDefault: true },
})
export class HelloCommand extends CommandRunner {
  async run(inputs: string[], options: Record<string, any>): Promise<void> {
    console.log('Hello World!')
  }
}
