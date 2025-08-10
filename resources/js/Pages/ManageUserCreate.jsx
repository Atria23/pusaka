import React, { useState } from 'react'
import { Head, usePage, useForm } from '@inertiajs/react'

export default function Create() {
    // Ambil props roles dan pengelolaList yang dikirim dari controller
    const { roles, pengelolaList } = usePage().props;

    // Inisialisasi form dengan nilai default kosong
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        rt: '',
        rw: '',
        alamat: '',
        kontak: '',
        password: '',
        password_confirmation: '',
        selectedRoles: [],
        pengelola_air_id: '',
    });

    // State untuk menampilkan atau menyembunyikan password
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    // Fungsi untuk mengirim data form ke server
    const storeUser = (e) => {
        e.preventDefault();
        post(route('manage-users.store'));
    }

    return (
        <>
            <Head title="Tambah Pengguna" />
            <div className="mx-auto w-full min-h-screen text-white">
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-10 bg-main">
                    <div className="flex items-center space-x-4 px-4 py-2 text-white">
                        <button onClick={() => window.history.back()} className="w-6 h-6">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>
                        <h1 className="font-bold text-lg">Tambah Manajemen Pengguna</h1>
                    </div>
                </div>

                <div className="pt-[60px] pb-8 px-4 bg-white">
                    <form onSubmit={storeUser} className="space-y-5">
                        {/* Nama Pengguna */}
                        <div>
                            <label className="w-full text-gray-700">Nama Pengguna</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-neutral-100 text-black border border-gray-300 rounded-lg text-sm"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Masukkan nama pengguna"
                            />
                            {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="w-full text-gray-700">Email</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 bg-neutral-100 text-black border border-gray-300 rounded-lg text-sm"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="Masukkan email"
                            />
                            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                        </div>

                        {/* RT */}
                        <div>
                            <label className="w-full text-gray-700">RT</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-neutral-100 text-black border border-gray-300 rounded-lg text-sm"
                                value={data.rt}
                                onChange={(e) => {
                                    let val = e.target.value;
                                    if (/^\d{0,2}$/.test(val)) {
                                        if (val === '0') return;
                                        setData('rt', val);
                                    }
                                }}
                                placeholder="Contoh: 01"
                            />
                            {errors.rt && <p className="text-xs text-red-400 mt-1">{errors.rt}</p>}
                        </div>

                        {/* RW */}
                        <div>
                            <label className="w-full text-gray-700">RW</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-neutral-100 text-black border border-gray-300 rounded-lg text-sm"
                                value={data.rw}
                                onChange={(e) => {
                                    let val = e.target.value;
                                    if (/^\d{0,2}$/.test(val)) {
                                        if (val === '0') return;
                                        setData('rw', val);
                                    }
                                }}
                                placeholder="Contoh: 05"
                            />
                            {errors.rw && <p className="text-xs text-red-400 mt-1">{errors.rw}</p>}
                        </div>

                        {/* Pengelola Air */}
                        <div>
                            <label className="w-full text-gray-700">Pengelola Air</label>
                            <select
                                value={data.pengelola_air_id}
                                onChange={e => setData('pengelola_air_id', e.target.value)}
                                className="w-full px-3 py-2 bg-neutral-100 text-black border border-gray-300 rounded-lg text-sm"
                            >
                                <option value="">-- Pilih Pengelola Air --</option>
                                {pengelolaList.map((pengelola) => (
                                    <option key={pengelola.id} value={pengelola.id}>
                                        {pengelola.nama}
                                    </option>
                                ))}
                            </select>
                            {errors.pengelola_air_id && <p className="text-xs text-red-400 mt-1">{errors.pengelola_air_id}</p>}
                        </div>

                        {/* Alamat */}
                        <div>
                            <label className="w-full text-gray-700">Alamat</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-neutral-100 text-black border border-gray-300 rounded-lg text-sm"
                                value={data.alamat}
                                onChange={e => setData('alamat', e.target.value)}
                                placeholder="Masukkan alamat lengkap"
                            />
                            {errors.alamat && <p className="text-xs text-red-400 mt-1">{errors.alamat}</p>}
                        </div>

                        {/* Kontak */}
                        <div>
                            <label className="w-full text-gray-700">Kontak</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-neutral-100 text-black border border-gray-300 rounded-lg text-sm"
                                value={data.kontak}
                                onChange={e => setData('kontak', e.target.value)}
                                placeholder="Masukkan nomor kontak"
                            />
                            {errors.kontak && <p className="text-xs text-red-400 mt-1">{errors.kontak}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="w-full text-gray-700">Kata Sandi</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-3 py-2 pr-10 bg-neutral-100 text-black border border-gray-300 rounded-lg text-sm"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    placeholder="Masukkan kata sandi"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-main" fill="currentColor" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" /><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-main" fill="currentColor" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" /><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" /></svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password}</p>}
                        </div>

                        {/* Konfirmasi Password */}
                        <div>
                            <label className="w-full text-gray-700">Konfirmasi Kata Sandi</label>
                            <div className="relative">
                                <input
                                    type={showPasswordConfirm ? "text" : "password"}
                                    className="w-full px-3 py-2 pr-10 bg-neutral-100 text-black border border-gray-300 rounded-lg text-sm"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    placeholder="Konfirmasi kata sandi Anda"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                >
                                     {showPasswordConfirm ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-main" fill="currentColor" viewBox="0 0 16 16"><path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" /><path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" /></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-main" fill="currentColor" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" /><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" /></svg>
                                    )}
                                </button>
                            </div>
                            {errors.password_confirmation && <p className="text-xs text-red-400 mt-1">{errors.password_confirmation}</p>}
                        </div>

                        {/* Akses Grup */}
                        <div>
                            <label className="w-full text-gray-700 mb-1">Akses Grup</label>
                            <div className="flex flex-wrap gap-3">
                                {roles.map((role, i) => (
                                    <label key={i} className="inline-flex items-center space-x-2 text-sm">
                                        <input
                                            type="checkbox"
                                            value={role.name}
                                            checked={data.selectedRoles.includes(role.name)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setData('selectedRoles', [...data.selectedRoles, e.target.value]);
                                                } else {
                                                    setData('selectedRoles', data.selectedRoles.filter(r => r !== e.target.value));
                                                }
                                            }}
                                            className="w-4 h-4 text-main border-gray-300 rounded focus:ring-main_light"
                                        />
                                        <span className="ml-2 text-gray-700 text-sm">{role.name}</span>
                                    </label>
                                ))}
                            </div>
                            {errors.selectedRoles && <p className="text-xs text-red-400 mt-1">{errors.selectedRoles}</p>}
                        </div>

                        <button type="submit" className="w-full py-3 rounded-lg px-4 text-white bg-main hover:bg-main_dark">
                            Simpan Pengguna
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}