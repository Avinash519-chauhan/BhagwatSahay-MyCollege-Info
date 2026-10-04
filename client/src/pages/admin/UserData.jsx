import { FaArrowLeft, FaUserCircle, FaTrashAlt, FaBan, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import api from "../../services/api";
import { toast } from "react-toastify";

const UserData = () => {

    const [loading, setLoading] = useState(false);
    const [userProfiles, setUserProfiles] = useState([]);
    const [search, setSearch] = useState("");

    const getAllUser = async () => {
        try {
            setLoading(true);

            const response = await api.get("/users/getalluser");

            setUserProfiles(response.data.users);
        } catch (error) {
            console.log(error.response?.data?.msg);
            toast.error("Unable to load profiles")
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (userId) => {
        try {
            setLoading(true);

            const response = await api.delete(`/users/delete/${userId}`)

            toast.success(response.data.msg);

            setUserProfiles((prev) =>
                prev.filter((user) => user._id !== userId)
            );

        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.msg || "Unable to delete user")
        } finally {
            setLoading(false)
        }
    }

    const filteredUsers = userProfiles.filter((user) =>
        user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    const banEmail = async (email) => {
        try {
            setLoading(true);

            const response = await api.post("/users/ban-email", {
                email
            })

            toast.success(response.data.msg);
        } catch (error) {
            console.log(error);

            toast.error(error.response?.data?.msg || "Unable to ban email")
        } finally {
            setLoading(false);
        }
    }

    function getInitials(name = "") {
        return name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    }

    useEffect(() => {
        getAllUser();
    }, []);

    return (
        <div className="min-h-screen bg-[#FAF8F4]">
            <AdminNavbar />
            <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10 md:py-14">
                {/* back to dashboard */}
                <a
                    href="/admin/dashboard"
                    className="flex items-center gap-2 text-sm text-[#2B2D42]/60 hover:text-[#14213D] mb-6 transition-colors w-fit"
                >
                    <FaArrowLeft size={13} />
                    Back to Dashboard
                </a>

                {/* header */}
                <div className="mb-8">
                    <p className="text-xs font-medium tracking-wide text-[#C9A227] mb-1">
                        ADMIN
                    </p>
                    <h1 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D]">
                        Manage Users
                    </h1>
                    <p className="mt-2 text-sm text-[#2B2D42]/60">
                        View registered users, and delete or ban an account as needed.
                    </p>
                </div>

                {/* search filter */}
                <div className="relative mb-6 max-w-sm">
                    <FaSearch
                        size={14}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                    />
                    <input
                        type="text"
                        name="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name..."
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/15 text-sm outline-none focus:border-[#3B5BA5]"
                    />
                </div>

                {/* user list */}
                <div className="space-y-4">
                    {filteredUsers.map((user) => (
                        <div
                            key={user._id}
                            className="rounded-xl bg-white border border-[#2B2D42]/10 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                        >
                            {/* avatar */}
                            <div className="w-12 h-12 shrink-0 rounded-full bg-[#14213D] flex items-center justify-center">
                                <span className="text-[#C9A227] font-['Fraunces',serif] text-base">
                                    {getInitials(user.fullName)}
                                </span>
                            </div>

                            {/* details */}
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-['Fraunces',serif] text-base text-[#14213D]">
                                        {user.fullName}
                                    </h3>
                                    {user.banned && (
                                        <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-red-50 text-red-500">
                                            Banned
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-[#2B2D42]/60 truncate flex items-center gap-1.5">
                                    <FaUserCircle size={12} className="text-[#3B5BA5] shrink-0" />
                                    {user.email}
                                </p>
                                <p className="text-xs text-[#2B2D42]/50 mt-1">
                                    {user.degreeName} · {user.year}
                                </p>
                            </div>

                            {/* actions */}
                            <div className="flex gap-2 shrink-0">
                                <button
                                    type="button"
                                    aria-label="Ban user"
                                    onClick={() => {
                                        if (window.confirm(`Ban ${user.email}?`)) {
                                            banEmail(user.email);
                                        }
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-600 text-sm font-medium transition-colors"
                                >
                                    <FaBan size={13} />
                                    Ban
                                </button>
                                <button
                                    type="button"
                                    aria-label="Delete user"
                                    onClick={() => {
                                        if (window.confirm(`Delete ${user.fullName}?`)) {
                                            deleteUser(user._id);
                                        }
                                    }}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-red-50 hover:bg-red-100 text-red-500 text-sm font-medium transition-colors"
                                >
                                    <FaTrashAlt size={13} />
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default UserData;