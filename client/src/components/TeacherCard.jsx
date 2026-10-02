import { FaBook, FaBookOpen, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";


const TeacherCard = ({teacher}) => {

    const {
        teacherName,
        teacherImage,
        degree,
        majorSubject,
        minorSubject,
        description,
        locatedRoomNo,
        locatedBlock,
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
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-visible">

            {/* Top background */}
            <div className="h-28 bg-[#14213D] rounded-t-2xl" />

            {/* Teacher Image */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
                <div className="w-34 h-34 rounded-full bg-white p-1.5 shadow-md">
                    <img
                        src={teacher.teacherImage}
                        alt={teacher.teacherName}
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="pt-20 px-6 pb-6 text-center">

                {/* Name */}
                <h2 className="font-['Fraunces',serif] text-xl text-[#14213D]">
                    {teacher.teacherName}
                </h2>

                {/* Degree */}
                <p className="mt-1 text-sm font-semibold text-shadow-black text-[#C9A227]">
                    {teacher.degree}
                </p>

                {/* Subjects */}
                <div className="flex flex-wrap justify-center gap-2 mt-4">

                    {teacher.majorSubject && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14213D]/5 text-xs text-[#14213D]">
                            <FaBook size={11} />
                            {teacher.majorSubject}
                        </span>
                    )}

                    {teacher.minorSubject && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14213D]/5 text-xs text-[#14213D]">
                            <FaBookOpen size={11} />
                            {teacher.minorSubject}
                        </span>
                    )}

                </div>

                {/* Description */}
                {teacher.description && (
                    <p className="mt-5 text-sm leading-6 text-[#14213D]/65">
                        {teacher.description}
                    </p>
                )}

                {/* Location */}
                <div className="mt-5 pt-5 border-t border-[#2B2D42]/10">

                    <div className="flex items-center justify-center gap-2 text-sm text-[#52627A]">
                        <FaMapMarkerAlt
                            size={13}
                            className="text-[#3B5BA5]"
                        />

                        <span>
                            Room {teacher.locatedRoomNo}
                        </span>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-3 text-sm text-[#52627A]">
                        <FaBuilding
                            size={13}
                            className="text-[#3B5BA5]"
                        />

                        <span>
                            {teacher.locatedBlock}
                        </span>
                    </div>

                </div>

            </div>
        </div>
)
}

export default TeacherCard