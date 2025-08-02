import SidebarDrawer from '@/Components/SidebarDrawer';
import { usePage } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';

export default function GaleriProduk({ produkOlahan }) {
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterKategori, setFilterKategori] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedId, setExpandedId] = useState(null);
    const itemsPerPage = 8;
    const { kategoriSampah } = usePage().props;

    const filteredSortedProduk = useMemo(() => {
        let data = [...produkOlahan];

        if (search.trim() !== '') {
            const keyword = search.toLowerCase();
            data = data.filter(p =>
                p.nama_produk.toLowerCase().includes(keyword)
            );
        }

        if (filterKategori !== '') {
            data = data.filter(p => p.sampah?.nama_sampah === filterKategori);
        }

        data.sort((a, b) => {
            const nameA = a.nama_produk.toLowerCase();
            const nameB = b.nama_produk.toLowerCase();
            if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
            if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        return data;
    }, [produkOlahan, search, sortOrder, filterKategori]);



    const totalPages = Math.ceil(filteredSortedProduk.length / itemsPerPage);
    const paginatedProduk = filteredSortedProduk.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="mx-auto w-full min-h-screen bg-main-white">
            {/* HEADER */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-20 bg-main">
                <div className="w-full flex flex-row justify-between items-center px-4 py-2 bg-main">
                    {/* Kiri: Tombol Back + Judul */}
                    <div className="flex flex-row items-center space-x-4">
                        <div className="font-bold text-white text-lg">Galeri Produk Olahan</div>
                    </div>

                    {/* Kanan: Sidebar Drawer */}
                    <SidebarDrawer />
                </div>

                {/* SEARCH + SORT + FILTER */}
                <div className="sticky top-[44px] z-10 bg-white shadow px-4 py-3 border-b border-gray-200 shadow-lg">
                    <div className="flex space-x-2 items-center">
                        {/* Input Pencarian */}
                        <div className="flex-grow h-9 flex items-center pr-2 py-2 rounded-lg bg-neutral-100 border-2 border-gray-200">
                            <input
                                type="text"
                                placeholder="Cari nama produk..."
                                value={search}
                                onChange={e => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="bg-transparent border-none flex-grow text-sm placeholder-gray-400 focus:ring-0 focus:outline-none"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5 text-main" viewBox="0 0 24 24">
                                <path d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5 1.49-1.49-5-5zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
                            </svg>
                        </div>

                        {/* Sort */}
                        <button
                            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                            className="text-sm text-gray-700 hover:text-main"
                        >
                            {sortOrder === 'asc' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="w-6 h-6 text-main"
                                    viewBox="0 0 16 16"
                                >
                                    <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z" />
                                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    className="w-6 h-6 text-main"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645z" />
                                    <path fillRule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371zm1.57-.785L11 9.688h-.047l-.652 2.156z" />
                                    <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                                </svg>
                            )}                </button>
                    </div>

                    {/* Filter Kategori */}
                    <select
                        value={filterKategori}
                        onChange={e => {
                            setFilterKategori(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full mt-2 px-3 py-1.5 border border-gray-300 rounded text-sm"
                    >
                        <option value="">Semua Kategori</option>
                        {kategoriSampah.map(k => (
                            <option key={k.id} value={k.nama_sampah}>{k.nama_sampah}</option>
                        ))}
                    </select>

                </div>
            </div>

            {/* SPACER untuk menghindari overlap header */}
            <div className="h-[180px]" />

            {/* PRODUK LIST */}
            <div className="px-4 pb-8 space-y-4">
                {paginatedProduk.length === 0 ? (
                    <div className="text-center text-gray-600 mt-10">
                        Tidak ada produk ditemukan.
                    </div>
                ) : (
                    paginatedProduk.map(item => {
                        const isExpanded = expandedId === item.id;

                        const status = item.status || 'tersedia';

                        return (
                            <div
                                key={item.id}
                                className="rounded-lg overflow-hidden shadow-md bg-white"
                            >
                                <div className="relative">
                                    <img
                                        src={
                                            item.foto ? `/storage/${item.foto}` : '/storage/logo_no_bg.png'
                                        }
                                        alt={item.nama_produk}
                                        className="w-full h-48 object-cover"
                                    />

                                    {/* Badge Kategori (via relasi item.sampah.nama_sampah) */}
                                    <div className="absolute top-3 left-3 bg-main text-white text-xs font-semibold py-1 px-3 rounded">
                                        {item.sampah?.nama_sampah || 'Tanpa Kategori'}
                                    </div>
                                </div>

                                <div
                                    className="p-4 pb-2 cursor-pointer"
                                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                                >
                                    <h5
                                        className={`text-main text-lg font-bold mb-1 ${isExpanded ? 'break-words' : 'truncate'
                                            }`}
                                    >
                                        {item.nama_produk}
                                    </h5>

                                    <p
                                        className={`text-gray-700 text-sm mb-2 ${isExpanded ? 'break-words line-clamp-none' : 'line-clamp-2'
                                            }`}
                                    >
                                        {item.deskripsi || 'Tidak ada deskripsi.'}
                                    </p>

                                    <hr className="border-t border-gray-200 my-2" />

                                    <div className="flex justify-between items-center text-sm text-gray-600 py-2">
                                        <div>
                                            {item.link_pembelian?.trim() && (
                                                <a
                                                    href={item.link_pembelian}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center bg-green-500 text-white px-3 py-2 rounded-full text-xs font-semibold hover:bg-green-600 transition"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4 mr-2" viewBox="0 0 16 16">
                                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                                    </svg>
                                                    Beli Sekarang
                                                </a>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(item.created_at).toLocaleString('id-ID', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </div>
                                    </div>


                                </div>
                            </div>
                        );
                    })
                )}
            </div>



            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full bg-white border-t border-gray-200 py-2 px-4 flex justify-center space-x-2">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                    >
                        Prev
                    </button>
                    {[...Array(totalPages).keys()].map(i => {
                        const pageNum = i + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                className={`px-3 py-1 rounded text-sm ${currentPage === pageNum ? 'bg-main text-white' : 'border'}`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}