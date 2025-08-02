import React from "react";
import { Head } from '@inertiajs/react';

const PrivacyPolicy = () => {

    return (
        <>
            <Head title="Privacy Policy" />
            <div className="mx-auto w-full min-h-screen">
                {/* fixed position */}
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full z-10 bg-main">
                    {/* Header */}
                    <div className="w-full h-max flex flex-row space-x-4 justify-start items-center px-4 py-2 bg-main">
                        <div className="w-full h-max flex flex-row space-x-4 items-center justify-start">
                            <button className="shrink-0 w-6 h-6" onClick={() => window.history.back()}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                                </svg>
                            </button>
                            <div className="font-utama text-white font-bold text-lg">
                                Kebijakan Privasi
                            </div>
                        </div>
                    </div>
                </div>

                <section className="w-full flex flex-col space-y-2 pt-[51px] p-4">
                    <div className="w-full flex flex-col space-y-2 items-start justify-start">
                        <p className="font-utama text-sm text-justify text-gray-500">
                            Dengan menggunakan layanan Bank Sampah Pusaka, Anda setuju dengan kebijakan yang berlaku berikut ini.
                        </p>

                        <ol className="list-[upper-alpha] list-outside pl-4 space-y-3 text-sm font-utama text-gray-500">
                            {[
                                ['Keterangan Umum', 'Bank Sampah Pusaka bertugas memfasilitasi pengumpulan dan pengelolaan sampah serta penukaran poin sebagai hasil transaksi yang dikelola oleh admin.'],
                                ['Penukaran Sampah', 'Penukaran sampah dilakukan langsung oleh admin Bank Sampah Pusaka berdasarkan data transaksi yang tercatat. Proses penukaran ini tidak dilakukan secara otomatis oleh pengguna.'],
                                ['Poin dan Pembayaran', 'Setiap transaksi penukaran akan dikonversi menjadi poin yang akan masuk ke saldo pengguna. Poin ini dapat digunakan untuk pembayaran layanan atau produk yang disediakan oleh Bank Sampah Pusaka.'],
                                ['Pembatalan Transaksi', 'Transaksi yang sedang dalam proses tidak dapat dibatalkan oleh pengguna. Pembatalan dapat dilakukan oleh admin jika terdapat indikasi penyalahgunaan atau gangguan sistem.'],
                                ['Pengambilan dan Penukaran Produk', 'Pengambilan hasil penukaran atau produk dilakukan setelah konfirmasi oleh admin dan sesuai dengan jadwal yang telah ditentukan.'],
                                ['Saldo Poin', 'Saldo poin yang diperoleh tidak dapat diuangkan secara langsung, melainkan hanya dapat digunakan untuk transaksi di Bank Sampah Pusaka.'],
                                ['Garansi dan Komplain', 'Bank Sampah Pusaka menjamin keaslian poin dan pemrosesan transaksi yang valid. Pengguna dapat mengajukan komplain pada hari yang sama dengan transaksi.'],
                                ['Privasi dan Keamanan', 'Data pribadi dan transaksi pengguna dijaga kerahasiaannya dan tidak dibagikan kecuali atas izin pengguna atau keperluan hukum.'],
                                ['Perselisihan', 'Segala perselisihan akan diselesaikan dengan musyawarah sesuai hukum yang berlaku di Indonesia.'],
                            ].map(([title, desc], idx) => (
                                <li key={idx} className="">
                                    {/* Marker huruf */}

                                    {/* Isi konten */}
                                    <div className="pl-1">
                                        <p className="font-utama text-sm font-bold text-justify">{title}</p>
                                        <p className="font-utama text-sm text-justify text-gray-500">{desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>

            </div>
        </>
    );
};

export default PrivacyPolicy;
