import React from 'react';
import { ExclamationTriangleIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const ConfirmModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = 'Konfirmasi Tindakan', 
    message = 'Apakah Anda yakin ingin melanjutkan?', 
    confirmText = 'Ya, Lanjutkan', 
    cancelText = 'Batal',
    type = 'danger' // danger, success, info
}) => {
    if (!isOpen) return null;

    const colors = {
        danger: {
            icon: 'bg-rose-100 text-rose-600',
            button: 'bg-rose-600 hover:bg-rose-700 shadow-rose-100',
            IconComp: ExclamationTriangleIcon
        },
        success: {
            icon: 'bg-emerald-100 text-emerald-600',
            button: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100',
            IconComp: CheckCircleIcon
        },
        info: {
            icon: 'bg-blue-100 text-blue-600',
            button: 'bg-blue-600 hover:bg-blue-700 shadow-blue-100',
            IconComp: InformationCircleIcon
        }
    };

    const current = colors[type] || colors.info;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${current.icon}`}>
                        <current.IconComp className="w-8 h-8" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                        {message}
                    </p>

                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-colors"
                        >
                            {cancelText}
                        </button>
                        <button 
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`flex-1 py-3 px-4 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 ${current.button}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
