export const EmptyState = ({ statusFilter, priorityFilter, onClearFilters }) => {
    const hasActiveFilters = statusFilter !== 'all' || priorityFilter !== 'all';

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                {/* Ícone */}
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <svg 
                        className="w-12 h-12 text-gray-400" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                    </svg>
                </div>

                {/* Mensagem */}
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {hasActiveFilters ? 'Nenhuma ocorrência encontrada' : 'Nenhuma ocorrência cadastrada'}
                </h3>
                
                <p className="text-gray-600 mb-6">
                    {hasActiveFilters 
                        ? 'Não encontramos ocorrências com os filtros aplicados. Tente ajustar os filtros ou limpar a busca.'
                        : 'Ainda não há nenhuma ocorrência cadastrada no sistema.'}
                </p>

                {/* Botão para limpar filtros */}
                {hasActiveFilters && (
                    <button
                        onClick={onClearFilters}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                            />
                        </svg>
                        Limpar Filtros
                    </button>
                )}
            </div>
        </div>
    );
};
