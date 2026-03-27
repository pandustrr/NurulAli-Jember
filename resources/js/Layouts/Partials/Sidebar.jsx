import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
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
    ClipboardDocumentListIcon,
    XMarkIcon,
    PhotoIcon
} from '@heroicons/react/24/outline';

export default function Sidebar({ isSidebarOpen, setIsSidebarOpen, isMobile }) {
    // Nav States
    const isPpdbActive = route().current('admin.pendaftar') || route().current('admin.ppdb-info');
    const isKontakActive = route().current('admin.kontak') || route().current('admin.messages');
    const isLembagaActive = route().current('admin.lembaga.index') || route().current('admin.lembaga.accounts');
    const isInfoPpdbSettingActive = route().current('admin.ppdb-info') || route().current('admin.ppdb-registration');
    
    // Persisted Nav States
    const [openMenus, setOpenMenus] = useState(() => {
        try {
            const saved = localStorage.getItem('admin_sidebar_open_menus');
            const initial = saved ? JSON.parse(saved) : {};
            return {
                ppdb: initial.ppdb || isPpdbActive,
                kontak: initial.kontak || isKontakActive,
                lembaga: initial.lembaga || isLembagaActive,
                infoPpdbSetting: initial.infoPpdbSetting || false,
            };
        } catch (e) {
            return { ppdb: !!isPpdbActive, kontak: !!isKontakActive, lembaga: !!isLembagaActive };
        }
    });

    // Save to localStorage when changed
    useEffect(() => {
        localStorage.setItem('admin_sidebar_open_menus', JSON.stringify(openMenus));
    }, [openMenus]);

    // Force open if route becomes active
    useEffect(() => {
        if (isPpdbActive) setOpenMenus(prev => ({ ...prev, ppdb: true }));
        if (isKontakActive) setOpenMenus(prev => ({ ...prev, kontak: true }));
        if (isLembagaActive) setOpenMenus(prev => ({ ...prev, lembaga: true }));
        if (isInfoPpdbSettingActive) setOpenMenus(prev => ({ ...prev, infoPpdbSetting: true }));
    }, [isPpdbActive, isKontakActive, isLembagaActive, isInfoPpdbSettingActive]);

    const toggleMenu = (key) => {
        setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const mainMenuItems = [
        { name: 'Dashboard', icon: Squares2X2Icon, route: 'dashboard' },
        { name: 'Beranda Setting', icon: HomeIcon, route: null, badge: 'On Going' },
        { name: 'Tentang Setting', icon: BuildingLibraryIcon, route: 'admin.tentang' },
    ];

    const lembagaSubItems = [
        { name: 'Kelola Lembaga', icon: ClipboardDocumentListIcon, route: 'admin.lembaga.index' },
        { name: 'Akun Lembaga', icon: IdentificationIcon, route: 'admin.lembaga.accounts' },
    ];

    const ppdbSubItems = [
        { name: 'Data Pendaftar', icon: UsersIcon, route: 'admin.pendaftar' },
        { name: 'Setting Pendaftaran', icon: ClipboardDocumentCheckIcon, route: 'admin.ppdb-registration' },
    ];

    const infoPpdbSubItems = [
        { name: 'Info & FAQ', icon: InformationCircleIcon, route: 'admin.ppdb-info' },
        { name: 'Contoh Gambar', icon: PhotoIcon, route: 'admin.ppdb-examples' },
    ];

    const kontakSubItems = [
        { name: 'Edit Info Kontak', icon: PencilSquareIcon, route: 'admin.kontak' },
        { name: 'Inbox Pesan', icon: InboxIcon, route: 'admin.messages' },
    ];

    const NavItem = ({ item, isSub = false }) => {
        const active = item.route ? (route().current(item.route) || (item.activePattern && route().current(item.activePattern))) : false;
        
        const content = (
            <>
                <item.icon className={`w-4 h-4 shrink-0 ${active ? 'text-emerald-400' : ''} ${isSub ? 'w-3.5 h-3.5' : ''}`} />
                <div className={`${isSidebarOpen ? 'ml-2.5' : 'hidden'} flex-1 flex items-center justify-between`}>
                    <span className="font-bold text-[13px] whitespace-nowrap">{item.name}</span>
                    {item.badge && (
                        <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1 py-0.5 rounded-full uppercase tracking-tighter">
                            {item.badge}
                        </span>
                    )}
                </div>
            </>
        );

        if (!item.route) {
            return (
                <div className={`flex items-center px-4 py-2 text-emerald-100/30 cursor-not-allowed ${isSub ? 'pl-8 py-1.5 text-[12px]' : ''}`}>
                    {content}
                </div>
            );
        }

        return (
            <Link
                href={route(item.route)}
                onClick={() => isMobile && setIsSidebarOpen(false)}
                className={`flex items-center px-4 py-2 transition-all duration-200 ${active ? 'bg-emerald-800 border-l-4 border-emerald-400 text-white' : 'hover:bg-emerald-800/50 text-emerald-100/70 hover:text-white'} ${isSub ? 'pl-8 py-1.5 text-[12px] opacity-80' : ''}`}
            >
                {content}
            </Link>
        );
    };

    const DropdownMenu = ({ name, icon: Icon, badge, isActive, isOpen, setIsOpen, subItems }) => (
        <div>
            <button 
                onClick={() => {
                    if (!isSidebarOpen) setIsSidebarOpen(true);
                    setIsOpen();
                }}
                className={`w-full flex items-center justify-between px-4 py-2 transition-all duration-200 hover:bg-emerald-800/50 text-emerald-100/70 hover:text-white ${isActive ? 'text-white bg-emerald-800/30' : ''}`}
            >
                <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    {isSidebarOpen && (
                        <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[13px] whitespace-nowrap">{name}</span>
                            {badge && (
                                <span className="bg-amber-500/20 text-amber-400 text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                                    {badge}
                                </span>
                            )}
                        </div>
                    )}
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
        <aside className={`${isSidebarOpen ? 'w-56' : 'w-16'} bg-emerald-900 text-white transition-all duration-300 flex flex-col h-full overflow-hidden shadow-2xl shrink-0`}>
            {/* Header */}
            <div className="px-5 flex items-center justify-between h-16 border-b border-emerald-800/50">
                <Link 
                    href="/admin/dashboard" 
                    className={`${isSidebarOpen ? 'block' : 'hidden'} font-black text-lg tracking-tighter uppercase`}
                >
                    Nurul <span className="text-emerald-400">Ali</span>
                </Link>
                <button 
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                    className="p-1.5 bg-emerald-800/50 text-emerald-200 hover:text-white rounded-lg transition-all active:scale-95"
                >
                    {isMobile ? <XMarkIcon className="w-4 h-4" /> : (isSidebarOpen ? <ChevronLeftIcon className="w-4 h-4" /> : <ChevronRightIcon className="w-4 h-4" />)}
                </button>
            </div>

            {/* Main Navigation */}
            <nav className="mt-6 flex-1 overflow-y-auto no-scrollbar pb-6">
                {mainMenuItems.map((item) => <NavItem key={item.name} item={item} />)}

                <div className="my-4 px-4 py-2">
                    <div className={`h-px bg-emerald-800 mx-auto w-full`}></div>
                </div>

                <DropdownMenu 
                    name="Pengaturan Lembaga" 
                    icon={AcademicCapIcon} 
                    isActive={isLembagaActive} 
                    isOpen={openMenus.lembaga} 
                    setIsOpen={() => toggleMenu('lembaga')} 
                    subItems={lembagaSubItems} 
                />

                <DropdownMenu 
                    name="Info PPDB" 
                    icon={InformationCircleIcon}
                    isActive={isInfoPpdbSettingActive} 
                    isOpen={openMenus.infoPpdbSetting} 
                    setIsOpen={() => toggleMenu('infoPpdbSetting')} 
                    subItems={infoPpdbSubItems} 
                />

                <DropdownMenu 
                    name="Pendaftaran PPDB" 
                    icon={ClipboardDocumentListIcon} 
                    isActive={isPpdbActive} 
                    isOpen={openMenus.ppdb} 
                    setIsOpen={() => toggleMenu('ppdb')} 
                    subItems={ppdbSubItems} 
                />

                <DropdownMenu 
                    name="Pengaturan Kontak" 
                    icon={PhoneIcon} 
                    isActive={isKontakActive} 
                    isOpen={openMenus.kontak} 
                    setIsOpen={() => toggleMenu('kontak')} 
                    subItems={kontakSubItems} 
                />
            </nav>

        </aside>
    );
}
