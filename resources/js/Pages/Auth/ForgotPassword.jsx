// import { Link, Head, useForm } from '@inertiajs/react';
// import { useState } from 'react';

// export default function ForgotPassword({ status, otp }) {
//     const { data, setData, post, processing, errors } = useForm({
//         email: '',
//         kontak: '',
//     });

//     const isFormValid = data.email || data.kontak;
//     const [otpSent, setOtpSent] = useState(!!otp);

//     const submit = (e) => {
//         e.preventDefault();
//         post(route('password.email'), {
//             onSuccess: () => {
//                 if (data.kontak) {
//                     setOtpSent(true);
//                 }
//             },
//         });
//     };

//     return (
//         <>
//             <Head title="Lupa Password" />
//             <div className="mx-auto w-full max-w-[500px] min-h-screen md:h-screen">
//                 <div className="min-h-screen md:min-h-full bg-white px-4 py-6 sm:px-6">
//                     <header className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[500px] w-full z-10 bg-main">
//                         <div className="w-full h-max flex flex-row items-center px-4 py-2 space-x-4">
//                             <button className="shrink-0 w-6 h-6" onClick={() => window.history.back()}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
//                                     <path d="M15.41 7.41 14 6 8 12l6 6 1.41-1.41L10.83 12z" />
//                                 </svg>
//                             </button>
//                             <div className="font-utama text-white font-bold text-lg">
//                                 Lupa Password
//                             </div>
//                         </div>
//                     </header>

//                     <div className="h-11" />

//                     <section className="w-full h-max flex flex-col items-center space-y-4 mb-6 px-4">
//                         <img
//                             src="/storage/logo_no_bg.png"
//                             alt="Logo Muvausa Store"
//                             className="w-20 p-1.5 border-4 border-white bg-white mx-auto"
//                         />
//                         <p className="font-utama text-xl font-bold text-center">Reset via Email</p>
//                         <p className="font-utama text-base font-medium text-gray-600 text-center">
//                             Masukkan email untuk kirim link reset
//                         </p>
//                     </section>

//                     <section className="flex flex-col items-center justify-center gap-4 w-full px-4">
//                         <form onSubmit={submit} className="w-full">
//                             <div className="w-full h-max flex flex-col space-y-4 mb-6">
//                                 {status && <div className="font-utama text-base font-medium text-center text-green-600">{status}</div>}

//                                 <div>
//                                     <label className="block text-gray-700 mb-1">Email</label>
//                                     <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
//                                         <input
//                                             id="email"
//                                             type="email"
//                                             name="email"
//                                             value={data.email}
//                                             onChange={(e) => setData('email', e.target.value)}
//                                             placeholder="Pusaxxxx@gmail.com"
//                                             className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
//                                         />
//                                     </div>
//                                     {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className={`w-full text-white p-2 rounded text-sm transition ${
//                                         processing ? "bg-gray-400" : "bg-main hover:bg-main_dark"
//                                     }`}
//                                     disabled={processing}
//                                 >
//                                     {processing ? 'Mengirim...' : 'Kirim Link Reset'}
//                                 </button>

//                                 {otpSent && (
//                                     <div className="p-3 bg-green-100 text-green-700 text-sm rounded text-center">
//                                         OTP kamu: <b>{otp}</b> <br />
//                                         Masukkan OTP di halaman reset password
//                                     </div>
//                                 )}

//                                 <p className="text-center text-sm text-gray-600 font-utama py-6">
//                                     Ingin pakai nomor telepon?{' '}
//                                     <Link
//                                         href={route('password.otp.request')}
//                                         className="text-main font-semibold hover:underline"
//                                     >
//                                         Reset lewat nomor telepon
//                                     </Link>
//                                 </p>
//                             </div>
//                         </form>
//                     </section>
//                 </div>
//             </div>
//         </>
//     );
// }
import { Link, Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ForgotPassword({ status, otp }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        kontak: '',
    });

    const isFormValid = data.email || data.kontak;
    const [otpSent, setOtpSent] = useState(!!otp);

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'), {
            onSuccess: () => {
                if (data.kontak) {
                    setOtpSent(true);
                }
            },
        });
    };

    return (
        <>
            <Head title="Lupa Password" />
            <div className="mx-auto w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg min-h-screen flex items-center justify-center px-4 md:px-8">
                <div className="w-full bg-white rounded-lg shadow-lg p-6 md:p-8">
                    {/* Section: Logo & Heading */}
                    <section className="w-full flex flex-col items-center space-y-4 mb-6 px-4">
                        <img
                            src="/storage/logo_no_bg.png"
                            alt="Logo Muvausa Store"
                            className="w-20 p-1.5 border-4 border-white bg-white mx-auto"
                        />
                        <p className="font-utama text-xl font-bold text-center">Reset Password</p>
                        <p className="font-utama text-base font-medium text-gray-600 text-center">
                            Masukkan email untuk kirim link reset password
                        </p>
                        <p className="text-sm text-gray-600 text-center bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mt-2">
                            Salah login atau lupa akun?{' '}
                            <a
                                href="https://wa.me/6287742097918"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-700 font-semibold underline hover:text-green-800"
                            >
                                Hubungi admin
                            </a>
                        </p>
                    </section>

                    {/* Form Section */}
                    <section className="flex flex-col items-center justify-center gap-4 w-full px-4">
                        <form onSubmit={submit} className="w-full">
                            <div className="w-full flex flex-col space-y-4 mb-6">
                                {status && (
                                    <div className="font-utama text-base font-medium text-center text-green-600">
                                        {status}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-gray-700 mb-1">Email</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Pusaxxxx@gmail.com"
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full text-white p-2 rounded text-sm transition ${processing ? "bg-gray-400" : "bg-main hover:bg-main_dark"
                                        }`}
                                    disabled={processing}
                                >
                                    {processing ? "Mengirim..." : "Kirim Link Reset"}
                                </button>

                                {otpSent && (
                                    <div className="p-3 bg-green-100 text-green-700 text-sm rounded text-center">
                                        OTP kamu: <b>{otp}</b> <br />
                                        Masukkan OTP di halaman reset password
                                    </div>
                                )}

                                <p className="text-center text-sm text-gray-600 font-utama py-6">
                                    Ingin pakai nomor telepon?{" "}
                                    <Link
                                        href={route("password.otp.request")}
                                        className="text-main font-semibold hover:underline"
                                    >
                                        Reset lewat nomor telepon
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>


    );
}
