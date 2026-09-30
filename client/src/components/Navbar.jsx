import { useState } from "react";
import { FaHome, FaChalkboardTeacher, FaBullhorn, FaFileAlt, FaUserCircle, FaSignOutAlt, FaBars, FaTimes, FaGraduationCap } from "react-icons/fa";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import api from "../services/api"

const Navbar = () => {
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const response = await api.post("/users/logout");
            console.log("response", response);
            toast.success(response.data.msg || "Logout Successful");
            navigate("/login");
        } catch (error) {
            console.log(error);
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);
            console.log("Message:", error.message);
            // console.log(error.response?.data?.msg);
            toast.error(error.response?.data?.msg || "Logout Failed");
        }
    }

    const [isOpen, setIsOpen] = useState(false);

    const NAV_LINKS = [
        { label: "Home", path: "/home", icon: FaHome },
        { label: "Teachers", path: "/teachers", icon: FaChalkboardTeacher },
        { label: "Notice Board", path: "/notice", icon: FaBullhorn },
        { label: "Document/Details", path: "/documents", icon: FaFileAlt },
    ];

    return (
        <nav className="relative z-50 bg-[#14213D] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* logo */}
                    <div className="flex items-center gap-2 shrink-0">
                        <FaGraduationCap size={24} className="text-[#C9A227]" />
                        <span className="font-['Fraunces',serif] text-base sm:text-lg leading-tight">
                            Bhagwant Sahay College
                        </span>
                    </div>

                    {/* desktop links (md and up) */}
                    <div className="hidden md:flex items-center gap-1 lg:gap-2">
                        {NAV_LINKS.map(({ label, path, icon: Icon }) => (
                            <a
                                key={label}
                                href={path}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <Icon size={15} />
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* desktop right side: profile + logout (md and up) */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            type="button"
                            className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/10 hover:bg-white/15 transition-colors"
                            onClick={() => navigate("/profile")}
                        >
                            <FaUserCircle size={26} className="text-[#C9A227]" />
                            <span className="text-sm font-medium">Profile</span>
                        </button>
                        <button
                            type="button"
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-[#C9A227] text-[#14213D] hover:bg-[#dbb43a] transition-colors"
                            onClick={logoutHandler}
                        >
                            <FaSignOutAlt size={15} />
                            Logout
                        </button>
                    </div>

                    {/* mobile: hamburger toggle */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                        className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/10"
                    >
                        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>

                    {/* mobile menu panel */}
                    <div
                        className={`${isOpen ? "flex" : "hidden"
                            } md:hidden! absolute top-16 left-0 right-0 flex-col bg-[#14213D] border-t border-white/10 px-4 pb-4 pt-2 gap-1 shadow-lg`}
                    >
                        {NAV_LINKS.map(({ label, path, icon: Icon }) => (
                            <a
                                key={label}
                                href={path}
                                className="flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium text-white/85 hover:bg-white/10"
                            >
                                <Icon size={16} />
                                {label}
                            </a>
                        ))}

                        <div className="mt-2 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                            <button
                                type="button"
                                className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full bg-white/10"
                                onClick={() => navigate("/profile")}
                            >
                                <FaUserCircle size={26} className="text-[#C9A227]" />
                                <span className="text-sm font-medium">Profile</span>
                            </button>
                            <button
                                type="button"
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-[#C9A227] text-[#14213D]"
                                onClick={logoutHandler}
                            >
                                <FaSignOutAlt size={15} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;