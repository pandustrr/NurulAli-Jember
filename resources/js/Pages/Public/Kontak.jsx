import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import Navbar from '@/Components/Public/Navbar';
import Footer from '@/Components/Public/Footer';

export default function Kontak({ settings }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('kontak.send'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={`Hubungi Kami - ${settings.site_name || 'Nurul Ali'}`} />

            <Navbar />

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl underline decoration-emerald-500 decoration-4 underline-offset-8">
                            Hubungi Kami
                        </h2>
                        <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
                            Punya pertanyaan atau ingin berkunjung? Silakan hubungi kami melalui saluran di bawah ini.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-900">
                        <div className="space-y-8">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-6">Informasi Kontak</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                                            📍
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">Alamat</p>
                                            <p className="text-slate-600 mt-1">{settings.address || 'Loading...'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                                            📞
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">Telepon / WA</p>
                                            <p className="text-slate-600 mt-1">{settings.phone || '-'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-50 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                                            ✉️
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900">Email</p>
                                            <p className="text-slate-600 mt-1">{settings.email || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 h-80 relative overflow-hidden group">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.336495116743!2d113.6845!3d-8.1745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd6943997d9fd29%3A0x7d6c5c56c2c31!2sJember%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1711040000000!5m2!1sen!2sid"
                                    className="w-full h-full border-0 rounded-2xl"
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>

                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
                            <h3 className="text-xl font-bold text-slate-900 mb-8 text-center md:text-left">Kirim Pesan</h3>
                            {recentlySuccessful && (
                                <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 font-bold rounded-xl border border-emerald-100 animate-in fade-in slide-in-from-top-4">
                                    ✓ Pesan Anda berhasil dikirim! Kami akan menghubungi Anda segera.
                                </div>
                            )}
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Anda</label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                        placeholder="Nama Lengkap"
                                        required
                                    />
                                    {errors.name && <p className="text-rose-500 text-xs mt-1 font-bold">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                        placeholder="nama@email.com"
                                        required
                                    />
                                    {errors.email && <p className="text-rose-500 text-xs mt-1 font-bold">{errors.email}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subjek (Opsional)</label>
                                    <input
                                        type="text"
                                        value={data.subject}
                                        onChange={e => setData('subject', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                                        placeholder="e.g. Pertanyaan Pendaftaran"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Pesan</label>
                                    <textarea
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all h-32"
                                        placeholder="Tuliskan pesan Anda di sini..."
                                        required
                                    ></textarea>
                                    {errors.message && <p className="text-rose-500 text-xs mt-1 font-bold">{errors.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-1"
                                >
                                    {processing ? 'Mengirim...' : 'Kirim Pesan'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
