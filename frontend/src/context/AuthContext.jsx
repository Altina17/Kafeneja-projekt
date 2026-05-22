import { createContext, useContext, useState, useEffect } from 'react';
import API, { setAccessToken } from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Rinderto sesionin kur faqja rifrekohet
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRefresh = localStorage.getItem('refreshToken');

    if (savedUser && savedRefresh) {
      setUser(JSON.parse(savedUser));
      API.post('/auth/refresh', { refreshToken: savedRefresh })
        .then(res => {
          setAccessToken(res.data.accessToken);
          if (res.data.refreshToken) {
            localStorage.setItem('refreshToken', res.data.refreshToken);
          }
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem('user');
          localStorage.removeItem('refreshToken');
        });
    }
  }, []);

  const login = async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    setAccessToken(res.data.accessToken);
    setUser(res.data.user);
    localStorage.setItem('refreshToken', res.data.refreshToken);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) await API.post('/auth/logout', { refreshToken });
    } catch {}
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);