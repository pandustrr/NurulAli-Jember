import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PPDBInfo from './Partials/PPDBInfo';

export default function InfoPpdb() {
    return (
        <PublicLayout title="Informasi PPDB - Pondok Pesantren Nurul Ali">
            <main className="pt-20">
                <PPDBInfo />
            </main>
        </PublicLayout>
    );
}
