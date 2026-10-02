import { FaChalkboardTeacher, FaSignOutAlt, FaBullhorn, FaUsers, FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import AdminNavbar from "../../components/adminNavbar";

const Dashboard = () => {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        teacherCount: 0,
        noticeCount: 0,
        userCount: 0,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/admin/admin-dashboard");
                setStats(response.data);
            } catch (error) {
                console.log(error.response?.data?.msg);
            }
        };

        fetchData();
    }, []);

    const logoutHandler = async () => {
        try {
            const response = await api.post("/users/logout");
            toast.success(response.data.msg || "Logout Successful");
            navigate("/login");
        } catch (error) {
            console.log(error.response?.data?.msg);
            toast.error(error.response?.data?.msg || "Logout Failed");
        }
    }

    const SECTIONS = [
        {
            icon: FaChalkboardTeacher,
            title: "Teacher Data",
            count: stats.teacherCount,
            countLabel: "profiles",
            desc: "Add, edit or remove teacher profiles shown on the Teachers page.",
            href: "/admin/teacher",
        },
        {
            icon: FaBullhorn,
            title: "Notice Board",
            count: stats.noticeCount,
            countLabel: "active notices",
            desc: "Post new notices, update existing ones, or take down expired notices.",
            href: "/admin/noticeboard",
        },
        {
            icon: FaUsers,
            title: "Users",
            count: stats.userCount,
            countLabel: "registered",
            desc: "View registered users, and update or remove accounts as needed.",
            href: "/admin/user",
        },
    ];

    return (
        <div className="min-h-screen bg-[#FAF8F4]">
            <AdminNavbar />
    
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 md:py-14">
                {/* header */}
                <div className="mb-8 md:mb-12">
                    <p className="text-xs font-medium tracking-wide text-[#C9A227] mb-1">
                        ADMIN DASHBOARD
                    </p>
                    <h1 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D]">
                        Welcome back, Admin
                    </h1>
                    <p className="mt-2 text-sm text-[#2B2D42]/60">
                        Manage teacher profiles, notices and registered users from here.
                    </p>
                </div>

                {/* section cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {SECTIONS.map(({ icon: Icon, title, count, countLabel, desc, href }) => (
                        <div
                            key={title}
                            className="p-6 rounded-xl bg-white border border-[#2B2D42]/10 shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-5">
                                <div className="w-12 h-12 rounded-lg bg-[#14213D] flex items-center justify-center">
                                    <Icon size={20} className="text-[#C9A227]" />
                                </div>
                                <div className="text-right">
                                    <p className="font-['Fraunces',serif] text-2xl text-[#14213D] leading-none">
                                        {count}
                                    </p>
                                    <p className="text-xs text-[#2B2D42]/50 mt-1">
                                        {countLabel}
                                    </p>
                                </div>
                            </div>

                            <h3 className="font-['Fraunces',serif] text-lg text-[#14213D] mb-1.5">
                                {title}
                            </h3>
                            <p className="text-sm text-[#2B2D42]/60 leading-relaxed flex-1">
                                {desc}
                            </p>

                            <Link
                                to={href}
                                className="mt-5 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#14213D] text-[#FAF8F4] text-sm font-medium hover:bg-[#1D2E52] transition-colors"
                            >
                                Manage
                                <FaArrowRight size={12} />
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="mt-8 pt-5 border-t border-[#2B2D42]/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className="text-xs sm:text-sm text-[#2B2D42]/50">
                        Administrator access
                    </p>

                    <button
                        type="button"
                        onClick={logoutHandler}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-[#C9A227] text-[#14213D] hover:bg-[#dbb43a] transition-colors"
                    >
                        <FaSignOutAlt size={15} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard