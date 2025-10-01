import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Account from '#models/account'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
      const users = await User.query().limit(5)
      for (let i = 0; i < users.length; i++) {
      await Account.create({
        account_number: 1000 + i, 
        balance: 0, 
        agency: '0001', 
        isActive: true,
        user_id: users[i].id, 
      })
  }
}
}