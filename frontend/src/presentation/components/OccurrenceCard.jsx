import { useState } from 'react';
import toast from 'react-hot-toast';

export const OccurrenceCard = ({ occurrence, onStatusUpdate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(occurrence.status);
    const [isUpdating, setIsUpdating] = useState(false);

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

    const handleUpdateStatus = async () => {
        if (selectedStatus === occurrence.status) {
            setIsModalOpen(false);
            return;
        }

        setIsUpdating(true);
        try {
            await onStatusUpdate(occurrence.id, selectedStatus);
            toast.success('Status atualizado com sucesso!');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Erro ao atualizar status:', error);
            toast.error('Erro ao atualizar status da ocorrência');
        } finally {
            setIsUpdating(false);
        }
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
                    <span className="text-blue-600 cursor-pointer hover:underline">{occurrence.description}</span>
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
                {onStatusUpdate && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors font-medium"
                    >
                        Editar Status
                    </button>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h2 className="text-xl font-bold mb-4">Atualizar Status</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Novo Status
                            </label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isUpdating}
                            >
                                <option value="Pendente">Pendente</option>
                                <option value="Em Andamento">Em Andamento</option>
                                <option value="Concluída">Concluída</option>
                            </select>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                disabled={isUpdating}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleUpdateStatus}
                                disabled={isUpdating}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isUpdating ? 'Atualizando...' : 'Confirmar'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

