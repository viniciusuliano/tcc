import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const OccurrenceDetailsModal = ({ 
    occurrenceId, 
    isOpen, 
    onClose, 
    occurrenceRepository,
    onUpdate 
}) => {
    const [occurrence, setOccurrence] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedResponsible, setSelectedResponsible] = useState('');

    const SETORES = [
        'TI',
        'Elétrico',
        'Hidráulico',
        'Manutenção Geral',
        'Limpeza',
        'Segurança',
        'Infraestrutura'
    ];

    const priorityColors = {
        Crítica: 'bg-red-600',
        Alta: 'bg-orange-500',
        Média: 'bg-yellow-500',
        Baixa: 'bg-green-500'
    };

    const statusColors = {
        'Pendente': 'bg-yellow-100 text-yellow-800',
        'Em Andamento': 'bg-blue-100 text-blue-800',
        'Concluída': 'bg-green-100 text-green-800'
    };

    useEffect(() => {
        if (isOpen && occurrenceId) {
            loadOccurrenceDetails();
        }
    }, [isOpen, occurrenceId]);

    const loadOccurrenceDetails = async () => {
        setLoading(true);
        try {
            const data = await occurrenceRepository.getById(occurrenceId);
            setOccurrence(data);
            setSelectedStatus(data.status);
            setSelectedResponsible(data.responsible === 'Não atribuído' ? '' : data.responsible);
        } catch (error) {
            console.error('Erro ao carregar detalhes:', error);
            toast.error('Erro ao carregar detalhes da ocorrência');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!occurrence) return;

        const updates = {};
        let hasChanges = false;

        if (selectedStatus !== occurrence.status) {
            updates.status = selectedStatus;
            hasChanges = true;
        }

        if (selectedResponsible !== occurrence.responsible && selectedResponsible !== 'Não atribuído') {
            updates.setor_responsavel = selectedResponsible || null;
            hasChanges = true;
        }

        if (!hasChanges) {
            toast.info('Nenhuma alteração realizada');
            onClose();
            return;
        }

        setIsUpdating(true);
        try {
            await occurrenceRepository.updateOccurrence(occurrenceId, updates);
            toast.success('Ocorrência atualizada com sucesso!');
            if (onUpdate) onUpdate();
            onClose();
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            toast.error('Erro ao atualizar ocorrência');
        } finally {
            setIsUpdating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {loading ? (
                    <div className="p-8 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : occurrence ? (
                    <div>
                        {/* Header */}
                        <div className="border-b border-gray-200 p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{occurrence.title}</h2>
                                    <p className="text-sm text-gray-500 mt-1">ID: {occurrence.id_ocorrencia}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="flex gap-3 mt-4">
                                <span className={`${priorityColors[occurrence.priority]} text-white px-3 py-1 rounded text-sm font-semibold`}>
                                    {occurrence.priority}
                                </span>
                                <span className={`px-3 py-1 rounded text-sm font-semibold ${statusColors[occurrence.status]}`}>
                                    {occurrence.status}
                                </span>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-6">
                            {/* Imagem */}
                            {occurrence.imageUrl && (
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Evidência</h3>
                                    <img
                                        src={occurrence.imageUrl}
                                        alt="Evidência"
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            {/* Descrição */}
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">Descrição</h3>
                                <p className="text-gray-600">{occurrence.description}</p>
                            </div>

                            {/* Informações */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Local</h3>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span>{occurrence.location}</span>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-semibold text-gray-700 mb-2">Data do Reporte</h3>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{occurrence.date}</span>
                                    </div>
                                </div>

                                {occurrence.similarReportsCount > 0 && (
                                    <div>
                                        <h3 className="font-semibold text-gray-700 mb-2">Reports Similares</h3>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                            <span>{occurrence.similarReportsCount} reports similares</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Edição de Status e Responsável */}
                            <div className="border-t border-gray-200 pt-6">
                                <h3 className="font-semibold text-gray-700 mb-4">Atribuições</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Status
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

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Setor Responsável
                                        </label>
                                        <select
                                            value={selectedResponsible}
                                            onChange={(e) => setSelectedResponsible(e.target.value)}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            disabled={isUpdating}
                                        >
                                            <option value="">Não atribuído</option>
                                            {SETORES.map(setor => (
                                                <option key={setor} value={setor}>{setor}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 p-6">
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={onClose}
                                    disabled={isUpdating}
                                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    disabled={isUpdating}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                                >
                                    {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        Erro ao carregar detalhes da ocorrência
                    </div>
                )}
            </div>
        </div>
    );
};
