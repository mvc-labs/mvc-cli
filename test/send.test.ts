import { TestingModule } from '@nestjs/testing'
import { AppModule } from 'src/app.module'
import { CommandTestFactory } from 'nest-commander-testing'
describe('Task Command', () => {
  let commandInstance: TestingModule

  beforeAll(async () => {
    commandInstance = await CommandTestFactory.createTestingCommand({
      imports: [AppModule],
    }).compile()
  })

  it('should get the right balance', async () => {})
})
