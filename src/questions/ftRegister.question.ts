import { Question, QuestionSet } from 'nest-commander'

@QuestionSet({ name: 'ft_questions' })
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
    message: 'What is its decimal value?',
    name: 'decimal',
  })
  parseExchangeRate(val: string) {
    return val
  }
  @Question({
    message: 'What is its codehash(Hit enter to use the default value)?',
    name: 'codehash',
  })
  parseCodehash(val: string) {
    return val
  }
}
