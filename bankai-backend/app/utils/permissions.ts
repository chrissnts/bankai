export const permissions = [
  // 0 - ADMIN / GERENTE
  {
    authenticate: true,
    viewProfile: true,
    createAccount: true, // pode criar contas correntes
    makeTransfer: false, // não realiza transferências pessoais
    checkBalance: false, // não consulta saldo de clientes
    viewStatement: true, // pode ver extratos de clientes
    makeInvestment: false, // não faz aplicações
    manageClients: true, // pode cadastrar e gerenciar clientes
    manageAccounts: true, // pode criar/editar/remover contas
  },
  // 1 - CLIENTE
  {
    authenticate: true,
    viewProfile: true,
    createAccount: false, // cliente não cria conta manualmente
    makeTransfer: true, // pode transferir
    checkBalance: true, // pode ver saldo
    viewStatement: true, // pode ver extrato
    makeInvestment: true, // pode aplicar dinheiro
    manageClients: false, // não pode cadastrar outros clientes
    manageAccounts: false, // não pode criar/editar contas
  },
]
