import { useState } from 'react';

export const OccurrenceCard = ({ occurrence, onViewDetails }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const priorityColors = {
        Crítica: 'bg-red-600',
        Alta: 'bg-orange-500',
        Alto: 'bg-orange-500',
        Média: 'bg-yellow-500',
        Médio: 'bg-yellow-500',
        Baixa: 'bg-green-500',
        Baixo: 'bg-green-500'
    };

    const statusColors = {
        'Pendente': 'bg-yellow-100 text-yellow-800',
        'Em Andamento': 'bg-blue-100 text-blue-800',
        'Concluída': 'bg-green-100 text-green-800'
    };

    const truncateText = (text, maxLength = 60) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="relative">
                <img
                    src={occurrence.imageUrl}
                    alt={occurrence.title}
                    className="w-full h-48 object-cover"
                />
                <span className={`absolute top-3 right-3 ${priorityColors[occurrence.priority]} text-white px-3 py-1 rounded text-sm font-semibold`}>
                    {occurrence.priority}
                </span>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-800">{occurrence.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${statusColors[occurrence.status]}`}>
                        {occurrence.status}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                    {truncateText(occurrence.description)}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{occurrence.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>{occurrence.responsible}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{occurrence.date}</span>
                    </div>
                </div>
                {onViewDetails && (
                    <button
                        onClick={() => onViewDetails(occurrence.id)}
                        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors font-medium"
                    >
                        Ver Detalhes
                    </button>
                )}
            </div>
        </div>
    );
};

