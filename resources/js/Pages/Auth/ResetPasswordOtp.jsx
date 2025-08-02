// import { Head, useForm } from '@inertiajs/react';
// import { useEffect, useState } from 'react';

// export default function ResetPasswordOtp({ kontak }) {
//     const { data, setData, post, processing, errors } = useForm({
//         kontak: kontak || '',
//         otp: '',
//         password: '',
//         password_confirmation: '',
//     });

//     const [showPassword, setShowPassword] = useState(false);

//     useEffect(() => {
//         if (kontak) {
//             setData('kontak', kontak);
//         }
//     }, [kontak]);

//     const submit = (e) => {
//         e.preventDefault();
//         post(route('password.otp.reset.submit'));
//     };

//     return (
//         <>
//             <Head title="Reset Password via OTP" />
//             <div className="mx-auto w-full max-w-[500px] min-h-screen md:h-screen bg-white px-4 py-6">
//                 <header className="fixed top-0 left-1/2 -translate-x-1/2 max-w-[500px] w-full z-10 bg-main">
//                     <div className="w-full h-max flex items-center px-4 py-2 space-x-4">
//                         <button className="w-6 h-6" onClick={() => window.history.back()}>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-6 h-6">
//                                 <path d="M15.41 7.41 14 6 8 12l6 6 1.41-1.41L10.83 12z" />
//                             </svg>
//                         </button>
//                         <div className="text-white font-bold text-lg font-utama">Reset Password</div>
//                     </div>
//                 </header>

//                 <div className="h-11" />

//                 <section className="w-full flex flex-col items-center space-y-4 mb-6 px-4">
//                     <img
//                         src="/storage/logo_no_bg.png"
//                         alt="Logo"
//                         className="w-20 p-1.5 border-4 border-white bg-white mx-auto"
//                     />
//                     <p className="font-utama text-xl font-bold text-center">Reset Password</p>
//                     <p className="font-utama text-base font-medium text-gray-600 text-center">Masukkan OTP dan password baru</p>
//                     <p className="text-sm text-gray-600 text-center bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 mt-2">
//                         Tidak menerima OTP?{' '}
//                         <a
//                             href="https://wa.me/6287742097918"
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-green-700 font-semibold underline hover:text-green-800"
//                         >
//                             Hubungi admin via WhatsApp
//                         </a>
//                     </p>

//                 </section>

//                 <section className="flex flex-col items-center justify-center gap-4 w-full px-4">
//                     <form onSubmit={submit} className="w-full space-y-4 mb-6">
//                         <div>
//                             <label className="block text-gray-700 mb-1">Nomor Telepon</label>
//                             <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
//                                 <input
//                                     type="text"
//                                     name="kontak"
//                                     value={data.kontak}
//                                     readOnly
//                                     className="bg-neutral-100 text-sm text-gray-700 border-none w-full focus:ring-0 focus:outline-none px-3 cursor-default"
//                                     placeholder="08xxxxxxxxxx"
//                                 />
//                             </div>
//                             {errors.kontak && (
//                                 <p className="text-red-500 text-sm mt-1">{errors.kontak}</p>
//                             )}
//                         </div>


//                         <div>
//                             <label className="block text-gray-700 mb-1">Kode OTP</label>
//                             <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200">
//                                 <input
//                                     type="text"
//                                     name="otp"
//                                     value={data.otp}
//                                     onChange={(e) => setData('otp', e.target.value)}
//                                     className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none px-3"
//                                     placeholder="Masukkan OTP"
//                                     required
//                                 />
//                             </div>
//                             {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
//                         </div>

//                         <div>
//                             <label className="block text-gray-700 mb-1">Password Baru</label>
//                             <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 relative">
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     name="password"
//                                     value={data.password}
//                                     onChange={(e) => setData('password', e.target.value)}
//                                     className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none px-3 pr-10"
//                                     placeholder="Minimal 6 karakter"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-2 top-1/2 -translate-y-1/2 text-main"
//                                 >
//                                     {showPassword ? (
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
//                                             <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
//                                             <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
//                                         </svg>
//                                     ) : (
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
//                                             <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
//                                             <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
//                                         </svg>
//                                     )}
//                                 </button>
//                             </div>
//                             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
//                         </div>

