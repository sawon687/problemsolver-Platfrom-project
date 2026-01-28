import { IoMail } from "react-icons/io5";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const Footer = ({ userRole = "solver" }) => {
  const roleLinks = {
    admin: ["Dashboard", "Users", "Projects"],
    buyer: ["Dashboard", "My Projects", "Requests"],
    solver: ["Dashboard", "Available Projects", "Assigned Projects"],
  };

  const generalLinks = ["Home", "About", "Blog", "Contact"];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Branding */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-blue-500">RacoAI</h1>
          <p className="text-gray-400 text-sm">
            Marketplace platform for projects and problem solvers. Connect, manage, and deliver efficiently.
          </p>
          <div className="flex space-x-3 mt-2">
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* General Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Explore</h3>
          <ul className="space-y-2 text-gray-400">
            {generalLinks.map((link) => (
              <li key={link} className="hover:text-blue-500 transition-colors">
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Role-based Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Dashboard</h3>
          <ul className="space-y-2 text-gray-400">
            {roleLinks[userRole].map((link) => (
              <li key={link} className="hover:text-blue-500 transition-colors">
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Contact</h3>
          <p className="flex items-center text-gray-400 mb-2">
            <IoMail className="w-5 h-5 text-blue-500 mr-2" /> support@racoai.com
          </p>
          <p className="text-gray-400 text-sm">
            123 Market St, Dhaka, Bangladesh
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} RacoAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
