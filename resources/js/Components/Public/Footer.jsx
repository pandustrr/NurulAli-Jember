import React from 'react';

export default function Footer() {
    return (
        <footer id="kontak" className="bg-slate-950 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-emerald-600 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                ن
                            </div>
                            <span className="text-2xl font-bold tracking-tight">Nurul Ali</span>
                        </div>
                        <p className="text-slate-400 max-w-sm leading-relaxed">
                            Pondok Pesantren Nurul Ali berkomitmen mencetak generasi yang unggul dalam Imtaq dan Iptek, berakhlakul karimah, dan mandiri.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Tautan Cepat</h4>
                        <ul className="space-y-4 text-slate-400">
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Tentang Kami</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Lembaga Pendidikan</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Pendaftaran PPDB</a></li>
                            <li><a href="#" className="hover:text-emerald-500 transition-colors">Informasi Biaya</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Hubungi Kami</h4>
                        <ul className="space-y-4 text-slate-400 text-sm">
                            <li className="flex items-start gap-3">
                                <span className="text-emerald-500">📍</span>
                                Jl. Raya Jember No. 123, Kaliwates, Jember, Jawa Timur
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-emerald-500">📞</span>
                                (0331) 1234567 / 0812-3456-7890
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-emerald-500">✉️</span>
                                info@nurulali.sch.id
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
                    <p>© 2024 Pondok Pesantren Nurul Ali. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                        <a href="#" className="hover:text-white transition-colors">YouTube</a>
                        <a href="#" className="hover:text-white transition-colors">Facebook</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
