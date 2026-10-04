import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaLock, FaGraduationCap, FaCalendarAlt, FaEdit, FaArrowLeft, FaBell, FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const Degree = ["B.A.", "B.Sc.", "B.Com.", "M.A.", "M.Com."];
const Year = ["1st", "2nd", "3rd", "4th"];

const AdminProfile = () => {

    const navigate = useNavigate();

    const [view, setView] = useState("view");
    const [notificationsOn, setNotificationsOn] = useState(true);
    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
    });
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        degreeName: "",
        year: "",
    });

    const getProfile = async () => {
        try {
            setLoading(true);
            const response = await api.get("/users/getuser")

            setProfile(response.data.user);
            setNotificationsOn(response.data.user.noticeNotifications);
        } catch (error) {
            console.log(error.response?.data?.msg);
            toast.error("Unable to load profile")
        } finally {
            setLoading(false);
        }
    }

    const changeHandler = (e) => {
        let { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await api.put("/users/update", {
                fullName: formData.fullName,
                degreeName: formData.degreeName,
                year: formData.year,
            });

            toast.success(response.data.msg);

            // Get the updated profile from backend
            await getProfile();

            setView("view");

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.msg || "Unable to update profile"
            );
        } finally {
            setLoading(false);
        }
    };

    const toggleNotifications = async () => {
        const newValue = !notificationsOn;

        try {
            await api.put("/users/update", {
                noticeNotifications: newValue
            });

            setNotificationsOn(newValue);

            toast.success(
                newValue
                    ? "Email notifications enabled"
                    : "Email notifications disabled"
            );
        } catch (error) {
            console.log(error);
            toast.error(
                error.response?.data?.msg ||
                "Unable to update notification settings"
            );
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="min-h-screen bg-[#FAF8F4]">
            <AdminNavbar />

            <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-14">

                {view === "view" ? (
                    <>
                        {/* Back to Dashboard */}
                        <button
                            type="button"
                            onClick={() => navigate("/admin/dashboard")}
                            className="flex items-center gap-2 text-sm text-[#2B2D42]/60 hover:text-[#14213D] mb-6 transition-colors"
                        >
                            <FaArrowLeft size={13} />
                            <span>Back to Dashboard</span>
                        </button>

                        {/* header */}
                        <div className="flex items-center justify-between mb-8 gap-4">
                            <div>
                                <p className="text-xs font-medium tracking-wide text-[#C9A227] mb-1">
                                    ACCOUNT
                                </p>
                                <h1 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D]">
                                    My Profile
                                </h1>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData({
                                        fullName: profile.fullName,
                                        degreeName: profile.degreeName,
                                        year: profile.year,
                                    });

                                    setView("edit");
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#14213D] text-[#FAF8F4] text-sm font-semibold hover:bg-[#1D2E52] transition-colors shrink-0"
                            >
                                <FaEdit size={13} />
                                Edit
                            </button>
                        </div>

                        {/* profile card */}
                        <div className="rounded-xl bg-white border border-[#2B2D42]/10 shadow-sm overflow-hidden">
                            {/* avatar banner */}
                            <div
                                className="h-20 relative"
                            >
                                <div
                                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                                    style={{
                                        backgroundImage:
                                            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                                        backgroundSize: "30px 30px",
                                    }}
                                />
                            </div>
                            <div className="flex justify-center -mt-10">
                                <div className="w-20 h-20 rounded-full border-4 border-white shadow-md bg-[#14213D] flex items-center justify-center">
                                    <span className="text-[#C9A227] font-['Fraunces',serif] text-2xl">
                                        {profile.fullName
                                            .split(" ")
                                            .slice(0, 2)
                                            .map((w) => w[0])
                                            .join("")
                                            .toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <div className="px-6 pt-3 pb-6 text-center">
                                <h2 className="font-['Fraunces',serif] text-xl text-[#14213D]">
                                    {profile.fullName}
                                </h2>
                                <p className="text-sm text-[#2B2D42]/60">{profile.email}</p>
                            </div>

                            {/* details list */}
                            <div className="border-t border-[#2B2D42]/10 divide-y divide-[#2B2D42]/10">
                                <div className="flex items-center gap-3 px-6 py-4">
                                    <FaUser size={14} className="text-[#3B5BA5] shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-xs text-[#2B2D42]/50">Full Name</p>
                                        <p className="text-sm text-[#14213D] font-medium truncate">
                                            {profile.fullName}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 px-6 py-4">
                                    <FaEnvelope size={14} className="text-[#3B5BA5] shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-xs text-[#2B2D42]/50">Email</p>
                                        <p className="text-sm text-[#14213D] font-medium truncate">
                                            {profile.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 px-6 py-4">
                                    <FaLock size={14} className="text-[#3B5BA5] shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-xs text-[#2B2D42]/50">Password</p>
                                        <p className="text-sm text-[#14213D] font-medium truncate">
                                            .......
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 px-6 py-4">
                                    <FaGraduationCap
                                        size={14}
                                        className="text-[#3B5BA5] shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-xs text-[#2B2D42]/50">Degree</p>
                                        <p className="text-sm text-[#14213D] font-medium truncate">
                                            {profile.degreeName}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 px-6 py-4">
                                    <FaCalendarAlt
                                        size={14}
                                        className="text-[#3B5BA5] shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <p className="text-xs text-[#2B2D42]/50">Year</p>
                                        <p className="text-sm text-[#14213D] font-medium truncate">
                                            {profile.year}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* notifications toggle */}
                        <div className="mt-6 rounded-xl bg-white border border-[#2B2D42]/10 shadow-sm px-6 py-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <FaBell size={15} className="text-[#3B5BA5] shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-[#14213D]">
                                        Email Notifications
                                    </p>
                                    <p className="text-xs text-[#2B2D42]/50">
                                        Get notified by email about new notices.
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                role="switch"
                                aria-checked={notificationsOn}
                                onClick={toggleNotifications}
                                className={`relative w-12 h-7 rounded-full shrink-0 transition-colors ${notificationsOn ? "bg-[#14213D]" : "bg-[#2B2D42]/20"
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${notificationsOn ? "translate-x-5" : "translate-x-0"
                                        }`}
                                />
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* edit header */}
                        <button
                            type="button"
                            onClick={() => setView("view")}
                            className="flex items-center gap-2 text-sm text-[#2B2D42]/60 hover:text-[#14213D] mb-6 transition-colors"
                        >
                            <FaArrowLeft size={13} />
                            Back to profile
                        </button>

                        <div className="rounded-xl bg-white border border-[#2B2D42]/10 shadow-sm p-6 sm:p-8">
                            <h2 className="font-['Fraunces',serif] text-xl text-[#14213D] mb-6">
                                Edit Profile
                            </h2>

                            <form className="space-y-5" onSubmit={submitHandler}>
                                {/* editable: full name */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <FaUser
                                            size={14}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                        />
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={changeHandler}
                                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/15 text-sm outline-none focus:border-[#3B5BA5]"
                                        />
                                    </div>
                                </div>

                                {/* fixed: email — disabled, not editable */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]/50">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope
                                            size={14}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/30"
                                        />
                                        <input
                                            type="email"
                                            value={profile.email}
                                            disabled
                                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/10 bg-[#2B2D42]/5 text-sm text-[#2B2D42]/50 outline-none cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-[#2B2D42]/40 mt-1">
                                        Email can't be changed.
                                    </p>
                                </div>

                                {/* fixed: password — disabled, not editable */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]/50">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FaLock
                                            size={14}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/30"
                                        />
                                        <input
                                            type="password"
                                            value="......."
                                            disabled
                                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/10 bg-[#2B2D42]/5 text-sm text-[#2B2D42]/50 outline-none cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-[#2B2D42]/40 mt-1">
                                        Password can't be changed here.
                                    </p>
                                </div>

                                {/* editable: degree + year */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-3">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                            Degree
                                        </label>
                                        <div className="relative">
                                            <FaGraduationCap
                                                size={14}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40 pointer-events-none"
                                            />
                                            <select
                                                name="degreeName"
                                                value={formData.degreeName}
                                                onChange={changeHandler}
                                                className="w-full appearance-none pl-9 pr-8 py-2.5 rounded-lg border border-[#2B2D42]/15 bg-white text-sm outline-none focus:border-[#3B5BA5]"
                                            >
                                                {Degree.map((d) => (
                                                    <option key={d} value={d}>
                                                        {d}
                                                    </option>
                                                ))}
                                            </select>
                                            <FaChevronDown
                                                size={11}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40 pointer-events-none"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                            Year
                                        </label>
                                        <div className="relative">
                                            <FaCalendarAlt
                                                size={14}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40 pointer-events-none"
                                            />
                                            <select
                                                name="year"
                                                value={formData.year}
                                                onChange={changeHandler}
                                                className="w-full appearance-none pl-9 pr-8 py-2.5 rounded-lg border border-[#2B2D42]/15 bg-white text-sm outline-none focus:border-[#3B5BA5]"
                                            >
                                                {Year.map((y) => (
                                                    <option key={y} value={y}>
                                                        {y}
                                                    </option>
                                                ))}
                                            </select>
                                            <FaChevronDown
                                                size={11}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40 pointer-events-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-2.5 rounded-lg bg-[#14213D] text-[#FAF8F4] text-sm font-semibold hover:bg-[#1D2E52] transition-colors"
                                >
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default AdminProfile;