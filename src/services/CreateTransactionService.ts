import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type !== 'income' && type !== 'outcome') {
      throw new Error("Only 'income ' and 'outcome' types are permitted");
    }
    if (type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();
      if (value > balance.total) {
        /* Return error if you have more outcomes than incomes  */
        throw Error('Insuficient founds');
      }
    }
    /* Create a Transaction */
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
