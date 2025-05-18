import { Badge } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { CartContext } from '../contexts/CartContext';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const { cart } = useContext(CartContext)

    const cartTotal = Object.values(cart)?.reduce((total, item) => total + (item.quantity || 0), 0)

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }

        if (menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [menuOpen]);

    return (
        <header className="text-gray-600 body-font sticky top-0 bg-white z-10 shadow-sm">
            <div className="container mx-auto flex flex-wrap p-5 md:flex-row md:items-center relative md:static">
                <Link href={'/'} className="flex title-font font-medium items-center text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                    <span className="ml-3 text-xl hidden md:inline">Esight</span>
                </Link>
                <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden ml-auto focus:outline-none" aria-label="Open menu">
                    <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <nav className="md:ml-auto md:mr-auto hidden md:flex flex-wrap items-center text-base justify-center">
                    <Link href={'/'} className="mr-5 hover:text-gray-900 cursor-pointer">Home</Link>
                    <Link href={'/about'} className="mr-5 hover:text-gray-900 cursor-pointer">About</Link>
                    <Link href={'/contact'} className="mr-5 hover:text-gray-900 cursor-pointer">Contact</Link>
                </nav>
                <Link href={'/cart'} className="hidden md:inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 cursor-pointer rounded text-base mt-4 md:mt-0">
                    <Badge badgeContent={cartTotal} color="error">
                        <ShoppingCartIcon />
                    </Badge>
                </Link>
                {menuOpen && (
                    <div className="md:hidden absolute top-5 right-5 bg-gray-100 px-8 py-4 rounded-xl shadow-lg z-1000" ref={menuRef}>
                        <nav className="flex flex-col space-y-4 text-gray-900">
                            <Link href={'/'} className="flex title-font font-medium items-center text-gray-900" onClick={() => setMenuOpen(false)}>
                                Home
                            </Link>
                            <Link href={'/about'} className="flex title-font font-medium items-center text-gray-900" onClick={() => setMenuOpen(false)}>
                                About
                            </Link>
                            <Link href={'/contact'} className="flex title-font font-medium items-center text-gray-900" onClick={() => setMenuOpen(false)}>
                                Contact
                            </Link>
                            <Link href={'/cart'} className="flex title-font font-medium items-center text-gray-900" onClick={() => setMenuOpen(false)}>
                                Cart {cartTotal > 0 && `( ${cartTotal} )`}
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar