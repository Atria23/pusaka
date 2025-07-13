import React, { useState, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Index({ sampah }) {
    const { data, setData, post, reset, processing } = useForm({
        id: null,
        nama_sampah: '',
        harga_per_kg: '',
        image: null,
    });

    const [editing, setEditing] = useState(false);
    const [preview, setPreview] = useState(null);
    const [formVisible, setFormVisible] = useState(false);
    const [expandedId, setExpandedId] = useState(null);

    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const filteredSortedSampah = useMemo(() => {
        let filtered = sampah.data;

        if (search.trim() !== '') {
            filtered = filtered.filter(item =>
                item.nama_sampah.toLowerCase().includes(search.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.nama_sampah.localeCompare(b.nama_sampah);
            } else {
                return b.nama_sampah.localeCompare(a.nama_sampah);
            }
        });

        return filtered;
    }, [sampah.data, search, sortOrder]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nama_sampah', data.nama_sampah);
        formData.append('harga_per_kg', data.harga_per_kg);
        if (data.image) formData.append('image', data.image);

        if (editing) {
            formData.append('_method', 'PUT');
            Inertia.post(route('admin.sampah.update', data.id), formData, { preserveState: true });
        } else {
            post(route('admin.sampah.store'), formData, { preserveState: true });
        }

        resetForm();
    };

    const resetForm = () => {
        reset();
        setPreview(null);
        setEditing(false);
        setFormVisible(false);
    };

    const handleEdit = (item) => {
        setData({
            id: item.id,
            nama_sampah: item.nama_sampah,
            harga_per_kg: item.harga_per_kg,
            image: null,
        });
        setPreview(item.image ? `/storage/${item.image}` : null);
        setEditing(true);
        setFormVisible(true);
    };

    const handleAdd = () => {
        reset();
        setPreview(null);
        setEditing(false);
        setFormVisible(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
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
                            Manajemen Sampah
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

                {formVisible && (
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="mb-6 p-6 rounded-md shadow-md bg-putih border border-main_light"
                    >
                        <input
                            type="text"
                            placeholder="Nama Sampah"
                            value={data.nama_sampah}
                            onChange={e => setData('nama_sampah', e.target.value)}
                            className="border border-main_light rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-main bg-main_white"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Harga per kg"
                            value={Number(data.harga_per_kg || 0).toLocaleString('id-ID')}
                            onChange={(e) => {
                                // Hapus titik dan parsing ke angka
                                const raw = e.target.value.replace(/\./g, '');
                                const parsed = parseInt(raw, 10);
                                setData('harga_per_kg', isNaN(parsed) ? '' : parsed);
                            }}
                            className="border border-main_light rounded-md p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-main bg-main_white"
                            required
                            inputMode="numeric"
                        />

                        <div className='flex flex-row space-x-4 mb-4 items-center'>

                            {preview && (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-16 h-16 rounded-xl object-cover"
                                />
                            )}
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="border border-main_light rounded-md p-2 w-full mb-4 bg-main_white"
                            />
                        </div>

                        <div className="flex space-x-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`px-5 py-2 rounded-md text-white font-semibold transition-colors ${processing ? 'opacity-60 cursor-not-allowed' : 'bg-main hover:bg-main_dark'
                                    }`}
                            >
                                {editing ? 'Update' : 'Tambah'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormVisible(false)}
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
                                placeholder="Cari nama sampah"
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
                    {filteredSortedSampah.length > 0 ? (
                        filteredSortedSampah.map(item => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center p-4 border-b-2 border-b-neutral-100"
                            >

                                <div className="w-full h-max flex items-center space-x-3 content-start">
                                    <div className="w-14 aspect-square flex items-center justify-center p-1 rounded-xl bg-white shadow">
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.nama_sampah}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>

                                    <div
                                        className="flex flex-col items-start space-y-1 cursor-pointer w-full"
                                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                    >
                                        <p
                                            className={`font-utama font-semibold text-sm text-gray-800 w-[13vw] ${expandedId === item.id ? 'break-words' : 'truncate'}`}
                                            title={item.nama_sampah}
                                        >
                                            {item.nama_sampah}
                                        </p>

                                        <div className="w-max h-max px-2 py-[2px] text-xs text-green-600 rounded-3xl bg-green-50 border border-green-600 flex items-center justify-center">
                                        Rp{Number(item.harga_per_kg).toLocaleString('id-ID')}
                                        </div>
                                    </div>


                                </div>

                                <div className="w-max h-full flex items-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="w-full h-max px-2 py-[2px] text-xs text-main rounded-3xl bg-blue-50 border border-main flex items-center justify-center"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => confirm('Hapus?') && Inertia.delete(route('admin.sampah.destroy', item.id))}
                                        className={`w-full h-max px-2 py-[2px] text-xs rounded-3xl flex items-center justify-center 
                                                ${item.is_used
                                                ? "text-yellow-600 bg-yellow-50 border border-yellow-600"
                                                : "text-red-600 bg-red-50 border border-red-600"
                                            }`}
                                    >
                                        Hapus
                                    </button>


                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="p-4 text-center">Data tidak ditemukan</p>
                    )}
                </div>
            </div>
        </div>
    );
}
