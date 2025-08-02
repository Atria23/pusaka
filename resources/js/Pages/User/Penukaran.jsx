import SidebarDrawer from '@/Components/SidebarDrawer';
import React, { useMemo, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function Penukaran({ penukarans }) {
    const [expandedId, setExpandedId] = useState(null);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPenukaran, setSelectedPenukaran] = useState(null); // Untuk menyimpan data yang mau ditukar

    const itemsPerPage = 10;

    const filteredSortedPenukarans = useMemo(() => {
        let filtered = penukarans;
        if (search.trim() !== '') {
            filtered = filtered.filter((p) => p.voucher?.nama?.toLowerCase().includes(search.toLowerCase()));
        }
        filtered.sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        return filtered;
    }, [penukarans, search, sortOrder]);

    const totalPages = Math.ceil(filteredSortedPenukarans.length / itemsPerPage);
    const paginatedPenukarans = filteredSortedPenukarans.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="mx-auto w-full min-h-screen bg-gray-100">
            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-10 bg-main">
                <div className="w-full flex flex-row justify-between items-center px-4 py-2 bg-main">
                    {/* Kiri: Tombol Back + Judul */}
                    <div className="flex flex-row items-center space-x-4">
                        <div className="font-bold text-white text-lg">Penukaran</div>
                    </div>

                    {/* Kanan: Sidebar Drawer */}
                    <SidebarDrawer />
                </div>
                {/* Search & Sort */}
                <div className="w-full h-max flex flex-col space-y-4 items-center justify-start p-4 bg-white shadow-lg">
                    <div className="w-full flex space-x-4">
                        {/* Search Bar */}
                        <div className="w-full h-9 flex flex-row items-center justify-center pr-2 py-2 rounded-lg bg-neutral-100 border-2 border-gray-200">
                            <input
                                type="text"
                                className="bg-transparent border-none flex-grow focus:ring-0 focus:outline-none placeholder-gray-400"
                                placeholder="Cari voucher"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.3"
                                className="w-5 h-5 text-main"
                            >
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16a6.471 6.471 0 0 0 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.505 4.505 0 0 1 9.5 14z" />
                            </svg>
                        </div>

                        {/* Sort Button */}
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="flex flex-row space-x-2 items-center justify-center py-2"
                        >
                            {sortOrder === 'asc' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 text-main"
                                >
                                    <path d="M6.75 2.25A.75.75 0 017.5 3v.75h9V3a.75.75 0 011.5 0v.75h.75A2.25 2.25 0 0121 6v12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6a2.25 2.25 0 012.25-2.25H6V3a.75.75 0 01.75-.75zM4.5 8.25v9.75a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V8.25H4.5z" />
                                    <path fillRule="evenodd" d="M12 16a.75.75 0 01-.75-.75v-3.69l-1.22 1.22a.75.75 0 11-1.06-1.06l2.5-2.5a.75.75 0 011.06 0l2.5 2.5a.75.75 0 11-1.06 1.06l-1.22-1.22v3.69A.75.75 0 0112 16z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                // Ikon Z-A (urutan turun)
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 text-main"
                                >
                                    <path d="M6.75 2.25A.75.75 0 017.5 3v.75h9V3a.75.75 0 011.5 0v.75h.75A2.25 2.25 0 0121 6v12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6a2.25 2.25 0 012.25-2.25H6V3a.75.75 0 01.75-.75zM4.5 8.25v9.75a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V8.25H4.5z" />
                                    <path fillRule="evenodd" d="M12 12a.75.75 0 01.75.75v3.69l1.22-1.22a.75.75 0 111.06 1.06l-2.5 2.5a.75.75 0 01-1.06 0l-2.5-2.5a.75.75 0 111.06-1.06l1.22 1.22v-3.69A.75.75 0 0112 12z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-[150px]" />

            {/* List */}
            <div className="px-4 pb-8 space-y-4">
                {paginatedPenukarans.length === 0 ? (
                    <div className="text-center text-gray-600 mt-10">Tidak ada penukaran ditemukan.</div>
                ) : (
                    paginatedPenukarans.map((p) => {
                        const v = p.voucher;
                        return (
                            <div key={p.id} className="rounded-lg overflow-hidden shadow-md bg-white">
                                <div className="relative">
                                    <img src={v?.gambar ? `/storage/${v.gambar}` : '/storage/logo_no_bg.png'} alt={v?.nama} className="w-full h-48 object-cover" />
                                    <div className="absolute top-3 left-3 bg-main text-white text-xs font-semibold py-1 px-3 rounded">{v?.kategori || 'Voucher'}</div>
                                    <div className={`absolute top-3 right-3 text-xs font-semibold py-1 px-3 rounded ${p.status === 'sudah diredeem'
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-amber-100 text-amber-700'
                                        }`}>
                                        {p.status === 'sudah diredeem' ? 'Terpakai' : 'Belum Digunakan'}
                                    </div>

                                </div>

                                <div className="p-4 pb-2 cursor-pointer" onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}>
                                    <h5 className={`text-main text-lg font-bold mb-1 ${expandedId === p.id ? 'break-words' : 'truncate'}`}>{v?.nama}</h5>
                                    <p className={`text-gray-700 text-sm mb-2 ${expandedId === p.id ? 'break-words line-clamp-none' : 'line-clamp-2'}`}>{v?.deskripsi}</p>

                                    <div className="flex justify-between items-center text-sm text-gray-600 border-t pt-2 mt-2">
                                        <div className="flex items-center space-x-1 text-yellow-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" className="w-4 h-4 text-yellow-500">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.5 4.002V12h1.283V9.164h1.668C10.033 9.164 11 8.08 11 6.586c0-1.482-.955-2.584-2.538-2.584zm2.77 4.072c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97z" />
                                            </svg>
                                            <span className="font-medium">
                                                {p?.poin_dipakai != null ? Number(p.poin_dipakai).toLocaleString('id-ID') : '-'} Poin
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">{new Date(p.created_at).toLocaleString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                                    </div>


                                    {/* Tombol Tukarkan */}
                                    {p.status === 'belum diredeem' && (
                                        <div className="flex justify-center py-2">
                                            <button
                                                onClick={() => setSelectedPenukaran(p)}
                                                className="w-full bg-main text-white px-6 py-2 rounded-lg font-semibold shadow"
                                            >
                                                Gunakan Voucher
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {selectedPenukaran && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="flex flex-col items-center justify-center bg-white rounded-lg p-6 w-[300px] text-center relative">
                        <h3 className="font-bold text-lg mb-4">QR Voucher</h3>
                        <QRCodeCanvas value={`${selectedPenukaran.id}`} size={200} />
                        <div className="mt-3 text-center">
                            <p className="text-sm text-gray-600">ID Voucher: <span className="font-medium">{selectedPenukaran.id}</span></p>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(selectedPenukaran.id.toString());
                                    alert("ID Penukaran disalin ke clipboard!");
                                }}
                                className="mt-1 px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                            >
                                Salin ID Voucher
                            </button>
                        </div>

                        <div className="mt-4 px-3 py-2 bg-yellow-100 text-yellow-800 rounded-md shadow-md">
                            <div className="flex items-center space-x-2 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 19c-3.866 0-7-3.134-7-7s3.134-7 7-7 7 3.134 7 7-3.134 7-7 7z" />
                                </svg>
                                <span className="text-sm font-semibold">
                                    Informasi Penukaran
                                </span>
                            </div>
                            <hr className="border-yellow-300 mb-2" />
                            <p className="text-sm text-justify">
                                Tunjukkan QR atau kirimkan ID Voucher ini ke pengelola air (<b>{selectedPenukaran.user?.pengelola_air?.nama ?? 'pengelola air'}</b>) saat penukaran.
                            </p>
                        </div>

                        <button onClick={() => setSelectedPenukaran(null)} className="w-full mt-5 px-4 py-2 bg-red-500 text-white rounded shadow-md">Tutup</button>
                    </div>
                </div>
            )}

        </div>
    );
}
