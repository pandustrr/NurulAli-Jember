import { Head } from '@inertiajs/react';

export default function DataPendaftar() {
    return (
        <div className="p-8">
            <Head title="Kelola Data Pendaftar" />
            
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Master Data Pendaftar (PPDB)</h2>
                
                <p className="text-gray-500 mb-6">List semua data santri baru akan masuk di sebelah ini. Anda bisa melakukan Verifikasi Berkas & Cetak Invoice.</p>

                {/* Tempat simulasi tabel data admin */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-3 border">No Registrasi</th>
                                <th className="p-3 border">Nama Santri</th>
                                <th className="p-3 border">Status Pendaftaran</th>
                                <th className="p-3 border">Sisa Pembayaran</th>
                                <th className="p-3 border">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-400">Belum ada data pendaftar...</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
