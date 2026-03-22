import Checkbox from '@/Components/UI/Checkbox';
import InputError from '@/Components/UI/InputError';
import InputLabel from '@/Components/UI/InputLabel';
import PrimaryButton from '@/Components/UI/PrimaryButton';
import TextInput from '@/Components/UI/TextInput';
import LoginLayout from '@/Layouts/LoginLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
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
        <LoginLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div className="space-y-2">
                    <InputLabel htmlFor="username" value="Username" className="text-slate-700 font-bold" />

                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full bg-slate-50 border-none focus:ring-2 focus:ring-emerald-500 rounded-2xl py-4 px-5 transition-all text-slate-900"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('username', e.target.value)}
                        placeholder="Masukkan username..."
                    />

                    <InputError message={errors.username} className="mt-2" />
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
        </LoginLayout>
    );
}

