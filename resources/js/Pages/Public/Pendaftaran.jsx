import { Head } from '@inertiajs/react';

export default function Pendaftaran() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
            <Head title="Form PPDB Online" />
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow">
                <h1 className="text-2xl font-bold text-blue-700 mb-6">Formulir Pendaftaran PPDB Santri Baru</h1>
                
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nama Lengkap</label>
                        <input type="text" className="w-full border-gray-300 rounded-md shadow-sm" placeholder="Contoh: Fulan Bin Fulan" />
                    </div>
                    {/* Tambahkan Upload Berkas dan Input lainnya di sini */}
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700">
                        Kirim Pendaftaran
                    </button>
                </form>
            </div>
        </div>
    );
}
