import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function Navbar() {
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
        { name: 'Lembaga', href: '#lembaga' },
        { name: 'Info PPDB', href: '/info-ppdb' },
        { name: 'Pedaftaran', href: '/pendaftaran' },
        { name: 'Kontak', href: '#kontak' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-emerald-700 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            ن
                        </div>
                        <span
                            className={`text-xl font-bold transition-colors ${scrolled ? 'text-slate-900' : 'text-white'
                                }`}
                        >
                            Nurul Ali
                        </span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-emerald-500 ${scrolled ? 'text-slate-700' : 'text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="md:hidden">
                        {/* Mobile menu button could go here */}
                        <button className={`${scrolled ? 'text-slate-900' : 'text-white'}`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
