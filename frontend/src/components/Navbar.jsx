// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import useAuthStore from "../stores/authStore";

// export default function Navbar() {
//   const { user } = useAuthStore();
//   return (
//     <motion.nav
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="fixed w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm"
//     >
//       <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
//         <Link to="/" className="flex items-center gap-2">
//           <img src="./logo.png" alt="Logo" className="h-10 w-auto" />
//           <span className="font-bold text-lg text-gray-800">MindMap</span>
//         </Link>

//         <div className="hidden md:flex gap-8">
//           {["home", "signup", "login"].map((item) => (
//             <Link
//               key={item}
//               to={`/${item}`}
//               className="text-gray-700 font-medium hover:text-[#0ea5e9] transition-colors duration-300"
//             >
//               {item.charAt(0).toUpperCase() + item.slice(1)}
//             </Link>
//           ))}
//         </div>

//         <button className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-all">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-7 w-7"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       </div>
//     </motion.nav>
//   );
// }


import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {useAuthStore }from "../store/authStore";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  console.log("Navbar user:", user);
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="./logo.png" alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-lg text-gray-800">MindMap</span>
        </Link>

        <div className="hidden md:flex gap-8">
          {["home", "signup", user ? "logout" : "login"].map((item) => (
            item === "logout" ? (
              <button
                key="logout"
                onClick={logout}
                className="text-gray-700 font-medium hover:text-[#0ea5e9] transition-colors duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                key={item}
                to={`/${item === "home" ? "" : item}`}
                className="text-gray-700 font-medium hover:text-[#0ea5e9] transition-colors duration-300"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Link>
            )
          ))}
        </div>

        <button className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}