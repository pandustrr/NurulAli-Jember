import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Toast = () => {
    const { flash } = usePage().props;
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success'); // success, error

    useEffect(() => {
        if (flash.success) {
            setMessage(flash.success);
            setType('success');
            setIsVisible(true);
        } else if (flash.error) {
            setMessage(flash.error);
            setType('error');
            setIsVisible(true);
        }
    }, [flash]);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    if (!isVisible || !message) return null;

    const config = {
        success: {
            bg: 'bg-emerald-500',
            icon: CheckCircleIcon,
            shadow: 'shadow-emerald-200'
        },
        error: {
            bg: 'bg-rose-500',
            icon: XCircleIcon,
            shadow: 'shadow-rose-200'
        }
    };

    const current = config[type] || config.success;

    return (
        <div className="fixed bottom-10 right-10 z-[200] animate-in slide-in-from-right-10 duration-500">
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
