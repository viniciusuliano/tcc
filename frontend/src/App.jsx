import { useState } from 'react';
import { Dashboard } from './presentation/pages/Dashboard';
import { Login } from './presentation/pages/Login';
import { AuthProvider } from './presentation/contexts/AuthContext';
import { OccurrenceRepositoryImpl } from './infrastructure/http/OccurrenceRepositoryImpl';
import { AuthRepositoryImpl } from './infrastructure/http/AuthRepositoryImpl';
import { GetOccurrences } from './application/use-cases/GetOccurrences';
import { GetOccurrenceStats } from './application/use-cases/GetOccurrenceStats';
import { Login as LoginUseCase } from './application/use-cases/Login';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const occurrenceRepository = new OccurrenceRepositoryImpl(API_URL);
const authRepository = new AuthRepositoryImpl(API_URL);

const getOccurrencesUseCase = new GetOccurrences(occurrenceRepository);
const getStatsUseCase = new GetOccurrenceStats(occurrenceRepository);
const loginUseCase = new LoginUseCase(authRepository);

function App() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <AuthProvider loginUseCase={loginUseCase}>
      {showLogin ? (
        <Login onLoginSuccess={() => setShowLogin(false)} />
      ) : (
        <Dashboard
          getOccurrencesUseCase={getOccurrencesUseCase}
          getStatsUseCase={getStatsUseCase}
          onLogout={() => setShowLogin(true)}
        />
      )}
    </AuthProvider>
  );
}

export default App;
