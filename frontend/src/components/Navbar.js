"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getUserFromLocalStorage, removeUserFromLocalStorage } from "@/services/authService";
import { useEffect, useState } from "react";
import { Menu, X, LogOut } from "lucide-react";
import { logout } from "@/redux/slices/authSlice";

export default function Navbar() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (!user) {
      const localUser = getUserFromLocalStorage();
      setUserData(localUser);
    } else {
      setUserData(user);
    }
  }, [user]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    removeUserFromLocalStorage();
    dispatch(logout());
    setTimeout(() => router.push("/"), 100);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  if (!isClient) return null;

  return (
    <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo + Tagline */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="text-2xl font-extrabold tracking-wide">
              TalentAlign
            </Link>
            <span className="text-sm italic text-yellow-200">AI Job Matching by Shriram</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/about" className="px-3 py-2 rounded hover:bg-purple-700">About</Link>
            <Link href="/contact" className="px-3 py-2 rounded hover:bg-purple-700">Contact</Link>

            {userData || isAuthenticated ? (
              <>
                <span className="font-medium">👋 Welcome, {userData?.name?.split(" ")[0] || "Guest"}</span>
                <Link href="/dashboard" className="px-3 py-2 rounded hover:bg-purple-700">Dashboard</Link>
                <Link href="/dashboard/profile" className="px-3 py-2 rounded hover:bg-purple-700">Profile</Link>
                <button onClick={handleLogout} className="flex items-center px-3 py-2 rounded bg-red-600 hover:bg-red-700">
                  <LogOut size={18} className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-3 py-2 rounded hover:bg-purple-700">Login</Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="p-2 rounded-md hover:bg-purple-700 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-purple-700">
            <Link href="/about" className="block px-3 py-2 rounded hover:bg-purple-700" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link href="/contact" className="block px-3 py-2 rounded hover:bg-purple-700" onClick={() => setIsMenuOpen(false)}>Contact</Link>

            {userData || isAuthenticated ? (
              <>
                <div className="px-3 py-2 font-medium">👋 Welcome, {userData?.name?.split(" ")[0] || "Guest"}</div>
                <Link href="/dashboard" className="block px-3 py-2 rounded hover:bg-purple-700" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                <Link href="/dashboard/profile" className="block px-3 py-2 rounded hover:bg-purple-700" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 rounded text-left bg-red-600 hover:bg-red-700">
                  <LogOut size={18} className="mr-1" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2 rounded hover:bg-purple-700" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link href="/register" className="block px-3 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-center" onClick={() => setIsMenuOpen(false)}>Join Now</Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
