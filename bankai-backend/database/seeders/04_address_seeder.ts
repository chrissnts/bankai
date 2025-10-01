import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Address from '#models/address'
import User from '#models/user'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const users = await User.query().limit(5)
    const addresses = [
      { city: 'New York', state: 'NY', street: '5th Avenue', house_number: '1' },
      { city: 'Los Angeles', state: 'CA', street: 'Sunset Blvd', house_number: '100' },
      { city: 'Chicago', state: 'IL', street: 'Michigan Ave', house_number: '200' },
      { city: 'Houston', state: 'TX', street: 'Main St', house_number: '300' },
      { city: 'Phoenix', state: 'AZ', street: 'Central Ave', house_number: '400' },
    ]

    for (let i = 0; i < users.length; i++) {
      await Address.create({
        ...addresses[i],
        user_id: users[i].id,
      })
    }
  }
}