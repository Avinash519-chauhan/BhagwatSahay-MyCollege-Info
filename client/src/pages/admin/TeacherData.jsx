import { FaUser, FaImage, FaGraduationCap, FaBook, FaArrowLeft, FaBookOpen, FaMapMarkerAlt, FaAlignLeft, FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useState, useEffect, useRef, useReducer } from "react";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const TeacherData = () => {

    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const [teacher, setTeachers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState(null);

    const [formData, setFormData] = useState({
        teacherName: "",
        teacherImage: "",
        degree: "",
        majorSubject: "",
        minorSubject: "",
        description: "",
        locatedRoomNo: "",
    })

    const changeHandler = (e) => {
        let { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();

            data.append("teacherName", formData.teacherName);
            data.append("degree", formData.degree);
            data.append("majorSubject", formData.majorSubject);
            data.append("minorSubject", formData.minorSubject);
            data.append("description", formData.description);
            data.append("locatedRoomNo", formData.locatedRoomNo);

            if (formData.teacherImage instanceof File) {
                data.append("teacherImage", formData.teacherImage);
            }

            let response;

            if (editingTeacher) {
                response = await api.put(`/teachers/update-teacher/${editingTeacher._id}`, data)
            } else {
                response = await api.post("/teachers/create-teacher", data);
            }

            toast.success(response.data.msg || editingTeacher ? "Teacher Updated Successfully" : "Teacher created Successful");

            setFormData({
                teacherName: "",
                teacherImage: "",
                degree: "",
                majorSubject: "",
                minorSubject: "",
                description: "",
                locatedRoomNo: "",
            });

            setEditingTeacher(null);

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            await fetchTeachers();

        } catch (error) {
            console.log(error.response?.data?.msg);
            toast.error(error.response?.data?.msg || "Something went wrong");
        } finally {
            setLoading(false)
        }
    }

    const fetchTeachers = async () => {
        try {
            setLoading(true);

            const response = await api.get("/teachers/get-teacher");

            setTeachers(response.data.teacher);

        } catch (error) {
            console.log(error.response?.data?.msg);
            toast.error("Failed to load teachers")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this teacher?"
        );

        if (!confirmed) return;

        try {
            setLoading(true);

            const response = await api.delete(`/teachers/delete-teacher/${id}`);

            toast.success(response.data.msg || "Teacher deleted Successfully");

            setTeachers((prev) => prev.filter((teacher) => teacher._id !== id))
        } catch (error) {
            console.log(error.response?.data?.msg);
            toast.error(error.response?.data?.msg || "Failed to delete teacher")
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (teacher) => {
        setEditingTeacher(teacher);

        setFormData({
            teacherName: teacher.teacherName || "",
            teacherImage: teacher.teacherImage || "",
            degree: teacher.degree || "",
            majorSubject: teacher.majorSubject || "",
            minorSubject: teacher.minorSubject || "",
            description: teacher.description || "",
            locatedRoomNo: teacher.locatedRoomNo || "",
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    useEffect(() => {
        fetchTeachers();
    }, []);


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
        <div className="min-h-screen bg-[#FAF8F4]">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 md:py-14">
                <div className="mb-6">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/dashboard")}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg
                   text-sm font-medium text-[#14213D]
                   bg-white border border-[#2B2D42]/10
                   hover:bg-[#14213D] hover:text-[#FAF8F4]
                   transition-colors shadow-sm"
                    >
                        <FaArrowLeft size={13} />
                        Back to Dashboard
                    </button>
                </div>
                {/* header */}
                <div className="mb-8">
                    <p className="text-xs font-medium tracking-wide text-[#C9A227] mb-1">
                        ADMIN
                    </p>
                    <h1 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D]">
                        Manage Teachers
                    </h1>
                    <p className="mt-2 text-sm text-[#2B2D42]/60">
                        Add a new teacher profile, or update and remove existing ones.
                    </p>
                </div>

                {/* ADD NEW TEACHER FORM */}
                <div className="rounded-xl bg-white border border-[#2B2D42]/10 shadow-sm p-6 sm:p-8 mb-12">
                    <h2 className="font-['Fraunces',serif] text-lg text-[#14213D] mb-6">
                        Add New Teacher
                    </h2>

                    <form className="space-y-5" onSubmit={submitHandler}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
                                        name="teacherName"
                                        value={formData.teacherName}
                                        onChange={changeHandler}
                                        placeholder="Dr. Full Name"
                                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/15 text-sm outline-none focus:border-[#3B5BA5]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                    Photo
                                </label>
                                <div className="relative">
                                    <FaImage
                                        size={14}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                    />
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="teacherImage"
                                        accept="image/*"
                                        onChange={changeHandler}
                                        className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#2B2D42]/15 text-sm outline-none file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:bg-[#14213D]/5 file:text-xs file:text-[#14213D]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                    Degree
                                </label>
                                <div className="relative">
                                    <FaGraduationCap
                                        size={14}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                    />
                                    <input
                                        type="text"
                                        name="degree"
                                        value={formData.degree}
                                        onChange={changeHandler}
                                        placeholder="M.Sc., Ph.D."
                                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/15 text-sm outline-none focus:border-[#3B5BA5]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                    Major Subject
                                </label>
                                <div className="relative">
                                    <FaBook
                                        size={14}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                    />
                                    <input
                                        type="text"
                                        name="majorSubject"
                                        value={formData.majorSubject}
                                        onChange={changeHandler}
                                        placeholder="Physics"
                                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/15 text-sm outline-none focus:border-[#3B5BA5]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                    Minor Subject
                                </label>
                                <div className="relative">
                                    <FaBookOpen
                                        size={14}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                    />
                                    <input
                                        type="text"
                                        name="minorSubject"
                                        value={formData.minorSubject}
                                        onChange={changeHandler}
                                        placeholder="Mathematics"
                                        className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/15 text-sm outline-none focus:border-[#3B5BA5]"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                Description
                            </label>
                            <div className="relative">
                                <FaAlignLeft
                                    size={14}
                                    className="absolute left-3 top-3 text-[#2B2D42]/40"
                                />
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={changeHandler}
                                    rows={3}
                                    placeholder="A short note about the teacher's experience, interests or areas of research."
                                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/15 text-sm outline-none focus:border-[#3B5BA5] resize-none"
                                />
                            </div>
                        </div>

                        <div className="sm:w-1/2">
                            <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                Located Room
                            </label>
                            <div className="relative">
                                <FaMapMarkerAlt
                                    size={14}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                />
                                <input
                                    type="text"
                                    name="locatedRoomNo"
                                    value={formData.locatedRoomNo}
                                    onChange={changeHandler}
                                    placeholder="Room 101, Block A"
                                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/15 text-sm outline-none focus:border-[#3B5BA5]"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#14213D] text-[#FAF8F4] text-sm font-semibold hover:bg-[#1D2E52] transition-colors"
                        >
                            <FaPlus size={13} />
                            {editingTeacher ? "Update Teacher" : "Add Teacher"}
                        </button>
                    </form>
                </div>

                {/* EXISTING TEACHERS */}
                <div>
                    <h2 className="font-['Fraunces',serif] text-lg text-[#14213D] mb-6">
                        Existing Teachers
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teacher.map((t) => (
                            <div
                                key={t._id}
                                className="rounded-xl bg-white border border-[#2B2D42]/10 shadow-sm p-5 flex items-center gap-4"
                            >
                                <div className="w-14 h-14 shrink-0 rounded-full bg-[#14213D] overflow-hidden flex items-center justify-center">
                                    {t.teacherImage ? (
                                        <img
                                            src={t.teacherImage}
                                            alt={t.teacherName}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-[#C9A227] font-['Fraunces',serif] text-lg">
                                            {getInitials(t.teacherName)}
                                        </span>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="font-['Fraunces',serif] text-base text-[#14213D] truncate">
                                        {t.teacherName}
                                    </h3>
                                    <p className="text-xs text-[#C9A227] font-medium">
                                        {t.degree}
                                    </p>
                                    <p className="text-xs text-[#2B2D42]/60 mt-1 truncate">
                                        {t.majorSubject} · {t.locatedRoomNo}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-1.5 shrink-0">
                                    <button
                                        type="button"
                                        aria-label="Edit teacher"
                                        onClick={() => handleEdit(t)}
                                        className="w-8 h-8 rounded-md bg-[#14213D]/5 hover:bg-[#14213D]/10 flex items-center justify-center text-[#14213D] transition-colors"
                                    >
                                        <FaEdit size={13} />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Delete teacher"
                                        onClick={() => handleDelete(t._id)}
                                        className="w-8 h-8 rounded-md bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors"
                                    >
                                        <FaTrashAlt size={13} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeacherData