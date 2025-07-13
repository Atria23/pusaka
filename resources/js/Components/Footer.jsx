import React from "react";
import { Link } from "@inertiajs/react";

function Footer() {
  const navItems = [
    {
      label: "Beranda",
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      route: "user.dashboard",
    },
    {
      label: "Riwayat",
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M5.617 2.076a1 1 0 0 1 1.09.217L8 3.586l1.293-1.293a1 1 0 0 1 1.414 0L12 3.586l1.293-1.293a1 1 0 0 1 1.414 0L16 3.586l1.293-1.293A1 1 0 0 1 19 3v18a1 1 0 0 1-1.707.707L16 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L12 20.414l-1.293 1.293a1 1 0 0 1-1.414 0L8 20.414l-1.293 1.293A1 1 0 0 1 5 21V3a1 1 0 0 1 .617-.924ZM9 7a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Zm0 4a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      route: "penukaran",
    },
    {
      label: "Profil",
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 20a7.966 7.966 0 0 1-5.002-1.756v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
            clipRule="evenodd"
          />
        </svg>
      ),
      route: "profile",
    },
  ];

  return (
    <footer className="mx-auto fixed bottom-0 left-0 right-0 w-full max-w-[500px] max-h-[64px] flex flex-col bg-white shadow-2xl py-2 z-50">
      <div className="flex justify-between items-center text-sm">
        {navItems.map((item, index) => {
          const isActive = route().current(item.route);
          return (
            <Link
              key={index}
              href={route(item.route)}
              className={`flex flex-col items-center justify-center flex-grow transition ${
                isActive ? "text-blue-500" : "text-gray-500 text-xs"
              }`}
            >
              {item.icon}
              <span className={`mt-1 ${isActive ? "text-base -translate-y-1" : "text-xs"}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}

export default Footer;
