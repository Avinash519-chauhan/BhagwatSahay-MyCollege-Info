import { FaGraduationCap, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {

    const navigate = useNavigate();

    return (
        <nav className="relative z-50 bg-[#14213D] text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <div className="flex items-center gap-2 shrink-0">
                        <FaGraduationCap
                            size={24}
                            className="text-[#C9A227]"
                        />

                        <span className="font-['Fraunces',serif] text-base sm:text-lg leading-tight">
                            Bhagwant Sahay College
                        </span>
                    </div>

                    {/* Profile */}
                    <button
                        type="button"
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        onClick={() => navigate("/admin/profile")}
                    >
                        <FaUserCircle
                            size={26}
                            className="text-[#C9A227]"
                        />

                        <span className="text-sm font-medium">
                            Profile
                        </span>
                    </button>

                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;