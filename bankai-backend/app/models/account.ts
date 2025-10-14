import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Transaction from '#models/transaction'
import User from './user.js'
import Application from '#models/application'

export default class Account extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare account_number: string

  @column()
  declare balance: number

  @column()
  declare agency: string

  @column()
  declare isActive: boolean

  @column()
  declare user_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'user_id' })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Transaction, { foreignKey: 'account_id' })
  declare transactions: HasMany<typeof Transaction>

  @hasMany(() => Application, { foreignKey: 'account_id' })
  declare applications: HasMany<typeof Application>
}