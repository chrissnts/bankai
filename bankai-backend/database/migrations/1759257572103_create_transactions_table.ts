import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.decimal('amount', 12, 2).notNullable()
      table.string('type').notNullable() 
      table.integer('account_id').unsigned().references('id').inTable('accounts').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}