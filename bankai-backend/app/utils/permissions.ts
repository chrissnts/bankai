export const permissions = [
  null, 
  {
    // ID 1, Admin/Gerente
    listClients: true,
    viewClient: true,
    createClient: true,
    editClient: true,
    deleteClient: true,

    listAccounts: true,
    viewAccount: true,
    createAccount: true,
    editAccount: true,
    deleteAccount: true,

    listTransactions: true,
    viewStatement: true,

    makeTransfer: false,
    checkBalance: false,
    makeInvestment: false,
    viewInvestment: true,
  },
  {
    // ID 2, Client
    listClients: false,
    viewClient: false,
    createClient: false,
    editClient: false,
    deleteClient: false,

    listAccounts: false,
    viewAccount: true,
    createAccount: false,
    editAccount: false,
    deleteAccount: false,

    listTransactions: true,
    viewStatement: true,
    
    makeTransfer: true,
    checkBalance: true,
    makeInvestment: true,
    viewInvestment: true,
  }
]
