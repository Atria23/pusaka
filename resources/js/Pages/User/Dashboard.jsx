import React, { useState } from "react";
import BannerSlider from "@/Components/BannerSlider";
import { Head } from "@inertiajs/react";
import SidebarDrawer from "@/Components/SidebarDrawer";

function Dashboard({ user }) {
  const [showPoints, setShowPoints] = useState(false);

  const togglePointsVisibility = () => {
    setShowPoints(!showPoints);
  };

  const summary = user.summary || {};
  const latestTransactions = user.latestTransactions || [];

  const formatDate = (dateString) => {
    if (!dateString) return 'Belum ada';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <>
      <Head title="Dashboard" />
      <div className="mx-auto w-full max-w-[500px] max-h-[892px] min-h-screen">
        {/* Header */}
        <section className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-10 h-max flex flex-row items-center justify-center p-4 bg-main">
          <div className="w-full h-full flex flex-col my-auto items-start">
            <div className="font-utama text-white font-bold text-lg">
              Halo,
            </div>
            <div className="font-utama text-white font-bold text-lg">
              {user.name}
            </div>
          </div>

          <SidebarDrawer />
        </section>

        {/* section saldo */}
        <section className="w-full h-max flex flex-col space-y-4 items-center justify-center px-4 pt-[105px] pb-4 rounded-b-[20px] bg-white">
          {/* card */}
          <div className="w-full max-w-[450px] flex flex-col space-y-3 items-start justify-start p-4 rounded-[20px] bg-main-white">
            {/* saldo */}
            <div className="w-max h-max flex flex-col">
              <p className="w-full h-max font-utama font-semibold text-sm text-left flex items-center">Poin</p>
              <div className="w-max h-max flex flex-row space-x-4 items-center justify-start">
                <p className="font-utama text-xl font-bold">
                  {showPoints ? `${parseFloat(user.points).toLocaleString('id-ID')}` : "••••••••"}
                </p>
                <button
                  onClick={togglePointsVisibility}
                  className="text-main hover:text-blue-700"
                >
                  {showPoints ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" className="bi bi-eye-slash-fill text-main" fill="currentColor" viewBox="0 0 16 16">
                      <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                      <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" className="bi bi-eye-fill text-main" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="w-full h-px bg-gray-200"></div>

            {/* menu saldo */}
            <div className="w-full grid grid-cols-2 min-[350px]:grid-cols-4 gap-4 justify-between px-4">
              {/* Item Menu 1 */}
              <a href={route('setoran')} className="flex flex-col items-center space-y-1">
                <div className="w-14 h-14 bg-white flex items-center justify-center rounded-full shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6 text-main" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                  </svg>
                </div>
                <p className="text-center text-xs">Setoran</p>
              </a>
              {/* Item Menu 2 */}
              <a href={route('user.riwayat')} className="flex flex-col items-center space-y-1">
                <div className="w-14 h-14 bg-white flex items-center justify-center rounded-full shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-main" viewBox="0 0 16 16">
                    <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z" />
                    <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5" />
                  </svg>
                </div>
                <p className="text-center text-xs">Riwayat Setoran</p>
              </a>
              {/* Item Menu 3 */}
              <a href={route('voucher')} className="flex flex-col items-center space-y-1">
                <div className="w-14 h-14 bg-white flex items-center justify-center rounded-full shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-main" viewBox="0 0 16 16">
                    <path d="M4 4.85v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9zm-7 1.8v.9h1v-.9zm7 0v.9h1v-.9z" />
                    <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3zM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9z" />
                  </svg>
                </div>
                <p className="text-center text-xs">Voucher</p>
              </a>
              {/* Item Menu 4 */}
              <a href={route('produk-olahan.user.index')} className="flex flex-col items-center space-y-1">
                <div className="w-14 h-14 bg-white flex items-center justify-center rounded-full shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-6 h-6 text-main" viewBox="0 0 16 16">
                    <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z" />
                  </svg>
                </div>
                <p className="text-center text-xs">Galeri Produk</p>
              </a>
            </div>
          </div>
        </section>

        {/* konten utama */}
        <div className="w-full max-w-[500px] flex flex-col space-y-7 pt-7 pb-6">
          {/* banner */}
          <section className="w-full px-6">
            <BannerSlider />
          </section>

          {/* section kategori */}
          <section className="w-full flex flex-col space-y-4 items-center justify-start">
            <div className="w-full max-w-[450px] grid grid-cols-3 gap-x-6 gap-y-4">
              {[
                {
                  name: 'Botol Pet',
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 45.63 122.88"
                      className="w-8 h-8 fill-white"
                    >
                      <path d="M13.85,13.75H31.78v5.62C31.91,25.15,44.3,22.91,45.56,39A25.7,25.7,0,0,1,45,46.65c-3,1.55-2.43,8.19.13,8.81v1.48H.49V55.46c2.57-.62,3.09-7.26.14-8.81A25.54,25.54,0,0,1,.08,39c1.3-16,13.65-13.82,13.77-19.59V13.75Zm18.84-1.69H12.94a.86.86,0,0,1-.86-.86V3.3A3.26,3.26,0,0,1,13,1L13.05,1a3.28,3.28,0,0,1,2.33-1H30.25a3.26,3.26,0,0,1,2.33,1,3.3,3.3,0,0,1,1,2.33v7.9a.85.85,0,0,1-.86.86Zm12.45,47V81.46H.49V59.05Zm0,24.51v3.07c-3.14,1.39-2.6,7.87,0,9.25v20.4c-1.28,9.11-14.18,8.49-13.86,0a5.67,5.67,0,0,1-1.17,3.37c-4.15,5.47-15.64,3.68-15.76-3.37.33,8.49-12.58,9.11-13.86,0V95.88C3.1,94.5,3.63,88,.49,86.63V83.56ZM5.26,98.45a1.13,1.13,0,0,1,2.26,0v13.27a1.13,1.13,0,0,1-2.26,0V98.45ZM5.26,63a1.13,1.13,0,1,1,2.26,0V77.46a1.13,1.13,0,0,1-2.26,0V63ZM13,26.41a1.13,1.13,0,0,1,1.31,1.83,16.91,16.91,0,0,0-4.54,4.68,16.31,16.31,0,0,0-2.3,5.87,1.12,1.12,0,0,1-2.2-.42A18.5,18.5,0,0,1,7.9,31.7,19.15,19.15,0,0,1,13,26.41Z" />
                    </svg>
                  ),
                },

                {
                  name: 'Kardus',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6 text-white" viewBox="0 0 16 16">
                      <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zM15 4.667V5H1v-.333L1.5 4h6V1h1v3h6z" />
                    </svg>
                  ),
                },
                {
                  name: 'Kertas',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" className="w-8 h-8 fill-white" viewBox="0 0 392 512.309"><path d="M58.883 0h186.242v93.425l.099 1.406c1.618 22.2 9.835 40.061 24.454 52.552 14.088 12.047 33.864 18.745 59.129 19.14l63.193.036v286.86c0 32.331-26.552 58.89-58.883 58.89H58.883C26.545 512.309 0 485.814 0 453.419V58.883C0 26.495 26.495 0 58.883 0zm48.892 412.172c-5.673 0-10.28-4.607-10.28-10.28 0-5.674 4.607-10.28 10.28-10.28h141.71c5.673 0 10.28 4.606 10.28 10.28 0 5.673-4.607 10.28-10.28 10.28h-141.71zm0-175.532c-5.673 0-10.28-4.607-10.28-10.28 0-5.674 4.607-10.28 10.28-10.28h176.45c5.673 0 10.28 4.606 10.28 10.28 0 5.673-4.607 10.28-10.28 10.28h-176.45zm0 84.77c-5.673 0-10.28-4.607-10.28-10.28 0-5.674 4.607-10.28 10.28-10.28h167.102c5.674 0 10.281 4.606 10.281 10.28 0 5.673-4.607 10.28-10.281 10.28H107.775zM265.685 3.159L392 139.816v6.197l-63.03.035c-20.179-.346-35.532-5.327-45.967-14.251-10.288-8.796-16.109-21.853-17.318-38.414V3.159z" /></svg>
                  ),
                },
                {
                  name: 'Aluminium',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" className="w-8 h-8 fill-white" viewBox="0 0 277 512.254"><path d="M159.845 43.009c22.188.963 43.233 3.339 59.839 6.665 24.208 4.847 40.16 12.898 40.16 23.269 0 .259-.012.516-.03.772l3.714 32.623-.019.002c.049.443.058.885.028 1.323l13.075 39.051a7.466 7.466 0 01.087 4.473l.002.057.212 253.864c-.107 15.169-.778 26.342-4.18 35.25-2.276 5.96-5.58 10.738-10.413 14.683-.104 1.88-.148 3.476-.19 5.031-.402 14.644-.731 26.609-21.205 36.04-23.934 11.025-60.937 16.142-98.112 16.142-39.064 0-78.759-5.651-103.946-16.025-19.392-7.987-20.441-15.927-22.078-28.332-.357-2.71-1.926-9.639-3.031-13.996-3.269-2.898-5.852-6.242-7.892-10.225C1.64 435.423.24 424.961.134 410.226l.177-258.808-.002-.201a7.47 7.47 0 01.061-4.444l13.569-41.639c.054-.155.672-1.619 1.01-2.418l1.24-29.487-.006-.286c0-10.371 15.951-18.422 40.16-23.269 13.769-2.758 30.591-4.862 48.585-6.05L96.85 31.292c-4.729-8.442-8.29-12.633 1.049-20.624C106.31 3.473 121.882-.625 133.464.078c13.52.827 13.542 5.136 16.902 15.909l9.479 27.022zm94.789 416.977c-.146.073-.293.146-.438.221-22.9 11.38-54.127 16.591-80.433 19.004-30.807 2.829-62.42 2.07-92.925-2.652-17.123-2.754-34.288-6.755-50.426-13.148a97.872 97.872 0 01-4.005-1.678 72.715 72.715 0 01-3.21-1.531c2.619 13.852-.118 21.416 18.521 29.093 47.266 19.47 149.032 21.667 196.064 0 16.2-7.463 16.521-17.286 16.852-29.309zm3.256-345.466c-26.02 10.876-60.318 14.548-88.345 16.028l-.422.022-.739.036c-25.367 1.215-50.697.753-75.997-1.472l-.45-.041a456.898 456.898 0 01-24.608-2.933c-13.359-2.052-30.029-5.031-42.268-10.724-1.923-.893-3.812-1.911-5.524-3.135l-.03-.022-10.299 31.604.019.004.019.004.019.004.019.004.057.011.019.004.019.004.019.004.019.005.019.003.019.005.02.004.019.005.075.018.019.004.019.005.019.005.02.004.056.015.019.005.019.005.019.005.019.006.019.005.019.005.019.005.056.016.019.006.02.005.018.006.019.006.019.006.019.005.018.006.02.005.011.004.008.003.019.006.018.006.019.006.019.006.019.006.019.006.037.013.019.006.006.003.013.004.018.006.02.007.056.02.019.007.018.007.019.007.019.007c25.427 9.543 75.303 13.751 125.232 13.751 54.874 0 109.196-5.061 130.765-13.693l.003.008.041-.016.04-.016.041-.015.019-.008.021-.008h.001l.02-.007.02-.008.02-.007.021-.007.001-.001.019-.007.02-.007.002-.001.019-.006.02-.008h.002l.019-.006.021-.008.001-.001.019-.006.021-.007h.002l.019-.007.02-.007h.002l.019-.006.021-.006.002-.002.019-.005.02-.007.063-.019.02-.006.004-.002.018-.005.02-.006.003-.002.019-.004.02-.007.004-.001.018-.005.02-.006.004-.001.018-.005.127-.034.021-.006.005-.001.016-.004.086-.021.021-.006.006-.001.016-.003.021-.006.005-.001.016-.003.022-.005.006-.002.015-.003.044-.01.021-.005.006-.001.016-.003.021-.005.007-.001.015-.003.021-.005.007-.001.016-.003.021-.004-9.838-29.385-.032.013zm-95.36-63.857l3.466 9.878a339.91 339.91 0 0118.943-.523c22.527 0 36.199 6.006 36.199 13.415 0 7.41-13.672 13.415-36.199 13.415-22.433 0-56.094.044-59.634-12.118l-15.632-23.863c-46.472 2.658-85.969 11.534-85.969 22.076 0 12.641 57.071 19.84 114.586 19.84 57.514 0 114.032-7.199 114.032-19.84 0-10.83-41.683-19.902-89.792-22.28zm-55.562-27.642c-.021 1.465.308 3.12 1.054 4.965 3.004 7.478 8.805 8.048 16.416 7.183 9.916-1.133 20.246-6.539 18.298-13.097-1.634-4.724-2.548-6.628-4.261-8.681-5.337-6.401-31.35-.931-31.507 9.63zm146.414 60.582l-.054.039c-8.404 6.035-21.499 8.977-31.581 10.766-22.086 3.842-52.68 5.897-83.457 5.897-30.808 0-61.591-2.058-83.83-5.909-8.949-1.567-19.134-3.868-27.245-8.045a37.823 37.823 0 01-3.953-2.339l-.021-.014-.877 20.862c14.755 18.9 169.976 29.845 233.701 2.301l-.841-7.381-1.842-16.177z" /></svg>
                  ),
                },
                {
                  name: 'Besi',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-6 h-6 text-white" viewBox="0 0 16 16">
                      <path d="M15 12h-4v3h4zM5 12H1v3h4zM0 8a8 8 0 1 1 16 0v8h-6V8a2 2 0 1 0-4 0v8H0z" />
                    </svg>
                  ),
                },
                {
                  name: 'Plastik HDPE',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" class="w-8 h-8 text-white" fill="currentColor">
                      <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
                        <path d="M 52.885 84.86 H 11.639 c -4.201 0 -7.963 -2.172 -10.064 -5.811 c -2.1 -3.638 -2.1 -7.981 0.001 -11.619 l 4.72 -8.176 L 5.05 58.534 l 9.273 -5.353 l 0.001 10.708 l -1.603 -0.925 l -4.72 8.176 c -1.095 1.895 -0.365 3.569 0 4.2 c 0.364 0.632 1.449 2.101 3.638 2.101 h 41.247 L 52.885 84.86 z" />
                        <path d="M 13.633 45.026 l 20.623 -35.72 c 2.101 -3.638 5.862 -5.811 10.064 -5.81 c 4.201 0 7.962 2.172 10.062 5.81 l 4.721 8.176 l 1.246 -0.719 l 0 10.707 l -9.274 -5.353 l 1.603 -0.925 l -4.721 -8.176 c -1.094 -1.896 -2.908 -2.101 -3.637 -2.101 c -0.73 0 -2.544 0.204 -3.639 2.1 L 20.057 48.736 L 13.633 45.026 z" />
                        <path d="M 67.801 31.916 l 20.623 35.72 c 2.101 3.638 2.101 7.982 0 11.621 c -2.1 3.638 -5.862 5.809 -10.063 5.809 l -9.441 0.001 l 0 1.438 l -9.273 -5.354 l 9.273 -5.355 l 0 1.851 l 9.441 0 c 2.189 0 3.273 -1.468 3.638 -2.1 c 0.365 -0.632 1.095 -2.305 0 -4.201 L 61.376 35.624 L 67.801 31.916 z" />
                        <path d="M 30.473 54.063 c -0.552 0 -1 0.447 -1 1 v 4.928 h -5.19 v -4.928 c 0 -0.553 -0.448 -1 -1 -1 s -1 0.447 -1 1 V 66.92 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 v -4.929 h 5.19 v 4.929 c 0 0.553 0.448 1 1 1 s 1 -0.447 1 -1 V 55.063 C 31.473 54.511 31.025 54.063 30.473 54.063 z" />
                        <path d="M 41.156 54.063 h -4.803 c -0.552 0 -1 0.447 -1 1 V 66.92 c 0 0.553 0.448 1 1 1 h 4.803 c 1.961 0 3.556 -1.596 3.556 -3.557 V 57.62 C 44.712 55.659 43.117 54.063 41.156 54.063 z M 42.712 64.363 c 0 0.858 -0.698 1.557 -1.556 1.557 h -3.803 v -9.856 h 3.803 c 0.858 0 1.556 0.698 1.556 1.557 V 64.363 z" />
                        <path d="M 53.756 54.063 h -4.34 c -0.553 0 -1 0.447 -1 1 v 6.65 v 5.206 c 0 0.553 0.447 1 1 1 s 1 -0.447 1 -1 v -4.206 h 3.34 c 1.825 0 3.311 -1.485 3.311 -3.311 v -2.03 C 57.066 55.548 55.581 54.063 53.756 54.063 z M 55.066 59.403 c 0 0.723 -0.588 1.311 -1.311 1.311 h -3.34 v -4.65 h 3.34 c 0.723 0 1.311 0.588 1.311 1.31 V 59.403 z" />
                        <path d="M 66.717 65.92 H 61.72 v -3.929 h 3.18 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 h -3.18 v -3.928 h 4.997 c 0.553 0 1 -0.447 1 -1 s -0.447 -1 -1 -1 H 60.72 c -0.553 0 -1 0.447 -1 1 V 66.92 c 0 0.553 0.447 1 1 1 h 5.997 c 0.553 0 1 -0.447 1 -1 S 67.27 65.92 66.717 65.92 z" />
                        <path d="M 40.855 36.135 c 0.552 0 1 -0.448 1 -1 c 0 -1.584 1.289 -2.873 2.873 -2.873 l 0.132 0.003 c 0.87 0.039 1.621 0.538 2.01 1.335 c 0.406 0.833 0.331 1.778 -0.201 2.527 l -6.629 9.319 c -0.217 0.305 -0.245 0.706 -0.074 1.038 c 0.171 0.333 0.515 0.542 0.889 0.542 h 8.291 c 0.553 0 1 -0.447 1 -1 c 0 -0.552 -0.447 -1 -1 -1 h -6.352 l 5.504 -7.74 c 0.95 -1.335 1.092 -3.083 0.37 -4.563 c -0.715 -1.465 -2.104 -2.383 -3.713 -2.456 c -0.075 -0.004 -0.151 -0.005 -0.227 -0.005 c -2.687 0 -4.873 2.186 -4.873 4.873 C 39.855 35.688 40.303 36.135 40.855 36.135 z" />
                      </g>
                    </svg>

                  ),
                },
              ].map((item, i) => (
                <a href="/sampah">
                  <div
                    key={i}
                    className="p-4 bg-white rounded-xl flex flex-col items-center justify-center space-y-2"
                  >
                    <div className="w-14 h-14 rounded-full bg-main flex items-center justify-center text-white text-2xl shadow-md">
                      {item.icon}
                    </div>
                    <div className="text-sm font-medium text-gray-700 text-center">{item.name}</div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="w-full px-6">
            <div className="bg-white rounded-xl border p-5">
              <h2 className="text-lg font-semibold mb-4">Ringkasan</h2>
              <div className="flex flex-col gap-3">

                {/* Total Poin */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-md p-3 border border-green-100">
                  <div className="bg-green-100 p-2 rounded-full">
                    {/* Ikon poin */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-green-600 w-5 h-5" viewBox="0 0 16 16">
                      <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Poin</p>
                    <p className="text-lg font-semibold text-green-600">
                      {Number(summary.total_poin).toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                {/* Total Setoran */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-md p-3 border border-blue-100">
                  <div className="bg-blue-100 p-2 rounded-full">
                    {/* Ikon setoran */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-blue-600 w-5 h-5" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />

                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Total Setoran</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {Number(summary.total_setoran).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 3 })} kg
                    </p>
                  </div>
                </div>

                {/* Setoran Terakhir */}
                <div className="flex items-center gap-3 bg-gray-50 rounded-md p-3 border border-yellow-100">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    {/* Ikon tanggal */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-yellow-600 w-5 h-5" viewBox="0 0 16 16">
                      <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27m.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0z" />
                      <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Setoran Terakhir</p>
                    <p className="text-base font-medium text-yellow-600">
                      {summary.tanggal_terakhir ? formatDate(summary.tanggal_terakhir) : 'Belum ada'}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <section className="w-full px-6 mt-6">
            <div className="bg-white rounded-xl border p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Riwayat Transaksi Terbaru</h2>
                <a
                  href={route('user.riwayat')}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Lihat Semua
                </a>
              </div>
              {latestTransactions.length > 0 ? (
                <div className="grid gap-2">
                  {latestTransactions.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-md border px-3 py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs"
                    >
                      <div className="space-y-0.5">
                        <p className="text-gray-500">
                          <span className="font-medium text-gray-700">Tanggal:</span> {formatDate(item.created_at)}
                        </p>
                        <p className="text-gray-500">
                          <span className="font-medium text-gray-700">Berat:</span> {Number(item.berat_dalam_kg).toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 3 })} kg
                        </p>
                        <p className="text-gray-500">
                          <span className="font-medium text-gray-700">Jenis:</span> {item.sampah?.nama_sampah ?? 'Tidak diketahui'}
                        </p>
                      </div>
                      <div className="mt-1 sm:mt-0 text-green-600 font-semibold text-xs">
                        +{Number(item.poin_diperoleh).toLocaleString('id-ID')} poin
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Belum ada transaksi yang tercatat.</p>
              )}
            </div>
          </section>
        </div>
      </div >
    </>
  );
}

export default Dashboard;
