import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Paper from '#models/paper'

export default class extends BaseSeeder {
  async run() {
    
     await Paper.createMany([
      {
        name: 'Admin',
      },
      {
        name: 'Client',
      },
    ])
  }
}