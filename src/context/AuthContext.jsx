import React, { useState, createContext, useEffect } from 'react'
import { currentUser, loginService, registerService, logoutService } from '@/services/auth.service'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [settingsConfigured, setSettingsConfigured] = useState(false)
  const [loading, setLoading] = useState(true)


  const checkAuth = async () => {
    try {
      const response = await currentUser();
      setUser(response.data)
      setSettingsConfigured(response.onboarding?.settingsConfigured ?? false)
    } catch (error) {
      setUser(null);
      setSettingsConfigured(false);
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
    const response = await registerService(userData);
    if(response?.success){
      await checkAuth();
    }
    return response;
  }

  const logout = async () => {
    await logoutService();
    setUser(null);
    setSettingsConfigured(false);
  }

  useEffect(() => {
    checkAuth();
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user,
        settingsConfigured,
        setSettingsConfigured,
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