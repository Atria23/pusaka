// import { useEffect, useState } from 'react';
// import { Link, Head, useForm } from '@inertiajs/react';

// export default function Register() {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         name: '',
//         email: '',
//         password: '',
//         password_confirmation: '',
//         rt: '',
//         rw: '',
//         alamat: '',
//         kontak: '',
//     });

//     const [showPassword, setShowPassword] = useState(false);

//     const [isChecked, setIsChecked] = useState(false);
//     const isFormValid =
//         data.name &&
//         data.rt &&
//         data.rw &&
//         data.password &&
//         data.password_confirmation &&
//         isChecked

//     useEffect(() => {
//         return () => {
//             reset('password', 'password_confirmation');
//         };
//     }, []);

//     const submit = (e) => {
//         e.preventDefault();
//         post(route('register'));
//     };

//     return (
//         <>
//             <Head title="Register" />
//             <div className="mx-auto w-full max-w-[500px] min-h-screen md:h-screen">
//                 <div className="min-h-screen md:min-h-full bg-white px-4 py-6 sm:px-6">

//                     {/* section atas */}
//                     <section className="w-full h-max flex flex-col items-center space-y-4 mb-6 px-4">
//                         <img
//                             src="/storage/logo_no_bg.png"
//                             alt="Logo Muvausa Store"
//                             className="w-20 p-1.5 border-4 border-white bg-white mx-auto"
//                         />
//                         <p className="font-utama text-xl font-bold text-center">Registrasi</p>
//                         <p className="font-utama text-base font-medium text-gray-600 text-center">
//                             Halaman Registrasi
//                         </p>
//                     </section>

//                     {/* section form register */}
//                     <section className="flex flex-col items-center justify-center gap-4 w-full px-4">
//                         <form onSubmit={submit} className="w-full">
//                             <div className="w-full h-max flex flex-col space-y-4 mb-6">
//                                 <div>
//                                     <label className="block text-gray-700 mb-1">Nama Kepala Keluarga</label>
//                                     <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
//                                         <input
//                                             id="name"
//                                             type="text"
//                                             name="name"
//                                             value={data.name}
//                                             placeholder="Contoh: Bapak Joko"
//                                             onChange={(e) => setData('name', e.target.value)}
//                                             className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
//                                             required
//                                         />
//                                     </div>
//                                     {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 mb-1">RT</label>
//                                     <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
//                                         <input
//                                             id="rt"
//                                             type="text"
//                                             name="rt"
//                                             value={data.rt}
//                                             placeholder="Contoh: 02"
//                                             onChange={(e) => {
//                                                 let val = e.target.value;

//                                                 // Hanya angka, maksimal 2 digit
//                                                 if (/^\d{0,2}$/.test(val)) {
//                                                     // Tolak hanya "0"
//                                                     if (val === '0') return;

//                                                     setData('rt', val);
//                                                 }
//                                             }}
//                                             inputMode="numeric"
//                                             className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
//                                             required
//                                         />
//                                     </div>
//                                     {errors.rt && <p className="text-red-500 text-sm mt-1">{errors.rt}</p>}
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 mb-1">RW</label>
//                                     <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
//                                         <input
//                                             id="rw"
//                                             type="text"
//                                             name="rw"
//                                             value={data.rw}
//                                             placeholder="Contoh: 01"
//                                             onChange={(e) => {
//                                                 let val = e.target.value;

//                                                 // Hanya angka, maksimal 2 digit
//                                                 if (/^\d{0,2}$/.test(val)) {
//                                                     // Tolak hanya "0"
//                                                     if (val === '0') return;

//                                                     setData('rw', val);
//                                                 }
//                                             }}
//                                             inputMode="numeric"
//                                             className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
//                                             required
//                                         />
//                                     </div>
//                                     {errors.rw && <p className="text-red-500 text-sm mt-1">{errors.rw}</p>}
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 mb-1">No. Telepon</label>
//                                     <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
//                                         <input
//                                             id="kontak"
//                                             type="text"
//                                             name="kontak"
//                                             value={data.kontak}
//                                             placeholder="Contoh: 081234567890"
//                                             onChange={(e) => {
//                                                 const val = e.target.value.replace(/\D/g, '');
//                                                 setData('kontak', val);
//                                             }}
//                                             inputMode="numeric"
//                                             className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
//                                             required
//                                         />
//                                     </div>
//                                     {errors.kontak && <p className="text-red-500 text-sm mt-1">{errors.kontak}</p>}
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 mb-1">Password</label>
//                                     <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 pr-2">
//                                         <input
//                                             id="password"
//                                             type={showPassword ? 'text' : 'password'}
//                                             name="password"
//                                             value={data.password}
//                                             placeholder="Bikin yang susah ditebak"
//                                             onChange={(e) => setData('password', e.target.value)}
//                                             className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
//                                             required
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowPassword(!showPassword)}
//                                             className="ml-2 focus:outline-none"
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

