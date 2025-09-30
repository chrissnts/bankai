import { BaseSchema } from '@adonisjs/lucid/schema'


export default class extends BaseSchema {
  public async up() {
    this.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.string('cpf').notNullable()
      table.string('full_name')
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.integer('papers_id').unsigned().references('id').inTable('papers')
      table.integer('accounts_id').unsigned().references('id').inTable('accounts')
      table.integer('address_id').unsigned().references('id').inTable('addresses')
      table.timestamps(true, true)
    })
  }

  public async down() {
    this.schema.dropTable('users')
  }
}


