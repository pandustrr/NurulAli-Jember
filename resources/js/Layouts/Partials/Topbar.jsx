import { usePage, Link } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { 
    Bars3BottomLeftIcon, 
    UserIcon, 
    ArrowLeftOnRectangleIcon, 
    ChevronDownIcon 
} from '@heroicons/react/24/outline';

export default function Topbar({ header, description, icon: Icon, isSidebarOpen, setIsSidebarOpen }) {
    const { auth } = usePage().props;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="bg-white/80 backdrop-blur-md h-20 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30 border-b border-slate-100/50">
            <div className="flex items-center gap-6">
                {/* Mobile Toggle */}
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="lg:hidden p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                    <Bars3BottomLeftIcon className="w-6 h-6" />
                </button>

                {Icon && (
                    <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100 text-emerald-600 hidden sm:block">
                        <Icon className="w-4 h-4" />
                    </div>
                )}
                <div className="min-w-0">
                    <h2 className="font-black text-slate-800 text-xs md:text-sm tracking-wide leading-none uppercase truncate">{header}</h2>
                    {description && (
                        <p className="text-slate-400 text-[8px] md:text-[9px] font-bold uppercase tracking-widest mt-2 hidden md:block truncate">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 p-1 pr-3 hover:bg-slate-50 transition-all rounded-xl group active:scale-95"
                >
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-black border border-emerald-200 shadow-sm text-xs shrink-0 group-hover:bg-emerald-200 transition-colors">
                        {auth.user.name.charAt(0)}
                    </div>
                    <div className="text-left hidden sm:block min-w-0">
                        <span className="block text-[11px] font-black text-slate-800 leading-none truncate max-w-[120px]">{auth.user.name}</span>
                        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter">Administrator</span>
                    </div>
                    <ChevronDownIcon className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 animate-in fade-in zoom-in-95 duration-200 origin-top-right overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-50 mb-2">
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Masuk sebagai</p>
                            <p className="text-sm font-bold text-slate-800 truncate">{auth.user.email}</p>
                        </div>

                        <Link 
                            href={route('profile.edit')}
                            onClick={() => setIsDropdownOpen(false)}
                            className="flex items-center gap-3 px-6 py-3 text-slate-600 hover:bg-slate-50 hover:text-emerald-600 transition-all font-bold text-sm"
                        >
                            <UserIcon className="w-4 h-4" />
                            <span>Edit Profil</span>
                        </Link>

                        <div className="mx-4 my-2 h-px bg-slate-50"></div>

                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button"
                            className="w-full flex items-center gap-3 px-6 py-3 text-rose-400 hover:bg-rose-50 hover:text-rose-600 transition-all font-bold text-sm text-left"
                        >
                            <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                            <span>Keluar Sistem</span>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
