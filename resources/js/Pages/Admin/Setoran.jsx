import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useForm, usePage, router, Link } from '@inertiajs/react';

export default function AdminSetoranIndex() {
    const { sampahList = [], setoranList = [], users = [] } = usePage().props;

    const { data, setData, post, reset } = useForm({
        user_id: '',
        sampah_id: '',
        berat: '', // dalam gram sekarang
    });

    const [expandedId, setExpandedId] = useState(null);
    const [searchUser, setSearchUser] = useState('');
    const [searchSampah, setSearchSampah] = useState('');
    const [formVisible, setFormVisible] = useState(false);
    const [globalSearch, setGlobalSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [isUserSelected, setIsUserSelected] = useState(false);
    const [isSampahSelected, setIsSampahSelected] = useState(false);
    const [dropdownVisibleUser, setDropdownVisibleUser] = useState(false);
    const [dropdownVisibleSampah, setDropdownVisibleSampah] = useState(false);
    const userRef = useRef(null);
    const sampahRef = useRef(null);
    const formRef = useRef(null);
    const [editingId, setEditingId] = useState(null)
    const [formData, setFormData] = useState({
        berat_dalam_kg: '',
    })
    const handleEdit = (item) => {
        setEditingId(item.id)
        setFormData({
            berat_dalam_kg: item.berat_dalam_kg,
        })
    }

    const handleCancelEdit = () => {
        setEditingId(null)
        setFormData({ berat_dalam_kg: '' })
    }

    const handleSave = (id) => {
        router.put(`/admin/setoran/${id}`, formData, {
            onSuccess: () => {
                setEditingId(null)
                setFormData({ berat_dalam_kg: '' })
            },
            onError: (errors) => {
                console.log("Edit Error:", errors); // ini akan menunjukkan jika validasi gagal
                alert('Gagal menyimpan perubahan.')
            }
        })
    }

    const formatNumberInput = (number) => {
        return new Intl.NumberFormat('id-ID').format(number);
    };

    const parseNumberInput = (string) => {
        return parseFloat(string.replace(/\./g, '').replace(',', '.'));
    };


    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus setoran ini?")) {
            router.delete(`/admin/setoran/${id}`, {
                onSuccess: () => {
                    // bisa tambahkan notifikasi jika perlu
                },
                onError: () => {
                    alert('Gagal menghapus setoran.');
                }
            });
        }
    };


    const [sortByDate, setSortByDate] = useState("desc");
    const filteredUsers = dropdownVisibleUser
        ? users.filter(u =>
            searchUser === '' || u.name.toLowerCase().includes(searchUser.toLowerCase())
        )
        : [];

    const filteredSampah = dropdownVisibleSampah
        ? sampahList.filter(s =>
            searchSampah === '' || s.nama_sampah.toLowerCase().includes(searchSampah.toLowerCase())
        )
        : [];


    useEffect(() => {
        function handleClickOutside(event) {
            if (userRef.current && !userRef.current.contains(event.target)) {
                setDropdownVisibleUser(false);
            }
            if (sampahRef.current && !sampahRef.current.contains(event.target)) {
                setDropdownVisibleSampah(false);
            }
            if (formRef.current && !formRef.current.contains(event.target)) {
                setFormVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSubmitting) return; // prevent double submit
        setIsSubmitting(true);

        post('/admin/setoran', {
            onSuccess: () => {
                reset();
                setSearchUser('');
                setSearchSampah('');
                setFormVisible(false);
                setCurrentPage(1);
                setIsUserSelected(false);
                setIsSampahSelected(false);
            },
            onError: () => {
                // Bisa tampilkan error atau notifikasi
            },
            onFinish: () => {
                // ini dipanggil setelah sukses atau error
                setIsSubmitting(false);
            }
        });
    };


    // Berat sekarang inputan gram, tapi harga per kg, jadi konversi ke kg dulu
    const hitungPoin = () => {
        const selected = sampahList.find(s => s.id === parseInt(data.sampah_id));
        if (!selected || !data.berat) return 0;

        const beratKg = parseFloat(data.berat) / 1000;
        return Math.floor(beratKg * selected.harga_per_kg);
    };

    // Close dropdown saat klik di luar input/dropdown atau form
    useEffect(() => {
        function handleClickOutside(event) {
            if (userRef.current && !userRef.current.contains(event.target)) {
                // nothing here, you can close user dropdown if you implement
            }
            if (sampahRef.current && !sampahRef.current.contains(event.target)) {
                // nothing here, same
            }
            if (formRef.current && !formRef.current.contains(event.target)) {
                setFormVisible(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Filter dan paginate setoranList berdasarkan globalSearch (user name atau sampah name)
    const filteredSetoran = useMemo(() => {
        if (!globalSearch) return setoranList;

        const searchLower = globalSearch.toLowerCase();
        return setoranList.filter(item => {
            const userName = item.user?.name?.toLowerCase() ?? '';
            const sampahName = item.sampah?.nama_sampah?.toLowerCase() ?? '';
            return userName.includes(searchLower) || sampahName.includes(searchLower);
        });
    }, [globalSearch, setoranList]);
    const sortedSetoran = [...filteredSetoran].sort((a, b) => {
        const dateA = new Date(a.tanggal);
        const dateB = new Date(b.tanggal);

        return sortByDate === 'asc' ? dateA - dateB : dateB - dateA;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredSetoran.length / itemsPerPage);
    const paginatedSetoran = sortedSetoran.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('id-ID', {
        }).format(number);
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

    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <div className="mx-auto w-full min-h-screen bg-white">
            {/* Header */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-20 bg-main">
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
                            Setoran Sampah
                        </div>
                    </div>
                    {/* Plus Icon */}
                    <button
                        onClick={() => setFormVisible(v => !v)}
                        className="flex items-center w-6 h-6"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m0 18a8 8 0 1 1 8-8 8.01 8.01 0 0 1-8 8" />
                            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Form */}
            {formVisible && (
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="sticky top-12 z-20 bg-white px-4 py-4 shadow-sm rounded-b-lg space-y-4"
                >
                    {/* User Input */}
                    <div ref={userRef} className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">User:</label>
                        <input
                            type="text"
                            value={searchUser}
                            onFocus={() => {
                                // Reset ketika input diklik lagi
                                setSearchUser('');
                                setData('user_id', '');
                                setIsUserSelected(false);
                                setDropdownVisibleUser(true);
                            }}
                            onChange={e => {
                                setSearchUser(e.target.value);
                                setDropdownVisibleUser(true);
                                const selected = users.find(u =>
                                    `${u.name}_${u.rt}_${u.rw}_${u.kontak}`.toLowerCase() === e.target.value.toLowerCase() ||
                                    u.name.toLowerCase() === e.target.value.toLowerCase()
                                );
                                setData('user_id', selected ? selected.id : '');
                            }}
                            onKeyDown={e => {
                                if (e.key === 'Enter') e.preventDefault();
                            }}
                            className="input w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main bg-white cursor-pointer"
                            placeholder="Ketik nama user..."
                            autoComplete="off"
                            required
                        />
                        {dropdownVisibleUser && filteredUsers.length > 0 && (
                            <div className="absolute w-full mt-1 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow z-30">
                                {filteredUsers.map(user => (
                                    <div
                                        key={user.id}
                                        onClick={() => {
                                            const label = `${user.name} (RT ${user.rt}/RW ${user.rw}) - ${user.kontak}`;
                                            setSearchUser(label);
                                            setData('user_id', user.id);
                                            setIsUserSelected(true);
                                            setDropdownVisibleUser(false);
                                        }}
                                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    >
                                        {user.name} (RT {user.rt} / RW {user.rw}) - {user.kontak}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sampah Input */}
                    <div ref={sampahRef} className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Jenis Sampah:</label>
                        <input
                            type="text"
                            value={searchSampah}
                            onFocus={() => {
                                // Reset ketika input diklik lagi
                                setSearchSampah('');
                                setData('sampah_id', '');
                                setIsSampahSelected(false);
                                setDropdownVisibleSampah(true);
                            }}
                            onChange={e => {
                                setSearchSampah(e.target.value);
                                setDropdownVisibleSampah(true);
                                const selected = sampahList.find(s => s.nama_sampah.toLowerCase() === e.target.value.toLowerCase());
                                setData('sampah_id', selected ? selected.id : '');
                            }}
                            onKeyDown={e => {
                                if (e.key === 'Enter') e.preventDefault();
                            }}
                            className="input w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main bg-white cursor-pointer"
                            placeholder="Ketik jenis sampah..."
                            autoComplete="off"
                            required
                        />
                        {dropdownVisibleSampah && filteredSampah.length > 0 && (
                            <div className="absolute w-full mt-1 max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-md shadow z-30">
                                {filteredSampah.map(sampah => (
                                    <div
                                        key={sampah.id}
                                        onClick={() => {
                                            setSearchSampah(sampah.nama_sampah);
                                            setData('sampah_id', sampah.id);
                                            setIsSampahSelected(true);
                                            setDropdownVisibleSampah(false);
                                        }}
                                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                    >
                                        {sampah.nama_sampah}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Berat Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Berat (gram):</label>
                        <input
                            type="text"
                            value={Number(data.berat || 0).toLocaleString('id-ID')}
                            onChange={(e) => {
                                // Hapus semua titik lalu simpan sebagai number
                                const raw = e.target.value.replace(/\./g, '');
                                const num = parseInt(raw, 10);
                                setData('berat', isNaN(num) ? '' : num);
                            }}
                            inputMode="numeric"
                            placeholder="Contoh: 2.500"
                            className="input w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-main"
                        />

                    </div>

                    {/* Poin */}
                    <div className="text-lg font-medium text-gray-800">
                        <span className="text-main font-bold">
                            Poin diperoleh: {hitungPoin().toLocaleString('id-ID')}
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-1 py-3 rounded-lg font-semibold text-white transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-main hover:bg-main/90'
                                }`}
                        >
                            {isSubmitting ? 'Menyimpan...' : 'Submit'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormVisible(false)}
                            className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>

            )}

            {/* Search global + Sort by date */}
            <div className={`sticky top-[44px] z-10 bg-white shadow px-4 py-3 border-b border-gray-200 ${formVisible ? 'hidden' : ''}`}>
                <div className="flex space-x-4 items-center">
                    {/* Input Pencarian */}
                    <div className="flex-grow h-9 flex flex-row items-center justify-center pr-2 py-2 rounded-lg bg-neutral-100 border-2 border-gray-200">
                        <input
                            type="text"
                            placeholder="Cari berdasarkan nama user atau jenis sampah..."
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


            {/* Daftar Setoran (card grid) */}
            <div className="p-4 grid grid-cols-1 gap-4 mt-12">
                {paginatedSetoran.length > 0 ? (
                    paginatedSetoran.map(item => (
                        <>
                            <div
                                key={item.id}
                                className="flex flex-col bg-white rounded-lg shadow p-4 space-y-3"
                            >
                                {/* Baris pertama: gambar, nama, berat, poin */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                                        {item.sampah?.image ? (
                                            <img
                                                src={`/storage/${item.sampah.image}`}
                                                alt={item.sampah.nama_sampah}
                                                className="w-16 h-16 object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={`/storage/logo.webp`}
                                                alt={item.sampah.nama_sampah}
                                                className="w-16 h-16 object-cover"
                                            />)}
                                    </div>

                                    <div className="flex-1">
                                        <div
                                            className={`font-semibold text-base break-words max-w-[28vw] ${expandedId === item.id ? 'line-clamp-none' : 'line-clamp-1'}`}
                                            onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                        >
                                            {item.sampah?.nama_sampah}
                                        </div>


                                        {/* Input berat saat edit */}
                                        {editingId === item.id ? (
                                            <input
                                                type="text"
                                                className="mt-1 text-sm border px-2 py-1 rounded w-full"
                                                value={formData.berat_dalam_kg ? (formData.berat_dalam_kg * 1000).toLocaleString("id-ID") : ""}
                                                onChange={(e) => {
                                                    // Hilangkan semua karakter bukan angka
                                                    const onlyNumbers = e.target.value.replace(/\D/g, "");
                                                    // Update state formData dengan nilai kg (gram dibagi 1000)
                                                    setFormData({
                                                        ...formData,
                                                        berat_dalam_kg: onlyNumbers ? Number(onlyNumbers) / 1000 : 0,
                                                    });
                                                }}
                                                inputMode="numeric"
                                                pattern="[0-9]*"
                                                placeholder="Masukkan berat dalam gram"
                                            />

                                        ) : (
                                            <div className="text-sm text-gray-700">
                                                Berat: <span className="font-medium">{formatNumber(item.berat_dalam_kg * 1000)} gram</span>
                                            </div>
                                        )}


                                        <div className="text-sm text-main font-bold">
                                            Poin: {formatNumber(item.poin_diperoleh)}
                                        </div>
                                    </div>

                                    {/* Aksi tombol edit dan delete */}
                                    <div className="flex flex-col space-y-1">
                                        {editingId === item.id ? (
                                            <>
                                                <button
                                                    onClick={() => handleSave(item.id)}
                                                    className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                                                >
                                                    Simpan
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded"
                                                >
                                                    Batal
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-xs text-yellow-700 bg-yellow-200 hover:bg-yellow-200 px-2 py-1 rounded-xl transition"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-xs text-red-700 bg-red-200 hover:bg-red-200 px-2 py-1 rounded-xl transition"
                                                >
                                                    Hapus
                                                </button>

                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Baris kedua: info user & tanggal */}
                                <div className="flex justify-between space-x-2 text-xs text-gray-600">
                                    <div className="flex items-center space-x-1 bg-gray-100 px-1.5 py-0.5 rounded-full max-w-[65%] min-w-0">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            className="w-3.5 h-3.5 flex-shrink-0 text-gray-600"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 7a4 4 0 0 1-8 0 4 4 0 0 1 8 0Zm-8 6a6 6 0 0 0-6 6h20a6 6 0 0 0-6-6H8Z"
                                            />
                                        </svg>

                                        <Link
                                            href={route('admin.manage-users.show', item.user?.id)}
                                            className="block max-w-[11vw] truncate text-blue-600 hover:underline hover:text-blue-800 cursor-pointer"
                                            title={`${item.user?.name}_RT:${item.user?.rt}_RW:${item.user?.rw}}`}
                                        >
                                            <span className="truncate block">
                                                {item.user?.name} {item.user?.rt}/{item.user?.rw}
                                            </span>
                                        </Link>
                                    </div>


                                    <div className="flex items-center space-x-1 bg-gray-100 px-1.5 py-0.5 rounded-full whitespace-nowrap flex-shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m2 0a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2m14 0v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
                                        </svg>
                                        <span>{formatDateTime(item.tanggal)}</span>
                                    </div>
                                </div>
                            </div>

                        </>
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
