"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/about",
    name: "About",
  },
  {
    path: "/contact",
    name: "Contact",
  },
];

const Navbar = () => {
  let pathname = usePathname() || "/";

  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <div className="bg-white dark:bg-neutral-900 shadow-md p-4 rounded-lg sticky top-0 z-50 backdrop-blur-sm">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">GrowthWell</p>
        </Link>
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const isActive = item.path === pathname;

            return (
              <Link key={item.path} href={item.path}>
                <p
                  onMouseOver={() => setHoveredPath(item.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`relative px-3 py-2 rounded-md text-lg font-medium ${
                    isActive ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                  } transition-colors duration-200`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {hoveredPath === item.path && (
                    <motion.div
                      className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-md z-0"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    />
                  )}
                </p>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
