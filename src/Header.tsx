export const NonLoggedInHeader = () => {
    const navItems = [
        { label: "Home", link: "/" },
        { label: "How it Works", link: "/how-it-works" },
        { label: "Success Stories", link: "/success-stories" },
        { label: "Pricing", link: "/pricing" },
    ];

    return (
        <div className="navbar bg-gradient-to-r from-blue-200 to-purple-200 shadow-sm px-4 font-sans">

            <div className="flex-none">
                <a className="btn btn-ghost text-xl font-semibold hover:bg-purple-100 hover:rounded-xl transition-all duration-200">Dev Bumble</a>
            </div>

            <div className="flex-1 flex justify-center hidden lg:flex">
                <div className="flex justify-center">
                    <ul className="menu menu-horizontal px-1 gap-2 flex justify-center">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <a className="btn btn-ghost font-medium hover:bg-purple-100 hover:rounded-xl transition-all duration-200">
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="flex-none gap-2">
                <a className="btn btn-ghost font-medium hover:bg-purple-100 hover:rounded-xl transition-all duration-200">Log In</a>
                <a className="btn btn-primary font-medium hover:bg-purple-600 hover:rounded-xl transition-all duration-200">Sign Up</a>
            </div>
        </div>
    )
}