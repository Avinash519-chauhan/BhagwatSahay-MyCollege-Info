import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"
import TeacherCard from "../../components/TeacherCard"
import api from "../../services/api"


const Teachers = () => {

    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                setLoading(true);

                const response = await api.get("/teachers/get-teacher")

                setTeachers(response.data.teacher)
            } catch (error) {
                console.log(error.response?.data?.msg);
            } finally {
                setLoading(false)
            }
        };

        fetchTeachers();
    }, []);

    return (
        <div className="min-h-screen bg-[#FAF8F4]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 md:py-14">
                {/* header */}
                <div className="mb-10 text-center">
                    <p className="text-xs font-medium tracking-wide text-[#C9A227] mb-1">
                        FACULTY
                    </p>
                    <h1 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D]">
                        Our Teachers
                    </h1>
                    <p className="mt-2 text-sm text-[#14213D]/60 max-w-md mx-auto">
                        Meet the faculty of Dr. Bhagwant Sahay College.
                    </p>
                </div>

                {loading && (
                    <div className="text-center py-10">
                        <p className="text-sm text-[#2B2D42]/60">
                            Loading teachers...
                        </p>
                    </div>
                )}

                {!loading && teachers.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-sm text-[#2B2D42]/60">
                            No teachers available at the moment.
                        </p>
                    </div>
                )}

                {/* teacher grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
                    {teachers.map((teacher) => (
                        <TeacherCard key={teacher._id} teacher={teacher} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Teachers