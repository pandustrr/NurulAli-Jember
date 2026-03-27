import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
    const { url, props } = usePage();
    const { site_settings } = props;
    const isHome = url === '/';
    const isInfoPpdb = url.startsWith('/info-ppdb');
    const isPendaftaran = url.startsWith('/pendaftaran');
    const isTentang = url.startsWith('/tentang');
    const isLembaga = url.startsWith('/lembaga');
    const isKontak = url.startsWith('/kontak');
    
    // Pages that should have transparent navbar at the top
    const isTransparentPage = isHome || isInfoPpdb || isPendaftaran || isTentang || isLembaga || isKontak;
    
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when URL changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [url]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'Tentang', href: '/tentang' },
        { name: 'Lembaga', href: '/lembaga' },
        { name: 'Info PPDB', href: '/info-ppdb' },
        { name: 'Pendaftaran PPDB', href: '/pendaftaran' },
        { name: 'Kontak', href: '/kontak' },
    ];

    // Determine colors based on page and scroll state
    const navBackground = isTransparentPage
        ? (scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5')
        : 'bg-white shadow-sm py-3 border-b border-slate-100';

    const textColor = isTransparentPage
        ? (scrolled ? 'text-slate-900' : 'text-white')
        : 'text-slate-900';

    const logoColor = isTransparentPage
        ? (scrolled ? 'text-slate-900' : 'text-white')
        : 'text-slate-900';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
                <div className="flex justify-between items-center">
                    {/* Hamburger Mobile - Left Side */}
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMenuOpen(true)}
                            className={`${textColor} p-2 hover:bg-slate-100/10 rounded-lg transition-colors`}
                        >
                            <Bars3Icon className="w-7 h-7" />
                        </button>
                    </div>

                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-emerald-700 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-emerald-900/20 group-hover:scale-110 transition-transform">
                            ن
                        </div>
                        <span className={`text-xl font-bold tracking-tight transition-colors ${logoColor}`}>
                            {site_settings?.site_name || 'Nurul Ali'}
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-semibold transition-all hover:text-emerald-500 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-500 after:transition-all hover:after:w-full ${textColor} ${url === link.href ? 'text-emerald-600 after:w-full' : ''}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Placeholder for balance in mobile if logo is centered, or just empty space */}
                    <div className="w-10 h-10 md:hidden invisible"></div>
                </div>
            </div>

            {/* Mobile Sidebar - From Left */}
            <div className={`fixed inset-0 z-[60] md:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div 
                    className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMenuOpen(false)}
                />
                
                {/* Sidebar Content */}
                <div className={`absolute top-0 left-0 bottom-0 w-[280px] bg-white shadow-2xl transition-transform duration-500 ease-out border-r border-slate-100 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-10">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="bg-emerald-700 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg shadow">
                                    ن
                                </div>
                                <span className="text-lg font-bold text-slate-900 tracking-tight">
                                    {site_settings?.site_name_short || 'Nurul Ali'}
                                </span>
                            </Link>
                            <button 
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center px-4 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${url === link.href ? 'bg-emerald-50 text-emerald-600 shadow-sm border border-emerald-100/50' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        <div className="absolute bottom-10 left-6 right-6 p-6 bg-slate-900 rounded-[32px] text-white overflow-hidden group">
                            <div className="absolute -right-8 -top-8 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400 mb-2">PPDB {new Date().getFullYear()}</h4>
                            <p className="text-[10px] text-slate-400 font-bold mb-4 leading-relaxed tracking-tight">Pendaftaran Santri Baru Telah Dibuka.</p>
                            <Link href="/pendaftaran" className="block w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-center text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-900/40">
                                Daftar Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
