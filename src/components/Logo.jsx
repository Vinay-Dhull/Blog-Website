import React from "react";

function Logo({ width = "100px", className = "" }) {
  return (
    <div className={`flex items-center ${className}`} style={{ width }}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Gradient circle background */}
        <circle cx="100" cy="100" r="90" fill="url(#gradient)" />

        {/* Abstract letter B shape */}
        <path
          d="M130 50H80C65 50 50 65 50 80V120C50 135 65 150 80 150H130C145 150 160 135 160 120V80C160 65 145 50 130 50Z"
          fill="white"
        />
        <path
          d="M110 80H80V120H110C117.5 120 120 117.5 120 110V90C120 82.5 117.5 80 110 80Z"
          fill="url(#gradient)"
        />
        <path
          d="M130 80H120V120H130C137.5 120 140 117.5 140 110V90C140 82.5 137.5 80 130 80Z"
          fill="url(#gradient)"
          fillOpacity="0.8"
        />

        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563eb" /> {/* blue-600 */}
            <stop offset="100%" stopColor="#7c3aed" /> {/* purple-600 */}
          </linearGradient>
        </defs>
      </svg>
      <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden md:inline-block">
        BlogSphere
      </span>
    </div>
  );
}

export default Logo;
