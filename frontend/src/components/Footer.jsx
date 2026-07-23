import { Facebook, Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fb] border-t border-gray-200 py-10 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-bold mb-2">MindMap</h3>
          <p className="text-gray-600">
            Transform the way you understand and visualize information.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[#0ea5e9]">Home</a></li>
            <li><a href="/signup" className="hover:text-[#0ea5e9]">Signup</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Follow Us</h4>
          <div className="flex gap-4">
            {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="p-2 rounded-full border border-gray-300 hover:bg-[#0ea5e9] hover:text-white transition-all duration-300"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        © 2025 MindMap. All rights reserved.
      </div>
    </footer>
  );
}
