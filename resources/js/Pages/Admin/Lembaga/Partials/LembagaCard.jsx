import React from 'react';

export default function LembagaCard({ item, onEdit, onDelete }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex flex-col hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
            <div className="flex justify-between items-start mb-6">
                {item.image ? (
                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover shadow-md" />
                ) : (
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center text-2xl text-slate-400">
                        🏢
                    </div>
                )}
                <div className="flex gap-2">
                    <button 
                        onClick={() => onEdit(item)} 
                        className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Edit Lembaga"
                    >
                        ✏️
                    </button>
                    <button 
                        onClick={() => onDelete(item.id)} 
                        className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors"
                        title="Hapus Lembaga"
                    >
                        🗑️
                    </button>
                </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">{item.title}</h3>
            <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
            
            <div className="mt-auto flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                {item.detailed_description && (
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">
                        Punya Detail Popup
                    </span>
                )}
                {item.admin_name && (
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md">
                        Admin: {item.admin_name}
                    </span>
                )}
            </div>
        </div>
    );
}
