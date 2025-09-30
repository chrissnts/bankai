// Address.ts
import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  
  @column()
  declare street: string
  
  @column()
  declare city: string

  @column()
  declare houseNumber: string

  @column()
  declare state: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => User, { foreignKey: 'address_id' })
  declare user: HasOne<typeof User>
}
