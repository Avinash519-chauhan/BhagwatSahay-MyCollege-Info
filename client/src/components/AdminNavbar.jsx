import {FaGraduationCap} from "react-icons/fa";

const AdminNavbar = () => {
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
                </div>
            </div>
        </nav>
    )
}

export default AdminNavbar;