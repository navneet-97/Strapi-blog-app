import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function NavBar() {

    const { user, logout } =
        useContext(AuthContext);

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">

            <div className="max-w-7xl mx-auto px-6">

                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-3xl font-black tracking-tight"
                    >
                        <span className="text-gray-900">
                            Dev
                        </span>

                        <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Blog
                        </span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center gap-6">

                        <Link
                            to="/"
                            className="text-gray-600 hover:text-blue-600 font-medium transition"
                        >
                            Home
                        </Link>

                        {user ? (
                            <>
                                <Link
                                    to="/post-article"
                                    className="text-gray-600 hover:text-blue-600 font-medium transition"
                                >
                                    Post Article
                                </Link>

                                <span className="text-sm text-gray-500">
                                    Hi, {user.username}
                                </span>

                                <button
                                    onClick={logout}
                                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-blue-600 font-medium transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default NavBar;