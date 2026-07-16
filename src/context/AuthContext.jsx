import React, { createContext, useEffect } from 'react'
import { currentUser, loginService, registerService, logoutService } from '@/services/auth.service'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)


  const checkAuth = async () => {
    try {
      const response = await currentUser();
      setUser(response.data)
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    const response = await loginService(credentials);

    if (response?.success) {
      await checkAuth();
    }

    return response;
  }

  const signup = async (userData) => {
    await registerService(userData);
    await checkAuth();
  }

  const logout = async () => {
    await logoutService();
    setUser(null);
  }

  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        checkAuth,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }
export default AuthContext