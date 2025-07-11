import { Inertia } from '@inertiajs/inertia';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ForgotPasswordOtp({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        kontak: '',
    });

    const [successMessage, setSuccessMessage] = useState(status || '');

    const submit = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        post(route('password.otp.send'), {
            data, // pastikan kontak dikirim juga
            onSuccess: () => {
                setSuccessMessage('Kode OTP telah dikirim ke nomor Anda.');
                Inertia.visit(route('password.otp.reset'), {
                    data: { kontak: data.kontak },
                });
            },
            onError: (errors) => {
                // Menampilkan error jika diperlukan
                if (errors.kontak) {
                    setSuccessMessage(''); // bersihkan pesan sukses jika ada error
                }
            },
        });
        
    };

    return (
        <>
            <Head title="Lupa Password via Nomor" />
            <div className="mx-auto w-full max-w-[500px] min-h-screen md:h-screen bg-white px-4 py-6">
                <header className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[500px] w-full z-10 bg-main">
                    <div className="w-full h-max flex items-center px-4 py-2 space-x-4">
                        <button className="w-6 h-6" onClick={() => window.history.back()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M15.41 7.41 14 6 8 12l6 6 1.41-1.41L10.83 12z" />
                            </svg>
                        </button>
                        <div className="text-white font-bold text-lg font-utama">Lupa Password</div>
                    </div>
                </header>

                <div className="h-11" />

                <section className="w-full flex flex-col items-center space-y-4 mb-6 px-4">
                    <img
                        src="/storage/logo_no_bg.png"
                        alt="Logo"
                        className="w-20 p-1.5 border-4 border-white bg-white mx-auto"
                    />
                    <p className="font-utama text-xl font-bold text-center">Reset via Nomor Telepon</p>
                    <p className="font-utama text-base font-medium text-gray-600 text-center">Masukkan nomor untuk kirim OTP</p>
                </section>

                <section className="flex flex-col items-center justify-center gap-4 w-full px-4">
                    <form onSubmit={submit} className="w-full">
                        <div className="w-full flex flex-col space-y-4 mb-6">
                            {successMessage && (
                                <div className="text-green-600 text-center font-utama font-medium">
                                    {successMessage}
                                </div>
                            )}
                            <div>
                                <label className="block text-gray-700 mb-1">Nomor Telepon</label>
                                <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
                                    <input
                                        type="text"
                                        name="kontak"
                                        value={data.kontak}
                                        onChange={(e) => setData('kontak', e.target.value)}
                                        className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                        placeholder="08xxxxxxxxxx"
                                        required
                                    />
                                </div>
                                {errors.kontak && <p className="text-red-500 text-sm mt-1">{errors.kontak}</p>}
                            </div>

                            <button
                                type="submit"
                                className={`w-full text-white p-2 rounded text-sm transition ${
                                    processing ? "bg-gray-400" : "bg-main hover:bg-main_dark"
                                }`}
                                disabled={processing}
                            >
                                {processing ? 'Mengirim...' : 'Kirim OTP ke Nomor'}
                            </button>

                            <p className="text-center text-sm text-gray-600 font-utama py-6">
                                Ingin pakai email?{' '}
                                <a href="/forgot-password" className="text-main font-semibold hover:underline">
                                    Reset lewat Email
                                </a>
                            </p>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}
