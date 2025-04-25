export const Footer = () => {
    const footerLinks = [
        { label: "About Us", link: "/about" },
        { label: "Contact", link: "/contact" },
        { label: "Privacy Policy", link: "/privacy" },
        { label: "Terms of Service", link: "/terms" },
    ];

    return (
        <footer className="bg-gradient-to-r from-blue-200 to-purple-200 shadow-sm px-4 py-8 font-sans mt-auto fixed bottom-0 w-full">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and Copyright */}
                    <div className="mb-4 md:mb-0">
                        <div className="text-xl font-semibold mb-2 flex items-center gap-4">
                            Dev Bumble
                            <span className="text-sm text-gray-600 font-normal flex items-center gap-2">
                                Made with ❤️ by Himanshu Dhaka
                                <span className="mx-2">•</span>
                                <a href="mailto:himanshudhaka987@gmail.com" className="hover:text-purple-600 transition-colors duration-200">
                                    himanshudhaka987@gmail.com
                                </a>
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">© {new Date().getFullYear()} Dev Bumble. All rights reserved.</p>
                    </div>

                    {/* Footer Links */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {footerLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.link}
                                className="text-gray-700 hover:text-purple-600 transition-colors duration-200"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}; 