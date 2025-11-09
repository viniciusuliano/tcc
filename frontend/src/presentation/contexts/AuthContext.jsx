import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children, loginUseCase }) => {
    const [administrator, setAdministrator] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedAdmin = localStorage.getItem('administrator');

        if (storedToken && storedAdmin) {
            setToken(storedToken);
            setAdministrator(JSON.parse(storedAdmin));
        }
        setLoading(false);
    }, []);

    const login = async (email, senha) => {
        try {
            const result = await loginUseCase.execute(email, senha);
            setToken(result.token);
            setAdministrator(result.administrator);

            localStorage.setItem('token', result.token);
            localStorage.setItem('administrator', JSON.stringify(result.administrator));

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = (callback) => {
        setToken(null);
        setAdministrator(null);
        localStorage.removeItem('token');
        localStorage.removeItem('administrator');
        if (callback) callback();
    };

    const isAuthenticated = () => {
        return !!token && !!administrator;
    };

    return (
        <AuthContext.Provider value={{ administrator, token, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

