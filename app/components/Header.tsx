'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import FavoritesDropdown from './FavoritesDropdown';
import { signOut } from 'next-auth/react';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  const favoriteItemCount = useSelector((state: RootState) =>
    state.cart.favorites.length
  );

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  

  return (
    <>
      <header className="bg-white shadow-lg py-4 md:py-6 px-4 md:px-12 sticky top-0 z-50">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image src="/images/Logo.png" alt="Logo" width={60} height={39} className="md:w-36 md:h-auto lg:w-14" />
          </Link>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="🔎︎ Search"
            className="hidden md:block text-md md:text-xl px-4 md:px-6 py-2 mx-2 md:mx-40 h-8 md:h-12 w-full md:w-3/4 rounded-md bg-myGray"
          />

          {/* Profile, Heart, Cart */}
          <div className="flex space-x-2 md:space-x-4 relative items-center">
            {/* Profile */}
            <button onClick={() => signOut()}>
              <Image
                src="/images/Profile.png"
                alt="Profile"
                width={65}
                height={65}
                className="mb-1 md:mb-0 w-10 h-10 md:w-36 md:h-auto lg:w-14"
              />
            </button>

            {/* Heart (Favorites) */}
            <div className="relative">
              <button onClick={toggleDropdown}>
                <Image src="/images/Heart.png" alt="Heart" width={65} height={65} className="mt-1 w-10 h-10 md:w-36 md:h-auto lg:w-14" />
              </button>
              {favoriteItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 md:px-2 py-0.5 text-xs">
                  {favoriteItemCount}
                </span>
              )}
              {/* Dropdown */}
              {dropdownOpen && <FavoritesDropdown />}
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Image
                src="/images/Cart.png"
                alt="Cart"
                width={65}
                height={65}
                className="w-10 h-10 md:w-36 md:h-auto lg:w-14"
              />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 md:px-2 py-0.5 text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="block md:hidden mt-3">
          <input
            type="text"
            placeholder="🔎︎ Search"
            className="text-md px-4 py-2 w-full rounded-md bg-myGray"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
