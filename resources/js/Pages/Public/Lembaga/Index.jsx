import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import Programs from './Partials/Programs';

export default function Lembaga({ lembagas }) {
    return (
        <PublicLayout title="Lembaga Pendidikan - Pondok Pesantren Nurul Ali">
            <main className="pt-20">
                <Programs lembagas={lembagas} />
            </main>
        </PublicLayout>
    );
}
