// Transaction.ts
import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Account from './account.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare amount: number

  @column()
  declare type: string

  @column()
  declare account_id: number

  @belongsTo(() => Account, { foreignKey: 'account_id' })
  declare account: BelongsTo<typeof Account>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
