import { usePage } from '@inertiajs/react';

export default function Topbar({ header, isSidebarOpen }) {
    const { auth } = usePage().props;

    return (
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 sticky top-0 z-10 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-lg">{header}</h2>
            <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                    <span className="block text-sm font-bold text-slate-800 leading-none">{auth.user.name}</span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Administrator</span>
                </div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200 shadow-sm">
                    {auth.user.name.charAt(0)}
                </div>
            </div>
        </header>
    );
}
