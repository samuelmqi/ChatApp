export const isAuthenticated = () => {
  const token = localStorage.getItem('user-jwt')

  if (token) {
    return true
  }
  return false
}
