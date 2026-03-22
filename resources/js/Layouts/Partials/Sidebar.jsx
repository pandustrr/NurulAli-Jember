import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Squares2X2Icon, 
    AcademicCapIcon, 
    Cog6ToothIcon, 
    CalendarDaysIcon, 
    UsersIcon, 
    InboxIcon,
    ArrowLeftOnRectangleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    InformationCircleIcon,
    ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    // Otomatis buka dropdown jika sedang berada di salah satu halaman PPDB
    const isPpdbActive = route().current('admin.pendaftar') || route().current('admin.ppdb-info') || route().current('admin.ppdb-registration');
    const [isPpdbOpen, setIsPpdbOpen] = useState(isPpdbActive);

    const menuItems = [
        { name: 'Dashboard', icon: Squares2X2Icon, route: 'dashboard' },
        { name: 'Lembaga', icon: AcademicCapIcon, route: 'admin.lembaga.index', activePattern: 'admin.lembaga.*' },
        { name: 'Site Settings', icon: Cog6ToothIcon, route: 'admin.settings' },
    ];

    const ppdbSubItems = [
        { name: 'Info PPDB', icon: InformationCircleIcon, route: 'admin.ppdb-info' },
        { name: 'Pendaftaran PPDB', icon: ClipboardDocumentCheckIcon, route: 'admin.ppdb-registration' },
        { name: 'Data Pendaftar', icon: UsersIcon, route: 'admin.pendaftar' },
    ];

    const NavItem = ({ item, isSub = false }) => {
        const active = route().current(item.route) || (item.activePattern && route().current(item.activePattern));
        return (
            <Link
                href={route(item.route)}
                className={`flex items-center p-4 transition-all duration-200 ${active ? 'bg-emerald-800 border-l-4 border-emerald-400 text-white' : 'hover:bg-emerald-800/50 text-emerald-100/70 hover:text-white'} ${isSub ? 'pl-12 py-3 text-sm' : ''}`}
            >
                <item.icon className={`w-6 h-6 shrink-0 ${active ? 'text-emerald-400' : ''} ${isSub ? 'w-5 h-5' : ''}`} />
                <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'} font-medium`}>{item.name}</span>
            </Link>
        );
    };

    return (
        <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-emerald-900 text-white transition-all duration-300 flex flex-col fixed h-full z-20`}>
            <div className="p-6 flex items-center justify-between">
                <Link href="/" className={`${isSidebarOpen ? 'block' : 'hidden'} font-bold text-xl tracking-wider uppercase`}>Nurul Ali</Link>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-emerald-800 rounded transition-colors group">
                    {isSidebarOpen ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
                </button>
            </div>

            <nav className="mt-6 grow overflow-y-auto no-scrollbar">
                {menuItems.map((item) => <NavItem key={item.name} item={item} />)}

                {/* Main Sidebar PPDB Setting (Dropdown) */}
                <div>
                    <button 
                        onClick={() => {
                            if (!isSidebarOpen) setIsSidebarOpen(true);
                            setIsPpdbOpen(!isPpdbOpen);
                        }}
                        className={`w-full flex items-center justify-between p-4 transition-all duration-200 hover:bg-emerald-800/50 text-emerald-100/70 hover:text-white ${isPpdbActive ? 'text-white bg-emerald-800/30' : ''}`}
                    >
                        <div className="flex items-center">
                            <CalendarDaysIcon className="w-6 h-6 shrink-0" />
                            <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'} font-medium`}>PPDB Setting</span>
                        </div>
                        {isSidebarOpen && (
                            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${isPpdbOpen ? 'rotate-180' : ''}`} />
                        )}
                    </button>
                    
                    {/* Sub Menu items */}
                    {isPpdbOpen && isSidebarOpen && (
                        <div className="bg-emerald-950/20 animate-in slide-in-from-top-2 duration-300">
                            {ppdbSubItems.map((item) => <NavItem key={item.name} item={item} isSub={true} />)}
                        </div>
                    )}
                </div>

                <NavItem item={{ name: 'Inbox', icon: InboxIcon, route: 'admin.messages' }} />
            </nav>

            <div className="p-4 border-t border-emerald-800/50">
                <Link href={route('logout')} method="post" as="button" className="flex items-center p-4 w-full hover:bg-emerald-800 transition-all rounded-lg text-emerald-300 hover:text-white group">
                    <ArrowLeftOnRectangleIcon className="w-6 h-6 shrink-0 transition-transform group-hover:-translate-x-1" />
                    <span className={`${isSidebarOpen ? 'ml-4' : 'hidden'} font-medium`}>Logout</span>
                </Link>
            </div>
        </aside>
    );
}
