import React, { useState } from 'react';
import { Head } from '@inertiajs/react';

export default function LaporanAdmin({ laporan }) {
    const [sortKey, setSortKey] = useState('periode');
    const [sortDesc, setSortDesc] = useState(true);

    const toggleSort = (key) => {
        if (sortKey === key) {
            setSortDesc(!sortDesc);
        } else {
            setSortKey(key);
            setSortDesc(true);
        }
    };

    const SortIcon = ({ active, desc }) => (
        <span className="inline-block ml-1">
            {active ? (
                desc ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                )
            ) : null}
        </span>
    );

    const sorted = [...laporan].sort((a, b) => {
        let valA = a[sortKey];
        let valB = b[sortKey];

        // Handle null values
        valA = valA ?? '';
        valB = valB ?? '';

        if (sortKey.includes('total') || sortKey === 'periode') {
            valA = isNaN(valA) ? valA : parseFloat(valA);
            valB = isNaN(valB) ? valB : parseFloat(valB);
        }

        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortDesc ? 1 : -1;
        if (valA > valB) return sortDesc ? -1 : 1;
        return 0;
    });

    const handleExport = (type) => {
        const url = type === 'excel'
            ? route('admin.laporan.export.excel')
            : route('admin.laporan.export.pdf');
        window.open(url, '_blank');
    };

    return (
        <div className="mx-auto w-full max-w-[500px] min-h-screen bg-gray-50">
            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[500px] w-full z-20 bg-main shadow-md">
                <div className="flex justify-between items-center px-4 py-3">
                    <div className="flex items-center gap-4">
                        <button onClick={() => window.history.back()}>
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>
                        <h1 className="text-white font-semibold text-lg">Laporan Admin</h1>
                    </div>
                </div>

                {/* Export Buttons */}
                <div className="sticky top-[52px] z-10 bg-white px-4 py-3 shadow-inner border-t border-b border-gray-200">
                    <div className="flex gap-3">
                        <button
                            onClick={() => handleExport('excel')}
                            className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition"
                        >
                            Export ke Excel
                        </button>
                        <button
                            onClick={() => handleExport('pdf')}
                            className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
                        >
                            Export ke PDF
                        </button>
                    </div>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-[132px]" />

            {/* Table Section */}
            <div className="px-4 pb-8">
                <div className="overflow-x-auto rounded-lg shadow-sm">
                    <table className="min-w-full bg-white rounded-lg text-sm text-left border">
                        <thead className="bg-main text-white">
                            <tr>
                            <th className="py-3 px-4 font-semibold text-center cursor-pointer" onClick={() => toggleSort('periode')}>
  Periode
  <SortIcon active={sortKey === 'periode'} desc={sortDesc} />
</th>
<th className="py-3 px-4 font-semibold text-center cursor-pointer" onClick={() => toggleSort('total_aktivitas_setoran')}>
  Total Aktivitas Setoran
  <SortIcon active={sortKey === 'total_aktivitas_setoran'} desc={sortDesc} />
</th>
<th className="py-3 px-4 font-semibold text-center cursor-pointer" onClick={() => toggleSort('total_poin_didapat_user')}>
  Total Poin Didapat User
  <SortIcon active={sortKey === 'total_poin_didapat_user'} desc={sortDesc} />
</th>
<th className="py-3 px-4 font-semibold text-center cursor-pointer" onClick={() => toggleSort('total_aktivitas_penukaran')}>
  Total Aktivitas Penukaran
  <SortIcon active={sortKey === 'total_aktivitas_penukaran'} desc={sortDesc} />
</th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {sorted.length > 0 ? (
                                sorted.map((item) => (
                                    <tr key={item.id} className="border-t hover:bg-gray-50">
                                        <td className="py-2 px-4">{item.periode}</td>
                                        <td className="py-2 px-4">
                                            {item.total_aktivitas_setoran != null ? Number(item.total_aktivitas_setoran).toLocaleString('id-ID') : '-'}
                                        </td>
                                        <td className="py-2 px-4">
                                            {item.total_poin_didapat_user != null ? Number(item.total_poin_didapat_user).toLocaleString('id-ID') : '-'}
                                        </td>
                                        <td className="py-2 px-4">
                                            {item.total_aktivitas_penukaran != null ? Number(item.total_aktivitas_penukaran).toLocaleString('id-ID') : '-'}
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-6 text-gray-500">
                                        Tidak ada data laporan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
