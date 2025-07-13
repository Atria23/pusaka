import React, { useState, useMemo, useRef } from 'react';
import { Inertia } from '@inertiajs/inertia';

export default function Vouchers({ vouchers }) {
    const [form, setForm] = useState({
        id: null,
        nama: '',
        deskripsi: '',
        nilai_poin: '',
        stok: '',
        status: 'tersedia',
        gambar: null,
    });
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [editing, setEditing] = useState(false);
    const [expandedId, setExpandedId] = useState(null);

    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [formVisible, setFormVisible] = useState(false);

    const filteredSortedVouchers = useMemo(() => {
        let filtered = vouchers;

        if (search.trim() !== '') {
            filtered = filtered.filter((v) =>
                v.nama.toLowerCase().includes(search.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.nama.localeCompare(b.nama);
            } else {
                return b.nama.localeCompare(a.nama);
            }
        });

        return filtered;
    }, [vouchers, search, sortOrder]);

    const resetForm = () => {
        setForm({
            id: null,
            nama: '',
            deskripsi: '',
            nilai_poin: '',
            stok: '',
            status: 'tersedia',
            gambar: null,
        });
        setEditing(false);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // reset input file
        }
    };

    const handleEdit = (voucher) => {
        setForm({
            id: voucher.id,
            nama: voucher.nama,
            deskripsi: voucher.deskripsi || '',
            nilai_poin: voucher.nilai_poin.toString(),
            stok: voucher.stok.toString(),
            status: voucher.status,
            gambar: null,
        });
        setPreview(voucher.gambar ? `/storage/${voucher.gambar}` : null);
        setEditing(true);
        setFormVisible(true);
        if (fileInputRef.current) {
            fileInputRef.current.value = null; // reset input file juga saat edit
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'gambar') {
            const file = files[0];
            setForm((prev) => ({ ...prev, gambar: file }));
            setPreview(URL.createObjectURL(file));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama', form.nama);
        formData.append('deskripsi', form.deskripsi);
        formData.append('nilai_poin', form.nilai_poin);
        formData.append('stok', form.stok);
        formData.append('status', form.status);

        if (form.gambar instanceof File) {
            formData.append('gambar', form.gambar); // penting: hanya jika user pilih gambar baru
        }

        const url = editing
            ? route('admin.vouchers.update', form.id)
            : route('admin.vouchers.store');

        const method = editing ? 'post' : 'post'; // tetap pakai post, override method di FormData

        if (editing) {
            formData.append('_method', 'PUT'); // override jadi PUT
        }

        Inertia.post(url, formData, {
            forceFormData: true,
            onSuccess: () => resetForm(),
            onError: (errors) => console.error(errors),
        });
    };


    const handleDelete = (id) => {
        if (confirm('Yakin ingin menghapus voucher ini?')) {
            Inertia.delete(route('admin.vouchers.destroy', id));
        }
    };

    const handleAdd = () => {
        resetForm();
        setFormVisible(true);
    };

    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <div className="mx-auto w-full max-w-[500px] max-h-[892px] min-h-screen">
            <div className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[500px] w-full z-10 bg-main">
                {/* Header */}
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
                            Manajemen Voucher
                        </div>
                    </div>
                    {/* Plus Icon */}
                    <button
                        onClick={handleAdd}
                        className="flex items-center w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8" />
                            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z" />
                        </svg>
                    </button>
                </div>

                {formVisible && (editing || form.id === null) && (
                    <form
                        onSubmit={handleSubmit}
                        className="mb-6 p-6 rounded-md shadow-md flex flex-col space-y-2 bg-putih border border-main_light"
                    >
                        <input
                            type="text"
                            name="nama"
                            placeholder="Nama Voucher"
                            value={form.nama}
                            onChange={handleChange}
                            className="border border-main_light rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-main bg-main_white"
                            required
                        />
                        <textarea
                            name="deskripsi"
                            placeholder="Deskripsi Voucher"
                            value={form.deskripsi}
                            onChange={handleChange}
                            className="border border-main_light rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-main bg-main_white resize-none"
                            rows={3}
                        />
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nilai Poin
                            </label>
                            <input
                                type="text"
                                name="nilai_poin"
                                placeholder="Nilai Poin"
                                value={Number(form.nilai_poin || 0).toLocaleString('id-ID')}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\./g, '');
                                    if (!isNaN(value)) {
                                        setForm({ ...form, nilai_poin: value });
                                    }
                                }}
                                className="border border-main_light rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-main bg-main_white"
                                required
                                inputMode="numeric"
                                onWheel={(e) => e.target.blur()}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stok
                            </label>
                            <input
                                type="text"
                                name="stok"
                                placeholder="Stok"
                                value={Number(form.stok || 0).toLocaleString('id-ID')}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\./g, '');
                                    if (!isNaN(value)) {
                                        setForm({ ...form, stok: value });
                                    }
                                }}
                                className="border border-main_light rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-main bg-main_white"
                                required
                                inputMode="numeric"
                                onWheel={(e) => e.target.blur()}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full border px-2 py-1 rounded"
                                required
                            >
                                <option value="tersedia">Tersedia</option>
                                <option value="tidak tersedia">Tidak Tersedia</option>
                            </select>
                        </div>


                        <div className="flex items-start space-x-4 bg-white p-4 rounded-md shadow-sm border border-gray-200">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-20 h-20 object-cover rounded-md border border-gray-300"
                                />
                            ) : (
                                <div className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md text-gray-400 text-xs">
                                    Preview
                                </div>
                            )}

                            <div className="flex flex-col justify-center w-full">
                                <input
                                    type="file"
                                    name="gambar"
                                    accept="image/*"
                                    onChange={handleChange}
                                    ref={fileInputRef}
                                    className="block w-full text-sm text-gray-700
                 file:mr-4 file:py-1.5 file:px-4
                 file:rounded-md file:border-0
                 file:bg-main file:text-white
                 hover:file:bg-main/90
                 cursor-pointer
                 border border-gray-300 rounded-md bg-white"
                                />
                                <p className="mt-1 text-xs text-gray-500">Ukuran maksimal 2MB. Format gambar: JPG, PNG, dll.</p>
                            </div>
                        </div>


                        <div className="flex space-x-3">
                            <button
                                type="submit"
                                className="px-5 py-2 rounded-md text-white font-semibold transition-colors bg-main hover:bg-main_dark"
                            >
                                {editing ? 'Update' : 'Tambah'}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    resetForm();
                                    setFormVisible(false);
                                }}
                                className="px-5 py-2 rounded-md font-semibold border border-main_light text-main_dark hover:bg-main_light hover:text-main_white transition-colors"
                            >
                                Batal
                            </button>
                        </div>
                    </form>
                )}

                {/* Search & Filter */}
                <div className="w-full h-max flex flex-col space-y-4 items-center justify-start p-4 bg-white shadow-lg">
                    <div className='w-full flex space-x-4'>
                        <div className="w-full h-9 flex flex-row mx-auto items-center justify-center pr-2 py-2 rounded-lg bg-neutral-100 border-2 border-gray-200">
                            {/* Search Bar */}
                            <input
                                id="searchInput"
                                type="text"
                                className="bg-transparent border-none flex-grow focus:ring-0 focus:outline-none placeholder-gray-400"
                                placeholder="Cari voucher"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            {/* Search Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="0.3"  // Ubah ketebalan stroke di sini
                                className="w-5 h-5 text-main"
                            >
                                <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16a6.471 6.471 0 0 0 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14A4.5 4.5 0 1 1 14 9.5 4.505 4.505 0 0 1 9.5 14z" />
                            </svg>
                        </div>
                        {/* Sort Button */}
                        <button
                            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                            className="flex flex-row space-x-2 items-center justify-center py-2"
                        >
                            {sortOrder === "asc" ? (
                                // Ikon A-Z (urutan naik)
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-6 h-6 text-main"
                                >
                                    <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371zm1.57-.785L11 2.687h-.047l-.652 2.157z" />
                                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                                </svg>
                            ) : (
                                // Ikon Z-A (urutan turun)
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="w-6 h-6 text-main"
                                >
                                    <path d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645z" />
                                    <path fillRule="evenodd" d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371zm1.57-.785L11 9.688h-.047l-.652 2.156z" />
                                    <path d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>


            {formVisible && (
                <>
                    <div className="mb-[300px]"></div>
                </>
            )}

            <div className="mb-4 min-h-[756px] pt-[113px] bg-white">
                <div className="mb-4 min-h-[756px] bg-white">
                    {filteredSortedVouchers.length > 0 ? (
                        filteredSortedVouchers.map((voucher) => (
                            <>
                                <div
                                    key={voucher.id}
                                    className="flex flex-col bg-white border-b border-gray-200 p-4 space-y-3"
                                >
                                    {/* Baris pertama: gambar, nama, berat, poin */}
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                            {voucher?.gambar ? (
                                                <img
                                                    src={`/storage/${voucher.gambar}`}
                                                    alt="Voucher"
                                                    className="w-16 h-16 object-cover"
                                                />
                                            ) : (
                                                <div className="text-xs text-gray-500">No Image</div>
                                            )}
                                        </div>

                                        <div
                                            className="flex-1 cursor-pointer"
                                            onClick={() => setExpandedId(expandedId === voucher.id ? null : voucher.id)}
                                        >
                                            <div className={`font-semibold text-base break-words line-clamp-1 max-w-[18vw] ${expandedId === voucher.id ? 'line-clamp-none' : 'line-clamp-1'
                                                }`}>
                                                {voucher.nama}
                                            </div>

                                            <div
                                                className={`text-sm text-gray-700 font-medium break-words max-w-[18vw] ${expandedId === voucher.id ? 'line-clamp-none' : 'line-clamp-1'
                                                    }`}
                                            >
                                                {voucher.deskripsi}
                                            </div>

                                            <div className="text-sm text-main font-bold break-words line-clamp-1">
                                                {Number(voucher.nilai_poin).toLocaleString('id-ID')} Poin
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-1">
                                        </div>
                                        <div className="h-full flex flex-col items-center space-y-1">
                                            <button
                                                onClick={() => handleEdit(voucher)}
                                                className="w-full h-max px-2 py-[2px] text-xs text-main rounded-3xl bg-blue-50 border border-main flex items-center justify-center"
                                                type="button"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(voucher.id)}
                                                className="w-full h-max px-2 py-[2px] text-xs rounded-3xl text-red-600 bg-red-50 border border-red-600 flex items-center justify-center"
                                                type="button"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>

                                    {/* Baris kedua: info user & tanggal */}
                                    <div className="flex justify-between space-x-2 text-xs text-gray-600">
                                        <div
                                            className={`flex items-center space-x-1 px-1.5 py-0.5 rounded-full max-w-[65%] min-w-0
                                                        ${voucher.status === 'tersedia' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                        >
                                            <span className="truncate block">
                                                {voucher.status}
                                            </span>
                                        </div>



                                        <div className="flex items-center space-x-1 bg-gray-100 px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-3.5 h-3.5" viewBox="0 0 16 16">
                                                <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z" />
                                                <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z" />
                                            </svg>
                                            <span>Stok: {Number(voucher.stok).toLocaleString('id-ID')}</span>
                                        </div>
                                    </div>
                                </div>

                            </>
                        ))
                    ) : (
                        <p className="p-4 text-center">Data tidak ditemukan</p>
                    )}
                </div>
            </div>
        </div>
    );
}