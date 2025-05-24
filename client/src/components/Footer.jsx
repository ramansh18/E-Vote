import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-7xl mx-auto text-center">
                <p>&copy; 2025 E-Voting System. All rights reserved.</p>
                <p className="text-sm">
                    <a href="/terms" className="hover:text-gray-400">Terms of Service</a> | 
                    <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
