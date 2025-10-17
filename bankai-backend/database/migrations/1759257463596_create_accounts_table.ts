import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'accounts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // id vai ser usado como account_number pq assim da pra fazer auto increment no numero da conta (melhor solução que pensei)
      table.decimal('balance', 12, 2).notNullable().defaultTo(0)
      table.string('agency').notNullable()
      table.boolean('is_active').notNullable().defaultTo(true)
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
