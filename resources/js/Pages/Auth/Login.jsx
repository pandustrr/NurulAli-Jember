import Checkbox from '@/Components/UI/Checkbox';
import InputError from '@/Components/UI/InputError';
import InputLabel from '@/Components/UI/InputLabel';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import TextInput from '@/Components/UI/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="space-y-2">
                    <InputLabel htmlFor="email" value="Username/Email" className="text-slate-700 font-bold" />

                    <TextInput
                        id="email"
                        type="text"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 rounded-2xl py-4 px-5 transition-all text-slate-900"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="admin atau email..."
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-6 space-y-2">
                    <InputLabel htmlFor="password" value="Password" className="text-slate-700 font-bold" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 rounded-2xl py-4 px-5 transition-all text-slate-900"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                            className="rounded-lg border-slate-200 text-emerald-600 focus:ring-emerald-500"
                        />
                        <span className="ms-2 text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
                            Ingat saya
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-xs font-bold text-slate-400 hover:text-emerald-600 transition-colors uppercase tracking-widest"
                        >
                            Lupa sandi?
                        </Link>
                    )}
                </div>

                <div className="mt-8">
                    <PrimaryButton
                        className="w-full justify-center py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 transition-all uppercase tracking-widest active:scale-95 disabled:opacity-50"
                        disabled={processing}
                    >
                        Masuk Sekarang
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

