import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Account from '#models/account'
import User from '#models/user'
import Application from '#models/application'

export default class extends BaseSeeder {
  async run () {
    // Buscando usuários existentes para vincular as aplicações
    const users = await User.query().limit(5)
    // Buscando contas associadas aos usuários
    const accounts = await Account.query().whereIn('user_id', users.map(u => u.id))

    const applicationTypes = [
      'titulos do governo',
      'poupanca',
      'acao'
    ]

    
    for (const account of accounts) {
      for (const type of applicationTypes) {
        await Application.create({
          amount: Math.floor(Math.random() * 10000),
          type,
          account_id: account.id,
        })
      }
    }
  }
}
