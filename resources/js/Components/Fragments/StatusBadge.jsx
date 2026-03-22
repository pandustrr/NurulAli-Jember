import React from 'react';
import { getStatusColor, formatStatus } from '@/Utils/formatters';

const StatusBadge = ({ status, className = '' }) => {
    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(status)} ${className}`}>
            {formatStatus(status)}
        </span>
    );
};

export default StatusBadge;
