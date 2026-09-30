import { FaUser, FaEnvelope, FaEyeSlash, FaLock, FaEye, FaGraduationCap, FaBookOpen, FaCalendarAlt, FaChevronDown } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { toast } from "react-toastify"
import api from "../../services/api"

import campusGate from "../../assets/collegeGate.jpeg"
import campusBuilding from "../../assets/collegeBuilding.jpeg"
import campusScience from "../../assets/collegeC-block.jpeg"
import campusBlockB from "../../assets/collegeB-block.jpeg"
import campusField from "../../assets/collegeGround.jpeg"

const SignUp = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        degreeName: "",
        year: "1st",
    })

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const changeHandler = (e) => {
        let { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const response = await api.post("/users/signup", {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                degreeName: formData.degreeName,
                year: formData.year,
            });

            toast.success(response.data.msg || "Sign Up Successful");

            setFormData({
                fullName: "",
                email: "",
                password: "",
                degreeName: "",
                year: "1st",
            });

            navigate("/login")
        } catch (error) {
            console.log(error.response?.data?.msg);
            toast.error(error.response?.data?.msg || "Sign Up Failed");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-full w-full flex flex-col md:flex-row bg-[#FAF8F4]">
            {/* MOBILE HEADER (hidden from tablet up) */}
            <div
                className="md:hidden px-6 py-6 text-white"
                style={{ background: "#14213D" }}
            >
                <div className="flex items-center gap-3">
                    <FaGraduationCap size={28} className="text-[#C9A227] shrink-0" />
                    <p className="font-['Fraunces',serif] text-lg leading-tight">
                        Dr. Bhagwant Sahay College
                    </p>
                </div>
                <ul className="mt-3 flex flex-row gap-x-4 gap-y-1">
                    <li className="flex items-center gap-2 text-xs text-white/75">
                        <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                        B.Sc.
                    </li>
                    <li className="flex items-center gap-2 text-xs text-white/75">
                        <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                        B.Com.
                    </li>
                    <li className="flex items-center gap-2 text-xs text-white/75">
                        <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                        B.A.
                    </li>
                    <li className="flex items-center gap-2 text-xs text-white/75">
                        <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                        M.A.
                    </li>
                    <li className="flex items-center gap-2 text-xs text-white/75">
                        <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                        M.Com.
                    </li>
                </ul>
            </div>

            {/* LEFT / BRAND PANEL (tablet and up) */}
            <div
                className="relative overflow-hidden text-white hidden md:flex flex-col px-6 xl:px-12 py-10 md:w-1/2 lg:w-[45%]"
                style={{ background: "#14213D" }}
            >
                {/* subtle dot texture */}
                <div
                    className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                {/* college name + degrees */}
                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <FaGraduationCap size={32} className="text-[#C9A227]" />
                        <p className="font-['Fraunces',serif] text-lg xl:text-xl leading-tight">
                            Dr. Bhagwant Sahay College
                        </p>
                    </div>

                    <ul className="mt-4 flex flex-row gap-2">
                        <li className="flex items-center gap-2 text-sm text-white/75">
                            <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                            B.Sc.
                        </li>
                        <li className="flex items-center gap-2 text-sm text-white/75">
                            <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                            B.Com.
                        </li>
                        <li className="flex items-center gap-2 text-sm text-white/75">
                            <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                            B.A.
                        </li>
                        <li className="flex items-center gap-2 text-sm text-white/75">
                            <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                            M.A.
                        </li>
                        <li className="flex items-center gap-2 text-sm text-white/75">
                            <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                            M.Com.
                        </li>
                    </ul>
                </div>

                {/* 5-photo scattered gallery: sizes scale with the panel */}
                <div className="relative z-10 flex-1 flex items-center justify-center py-4.25">
                    <div
                        className="relative w-full max-w-sm xl:max-w-md 2xl:max-w-lg"
                        style={{ aspectRatio: "1 / 1.2" }}
                    >
                        {/* gate — top left, wide */}
                        <div
                            className="absolute rounded-lg overflow-hidden shadow-2xl border-4 border-white"
                            style={{
                                width: "62%",
                                top: "1%",
                                left: "0%",
                                transform: "rotate(-3deg)",
                            }}
                        >
                            <img
                                src={campusGate}
                                alt="College gate"
                                className="w-full aspect-16/10 object-cover block"
                            />
                        </div>

                        {/* main building — top right, portrait */}
                        <div
                            className="absolute rounded-lg overflow-hidden shadow-2xl border-4 border-white z-10"
                            style={{
                                width: "34%",
                                top: "3%",
                                left: "64%",
                                transform: "rotate(4deg)",
                            }}
                        >
                            <img
                                src={campusBuilding}
                                alt="Main building"
                                className="w-full aspect-3/4 object-cover block"
                            />
                        </div>

                        {/* block B — middle left */}
                        <div
                            className="absolute rounded-lg overflow-hidden shadow-2xl border-4 border-white"
                            style={{
                                width: "52%",
                                top: "37%",
                                left: "0%",
                                transform: "rotate(3deg)",
                            }}
                        >
                            <img
                                src={campusBlockB}
                                alt="Block B"
                                className="w-full aspect-16/10 object-cover block"
                            />
                        </div>

                        {/* science block — middle right */}
                        <div
                            className="absolute rounded-lg overflow-hidden shadow-2xl border-4 border-white z-20"
                            style={{
                                width: "46%",
                                top: "43%",
                                left: "55%",
                                transform: "rotate(-4deg)",
                            }}
                        >
                            <img
                                src={campusScience}
                                alt="Science block"
                                className="w-full aspect-16/10 object-cover block"
                            />
                        </div>

                        {/* playground — bottom centre */}
                        <div
                            className="absolute rounded-lg overflow-hidden shadow-2xl border-4 border-white z-10"
                            style={{
                                width: "50%",
                                bottom: "0%",
                                left: "24%",
                                transform: "rotate(2deg)",
                            }}
                        >
                            <img
                                src={campusField}
                                alt="College playground"
                                className="w-full aspect-4/3 object-cover block"
                            />
                        </div>
                    </div>
                </div>

                {/* footer line */}
                <div className="relative z-10">
                    <p className="font-['Fraunces',serif] text-xl xl:text-2xl leading-snug">
                        Create your account.
                        <br />
                        Stay in the loop.
                    </p>
                </div>
            </div>

            {/* RIGHT / FORM PANEL */}
            <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-10">
                <div className="w-full max-w-sm xl:max-w-md">
                    {/* login / sign up toggle */}
                    {/* <div className="flex gap-1 p-1 rounded-lg bg-black/5 mb-8 w-fit">
                        <button
                            type="button"
                            className="px-4 py-2 sm:py-1.5 rounded-md text-sm font-medium text-[#2B2D42]/60"
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 sm:py-1.5 rounded-md text-sm font-medium bg-white text-[#14213D] shadow-sm"
                        >
                            Sign up
                        </button>
                    </div> */}

                    <h1 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D] mb-1">
                        Create your account
                    </h1>
                    <p className="text-sm text-[#2B2D42]/60 mb-8">
                        Sign up to get started.
                    </p>

                    <form className="space-y-5" onSubmit={submitHandler}>
                        {/* name */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-1.5 text-[#2B2D42]"
                            >
                                Full name
                            </label>
                            <div className="relative">
                                <FaUser
                                    size={15}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                />
                                <input
                                    id="name"
                                    name="fullName"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={changeHandler}
                                    placeholder="Your full name"
                                    className="w-full pl-9 pr-3 py-3 sm:py-2.5 rounded-lg border border-[#2B2D42]/15 text-base sm:text-sm focus:border-[#3B5BA5] outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-1.5 text-[#2B2D42]"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <FaEnvelope
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={changeHandler}
                                    placeholder="you@college.edu"
                                    className="w-full pl-9 pr-3 py-3 sm:py-2.5 rounded-lg border border-[#2B2D42]/15 text-base sm:text-sm focus:border-[#3B5BA5] outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-1.5 text-[#2B2D42]"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <FaLock
                                    size={16}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                />
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "test" : "password"}
                                    value={formData.password}
                                    onChange={changeHandler}
                                    placeholder="••••••••"
                                    className="w-full pl-9 pr-10 py-3 sm:py-2.5 rounded-lg border border-[#2B2D42]/15 text-base sm:text-sm focus:border-[#3B5BA5] outline-none transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                    aria-label="Show password"
                                >
                                    {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                                </button>
                            </div>
                        </div>

                        {/* degree + year (stacked on mobile, side by side from sm) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-3">
                            <div>
                                <label
                                    htmlFor="degreeName"
                                    className="block text-sm font-medium mb-1.5 text-[#2B2D42]"
                                >
                                    Degree
                                </label>
                                <div className="relative">
                                    <FaBookOpen
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40 pointer-events-none"
                                    />
                                    <select
                                        id="degreeName"
                                        name="degreeName"
                                        value={formData.degreeName}
                                        onChange={changeHandler}
                                        className="w-full appearance-none pl-9 pr-8 py-3 sm:py-2.5 rounded-lg border border-[#2B2D42]/15 bg-white text-base sm:text-sm focus:border-[#3B5BA5] outline-none transition-colors"
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        <option value="B.Sc.">B.Sc.</option>
                                        <option value="B.Com.">B.Com.</option>
                                        <option value="B.A.">B.A.</option>
                                        <option value="M.A.">M.A.</option>
                                        <option value="M.Com.">M.Com.</option>
                                    </select>
                                    <FaChevronDown
                                        size={11}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40 pointer-events-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="year"
                                    className="block text-sm font-medium mb-1.5 text-[#2B2D42]"
                                >
                                    Year
                                </label>
                                <div className="relative">
                                    <FaCalendarAlt
                                        size={15}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40 pointer-events-none"
                                    />
                                    <select
                                        id="year"
                                        name="year"
                                        value={formData.year}
                                        onChange={changeHandler}
                                        className="w-full appearance-none pl-9 pr-8 py-3 sm:py-2.5 rounded-lg border border-[#2B2D42]/15 bg-white text-base sm:text-sm focus:border-[#3B5BA5] outline-none transition-colors"
                                    >
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        <option value="1st">1st Year</option>
                                        <option value="2nd">2nd Year</option>
                                        <option value="3rd">3rd Year</option>
                                        <option value="4th">4th Year</option>
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
                            className="w-full py-3 sm:py-2.5 rounded-lg bg-[#14213D] text-[#FAF8F4] text-base sm:text-sm font-semibold hover:bg-[#1D2E52] transition-colors"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#2B2D42]/60 mt-8">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#3B5BA5] font-medium">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;