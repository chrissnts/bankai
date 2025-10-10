// Função para obter as permissões do localStorage
const getPermissions = () => {
  const data = localStorage.getItem('permissions')
  if(data) return JSON.parse(data)
  return data
}

// Função para salvar as permissões no localStorage
const setPermissions = (perm) => {
  localStorage.setItem('permissions', JSON.stringify({ ...perm }))
}

// Função para remover as permissões do localStorage
const removePermissions = () => {
  localStorage.removeItem('permissions')
}

export { getPermissions, setPermissions, removePermissions }