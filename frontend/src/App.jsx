import { Dashboard } from './presentation/pages/Dashboard';
import { Login } from './presentation/pages/Login';
import { AuthProvider, useAuth } from './presentation/contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { OccurrenceRepositoryImpl } from './infrastructure/http/OccurrenceRepositoryImpl';
import { AuthRepositoryImpl } from './infrastructure/http/AuthRepositoryImpl';
import { GetOccurrences } from './application/use-cases/GetOccurrences';
import { GetOccurrenceStats } from './application/use-cases/GetOccurrenceStats';
import { UpdateOccurrenceStatus } from './application/use-cases/UpdateOccurrenceStatus';
import { Login as LoginUseCase } from './application/use-cases/Login';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const occurrenceRepository = new OccurrenceRepositoryImpl(API_URL);
const authRepository = new AuthRepositoryImpl(API_URL);

const getOccurrencesUseCase = new GetOccurrences(occurrenceRepository);
const getStatsUseCase = new GetOccurrenceStats(occurrenceRepository);
const updateOccurrenceStatusUseCase = new UpdateOccurrenceStatus(occurrenceRepository);
const loginUseCase = new LoginUseCase(authRepository);

function AppContent() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  return isAuthenticated() ? (
    <Dashboard
      getOccurrencesUseCase={getOccurrencesUseCase}
      getStatsUseCase={getStatsUseCase}
      updateOccurrenceStatusUseCase={updateOccurrenceStatusUseCase}
      occurrenceRepository={occurrenceRepository}
    />
  ) : (
    <Login />
  );
}

const TOAST_OPTIONS = {
  duration: 3000,
  style: {
    background: '#363636',
    color: '#fff',
  },
  success: {
    duration: 3000,
    iconTheme: {
      primary: '#4ade80',
      secondary: '#fff',
    },
  },
  error: {
    duration: 4000,
    iconTheme: {
      primary: '#ef4444',
      secondary: '#fff',
    },
  },
};

function App() {
  return (
    <AuthProvider loginUseCase={loginUseCase}>
      <Toaster position="top-right" toastOptions={TOAST_OPTIONS} />
      <AppContent />
    </AuthProvider>
  );
}

export default App;
