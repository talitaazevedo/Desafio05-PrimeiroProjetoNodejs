import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface GetBalance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    /* Calculate balance */
    const incomeSoma = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, t) => acc + t.value, 0);
    const outcomeSoma = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((acc, t) => acc + t.value, 0);

    const result = incomeSoma - outcomeSoma;
    /* return a object  */
    return {
      income: incomeSoma,
      outcome: outcomeSoma,
      total: result,
    };
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
