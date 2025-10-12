import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'


export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
   await User.createMany([
      {
        fullName: 'Admin',
        email: 'admin@gmail.com',
        password: '123',
        cpf: '000.000.000-00',
        paper_id: 1,
      },
      {
        fullName: 'Test User 1',
        email: 'test01@gmail.com',
        password: '123',
        cpf: '000.000.000-01',
        paper_id: 2,
      },
      {
        fullName: 'Test User 2',
        email: 'test02@gmail.com',
        password: '123',
        cpf: '000.000.000-02',
        paper_id: 2,
      },
     {
        fullName: 'Test User 3',
        email: 'test03@gmail.com',
        password: '123',
        cpf: '000.000.000-03',
        paper_id: 2,
      },

    ])
  }
}