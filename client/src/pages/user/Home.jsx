import { FaBook, FaFlask, FaFutbol, FaTv, FaUniversity, FaChalkboardTeacher, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";

import campusGate from "../../assets/collegeGate.jpeg"
import campusBuilding from "../../assets/collegeBuilding.jpeg"
import campusScience from "../../assets/collegeC-block.jpeg"
import campusBlockB from "../../assets/collegeB-block.jpeg"
import campusField from "../../assets/collegeGround.jpeg"

import Navbar from "../../components/Navbar";
const Home = () => {

    const FACILITIES = [
        { icon: FaBook, title: "Library", desc: "A well-stocked reading room and reference section for all courses." },
        { icon: FaFlask, title: "Science & Computer Labs", desc: "Equipped labs for practicals across B.Sc. and other science subjects." },
        { icon: FaFutbol, title: "Sports Ground", desc: "An open playground for athletics and outdoor sports." },
        { icon: FaChalkboardTeacher, title: "Seminar Hall", desc: "A hall for lectures, seminars and college events." },
        { icon: FaTv, title: "Smart CLass", desc: "Campus-wide Smart Class for better Understanding of Students."},
        { icon: FaUniversity, title: "NCC & NSS Units", desc: "Active NCC and NSS units for student development." },
    ];


    return (
        <div>
            <Navbar />
            <div className="bg-[#FAF8F4] text-[#2B2D42]">
                {/* HERO */}
                <section className="relative overflow-hidden text-white" style={{ background: "#14213D" }}>
                    <div
                        className="absolute inset-0 opacity-[0.05] pointer-events-none"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                            backgroundSize: "40px 40px",
                        }}
                    />
                    <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-14 md:py-20 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <FaGraduationCap size={30} className="text-[#C9A227]" />
                                <span className="text-xs sm:text-sm tracking-wide text-[#C9A227] font-medium">
                                    Affiliated to Jiwaji University, Gwalior
                                </span>
                            </div>
                            <h1 className="font-['Fraunces',serif] text-3xl sm:text-4xl xl:text-5xl leading-tight">
                                Dr. Bhagwant Sahay College
                            </h1>
                            <p className="mt-4 text-white/70 text-sm sm:text-base max-w-md mx-auto md:mx-0">
                                A government college offering undergraduate and postgraduate
                                programs, with a focus on quality teaching and campus life for
                                every student.
                            </p>
                            <div className="mt-6 flex items-center justify-center md:justify-start gap-2 text-white/60 text-sm">
                                <FaMapMarkerAlt size={14} />
                                Gwalior, Madhya Pradesh
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-md">
                            <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
                                <img
                                    src={campusGate}
                                    alt="College gate"
                                    className="w-full aspect-4/3 object-cover block"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ABOUT */}
                <section className="max-w-7xl mx-auto px-6 sm:px-8 py-14 md:py-20">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div className="rounded-xl overflow-hidden shadow-lg order-2 md:order-1">
                            <img
                                src={campusBuilding}
                                alt="Main building"
                                className="w-full aspect-4/3 object-cover block"
                            />
                        </div>
                        <div className="order-1 md:order-2">
                            <h2 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D] mb-4">
                                About the College
                            </h2>
                            <p className="text-sm sm:text-base text-[#14213D]/70 leading-relaxed">
                                Dr. Bhagwant Sahay College is a government institution in
                                Gwalior, affiliated to Jiwaji University. The college offers
                                several degree programs — B.Sc., B.Com., B.A., M.A. and M.Com. —
                                across well-maintained academic blocks, with dedicated
                                facilities for science, arts and commerce students alike.
                            </p>
                            <ul className="mt-6 space-y-1.5 text-sm text-[#14213D]/70">
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                                    B.Sc.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                                    B.Com.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                                    B.A.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                                    M.A.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1 h-1 rounded-full bg-[#C9A227]" />
                                    M.Com.
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* FACILITIES */}
                <section className="bg-white py-14 md:py-20">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8">
                        <h2 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D] mb-2 text-center">
                            Facilities
                        </h2>
                        <p className="text-sm text-[#14213D]/60 text-center mb-10">
                            What the college offers on campus.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {FACILITIES.map(({ icon: Icon, title, desc }) => (
                                <div
                                    key={title}
                                    className="p-6 rounded-xl border border-[#14213D]/10 hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-11 h-11 rounded-lg bg-[#14213D] flex items-center justify-center mb-4">
                                        <Icon size={18} className="text-[#C9A227]" />
                                    </div>
                                    <h3 className="font-semibold text-[#14213D] mb-1">{title}</h3>
                                    <p className="text-sm text-[#14213D]/60 leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* GALLERY — all 5 campus photos */}
                <section className="max-w-7xl mx-auto px-6 sm:px-8 py-14 md:py-20">
                    <h2 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D] mb-2 text-center">
                        Campus Gallery
                    </h2>
                    <p className="text-sm text-[#14213D]/60 text-center mb-10">
                        A look around Dr. Bhagwant Sahay College.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                        <div className="col-span-2 rounded-xl overflow-hidden shadow-md">
                            <img
                                src={campusGate}
                                alt="College gate"
                                className="w-full aspect-16\/9 object-cover block"
                            />
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-md">
                            <img
                                src={campusBuilding}
                                alt="Main building"
                                className="w-full aspect-square object-cover block"
                            />
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-md">
                            <img
                                src={campusBlockB}
                                alt="Block B"
                                className="w-full aspect-square object-cover block"
                            />
                        </div>
                        <div className="rounded-xl overflow-hidden shadow-md">
                            <img
                                src={campusScience}
                                alt="Science block"
                                className="w-full aspect-square object-cover block"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1 rounded-xl overflow-hidden shadow-md">
                            <img
                                src={campusField}
                                alt="College playground"
                                className="w-full aspect-16\/9 md:aspect-square object-cover block"
                            />
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="text-white" style={{ background: "#14213D" }}>
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <FaGraduationCap size={20} className="text-[#C9A227]" />
                            <span className="font-['Fraunces',serif] text-sm">
                                Dr. Bhagwant Sahay College
                            </span>
                        </div>
                        <p className="text-xs text-white/50 text-center">
                            Affiliated to Jiwaji University, Gwalior · Gwalior, Madhya Pradesh
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Home;