//                                 <div>
//                                     <label className="block text-gray-700 mb-1">Konfirmasi Password</label>
//                                     <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 pr-2">
//                                         <input
//                                             id="password_confirmation"
//                                             type={showPassword ? 'text' : 'password'}
//                                             name="password_confirmation"
//                                             value={data.password_confirmation}
//                                             placeholder="Ulangi password"
//                                             onChange={(e) => setData('password_confirmation', e.target.value)}
//                                             className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
//                                             required
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={() => setShowPassword(!showPassword)}
//                                             className="ml-2 focus:outline-none"
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
//                                     {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 mb-1">Email (Opsional)</label>
//                                     <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
//                                         <input
//                                             id="email"
//                                             type="email"
//                                             name="email"
//                                             value={data.email}
//                                             placeholder="pusaka@gmail.com"
//                                             onChange={(e) => setData('email', e.target.value)}
//                                             className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
//                                         />
//                                     </div>
//                                     {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-700 mb-1">Alamat (Opsional)</label>
//                                     <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
//                                         <input
//                                             id="alamat"
//                                             type="text"
//                                             name="alamat"
//                                             value={data.alamat}
//                                             placeholder="Contoh: Jl. Melati No. 5"
//                                             onChange={(e) => setData('alamat', e.target.value)}
//                                             className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
//                                         />
//                                     </div>
//                                     {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>}
//                                 </div>


//                                 <div className="flex flex-wrap items-center justify-between mt-4 w-full">
//                                     <label className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             checked={isChecked}
//                                             onChange={() => setIsChecked(!isChecked)}
//                                             className="h-4 w-4 text-main_light border-gray-300 rounded focus:ring-main_light"
//                                         />
//                                         <p className="ml-2 text-sm text-gray-600">
//                                             Saya Menyetujui{" "}
//                                             <Link
//                                                 href={route('privacy')}
//                                                 className="text-main hover:underline"
//                                             >
//                                                 kebijakan layanan kami
//                                             </Link>
//                                         </p>
//                                     </label>
//                                 </div>

//                                 <button
//                                     type="submit"
//                                     className={`w-full text-white p-2 rounded transition ${!isFormValid ? "bg-gray-400 cursor-not-allowed" : processing ? "bg-gray-400" : "bg-main hover:bg-main_dark"
//                                         }`}
//                                     disabled={!isFormValid || processing}
//                                 >
//                                     {processing ? "Pendaftaran..." : "Daftar"}
//                                 </button>

