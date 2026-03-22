import React from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

const MessageDetail = ({ message, onDelete }) => {
    if (!message) {
        return (
            <div className="h-full flex items-center justify-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400">
                Pilih pesan untuk melihat detail.
            </div>
        );
    }

    return (
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col animate-in fade-in duration-300">
            <div className="flex justify-between items-start mb-10 pb-6 border-b border-slate-50">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{message.subject || 'Pesan Baru'}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span className="font-bold text-emerald-700">{message.name}</span>
                        <span>&lt;{message.email}&gt;</span>
                    </div>
                </div>
                <button onClick={() => onDelete(message.id)} className="p-3 text-rose-400 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                    <TrashIcon className="w-5 h-5" />
                    Hapus
                </button>
            </div>

            <div className="grow">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap italic">
                    "{message.message}"
                </p>
            </div>

            <div className="pt-10 mt-10 border-t border-slate-50 flex gap-4">
                <a
                    href={`mailto:${message.email}`}
                    className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                >
                    Balas via Email
                </a>
                <button className="px-8 py-3 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-colors">Arsipkan</button>
            </div>
        </div>
    );
};

export default MessageDetail;
