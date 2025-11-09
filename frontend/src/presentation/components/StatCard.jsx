export const StatCard = ({ title, value, icon, bgColor }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between cursor-pointer hover:shadow-lg transition-shadow duration-300">
            <div>
                <h3 className="text-gray-600 text-sm mb-2">{title}</h3>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}>
                {icon}
            </div>
        </div>
    );
};

