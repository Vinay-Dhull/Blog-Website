import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Copyright */}
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <div className="flex items-center mb-6">
              <Logo width="120px" className="text-white" />
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Empowering your digital journey with innovative solutions.
            </p>
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} DevUI. All rights reserved.
            </p>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full md:w-2/3">
            {/* Company */}
            <div>
              <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
                Company
              </h3>
              <ul className="space-y-3">
                {["Features", "Pricing", "Affiliate Program", "Press Kit"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="/"
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
                Support
              </h3>
              <ul className="space-y-3">
                {["Account", "Help", "Contact Us", "Customer Support"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="/"
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Legals */}
            <div>
              <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4 border-b border-gray-700 pb-2">
                Legals
              </h3>
              <ul className="space-y-3">
                {["Terms & Conditions", "Privacy Policy", "Licensing"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to="/"
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 mb-2 md:mb-0">
            Made with ❤️ by DevUI Team
          </p>
          <div className="flex space-x-4">
            {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-xs"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
