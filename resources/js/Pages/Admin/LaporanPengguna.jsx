import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LaporanPengguna({ laporan }) {
    const [search, setSearch] = useState('');
    const [sortKey, setSortKey] = useState('created_at');
    const [sortDesc, setSortDesc] = useState(true);

    const toggleSort = (key) => {
        if (sortKey === key) {
            setSortDesc(!sortDesc);
        } else {
            setSortKey(key);
            setSortDesc(true);
        }
    };

    const filtered = laporan
        .filter(item =>
            item.nama_sampah.toLowerCase().includes(search.toLowerCase()) ||
            (item.user?.name || '').toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            let valA = a[sortKey];
            let valB = b[sortKey];

            // Penanganan khusus
            if (sortKey === 'created_at') {
                valA = new Date(valA);
                valB = new Date(valB);
            } else if (sortKey === 'user') {
                valA = (a.user?.name || '').toLowerCase();
                valB = (b.user?.name || '').toLowerCase();
            } else if (sortKey === 'total_setoran') {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            } else {
                valA = String(valA).toLowerCase();
                valB = String(valB).toLowerCase();
            }

            if (valA < valB) return sortDesc ? 1 : -1;
            if (valA > valB) return sortDesc ? -1 : 1;
            return 0;
        });

    const SortIcon = ({ active, desc }) => (
        <span className="inline-block ml-1">
            {desc ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-caret-up-fill" viewBox="0 0 16 16">
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                </svg>
            )}
        </span>
    );

    // Total per kategori
    const totalPerKategori = {};
    laporan.forEach(item => {
        if (!totalPerKategori[item.nama_sampah]) {
            totalPerKategori[item.nama_sampah] = 0;
        }
        totalPerKategori[item.nama_sampah] += parseFloat(item.total_setoran);
    });

    // Total per user (untuk Pie Chart)
    const userTotals = {};
    laporan.forEach(item => {
        const user = item.user?.name || 'Tidak Diketahui';
        if (!userTotals[user]) userTotals[user] = 0;
        userTotals[user] += parseFloat(item.total_setoran);
    });

    const chartData = {
        labels: Object.keys(userTotals),
        datasets: [
            {
                label: 'Total Setoran',
                data: Object.values(userTotals),
                backgroundColor: [
                    '#3b82f6',
                    '#f97316',
                    '#10b981',
                    '#6366f1',
                    '#f43f5e',
                    '#eab308',
                    '#14b8a6',
                    '#8b5cf6',
                    '#ec4899',
                    '#22d3ee'
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <div className="mx-auto w-full max-w-[500px] min-h-screen bg-white">
            <Head title="Laporan Pengguna" />

            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-10 bg-main shadow">
                <div className="flex justify-between items-center px-4 py-2">
                    <div className="flex items-center space-x-3">
                        <button onClick={() => window.history.back()}>
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>
                        <span className="text-white font-bold text-lg">Laporan Pengguna</span>
                    </div>
                </div>
            </div>

            {/* Search & Sort */}
            <div className="mt-[64px] px-4 py-3 flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Cari nama atau kategori"
                    className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring focus:ring-main"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Table */}
            <div className="px-4 pb-6">
                <table className="min-w-full text-sm text-left border rounded shadow overflow-hidden">
                    <thead className="bg-main text-white text-sm">
                        {/* Baris label kolom */}
                        <tr>
                            <th className="px-3 pt-2 pb-0 text-center">Nama</th>
                            <th className="px-3 pt-2 pb-0 text-center">Kategori</th>
                            <th className="px-3 pt-2 pb-0 text-center">Total Setoran</th>
                            <th className="px-3 pt-2 pb-0 text-center">Tanggal</th>
                        </tr>

                        {/* Baris ikon (hanya ikon yang clickable) */}
                        <tr>
                            <th
                                className="px-3 pt-0 pb-2 text-center cursor-pointer"
                                onClick={() => toggleSort('user')}
                                title="Urutkan Nama"
                            >
                                <SortIcon active={sortKey === 'user'} desc={sortKey === 'user' ? sortDesc : true} />
                            </th>
                            <th
                                className="px-3 pt-0 pb-2 text-center cursor-pointer"
                                onClick={() => toggleSort('nama_sampah')}
                                title="Urutkan Kategori"
                            >
                                <SortIcon active={sortKey === 'nama_sampah'} desc={sortKey === 'nama_sampah' ? sortDesc : true} />
                            </th>
                            <th
                                className="px-3 pt-0 pb-2 text-center cursor-pointer"
                                onClick={() => toggleSort('total_setoran')}
                                title="Urutkan Total Setoran"
                            >
                                <SortIcon active={sortKey === 'total_setoran'} desc={sortKey === 'total_setoran' ? sortDesc : true} />
                            </th>
                            <th
                                className="px-3 pt-0 pb-2 text-center cursor-pointer"
                                onClick={() => toggleSort('created_at')}
                                title="Urutkan Tanggal"
                            >
                                <SortIcon active={sortKey === 'created_at'} desc={sortKey === 'created_at' ? sortDesc : true} />
                            </th>
                        </tr>
                    </thead>



                    <tbody>
                        {filtered.length > 0 ? (
                            filtered.map(item => (
                                <tr key={item.id} className="border-b">
                                    <td className="px-3 py-2">{item.user?.name || '-'}</td>
                                    <td className="px-3 py-2">{item.nama_sampah}</td>
                                    <td className="px-3 py-2">
                                        {item.total_setoran != null
                                            ? parseFloat(item.total_setoran).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 3 })
                                            : '-'}
                                    </td>
                                    <td className="px-3 py-2">{new Date(item.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center px-3 py-4 text-gray-500">
                                    Data tidak ditemukan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Ringkasan Total per Kategori */}
            <div className="px-4 pb-6">
                <h2 className="font-semibold text-main mb-2">Total Setoran per Kategori</h2>
                <ul className="space-y-1 text-sm">
                    {Object.entries(totalPerKategori).map(([kategori, total]) => (
                        <li key={kategori} className="flex justify-between">
                            <span>{kategori}</span>
                            <span>{total.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 3 })}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Pie Chart Kontribusi Pengguna */}
            <div className="px-4 pb-6">
                <h2 className="font-semibold text-main mb-2">Kontribusi Pengguna</h2>
                <div className="bg-white border rounded shadow p-4">
                    <Pie data={chartData} />
                </div>
            </div>
        </div>
    );
}
