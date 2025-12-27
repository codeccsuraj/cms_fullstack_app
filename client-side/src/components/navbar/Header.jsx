import React, { useState } from 'react';
import Logo from '../banner/Logo';
import userIcon from '../../assets/icons/user.png';
import searchIcon from '../../assets/icons/search.png';
import bellIcon from '../../assets/icons/notification.png';
import Modal from '../modal/Modal';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchBox, setSearchBox] = useState(false);
    const navigate = useNavigate();
    return (
        <>
            <header className="bg-white shadow-md">
                <div className="mx-auto lg:max-w-7xl px-2 sm:px-3 lg:px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex-shrink-0">
                            <Logo size="xs" />
                        </div>
                        <nav className="hidden md:block">
                            <ul className="flex space-x-8">
                                <li>
                                    <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors duration-200">Home</Link>
                                </li>
                                <li>
                                    <Link to="#" className="text-gray-700 hover:text-green-600 transition-colors duration-200">About</Link>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-700 hover:text-green-600 transition-colors duration-200">Services</a>
                                </li>
                                <li>
                                    <a href="#" className="text-gray-700 hover:text-green-600 transition-colors duration-200">Contact</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <span className="cursor-pointer" onClick={() => setSearchBox(true)}>
                                <img src={searchIcon} alt="Search" width={25} />
                            </span>
                            <span className="cursor-pointer" onClick={() => navigate("/profile")}>
                                <img src={userIcon} alt="User" width={25} />
                            </span>
                            <span className="cursor-pointer">
                                <img src={bellIcon} alt="User" width={25} />
                            </span>
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none"
                                aria-label="Toggle menu"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Sliding Menu */}
                    <div
                        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                            } md:hidden`}
                    >
                        <div className="flex flex-col h-full p-4">
                            <div className="flex justify-between items-center mb-6">
                                <Logo size="xs" />
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="p-2 rounded-md text-gray-700 hover:text-green-600"
                                    aria-label="Close menu"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <ul className="space-y-4">
                                <li>
                                    <a href="#" className="block text-gray-700 hover:text-green-600 transition-colors duration-200">Home</a>
                                </li>
                                <li>
                                    <a href="#" className="block text-gray-700 hover:text-green-600 transition-colors duration-200">About</a>
                                </li>
                                <li>
                                    <a href="#" className="block text-gray-700 hover:text-green-600 transition-colors duration-200">Services</a>
                                </li>
                                <li>
                                    <a href="#" className="block text-gray-700 hover:text-green-600 transition-colors duration-200">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {isMenuOpen && (
                        <div
                            className="fixed inset-0 backdrop-blur-2xl bg-opacity-50 z-40 md:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        ></div>
                    )}
                </div>
            </header>
            <Modal isOpen={searchBox} position='top' size='xl' onClose={() => setSearchBox(false)} >
                <div className='p-4 lg:p-6'>
                    <input
                    type="search"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Search..."
                />
                </div>
            </Modal>
        </>
    );
};

export default Header;
