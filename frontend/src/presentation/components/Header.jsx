import { useAuth } from '../contexts/AuthContext';
import logo from '../../assets/ifc-logo.png';

export const Header = ({ onLogout }) => {
    const { administrator, isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout(() => {
            if (onLogout) onLogout();
        });
    };

    return (
        <header className="bg-white border-b border-gray-200">
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img src={logo} alt="Instituto Federal Catarinense" className="h-16" />
                    <div>
                        <h1 className="text-lg font-semibold text-gray-800">Sistema de controle de infraestrutura</h1>
                    </div>
                </div>

                {isAuthenticated() && (
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-800">{administrator?.nome}</p>
                            <p className="text-xs text-gray-600">{administrator?.role}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                        >
                            Sair
                        </button>
                    </div>
                )}

                {!isAuthenticated() && (
                    <div className="text-sm text-gray-600">
                        Modo Visitante
                    </div>
                )}
            </div>
        </header>
    );
};

