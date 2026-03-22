import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Squares2X2Icon, 
    AcademicCapIcon, 
    CalendarDaysIcon, 
    UsersIcon, 
    InboxIcon,
    ArrowLeftOnRectangleIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    InformationCircleIcon,
    ClipboardDocumentCheckIcon,
    BuildingLibraryIcon,
    PhoneIcon,
    UserIcon,
    PencilSquareIcon,
    HomeIcon,
    IdentificationIcon,
    ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
    // Nav States
    const isPpdbActive = route().current('admin.pendaftar') || route().current('admin.ppdb-info') || route().current('admin.ppdb-registration');
    const isKontakActive = route().current('admin.kontak') || route().current('admin.messages');
    const isLembagaActive = route().current('admin.lembaga.index') || route().current('admin.lembaga.accounts');
    
    const [isPpdbOpen, setIsPpdbOpen] = useState(isPpdbActive);
    const [isKontakOpen, setIsKontakOpen] = useState(isKontakActive);
    const [isLembagaOpen, setIsLembagaOpen] = useState(isLembagaActive);

    const mainMenuItems = [
        { name: 'Dashboard', icon: Squares2X2Icon, route: 'dashboard' },
        { name: 'Beranda Setting', icon: HomeIcon, route: null, badge: 'Soon' },
        { name: 'Tentang Setting', icon: BuildingLibraryIcon, route: 'admin.tentang' },
    ];

    const lembagaSubItems = [
        { name: 'Kelola Lembaga', icon: ClipboardDocumentListIcon, route: 'admin.lembaga.index' },
        { name: 'Akun Lembaga', icon: IdentificationIcon, route: 'admin.lembaga.accounts' },
    ];

    const ppdbSubItems = [
        { name: 'Info PPDB', icon: InformationCircleIcon, route: 'admin.ppdb-info' },
        { name: 'Pendaftaran PPDB', icon: ClipboardDocumentCheckIcon, route: 'admin.ppdb-registration' },
        { name: 'Data Pendaftar', icon: UsersIcon, route: 'admin.pendaftar' },
    ];

    const kontakSubItems = [
        { name: 'Edit Info Kontak', icon: PencilSquareIcon, route: 'admin.kontak' },
        { name: 'Inbox Pesan', icon: InboxIcon, route: 'admin.messages' },
    ];

    const NavItem = ({ item, isSub = false }) => {
        const active = item.route ? (route().current(item.route) || (item.activePattern && route().current(item.activePattern))) : false;
        
        const content = (
            <>
                <item.icon className={`w-5 h-5 shrink-0 ${active ? 'text-emerald-400' : ''} ${isSub ? 'w-4 h-4' : ''}`} />
                <div className={`${isSidebarOpen ? 'ml-3' : 'hidden'} flex-1 flex items-center justify-between`}>
                    <span className="font-medium whitespace-nowrap">{item.name}</span>
                    {item.badge && (
                        <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                            {item.badge}
                        </span>
                    )}
                </div>
            </>
        );

        if (!item.route) {
            return (
                <div className={`flex items-center px-4 py-2.5 text-emerald-100/30 cursor-not-allowed ${isSub ? 'pl-9 py-2 text-[13px]' : ''}`}>
                    {content}
                </div>
            );
        }

        return (
            <Link
                href={route(item.route)}
                className={`flex items-center px-4 py-2.5 transition-all duration-200 ${active ? 'bg-emerald-800 border-l-4 border-emerald-400 text-white' : 'hover:bg-emerald-800/50 text-emerald-100/70 hover:text-white'} ${isSub ? 'pl-9 py-2 text-[13px] opacity-80' : ''}`}
            >
                {content}
            </Link>
        );
    };

    const DropdownMenu = ({ name, icon: Icon, isActive, isOpen, setIsOpen, subItems }) => (
        <div>
            <button 
                onClick={() => {
                    if (!isSidebarOpen) setIsSidebarOpen(true);
                    setIsOpen(!isOpen);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 transition-all duration-200 hover:bg-emerald-800/50 text-emerald-100/70 hover:text-white ${isActive ? 'text-white bg-emerald-800/30' : ''}`}
            >
                <div className="flex items-center">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} font-medium`}>{name}</span>
                </div>
                {isSidebarOpen && (
                    <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                )}
            </button>
            
            {isOpen && isSidebarOpen && (
                <div className="bg-emerald-950/20 animate-in slide-in-from-top-1 duration-200">
                    {subItems.map((item) => <NavItem key={item.name} item={item} isSub={true} />)}
                </div>
            )}
        </div>
    );

    return (
        <aside className={`${isSidebarOpen ? 'w-56' : 'w-16'} bg-emerald-900 text-white transition-all duration-300 flex flex-col fixed h-full z-20`}>
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <Link href="/" className={`${isSidebarOpen ? 'block' : 'hidden'} font-bold text-lg tracking-wider uppercase`}>Nurul Ali</Link>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1 hover:bg-emerald-800 rounded transition-colors group">
                    {isSidebarOpen ? <ChevronLeftIcon className="w-5 h-5" /> : <ChevronRightIcon className="w-5 h-5" />}
                </button>
            </div>

            {/* Main Navigation */}
            <nav className="mt-4 grow overflow-y-auto no-scrollbar">
                {mainMenuItems.map((item) => <NavItem key={item.name} item={item} />)}

                <DropdownMenu 
                    name="Lembaga Setting" 
                    icon={AcademicCapIcon} 
                    isActive={isLembagaActive} 
                    isOpen={isLembagaOpen} 
                    setIsOpen={setIsLembagaOpen} 
                    subItems={lembagaSubItems} 
                />

                <DropdownMenu 
                    name="PPDB Setting" 
                    icon={CalendarDaysIcon} 
                    isActive={isPpdbActive} 
                    isOpen={isPpdbOpen} 
                    setIsOpen={setIsPpdbOpen} 
                    subItems={ppdbSubItems} 
                />

                <DropdownMenu 
                    name="Kontak Setting" 
                    icon={PhoneIcon} 
                    isActive={isKontakActive} 
                    isOpen={isKontakOpen} 
                    setIsOpen={setIsKontakOpen} 
                    subItems={kontakSubItems} 
                />
            </nav>

            {/* Bottom Actions */}
            <div className="p-3 border-t border-emerald-800/50">
                <Link href={route('profile.edit')} className={`flex items-center px-4 py-2 transition-all duration-200 rounded-lg ${route().current('profile.edit') ? 'bg-emerald-800 text-white' : 'hover:bg-emerald-800 text-emerald-300 hover:text-white'}`}>
                    <UserIcon className="w-4 h-4 shrink-0" />
                    <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} font-medium text-[11px] uppercase tracking-wider`}>Profile Admin</span>
                </Link>

                <Link href={route('logout')} method="post" as="button" className="flex items-center px-4 py-2 w-full hover:bg-rose-900/30 transition-all rounded-lg text-rose-300 hover:text-white group">
                    <ArrowLeftOnRectangleIcon className="w-4 h-4 shrink-0 transition-transform group-hover:-translate-x-1" />
                    <span className={`${isSidebarOpen ? 'ml-3' : 'hidden'} font-medium text-[11px] uppercase tracking-wider`}>Logout System</span>
                </Link>
            </div>
        </aside>
    );
}
