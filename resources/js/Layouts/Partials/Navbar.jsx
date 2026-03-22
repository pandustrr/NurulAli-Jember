import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function Navbar() {
    const { url, props } = usePage();
    const { site_settings } = props;
    const isHome = url === '/';
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Beranda', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Lembaga', href: '/lembaga' },
        { name: 'Info PPDB', href: '/info-ppdb' },
        { name: 'Pendaftaran PPDB', href: '/pendaftaran' },
        { name: 'Kontak', href: '/kontak' },
    ];

    // Determine colors based on page and scroll state
    const navBackground = isHome
        ? (scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5')
        : 'bg-white shadow-sm py-3 border-b border-slate-100';

    const textColor = isHome
        ? (scrolled ? 'text-slate-900' : 'text-white')
        : 'text-slate-900';

    const logoColor = isHome
        ? (scrolled ? 'text-slate-900' : 'text-white')
        : 'text-slate-900';

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBackground}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-slate-900">
                <div className="flex justify-between items-center">
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

                    <div className="md:hidden">
                        <button className={`${textColor} p-2 hover:bg-slate-100 rounded-lg transition-colors`}>
                            <Bars3Icon className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
