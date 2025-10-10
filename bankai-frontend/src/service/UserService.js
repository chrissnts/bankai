// Função para obter o usuário do localStorage
const getDataUser = () => {
  const data = localStorage.getItem('data_user')
  if(data) return JSON.parse(data)
  return data
}

// Função para salvar o usuário no localStorage
const setDataUser = (user) => {
  localStorage.setItem('data_user', JSON.stringify(user))
}

// Função para remover o usuário do localStorage
const removeDataUser = () => {
  localStorage.removeItem('data_user')
}

export { getDataUser, setDataUser, removeDataUser }