import { BasePolicy } from '@adonisjs/bouncer'
import type { AuthorizerResponse } from '@adonisjs/bouncer/types'
import User from '#models/user'
import { permissions } from '../utils/permissions.js'

export default class ClientPolicy extends BasePolicy {
 private getPerm(user: User | null) {
   if (!user) return null
     return permissions[user.paper_id] || null
   }
 
   list(user: User | null): AuthorizerResponse {
     const perm = this.getPerm(user)
     return perm ? perm.listAccounts : false
   }
 
   view(user: User | null): AuthorizerResponse {
     const perm = this.getPerm(user)
     return perm ? perm.viewAccount : false
   }
 
   create(user: User | null): AuthorizerResponse {
     const perm = this.getPerm(user)
     return perm ? perm.createAccount : false
   }
 
   edit(user: User | null): AuthorizerResponse {
     const perm = this.getPerm(user)
     return perm ? perm.editAccount : false
   }
 
   delete(user: User | null): AuthorizerResponse {
     const perm = this.getPerm(user)
     return perm ? perm.deleteAccount : false
   }
}
