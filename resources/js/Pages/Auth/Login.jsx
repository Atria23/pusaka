// import { useEffect, useState } from 'react';
// import { Link, Head, useForm } from '@inertiajs/react';

// export default function Login({ canResetPassword }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         login: '',
//         password: '',
//         remember: false,
//     });

//     const [showPassword, setShowPassword] = useState(false);
//     const isFormValid = data.login && data.password;

//     useEffect(() => {
//         return () => {
//             reset('password');
//         };
//     }, []);

//     const submit = (e) => {
//         e.preventDefault();
//         post(route('login'));
//     };

//     return (
//         <>
//             <Head title="Login" />
//             <div className="mx-auto w-full max-w-[500px] min-h-screen md:h-screen">
//                 <div className="min-h-screen md:min-h-full bg-white px-4 py-6 sm:px-6">
//                     <section className="w-full h-max flex flex-col items-center space-y-4 mb-6 px-4">
//                         <img
//                             src="/storage/logo_no_bg.png"
//                             alt="Logo Muvausa Store"
//                             className="w-20 p-1.5 border-4 border-white bg-white mx-auto"
//                         />
//                         <p className="font-utama text-xl font-bold text-center">Login</p>
//                         <p className="font-utama text-base font-medium text-gray-600 text-center">
//                             Halaman Login
//                         </p>
//                         <p className="text-sm text-gray-600 text-center bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mt-2">
//                             Mengalami Kendala?{' '}
//                             <a
//                                 href="https://wa.me/6287742097918"
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-green-700 font-semibold underline hover:text-green-800"
//                             >
//                                 Hubungi admin via WhatsApp
//                             </a>
//                         </p>
//                     </section>

//                     <section className="flex flex-col items-center justify-center gap-4 w-full px-4">
//                         <form onSubmit={submit} className="w-full">
//                             <div className="w-full h-max flex flex-col space-y-4 mb-6">
//                                 <div>
//                                     <label className="block text-gray-700 mb-1">Email / Nomor HP</label>
//                                     <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
//                                         <input
//                                             id="login"
//                                             type="text"
//                                             name="login"
//                                             value={data.login}
//                                             placeholder="Masukkan email atau nomor HP"
//                                             onChange={(e) => setData('login', e.target.value)}
//                                             className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
//                                             required
//                                         />
//                                     </div>
//                                     {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login}</p>}

//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 mb-1">Password</label>
//                                     <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 relative">
//                                         <input
//                                             id="password"
//                                             type={showPassword ? 'text' : 'password'}
//                                             name="password"
//                                             value={data.password}
//                                             placeholder="janji nggak kita kasih password kamu ke kucing"
//                                             onChange={(e) => setData('password', e.target.value)}
//                                             className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400 pr-8"
//                                             required
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowPassword(!showPassword)}
//                                             className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
//                                         >
//                                             {showPassword ? (
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-main" fill="currentColor" viewBox="0 0 16 16">
//                                                     <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
//                                                     <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
//                                                 </svg>
//                                             ) : (
//                                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-main" fill="currentColor" viewBox="0 0 16 16">
//                                                     <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
//                                                     <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
//                                                 </svg>
//                                             )}
//                                         </button>
//                                     </div>
//                                     {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//                                 </div>

//                                 <div className="flex flex-wrap items-center justify-between mt-4 w-full">
//                                     <label className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             name="remember"
//                                             checked={data.remember}
//                                             onChange={(e) => setData('remember', e.target.checked)}
//                                             className="h-4 w-4 text-main_light border-gray-300 rounded focus:ring-main_light"
//                                         />
//                                         <span className="ml-2 text-sm text-gray-600">Ingetin Saya</span>
//                                     </label>
//                                     {canResetPassword && (
//                                         <Link
//                                             href={route('password.request')}
//                                             className="text-sm text-main hover:underline ml-auto"
//                                         >
//                                             Lupa Password?
//                                         </Link>
//                                     )}
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className={`w-full text-white p-2 rounded text-sm transition ${!isFormValid ? "bg-gray-400 cursor-not-allowed" : processing ? "bg-gray-400" : "bg-main hover:bg-main_dark"
//                                         }`}
//                                     disabled={!isFormValid || processing}
//                                 >
//                                     {processing ? "Validasi data..." : "Masuk"}
//                                 </button>

//                                 <p className=" w-full px-4 py-8 text-center text-sm text-gray-600 font-utama">
//                                     Belum punya akun?{' '}
//                                     <a
//                                         href="register"
//                                         className="text-main font-semibold hover:underline"
//                                     >
//                                         Daftar
//                                     </a>
//                                 </p>
//                             </div>
//                         </form>
//                     </section>
//                 </div>
//             </div>
//         </>
//     );
// }

import { useEffect, useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';

export default function Login({ canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const isFormValid = data.login && data.password;

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <>
            <Head title="Login" />
            <div className="mx-auto w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg min-h-screen flex items-center justify-center px-4 md:px-8">
                <div className="w-full bg-white rounded-lg shadow-lg p-6 md:p-8">

                    <section className="w-full h-max flex flex-col items-center space-y-4 mb-6 px-4">
                        <img
                            src="/storage/logo_no_bg.png"
                            alt="Logo Muvausa Store"
                            className="w-20 p-1.5 border-4 border-white bg-white mx-auto"
                        />
                        <p className="font-utama text-xl font-bold text-center">Login</p>
                        <p className="font-utama text-base font-medium text-gray-600 text-center">
                            Halaman Login
                        </p>
                        <p className="text-sm text-gray-600 text-center bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mt-2">
                            Mengalami Kendala?{' '}
                            <a
                                href="https://wa.me/6287742097918"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-700 font-semibold underline hover:text-green-800"
                            >
                                Hubungi admin via WhatsApp
                            </a>
                        </p>
                    </section>

                    <section className="flex flex-col items-center justify-center gap-4 w-full px-4">
                        <form onSubmit={submit} className="w-full">
                            <div className="w-full h-max flex flex-col space-y-4 mb-6">
                                <div>
                                    <label className="block text-gray-700 mb-1">Email / Nomor HP</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
                                        <input
                                            id="login"
                                            type="text"
                                            name="login"
                                            value={data.login}
                                            placeholder="Masukkan email atau nomor HP"
                                            onChange={(e) => setData('login', e.target.value)}
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                    {errors.login && <p className="text-red-500 text-sm mt-1">{errors.login}</p>}

                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1">Password</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            placeholder="janji nggak kita kasih password kamu ke kucing"
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400 pr-8"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-main" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-main" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>

                                <div className="flex flex-wrap items-center justify-between mt-4 w-full">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                            className="h-4 w-4 text-main_light border-gray-300 rounded focus:ring-main_light"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Ingetin Saya</span>
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="text-sm text-main hover:underline ml-auto"
                                        >
                                            Lupa Password?
                                        </Link>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full text-white p-2 rounded text-sm transition ${!isFormValid ? "bg-gray-400 cursor-not-allowed" : processing ? "bg-gray-400" : "bg-main hover:bg-main_dark"
                                        }`}
                                    disabled={!isFormValid || processing}
                                >
                                    {processing ? "Validasi data..." : "Masuk"}
                                </button>

                                <p className=" w-full px-4 py-8 text-center text-sm text-gray-600 font-utama">
                                    Belum punya akun?{' '}
                                    <a
                                        href="register"
                                        className="text-main font-semibold hover:underline"
                                    >
                                        Daftar
                                    </a>
                                </p>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </>
    );
}

