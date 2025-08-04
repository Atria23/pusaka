import { Link, Head } from '@inertiajs/react';
import React from 'react';

export default function ResetPasswordSuccess() {
  return (
    <>
      <Head title="Reset Password Sukses" />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-6">
        <div className="w-full max-w-screen-sm bg-white rounded-lg shadow-md px-4 sm:px-6 py-6 relative">
          {/* Header */}
          <div className="fixed md:static top-0 left-0 md:left-auto w-full z-10 bg-main md:rounded-t-lg">
            <div className="flex items-center space-x-4 px-4 py-2 mb-8 max-w-screen-sm mx-auto">
              <button
                className="w-6 h-6 shrink-0"
                onClick={() => window.history.back()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-6 h-6"
                >
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                </svg>
              </button>
              <div className="font-utama text-white font-bold text-lg">
                Reset Password Sukses
              </div>
            </div>
          </div>

          <div className="pt-14 md:pt-0 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center space-y-4 mb-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-24 h-24 text-green-500"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.8 11.8 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7 7 0 0 0 1.048-.625 11.8 11.8 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.54 1.54 0 0 0-1.044-1.263 63 63 0 0 0-2.887-.87C9.843.266 8.69 0 8 0m2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793z"
                />
              </svg>
              <p className="font-utama text-xl font-bold">
                Password Sudah Diperbarui
              </p>
              <p className="font-utama text-base font-medium text-gray-600">
                Kata sandimu berhasil diubah! Silakan masuk kembali untuk melanjutkan akses ke akunmu.
              </p>
            </div>

            <div className="w-full flex flex-col space-y-2">
              <Link
                href={route("login")}
                className="w-full text-center text-white p-2 rounded transition bg-main hover:bg-main_dark"
              >
                Kunjungi Halaman Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

