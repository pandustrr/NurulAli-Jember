import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { 
    CheckCircleIcon, 
    XCircleIcon, 
    XMarkIcon,
    ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const Toast = () => {
    const { flash } = usePage().props;
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success'); // success, error, warning

    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setType('success');
            setIsVisible(true);
        } else if (flash.error) {
            setMessage(flash.error);
            setType('error');
            setIsVisible(true);
        } else if (flash.warning) {
            setMessage(flash.warning);
            setType('warning');
            setIsVisible(true);
        }
    }, [flash]);

    useEffect(() => {
        const handleCustomToast = (e) => {
            setMessage(e.detail.message);
            setType(e.detail.type || 'success');
            setIsVisible(true);
        };

        window.addEventListener('toast', handleCustomToast);
        return () => window.removeEventListener('toast', handleCustomToast);
    }, []);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!isVisible || !message) return null;

    const config = {
        success: {
            bg: 'bg-emerald-600',
            icon: CheckCircleIcon,
            shadow: 'shadow-emerald-950/20'
        },
        error: {
            bg: 'bg-rose-600',
            icon: XCircleIcon,
            shadow: 'shadow-rose-950/20'
        },
        warning: {
            bg: 'bg-emerald-600',
            icon: ExclamationTriangleIcon,
            shadow: 'shadow-emerald-950/20'
        },
        info: {
            bg: 'bg-emerald-600',
            icon: CheckCircleIcon,
            shadow: 'shadow-emerald-950/20'
        }
    };

    const current = config[type] || config.success;

    return (
        <div className="fixed top-6 right-6 sm:top-10 sm:right-10 z-[9999] animate-in slide-in-from-right-10 duration-500">
            <div className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-white shadow-2xl ${current.bg} ${current.shadow}`}>
                <current.icon className="w-6 h-6 shrink-0" />
                <p className="font-bold text-sm tracking-wide pr-4">
                    {message}
                </p>
                <button 
                    onClick={() => setIsVisible(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                    <XMarkIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;