//                                 <p className=" w-full px-4 py-8 text-center text-sm text-gray-600 font-utama">
//                                     Udah punya akun?{' '}
//                                     <a
//                                         href="login"
//                                         className="text-main font-semibold hover:underline"
//                                     >
//                                         Login di sini
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

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        rt: '',
        rw: '',
        alamat: '',
        kontak: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const [isChecked, setIsChecked] = useState(false);
    const isFormValid =
        data.name &&
        data.rt &&
        data.rw &&
        data.password &&
        data.password_confirmation &&
        isChecked

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <>
            <Head title="Register" />
            <div className="w-full min-h-screen flex justify-center items-center px-4 md:px-12 lg:px-20 bg-gray-50">
                <div className="w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg bg-white shadow-lg rounded-xl p-6 md:p-10">


                    {/* section atas */}
                    <section className="w-full h-max flex flex-col items-center space-y-4 mb-6 px-4">
                        <img
                            src="/storage/logo_no_bg.png"
                            alt="Logo Muvausa Store"
                            className="w-20 p-1.5 border-4 border-white bg-white mx-auto"
                        />
                        <p className="font-utama text-xl font-bold text-center">Registrasi</p>
                        <p className="font-utama text-base font-medium text-gray-600 text-center">
                            Halaman Registrasi
                        </p>
                    </section>

                    {/* section form register */}
                    <section className="flex flex-col items-center justify-center gap-4 w-full px-4">
                        <form onSubmit={submit} className="w-full">
                            <div className="w-full h-max flex flex-col space-y-4 mb-6">
                                <div>
                                    <label className="block text-gray-700 mb-1">Nama Kepala Keluarga</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={data.name}
                                            placeholder="Contoh: Bapak Joko"
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1">RT</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
                                        <input
                                            id="rt"
                                            type="text"
                                            name="rt"
                                            value={data.rt}
                                            placeholder="Contoh: 02"
                                            onChange={(e) => {
                                                let val = e.target.value;

                                                // Hanya angka, maksimal 2 digit
                                                if (/^\d{0,2}$/.test(val)) {
                                                    // Tolak hanya "0"
                                                    if (val === '0') return;

                                                    setData('rt', val);
                                                }
                                            }}
                                            inputMode="numeric"
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                    {errors.rt && <p className="text-red-500 text-sm mt-1">{errors.rt}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1">RW</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
                                        <input
                                            id="rw"
                                            type="text"
                                            name="rw"
                                            value={data.rw}
                                            placeholder="Contoh: 01"
                                            onChange={(e) => {
                                                let val = e.target.value;

                                                // Hanya angka, maksimal 2 digit
                                                if (/^\d{0,2}$/.test(val)) {
                                                    // Tolak hanya "0"
                                                    if (val === '0') return;

                                                    setData('rw', val);
                                                }
                                            }}
                                            inputMode="numeric"
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                    {errors.rw && <p className="text-red-500 text-sm mt-1">{errors.rw}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1">No. Telepon</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
                                        <input
                                            id="kontak"
                                            type="text"
                                            name="kontak"
                                            value={data.kontak}
                                            placeholder="Contoh: 081234567890"
                                            onChange={(e) => {
                                                const val = e.target.value.replace(/\D/g, '');
                                                setData('kontak', val);
                                            }}
                                            inputMode="numeric"
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                            required
                                        />
                                    </div>
                                    {errors.kontak && <p className="text-red-500 text-sm mt-1">{errors.kontak}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1">Password</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 pr-2">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            placeholder="Bikin yang susah ditebak"
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="ml-2 focus:outline-none"
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

                                <div>
                                    <label className="block text-gray-700 mb-1">Konfirmasi Password</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 pr-2">
                                        <input
                                            id="password_confirmation"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            placeholder="Ulangi password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="ml-2 focus:outline-none"
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
                                    {errors.password_confirmation && <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1">Email (Opsional)</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            placeholder="pusaka@gmail.com"
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-gray-700 mb-1">Alamat (Opsional)</label>
                                    <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
                                        <input
                                            id="alamat"
                                            type="text"
                                            name="alamat"
                                            value={data.alamat}
                                            placeholder="Contoh: Jl. Melati No. 5"
                                            onChange={(e) => setData('alamat', e.target.value)}
                                            className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none placeholder-gray-400"
                                        />
                                    </div>
                                    {errors.alamat && <p className="text-red-500 text-sm mt-1">{errors.alamat}</p>}
                                </div>


                                <div className="flex flex-wrap items-center justify-between mt-4 w-full">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={() => setIsChecked(!isChecked)}
                                            className="h-4 w-4 text-main_light border-gray-300 rounded focus:ring-main_light"
                                        />
                                        <p className="ml-2 text-sm text-gray-600">
                                            Saya Menyetujui{" "}
                                            <Link
                                                href={route('privacy')}
                                                className="text-main hover:underline"
                                            >
                                                kebijakan layanan kami
                                            </Link>
                                        </p>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full text-white p-2 rounded transition ${!isFormValid ? "bg-gray-400 cursor-not-allowed" : processing ? "bg-gray-400" : "bg-main hover:bg-main_dark"
                                        }`}
                                    disabled={!isFormValid || processing}
                                >
                                    {processing ? "Pendaftaran..." : "Daftar"}
                                </button>

                                <p className=" w-full px-4 py-8 text-center text-sm text-gray-600 font-utama">
                                    Udah punya akun?{' '}
                                    <a
                                        href="login"
                                        className="text-main font-semibold hover:underline"
                                    >
                                        Login di sini
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