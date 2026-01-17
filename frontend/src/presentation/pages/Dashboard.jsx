import { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { StatCard } from '../components/StatCard';
import { OccurrenceCard } from '../components/OccurrenceCard';
import { FilterDropdown } from '../components/FilterDropdown';
import { Pagination } from '../components/Pagination';
import { useOccurrencesWithFilters } from '../hooks/useOccurrencesWithFilters';

import { useAuth } from '../contexts/AuthContext';

export const Dashboard = ({ getOccurrencesUseCase, getStatsUseCase }) => {
    const { logout } = useAuth();
    const [statusFilter, setStatusFilter] = useState('all');
    const [priorityFilter, setPriorityFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filters = useMemo(() => ({
        status: statusFilter,
        prioridade: priorityFilter,
        page: currentPage,
        limit: itemsPerPage
    }), [statusFilter, priorityFilter, currentPage]);

    const { occurrences, totalPages, stats, loading, error } = useOccurrencesWithFilters(
        getOccurrencesUseCase,
        getStatsUseCase,
        filters
    );

    const handleStatusChange = (value) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const handlePriorityChange = (value) => {
        setPriorityFilter(value);
        setCurrentPage(1);
    };

    const displayStats = stats || {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0
    };

    const displayOccurrences = occurrences;
    const displayTotalPages = totalPages;

    return (
        <div className="min-h-screen bg-gray-50">
            <Header onLogout={logout} />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total de problemas"
                        value={displayStats.total}
                        icon={
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        }
                        bgColor="bg-red-500"
                    />
                    <StatCard
                        title="Pendentes"
                        value={displayStats.pending}
                        icon={
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        bgColor="bg-yellow-100"
                    />
                    <StatCard
                        title="Em progresso"
                        value={displayStats.inProgress}
                        icon={
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        }
                        bgColor="bg-blue-400"
                    />
                    <StatCard
                        title="Concluídas"
                        value={displayStats.completed}
                        icon={
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        bgColor="bg-green-500"
                    />
                </div>

                <div className="flex gap-4 mb-6">
                    <FilterDropdown
                        label="Status"
                        value={statusFilter}
                        onChange={handleStatusChange}
                        options={[
                            { value: 'all', label: 'Todos' },
                            { value: 'Pendente', label: 'Pendente' },
                            { value: 'Em Andamento', label: 'Em Andamento' },
                            { value: 'Concluída', label: 'Concluída' }
                        ]}
                    />
                    <FilterDropdown
                        label="Prioridade"
                        value={priorityFilter}
                        onChange={handlePriorityChange}
                        options={[
                            { value: 'all', label: 'Todas' },
                            { value: 'Crítica', label: 'Crítica' },
                            { value: 'Alta', label: 'Alta' },
                            { value: 'Média', label: 'Média' },
                            { value: 'Baixa', label: 'Baixa' }
                        ]}
                    />
                </div>

                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {displayOccurrences.map((occurrence) => (
                            <OccurrenceCard key={occurrence.id} occurrence={occurrence} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={displayTotalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </main>
        </div>
    );
};

