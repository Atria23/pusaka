import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function ProdukOlahan({ produkOlahan, sampah }) {
    const [form, setForm] = useState({
        id: null,
        nama_produk: '',
        sampah_id: '',
        foto: null,
        link_pembelian: '',
    });

    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [editing, setEditing] = useState(false);
    const [formVisible, setFormVisible] = useState(false);

    // Untuk fitur search & filter & sort & pagination
    const [expandedId, setExpandedId] = useState(null);
    const [globalSearch, setGlobalSearch] = useState('');
    const [filterKategori, setFilterKategori] = useState('');
    const [searchKategori, setSearchKategori] = useState('');
    const [dropdownVisibleKategori, setDropdownVisibleKategori] = useState(false);
    const [sortByName, setSortByName] = useState('asc'); // 'asc' or 'desc'
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const kategoriRef = useRef(null);

    // Saat user klik tombol edit
    const handleEdit = (item) => {
        setForm({
            id: item.id,
            nama_produk: item.nama_produk,
            sampah_id: item.sampah_id,
            foto: null,
            link_pembelian: item.link_pembelian || '',
        });
        setPreview(item.foto ? `/storage/${item.foto}` : null);
        setEditing(true);
        setFormVisible(true);
        setSearchKategori(
            sampah.find((k) => k.id === item.sampah_id)?.nama_sampah || ''
        );
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    const resetForm = () => {
        setForm({ id: null, nama_produk: '', sampah_id: '', foto: null });
        setEditing(false);
        setPreview(null);
        setFormVisible(false);
        setSearchKategori('');
        setDropdownVisibleKategori(false);
        if (fileInputRef.current) fileInputRef.current.value = null;
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'foto') {
            const file = files[0];
            setForm((prev) => ({ ...prev, foto: file }));
            setPreview(URL.createObjectURL(file));
        } else if (name === 'searchKategori') {
            setSearchKategori(value);
            setDropdownVisibleKategori(true);
            setForm((prev) => ({ ...prev, sampah_id: '' })); // reset sampah_id saat ketik ulang kategori
        } else {
            let newValue = value;

            if (name === 'link_pembelian') {
                // Jika user mengetik, tambahkan https:// jika belum ada http/https di awal
                if (newValue && !/^https?:\/\//i.test(newValue)) {
                    newValue = 'https://' + newValue;
                }
            }

            setForm((prev) => ({ ...prev, [name]: newValue }));
        }

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.sampah_id) {
            alert('Kategori sampah harus dipilih dari daftar.');
            return;
        }

        const formData = new FormData();
        formData.append('nama_produk', form.nama_produk);
        formData.append('sampah_id', form.sampah_id);
        formData.append('link_pembelian', form.link_pembelian || '');

        if (form.foto instanceof File) {
            formData.append('foto', form.foto);
        }

        const url = editing
            ? route('admin.produk-olahan.update', form.id)
            : route('admin.produk-olahan.store');

        if (editing) {
            formData.append('_method', 'PUT');
        }

        Inertia.post(url, formData, {
            forceFormData: true,
            onSuccess: () => resetForm(),
            onError: (errors) => console.error(errors),
        });
    };

    // Delete handler dengan konfirmasi
    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus produk ini?')) {
            Inertia.delete(route('admin.produk-olahan.destroy', id));
        }
    };

    // Filter produk berdasarkan search global dan filter kategori
    const filteredProduk = useMemo(() => {
        return produkOlahan.filter((item) => {
            const namaProdukLower = item.nama_produk.toLowerCase();
            const sampahItem = sampah.find((s) => s.id === item.sampah_id);
            const namaSampahLower = sampahItem?.nama_sampah.toLowerCase() || '';

            const searchLower = globalSearch.toLowerCase();

            const matchesSearch =
                namaProdukLower.includes(searchLower) || namaSampahLower.includes(searchLower);

            const matchesKategori = filterKategori
                ? item.sampah_id.toString() === filterKategori.toString()
                : true;

            return matchesSearch && matchesKategori;
        });
    }, [globalSearch, filterKategori, produkOlahan, sampah]);

    // Sort produk by nama_produk
    const sortedProduk = useMemo(() => {
        const sorted = [...filteredProduk];
        sorted.sort((a, b) => {
            if (a.nama_produk < b.nama_produk) return sortByName === 'asc' ? -1 : 1;
            if (a.nama_produk > b.nama_produk) return sortByName === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [filteredProduk, sortByName]);

    // Pagination calculation
    const totalPages = Math.ceil(sortedProduk.length / itemsPerPage);
    const paginatedProduk = sortedProduk.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Ganti halaman
    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Filter kategori dengan searchKategori untuk dropdown autocomplete
    const filteredKategori = useMemo(() => {
        if (!searchKategori.trim()) return sampah;
        const lowerSearch = searchKategori.toLowerCase();
        return sampah.filter((k) => k.nama_sampah.toLowerCase().includes(lowerSearch));
    }, [searchKategori, sampah]);

    // Klik pilihan kategori dropdown
    const handleSelectKategori = (item) => {
        setSearchKategori(item.nama_sampah);
        setForm((prev) => ({ ...prev, sampah_id: item.id }));
        setDropdownVisibleKategori(false);
    };

    // Tutup dropdown saat klik di luar
    useEffect(() => {
        function handleClickOutside(event) {
            if (kategoriRef.current && !kategoriRef.current.contains(event.target)) {
                setDropdownVisibleKategori(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="mx-auto w-full max-w-[500px] min-h-screen bg-white">

            <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[500px] w-full z-20 bg-main">
                <div className="w-full h-max flex flex-row space-x-4 justify-start items-center px-4 py-2 bg-main">
                    {/* Left Section (Back Icon + Title) */}
                    <div className="w-full h-max flex flex-row space-x-4 items-center justify-start">
                        {/* Back Icon */}
                        <button
                            className="shrink-0 w-6 h-6"
                            onClick={() => window.history.back()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>
                        {/* Title */}
                        <div className="font-utama text-white font-bold text-lg">
                            Kelola Produk Olahan
                        </div>
                    </div>
                    {/* Plus Icon */}
                    <button

                        onClick={() => {
                            resetForm();
                            setFormVisible(true);
                        }} className="flex items-center w-6 h-6"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8" />
                            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Form tambah/edit produk */}
            {formVisible && (
                <form
                    onSubmit={handleSubmit}
                    className="sticky top-12 z-20 bg-white px-4 py-4 shadow-sm rounded-b-lg space-y-4 max-w-md mx-auto"
                >
                    <h2 className="text-xl font-semibold mb-4">
                        {editing ? 'Edit Produk Olahan' : 'Tambah Produk Olahan'}
                    </h2>

                    {/* Nama Produk */}
                    <div>
                        <label htmlFor="nama_produk" className="block text-sm font-semibold text-gray-700 mb-2">
                            Nama Produk
                        </label>
                        <input
                            type="text"
                            id="nama_produk"
                            name="nama_produk"
                            value={form.nama_produk}
                            onChange={handleChange}
                            placeholder="Nama Produk"
                            required
                            className="input w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main bg-white"
                        />
                    </div>

                    {/* Kategori Sampah dengan autocomplete */}
                    <div ref={kategoriRef} className="relative">
                        <label htmlFor="searchKategori" className="block text-sm font-semibold text-gray-700 mb-2">
                            Cari dan pilih kategori sampah
                        </label>
                        <input
                            type="text"
                            id="searchKategori"
                            name="searchKategori"
                            value={searchKategori}
                            onChange={handleChange}
                            onFocus={() => setDropdownVisibleKategori(true)}
                            placeholder="Ketik kategori sampah..."
                            required
                            autoComplete="off"
                            className="input w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main bg-white cursor-pointer"
                        />
                        {dropdownVisibleKategori && filteredKategori.length > 0 && (
                            <div className="absolute w-full mt-1 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow z-30">
                                {filteredKategori.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleSelectKategori(item)}
                                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    >
                                        {item.nama_sampah}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Foto Produk */}
                    <div>
                        <label htmlFor="foto" className="block text-sm font-semibold text-gray-700 mb-2">
                            Foto Produk
                        </label>
                        <input
                            type="file"
                            id="foto"
                            name="foto"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleChange}
                            className="w-full"
                        />
                        {preview && (
                            <img
                                src={preview}
                                alt="Preview"
                                className="mb-3 mx-auto max-h-48 object-contain rounded"
                            />
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Link Pembelian (opsional)
                        </label>
                        <input
                            type="url"
                            name="link_pembelian"
                            value={form.link_pembelian}
                            onChange={handleChange}
                            className="input w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main bg-white"
                            placeholder="https://"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="flex-1 py-3 rounded-lg font-semibold text-white bg-main hover:bg-main/90 transition"
                        >
                            {editing ? 'Update' : 'Simpan'}
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                            Batal
                        </button>
                    </div>
                </form>
            )}


            {/* Search global dan filter kategori di luar form */}
            <div className={`sticky top-[44px] flex flex-col space-y-2 z-10 bg-white shadow px-4 py-3 border-b border-gray-200 ${formVisible ? 'hidden' : ''}`}>
                <div className="flex space-x-4 items-center">
                    {/* Input Pencarian */}
                    <div className="flex-grow h-9 flex flex-row items-center justify-center pr-2 py-2 rounded-lg bg-neutral-100 border-2 border-gray-200">
                        <input
                            type="text"
                            placeholder="Cari produk atau kategori..."
                            value={globalSearch}
                            onChange={e => {
                                setGlobalSearch(e.target.value);
                                setCurrentPage(1);
                            }}
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

                    {/* Tombol Sort Nama Produk */}
                    <button
                        onClick={() => setSortByName(sortByName === 'asc' ? 'desc' : 'asc')}
                        className="flex items-center space-x-1 text-sm text-gray-700 hover:text-main transition"
                        title={`Sort nama produk ${sortByName === 'asc' ? 'A-Z' : 'Z-A'}`}
                    >
                        {sortByName === 'asc' ? (
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
                        )}

                    </button>
                </div>


                {/* Select Kategori */}
                <select
                    value={filterKategori}
                    onChange={e => {
                        setFilterKategori(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full h-9 px-3 rounded-lg border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-main"
                >
                    <option value="">Semua Kategori</option>
                    {sampah.map(k => (
                        <option key={k.id} value={k.id}>
                            {k.nama_sampah}
                        </option>
                    ))}
                </select>
            </div>


            {/* Daftar produk */}
            <div className="p-4 grid grid-cols-1 gap-4 mt-12">
                {paginatedProduk.length > 0 ? (
                    paginatedProduk.map(item => {

                        return (
                            <div
                                key={item.id}
                                className="flex flex-col bg-white rounded-lg shadow p-4 space-y-3"
                            >
                                {/* Baris pertama: foto produk, nama produk, kategori */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                        {item.foto ? (
                                            <img
                                                src={`/storage/${item.foto}`}
                                                alt={item.nama_produk}
                                                className="w-16 h-16 object-cover"
                                            />
                                        ) : (
                                            <div className="text-xs text-gray-500">No Image</div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
                                        <div
                                            className={`font-semibold text-base text-gray-800 ${expandedId === item.id ? 'break-words' : 'line-clamp-3'} max-w-[20vw]`}
                                            title={item.nama_produk}
                                        >
                                            {item.nama_produk}
                                        </div>
                                        <div
                                            className={`text-sm text-gray-600 ${expandedId === item.id ? 'break-words' : 'line-clamp-2'} max-w-[20vw]`}
                                            title={item.sampah?.nama_sampah || 'Tanpa Kategori'}
                                        >
                                            {item.sampah?.nama_sampah || 'Tanpa Kategori'}
                                        </div>
                                    </div>

                                    {/* Aksi tombol edit dan delete */}
                                    <div className="flex flex-col space-y-1 flex-shrink-0">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="text-xs text-yellow-700 bg-yellow-200 hover:bg-yellow-300 px-2 py-1 rounded-xl transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-xs text-red-700 bg-red-200 hover:bg-red-300 px-2 py-1 rounded-xl transition"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="p-4 text-center text-gray-500">Belum ada produk olahan.</p>
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

                    {[...Array(totalPages).keys()].map((_, i) => {
                        const pageNum = i + 1;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => goToPage(pageNum)}
                                className={`px-3 py-1 rounded border ${currentPage === pageNum
                                    ? 'bg-main text-white border-main'
                                    : 'border-gray-300'
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
