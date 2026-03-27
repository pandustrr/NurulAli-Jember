import React, { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { 
    Bars3Icon, 
    XMarkIcon, 
    ArrowRightOnRectangleIcon, 
    Squares2X2Icon as LayoutDashboardIcon, 
    UserCircleIcon as ProfileIcon, 
    PhoneIcon 
} from '@heroicons/react/24/outline';

export default function SantriNavbar() {
    const { url, props } = usePage();
    const { site_settings, auth } = props;
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const logout = () => router.post(route('santri.logout'));

    const navLinks = [
        { name: 'Dashboard', href: '/santri/dashboard', icon: LayoutDashboardIcon },
        { name: 'Profile Saya', href: '/santri/profile', icon: ProfileIcon },
        { name: 'Bantuan', href: '/kontak', icon: PhoneIcon },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg py-3' : 'bg-transparent py-5'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-emerald-600 w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-900/20 group-hover:rotate-12 transition-all">
                            ن
                        </div>
                        <div className="flex flex-col -space-y-1">
                            <span className={`text-sm md:text-lg font-black tracking-tighter uppercase transition-colors line-clamp-1 max-w-[120px] md:max-w-none ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                                {auth.santri?.name || 'Portal Santri'}
                            </span>
                            <span className={`text-[8px] md:text-[9px] font-bold uppercase tracking-widest opacity-60 line-clamp-1 ${scrolled ? 'text-slate-500' : 'text-emerald-200'}`}>
                                @{auth.santri?.username || 'Nurul Ali'}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6 pr-6 border-r border-white/10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:text-emerald-500 flex items-center gap-2 ${scrolled ? (url === link.href ? 'text-emerald-600' : 'text-slate-600') : (url === link.href ? 'text-emerald-400' : 'text-white')}`}
                                >
                                    <link.icon className="w-3.5 h-3.5" />
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                        
                        <button 
                            onClick={logout}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${scrolled ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white' : 'bg-white/10 text-white hover:bg-white hover:text-rose-600'}`}
                        >
                            <ArrowRightOnRectangleIcon className="w-4 h-4" />
                            Logout
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button 
                        onClick={() => setIsMenuOpen(true)}
                        className={`md:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
                    >
                        <Bars3Icon className="w-7 h-7" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Sidebar */}
            <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
                <div className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMenuOpen(false)} />
                <div className={`absolute top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl transition-transform duration-500 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-8">
                        <div className="flex justify-between items-center mb-10">
                            <span className="text-xl font-black uppercase tracking-tighter text-slate-800">Menu Portal</span>
                            <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"><XMarkIcon className="w-6 h-6" /></button>
                        </div>

                        <div className="space-y-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${url === link.href ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:bg-slate-50'}`}
                                >
                                    <link.icon className="w-4 h-4" />
                                    {link.name}
                                </Link>
                            ))}
                            <button 
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 hover:bg-rose-50 transition-all mt-4"
                            >
                                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
