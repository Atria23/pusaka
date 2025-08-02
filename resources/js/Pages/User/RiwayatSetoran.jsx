import React, { useState, useMemo } from 'react';
import { usePage } from '@inertiajs/react';
import SidebarDrawer from '@/Components/SidebarDrawer';

export default function RiwayatSetoranIndex() {
    const [expandedId, setExpandedId] = useState(null);
    const { setoranList = [] } = usePage().props;

    const [globalSearch, setGlobalSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortByDate, setSortByDate] = useState('desc');

    const itemsPerPage = 20;

    const filteredSetoran = useMemo(() => {
        if (!globalSearch) return setoranList;

        const searchLower = globalSearch.toLowerCase();
        return setoranList.filter(item => {
            const sampahName = item.sampah?.nama_sampah?.toLowerCase() ?? '';
            return sampahName.includes(searchLower);
        });
    }, [globalSearch, setoranList]);

    const sortedSetoran = [...filteredSetoran].sort((a, b) => {
        const dateA = new Date(a.tanggal);
        const dateB = new Date(b.tanggal);
        return sortByDate === 'asc' ? dateA - dateB : dateB - dateA;
    });

    const paginatedSetoran = sortedSetoran.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredSetoran.length / itemsPerPage);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('id-ID').format(number);
    };

    const formatDateTime = (datetime) => {
        const dateObj = new Date(datetime);
        const dd = String(dateObj.getDate()).padStart(2, '0');
        const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
        const yy = String(dateObj.getFullYear()).slice(2);
        const hh = String(dateObj.getHours()).padStart(2, '0');
        const min = String(dateObj.getMinutes()).padStart(2, '0');
        return `${dd}/${mm}/${yy}, ${hh}.${min}`;
    };

    return (
        <div className="mx-auto w-full min-h-screen bg-white">
            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-20 bg-main">
                <div className="w-full flex flex-row justify-between items-center px-4 py-2 bg-main">
                    {/* Kiri: Tombol Back + Judul */}
                    <div className="flex flex-row items-center space-x-4">
                        <div className="font-bold text-white text-lg">Riwayat Setoran</div>
                    </div>

                    {/* Kanan: Sidebar Drawer */}
                    <SidebarDrawer />
                </div>
                {/* Search & Sort */}
                <div className={`sticky top-[44px] z-10 bg-white shadow px-4 py-3 border-b border-gray-200 shadow-lg`}>
                    <div className="flex space-x-4 items-center">
                        {/* Input Pencarian */}
                        <div className="flex-grow h-9 flex flex-row items-center justify-center pr-2 py-2 rounded-lg bg-neutral-100 border-2 border-gray-200">
                            <input
                                type="text"
                                placeholder="Cari berdasarkan nama user atau jenis sampah..."
                                value={globalSearch}
                                onChange={(e) => setGlobalSearch(e.target.value)}
                                className="bg-transparent border-none flex-grow focus:ring-0 focus:outline-none text-sm placeholder-gray-400"
                            />
                            {/* Ikon Search */}
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

                        {/* Tombol Sort Tanggal */}
                        <button
                            onClick={() => setSortByDate(sortByDate === 'asc' ? 'desc' : 'asc')}
                            className="flex items-center space-x-2 text-sm text-gray-700 hover:text-main transition"
                        >
                            {sortByDate === 'asc' ? (
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
            <div className="h-[140px]" />

            <div className="px-4 grid grid-cols-1 gap-4">

                {paginatedSetoran.length > 0 ? (
                    paginatedSetoran.map(item => (
                        <div
                            key={item.id}
                            className="flex flex-col bg-white rounded-lg shadow p-4 space-y-3"
                        >
                            <div className="flex items-center space-x-4">
                                <div className='w-max'>
                                    <div className="w-24 h-24 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                        {item.sampah?.image ? (
                                            <img
                                                src={`/storage/${item.sampah.image}`}
                                                alt={item.sampah.nama_sampah}
                                                className="w-24 h-24 object-cover"
                                            />
                                        ) : (
                                            <div className="text-xs text-gray-500">No Image</div>
                                        )}
                                    </div>
                                </div>
                                <div className='w-full flex flex-col space-y-2'>
                                    <div className="flex-1">
                                        {/* <div className="font-semibold text-base max-w-[15vw] break-words">
                                            {item.sampah?.nama_sampah}
                                        </div> */}
                                        <div
                                            className={`font-semibold text-base max-w-full break-words overflow-hidden transition-all duration-200 cursor-pointer ${expandedId === item.id ? 'line-clamp-none' : 'line-clamp-2'
                                                }`}
                                            style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}
                                            onClick={() =>
                                                setExpandedId(expandedId === item.id ? null : item.id)
                                            }
                                        >
                                            {item.sampah?.nama_sampah}
                                        </div>


                                        <div className="text-sm text-gray-700">
                                            Berat: <span className="font-medium">{formatNumber(item.berat_dalam_kg * 1000)} gram</span>
                                        </div>
                                        <div className="text-sm text-main font-bold">
                                            Poin: {formatNumber(item.poin_diperoleh)}
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-2 text-xs text-gray-600">
                                        <div className="flex items-center space-x-1 bg-gray-100 px-1.5 py-0.5 rounded-full">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m2 0a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2m14 0v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                                            </svg>
                                            <span>{formatDateTime(item.tanggal)}</span>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-4 text-center text-gray-500">Belum ada setoran.</p>
                )}
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center space-x-2 pb-8">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                    >
                        Prev
                    </button>

                    {[...Array(totalPages).keys()].map(i => {
                        const pageNum = i + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                className={`px-3 py-1 rounded border ${currentPage === pageNum ? 'bg-main text-white' : 'border-gray-300'
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