//                         {/* Konfirmasi Password */}
//                         <div>
//                             <label className="block text-gray-700 mb-1">Konfirmasi Password</label>
//                             <div className="w-full h-9 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 relative">
//                                 <input
//                                     type={showPassword ? 'text' : 'password'}
//                                     name="password_confirmation"
//                                     value={data.password_confirmation}
//                                     onChange={(e) => setData('password_confirmation', e.target.value)}
//                                     className="bg-transparent text-sm border-none w-full focus:ring-0 focus:outline-none px-3 pr-10"
//                                     required
//                                 />
//                                 <button
//                                     type="button"
//                                     onClick={() => setShowPassword(!showPassword)}
//                                     className="absolute right-2 top-1/2 -translate-y-1/2 text-main"
//                                 >
//                                     {showPassword ? (
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
//                                             <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
//                                             <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
//                                         </svg>
//                                     ) : (
//                                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
//                                             <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
//                                             <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
//                                         </svg>
//                                     )}
//                                 </button>
//                             </div>
//                         </div>


//                         <button
//                             type="submit"
//                             disabled={processing}
//                             className="w-full bg-main text-white p-2 rounded text-sm hover:bg-main_dark"
//                         >
//                             {processing ? 'Mengubah...' : 'Reset Password'}
//                         </button>
//                     </form>
//                 </section>
//             </div>
//         </>
//     );
// }

























import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function ResetPasswordOtp({ kontak }) {
  const { data, setData, post, processing, errors } = useForm({
    kontak: kontak || '',
    otp: '',
    password: '',
    password_confirmation: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (kontak) {
      setData('kontak', kontak);
    }
  }, [kontak]);

  const submit = (e) => {
    e.preventDefault();
    post(route('password.otp.reset.submit'));
  };

  return (
    <>
      <Head title="Reset Password" />

      <div className="mx-auto w-full max-w-[500px] md:max-w-2xl lg:max-w-3xl min-h-screen flex flex-col md:items-center md:justify-center md:px-8">
        <div className="min-h-screen md:min-h-full w-full bg-white px-4 py-6 md:rounded-xl md:shadow-lg relative">

          {/* Header */}
          <header className="fixed md:static top-0 left-1/2 -translate-x-1/2 md:translate-x-0 max-w-[500px] w-full z-10 bg-main md:bg-transparent md:mb-8">
            <div className="w-full flex items-center px-4 py-2 space-x-4">
              <button
                onClick={() => window.history.back()}
                className="w-6 h-6 text-white md:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                  <path d="M15.41 7.41 14 6 8 12l6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <h1 className="text-white md:text-gray-800 font-bold text-lg md:text-2xl font-utama">
                Reset Password
              </h1>
            </div>
          </header>

          {/* Spacer supaya konten tidak ketimpa header di mobile */}
          <div className="h-11 md:hidden" />

          {/* Logo & heading */}
          <section className="w-full flex flex-col items-center space-y-4 mb-6 px-4">
            <img
              src="/storage/logo_no_bg.png"
              alt="Logo"
              className="w-20 p-1.5 border-4 border-white bg-white mx-auto"
            />
            <p className="font-utama text-xl font-bold text-center md:text-2xl">
              Reset Password
            </p>
            <p className="font-utama text-base font-medium text-gray-600 text-center">
              Buat password baru dengan email aktif
            </p>
          </section>

          {/* Form */}
          <section className="flex flex-col items-center justify-center gap-4 w-full px-4">
            <form onSubmit={submit} className="w-full space-y-4 mb-6">

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <div className="w-full h-10 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 px-3">
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="Wajib email aktif"
                    className="bg-transparent text-sm w-full focus:outline-none"
                    required
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 mb-1">Password Baru</label>
                <div className="relative w-full h-10 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 px-3 pr-10">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    placeholder="Minimal 6 karakter"
                    className="bg-transparent text-sm w-full focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-main"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="20" height="20">
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="20" height="20">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                        <path d="M0 8s3-5.5 8-5.5 8 5.5 8 5.5-3 5.5-8 5.5S0 8 0 8z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 mb-1">Konfirmasi Password</label>
                <div className="relative w-full h-10 flex items-center rounded-lg bg-neutral-100 border-2 border-gray-200 px-3 pr-10">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) => setData("password_confirmation", e.target.value)}
                    placeholder="Samakan dengan password"
                    className="bg-transparent text-sm w-full focus:outline-none"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-main"
                  >
                    {showConfirmPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="20" height="20">
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" width="20" height="20">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                        <path d="M0 8s3-5.5 8-5.5 8 5.5 8 5.5-3 5.5-8 5.5S0 8 0 8z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password_confirmation && (
                  <p className="text-red-500 text-sm mt-1">{errors.password_confirmation}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isFormValid || processing}
                className={`w-full py-2 text-white rounded ${!isFormValid || processing ? "bg-gray-400 cursor-not-allowed" : "bg-main hover:bg-main_dark"
                  }`}
              >
                {processing ? "Mengubah..." : "Reset Password"}
              </button>

            </form>
          </section>
        </div>
      </div>
    </>

  );
}