import React from 'react';
import { 
    AcademicCapIcon, 
    BuildingLibraryIcon, 
    BuildingOfficeIcon, 
    BriefcaseIcon,
    BookOpenIcon,
    UserGroupIcon,
    BeakerIcon,
    RectangleGroupIcon,
    PencilIcon,
    TrashIcon
} from '@heroicons/react/24/outline';

const iconMap = {
    AcademicCapIcon,
    BuildingLibraryIcon,
    BuildingOfficeIcon,
    BriefcaseIcon,
    BookOpenIcon,
    UserGroupIcon,
    BeakerIcon,
    RectangleGroupIcon
};

export default function LembagaCard({ item, onEdit, onDelete }) {
    const Icon = iconMap[item.icon] || BuildingLibraryIcon;

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col hover:shadow-2xl hover:shadow-emerald-900/5 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/50 rounded-bl-[4rem] -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500"></div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200 ring-4 ring-emerald-50">
                    <Icon className="w-8 h-8" />
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => onEdit(item)} 
                        className="p-2.5 bg-white border border-slate-100 text-blue-600 rounded-xl hover:bg-blue-50 transition-all hover:scale-110 active:scale-95 shadow-sm"
                        title="Edit Lembaga"
                    >
                        <PencilIcon className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => onDelete(item.id)} 
                        className="p-2.5 bg-white border border-slate-100 text-rose-600 rounded-xl hover:bg-rose-50 transition-all hover:scale-110 active:scale-95 shadow-sm"
                        title="Hapus Lembaga"
                    >
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>
            
            <div className="relative z-10">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-none mb-1">{item.title}</h3>
                <p className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">{item.subtitle}</p>
                <p className="text-slate-500 text-xs mb-6 line-clamp-2 leading-relaxed font-medium">{item.description}</p>
            </div>
            
            <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-slate-50 relative z-10">
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                    {item.prices?.length || 0} Item Biaya
                </span>
                {item.detailed_description && (
                    <span className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                        Pop-up Aktif
                    </span>
                )}
            </div>
        </div>
    );
}
