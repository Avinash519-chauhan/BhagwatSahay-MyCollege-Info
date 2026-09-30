import { FaBook, FaBookOpen, FaMapMarkerAlt } from "react-icons/fa";


const TeacherCard = ({teacher}) => {

    const {
        teacherName,
        teacherImage,
        degree,
        majorSubject,
        minorSubject,
        description,
        locatedRoomNo,
    } = teacher;

    function getInitials(name = "") {
        return name
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((word) => word[0])
            .join("")
            .toUpperCase();
    }
    
return (
    <div className="relative w-full max-w-xs mx-auto rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow overflow-visible">
        {/* banner */}
        <div
            className="h-16 sm:h-20 rounded-t-xl relative"
            style={{ background: "#14213D" }}
        >
            <div
                className="absolute inset-0 rounded-t-xl opacity-[0.06] pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                }}
            />
        </div>

        {/* photo */}
        <div className="flex justify-center -mt-10 sm:-mt-12">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-[#14213D] flex items-center justify-center">
                {teacherImage ? (
                    <img
                        src={teacherImage}
                        alt={teacherName}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span className="text-[#C9A227] font-['Fraunces',serif] text-xl sm:text-2xl">
                        {getInitials(teacherName)}
                    </span>
                )}
            </div>
        </div>

        {/* body */}
        <div className="px-5 pt-3 pb-5 text-center">
            <h3 className="font-['Fraunces',serif] text-lg text-[#14213D] leading-tight">
                {teacherName}
            </h3>
            <p className="text-xs font-medium text-[#C9A227] mt-0.5">{degree}</p>

            {/* major / minor subject pills */}
            <div className="flex flex-wrap justify-center gap-1.5 mt-2.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#14213D]/5 text-xs text-[#2B2D42]/70">
                    <FaBook size={10} />
                    {majorSubject}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#14213D]/5 text-xs text-[#2B2D42]/70">
                    <FaBookOpen size={10} />
                    {minorSubject}
                </span>
            </div>

            {/* description */}
            <p className="mt-3 text-sm text-[#2B2D42]/70 leading-relaxed line-clamp-3">
                {description}
            </p>

            {/* room location */}
            <div className="mt-4 pt-4 border-t border-[#2B2D42]/10 flex items-center justify-center gap-2 text-sm text-[#2B2D42]/70">
                <FaMapMarkerAlt size={13} className="text-[#3B5BA5] shrink-0" />
                {locatedRoomNo}
            </div>
        </div>
    </div>
)
}

export default TeacherCard