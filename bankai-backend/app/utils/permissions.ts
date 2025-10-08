export const permissions = [
  // 0 - ADMIN / GERENTE
  {
  
    
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

  // 1 - CLIENTE
  {
    

    
    listClients: false,
    viewClient: false,
    createClient: false,
    editClient: false,
    deleteClient: false,

    
    listAccounts: false,
    viewAccount: true, // pode ver suas próprias contas
    createAccount: false,
    editAccount: false,
    deleteAccount: false,

    
    listTransactions: true, // extrato
    viewStatement: true,
    makeTransfer: true,
    checkBalance: true,

    
    makeInvestment: true,
    viewInvestment: true, // ver extrato/investimentos próprios
  },
]
