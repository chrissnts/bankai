import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Account from '#models/account'
import Transaction from '#models/transaction'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const accounts = await Account.query().limit(5)

    const transactionTypes = ['deposit', 'pix', 'transfer']

    for (let i = 0; i < accounts.length; i++) {
      for (let j = 0; j < 3; j++) {
        await Transaction.create({
          amount: Math.floor(Math.random() * 1000) + 51,
          type: transactionTypes[j % transactionTypes.length],
          account_id: accounts[i].id,
        })
      }
    }
  }
}
