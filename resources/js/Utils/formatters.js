/**
 * Utility functions for formatting data
 */

/**
 * Format date to Indonesian locale string
 * @param {string|Date} date 
 * @param {object} options 
 * @returns {string}
 */
export const formatDate = (date, options = { day: 'numeric', month: 'short', year: 'numeric' }) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('id-ID', options);
};

/**
 * Get CSS classes for status badges
 * @param {string} status 
 * @returns {string}
 */
export const getStatusColor = (status) => {
    switch (status) {
        case 'verified':
            return 'bg-emerald-100 text-emerald-700';
        case 'rejected':
            return 'bg-rose-100 text-rose-700';
        case 'pending':
            return 'bg-amber-100 text-amber-700';
        case 'paid':
            return 'bg-blue-100 text-blue-700';
        case 'unpaid':
            return 'bg-slate-100 text-slate-500';
        default:
            return 'bg-slate-100 text-slate-500';
    }
};

/**
 * Format status to Indonesian label
 * @param {string} status 
 * @returns {string}
 */
export const formatStatus = (status) => {
    const labels = {
        'verified': 'Terverifikasi',
        'rejected': 'Ditolak',
        'pending': 'Menunggu',
        'paid': 'Dibayar',
        'unpaid': 'Belum Bayar'
    };
    return labels[status] || status;
};
