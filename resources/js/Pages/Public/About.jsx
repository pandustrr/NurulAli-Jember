import { Head } from '@inertiajs/react';

export default function About() {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Head title="Tentang Kami" />
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Profil Ponpes Nurul Ali</h1>
                <p className="text-gray-600">
                    Visi, Misi, dan Sejarah akan ditampilkan di sini.
                </p>
                {/* Sisipkan komponen layout milik Anda (Navbar & Footer) nanti di sini */}
            </div>
        </div>
    );
}
