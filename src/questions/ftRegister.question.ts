import { Question, QuestionSet } from 'nest-commander'

@QuestionSet({ name: 'task-questions' })
export class FtRegisterQuestions {
  @Question({
    message: 'What is the name of the fungible token you want to register?',
    name: 'name',
  })
  parseName(val: string) {
    return val
  }
  @Question({
    message: 'What is its genesis code?',
    name: 'genesis',
  })
  parseGenesis(val: string) {
    return val
  }
  @Question({
    message: 'What is its exchange rate?',
    name: 'exchangeRate',
  })
  parseExchangeRate(val: string) {
    return val
  }
}
