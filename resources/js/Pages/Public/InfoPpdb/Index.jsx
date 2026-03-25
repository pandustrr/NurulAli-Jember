import React from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import PPDBInfo from './Partials/PPDBInfo';

export default function InfoPpdb({ ppdb_settings, settings }) {
    return (
        <PublicLayout title="Informasi PPDB - Pondok Pesantren Nurul Ali">
            <main>
                <PPDBInfo ppdb_settings={ppdb_settings} />
            </main>
        </PublicLayout>
    );
}
