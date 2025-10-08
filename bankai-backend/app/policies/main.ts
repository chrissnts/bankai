/*
|--------------------------------------------------------------------------
| Bouncer policies
|--------------------------------------------------------------------------
|
| You may define a collection of policies inside this file and pre-register
| them when creating a new bouncer instance.
|
| Pre-registered policies and abilities can be referenced as a string by their
| name. Also they are must if want to perform authorization inside Edge
| templates.
|
*/

export const policies = {
  AccountPolicy: () => import('#policies/transaction_policy'),
  ClientPolicy: () => import('#policies/client_policy'),
  TransactionPolicy: () => import('#policies/transaction_policy'),
  InvestmentPolicy: () => import('#policies/investment_policy'),
}