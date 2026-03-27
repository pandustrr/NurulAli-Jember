import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import {
    UserIcon,
    LockClosedIcon,
    ArrowRightIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline';

export default function Login({ settings }) {
    const { data, setData, post, processing, errors } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('santri.login.store'));
    };

    return (
        <PublicLayout title={`Login Santri - ${settings?.site_name || 'Nurul Ali'}`}>
            <div className="min-h-screen flex items-center justify-center p-4 md:p-8 pt-36 md:pt-28 pb-20 md:pb-32 relative overflow-hidden bg-slate-950">
                {/* 1. New Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/hero_about.png"
                        className="w-full h-full object-cover opacity-50 blur-[2px] scale-105"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-emerald-950/20 via-emerald-950/60 to-emerald-950/40"></div>
                </div>

                {/* 2. Main Auth Container (Lowered and Responsive) */}
                <div className="w-full max-w-sm md:max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px] animate-in fade-in zoom-in-95 duration-700 z-10 mx-auto">

                    {/* Left Side: Sign In Form */}
                    <div className="flex-1 p-8 md:p-12 flex flex-col items-center justify-center">
                        <div className="w-full max-w-xs text-center">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-800 mb-6 md:mb-8 tracking-tight uppercase">Masuk</h1>

                            {/* Decorative divider for santri portal */}
                            <div className="flex justify-center gap-2 mb-8 md:mb-10">
                                <div className="w-9 h-9 md:w-10 md:h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-sm md:text-base">ب</div>
                                <div className="w-9 h-9 md:w-10 md:h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-sm md:text-base">ت</div>
                                <div className="w-9 h-9 md:w-10 md:h-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-400 font-bold text-sm md:text-base">ث</div>
                            </div>

                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-6 md:mb-8">Atau gunakan akun anda</p>

                            <form onSubmit={submit} className="space-y-5">
                                <div className="space-y-1">
                                    <label className="block text-left text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Username / NIK</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={data.username}
                                            onChange={e => setData('username', e.target.value)}
                                            className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-slate-100 border-2 border-transparent focus:border-emerald-500 rounded-xl text-xs md:text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400"
                                            placeholder="Masukkan username..."
                                            required
                                        />
                                        {errors.username && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest text-left ml-1 mt-1">{errors.username}</p>}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-left text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Kata Sandi</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                            className="w-full px-5 py-3.5 md:px-6 md:py-4 bg-slate-100 border-2 border-transparent focus:border-emerald-500 rounded-xl text-xs md:text-sm font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400"
                                            placeholder="••••••••"
                                            required
                                        />
                                        {errors.password && <p className="text-[9px] font-bold text-rose-500 uppercase tracking-widest text-left ml-1 mt-1">{errors.password}</p>}
                                    </div>
                                </div>

                                <div className="pt-2 text-center">
                                    <Link href="#" className="text-[9px] font-bold text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors">Lupa kata sandi anda?</Link>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="mt-6 px-10 py-3.5 md:px-12 md:py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-100 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
                                >
                                    Masuk
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Right Side: Welcome Promo (With BG Image) */}
                    <div className="w-full md:w-[40%] bg-emerald-600 flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
                        {/* 1. Side Panel BG Image */}
                        <div className="absolute inset-0">
                            <img
                                src="/hero_about.png"
                                className="w-full h-full object-cover opacity-90 scale-110 blur-[1.5px]"
                                alt="Side Background"
                            />
                            {/* Softer Tint Overlay: Slightly increased emerald intensity */}
                            <div className="absolute inset-0 bg-linear-to-b from-emerald-950/40 via-emerald-900/55 to-emerald-950/80"></div>
                        </div>

                        <div className="relative z-10 p-10 md:p-12 space-y-6 md:space-y-8 animate-in slide-in-from-right-10 duration-1000">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight text-emerald-50">Ahlan wa <br /> Sahlan!</h2>
                            <p className="text-xs md:text-base font-medium text-emerald-100 opacity-80 leading-relaxed max-w-[240px] md:max-w-[280px] mx-auto">
                                Silakan masuk dengan akun anda untuk mulai mengakses Sistem Informasi Santri.
                            </p>

                            <div className="pt-2 md:pt-4">
                                <Link
                                    href="/pendaftaran"
                                    className="inline-block px-8 py-3 md:px-10 md:py-4 border-2 border-emerald-100/30 hover:bg-emerald-50 hover:text-emerald-900 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.2em] transition-all text-emerald-50"
                                >
                                    Daftar Santri
                                </Link>
                            </div>
                        </div>

                        {/* Subtle decorative icon */}
                        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 opacity-20 z-10">
                            <AcademicCapIcon className="w-24 h-24 md:w-40 md:h-40 text-white pointer-events-none" />
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
