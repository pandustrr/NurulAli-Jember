import { usePage } from '@inertiajs/react';

export default function Topbar({ header, description, icon: Icon, isSidebarOpen }) {
    const { auth } = usePage().props;

    return (
        <header className="bg-white/80 backdrop-blur-md h-20 flex items-center justify-between px-8 sticky top-0 z-10 border-b border-slate-100/50">
            <div className="flex items-center gap-4">
                {Icon && (
                    <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100 text-emerald-600">
                        <Icon className="w-5 h-5" />
                    </div>
                )}
                <div>
                    <h2 className="font-black text-slate-800 text-lg tracking-tight leading-none uppercase">{header}</h2>
                    {description && (
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1 hidden sm:block">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <span className="block text-xs font-extra-bold text-slate-800 leading-none">{auth.user.name}</span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Administrator</span>
                </div>
                <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-black border border-emerald-200 shadow-sm text-sm">
                    {auth.user.name.charAt(0)}
                </div>
            </div>
        </header>
    );
}
