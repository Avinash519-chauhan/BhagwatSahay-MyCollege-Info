import {FaEnvelope,FaLock,FaEye,FaEyeSlash,FaGraduationCap} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import { toast } from "react-toastify"
import api from "../../services/api"

import campusGate from "../../assets/collegeGate.jpeg"
import campusBuilding from "../../assets/collegeBuilding.jpeg"
import campusScience from "../../assets/collegeC-block.jpeg"

const Login = () => {
    const navigate = useNavigate();

    useEffect(()=> {
        const params = new URLSearchParams(window.location.search);

        if(params.get("verified") === "true"){
            toast.success(
                "Email verified successfully. You can now login."
            );

            window.history.replaceState(
                {},
                document.title,
                window.location.pathname
            );
        }
    },[]);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("Please fill all fields");
            return;
        }
        try {
            setLoading(true);

            const response = await api.post("/users/login", {
                email: formData.email,
                password: formData.password,
            });

            const role = response?.data?.user?.role;

            toast.success(response.data.msg || "Login Successful");

            if (role === "admin") {
                navigate("/admin/dashboard")
            } else {
                navigate("/home")
            }

        } catch (error) {
            console.log(error.response?.data?.msg);

            toast.error(error.response?.data?.msg || "Login Failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#FAF8F4]">
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
                className="relative overflow-hidden text-white hidden md:flex flex-col px-8 xl:px-12 py-10 md:w-1/2 lg:w-[45%]"
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

                {/* photo collage: sizes scale with the panel */}
                <div className="relative z-10 flex-1 flex items-center justify-center py-10">
                    <div
                        className="relative w-full max-w-sm xl:max-w-md 2xl:max-w-lg"
                        style={{ aspectRatio: "1 / 1.05" }}
                    >
                        <div
                            className="absolute rounded-lg overflow-hidden shadow-2xl border-4 border-white"
                            style={{
                                width: "78%",
                                top: "2%",
                                left: "2%",
                                transform: "rotate(-4deg)",
                            }}
                        >
                            <img
                                src={campusGate}
                                alt="College gate"
                                className="w-full aspect-16/10 object-cover block"
                            />
                        </div>

                        <div
                            className="absolute rounded-lg overflow-hidden shadow-2xl border-4 border-white"
                            style={{
                                width: "60%",
                                bottom: "6%",
                                left: "32%",
                                transform: "rotate(5deg)",
                            }}
                        >
                            <img
                                src={campusScience}
                                alt="Science block"
                                className="w-full aspect-16/10 object-cover block"
                            />
                        </div>

                        <div
                            className="absolute rounded-lg overflow-hidden shadow-2xl border-4 border-white z-10"
                            style={{
                                width: "48%",
                                top: "42%",
                                left: "-3%",
                                transform: "rotate(-7deg)",
                            }}
                        >
                            <img
                                src={campusBuilding}
                                alt="Main building"
                                className="w-full aspect-4/3 object-cover block"
                            />
                        </div>
                    </div>
                </div>

                {/* footer line */}
                <div className="relative z-10">
                    <p className="font-['Fraunces',serif] text-xl xl:text-2xl leading-snug">
                        Notices, teachers, and updates.
                        <br />
                        All in one place.
                    </p>
                </div>
            </div>

            {/* RIGHT / FORM PANEL */}
            <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-10 md:py-10">
                <div className="w-full max-w-sm xl:max-w-md">
                    {/* login / sign up toggle */}
                    {/* <div className="flex gap-1 p-1 rounded-lg bg-black/5 mb-8 w-fit">
                        <button
                            type="button"
                            className="px-4 py-2 sm:py-1.5 rounded-md text-sm font-medium bg-white text-[#14213D] shadow-sm"
                        >
                            Log in
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 sm:py-1.5 rounded-md text-sm font-medium text-[#2B2D42]/60"
                        >
                            Sign up
                        </button>
                    </div> */}

                    <h1 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D] mb-1">
                        Welcome back
                    </h1>
                    <p className="text-sm text-[#2B2D42]/60 mb-8">
                        Log in to check notices and updates.
                    </p>

                    <form className="space-y-5" onSubmit={submitHandler}>
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
                                    placeholder="you@gmail.com"
                                    className="w-full pl-9 pr-3 py-3 sm:py-2.5 rounded-lg border border-[#2B2D42]/15 text-base sm:text-sm focus:border-[#3B5BA5] outline-none transition-colors"
                                />
                            </div>
                        </div>

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
                                    type={showPassword? "text": "password"}
                                    value={formData.password}
                                    onChange={changeHandler}
                                    placeholder="••••••••"
                                    className="w-full pl-9 pr-10 py-3 sm:py-2.5 rounded-lg border border-[#2B2D42]/15 text-base sm:text-sm focus:border-[#3B5BA5] outline-none transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={()=>setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                    aria-label="Show password"
                                >
                                    {showPassword? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                            <label className="flex items-center gap-2 text-[#2B2D42]/70">
                                <input
                                    type="checkbox"
                                    className="rounded border-[#2B2D42]/30"
                                />
                                Remember me
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 sm:py-2.5 rounded-lg bg-[#14213D] text-[#FAF8F4] text-base sm:text-sm font-semibold hover:bg-[#1D2E52] transition-colors"
                        >
                            {loading ? "Login In..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#2B2D42]/60 mt-8">
                        New here?{" "}
                        <Link to="/signup" className="text-[#3B5BA5] font-medium">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;