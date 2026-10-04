import { useState, useEffect, useRef } from "react";
import { FaPlus, FaArrowLeft, FaUserCircle, FaCalendarAlt, FaImage, FaAlignLeft, FaCloudUploadAlt, FaEdit, FaTrashAlt } from "react-icons/fa";
import api from "../../services/api";
import { toast } from "react-toastify";
import AdminNavbar from "../../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NoticeBoardData = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const noticeListRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [notices, setNotices] = useState([]);
    const [newNoticeId, setNewNoticeId] = useState(null);

    const { user } = useAuth();

    const [view, setView] = useState("list");
    const [editNotice, setEditNotice] = useState(null);

    const [formData, setFormData] = useState({
        postImage: "",
        description: "",
        lastDate: "",
    })

    const changeHandler = (e) => {
        let { name, value, files, type } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files?.[0] || "" : value,
        }))
    }

    const fetchNotices = async () => {
        try {
            setLoading(true);

            const response = await api.get("/notice/get-notice");

            console.log("Notice API response:", response.data);

            setNotices(response.data.notices)

        } catch (error) {
            console.log(error.response?.data?.msg);
            toast.error(error.response?.data?.msg || "Failed to load Notices")
        } finally {
            setLoading(false);
        }
    }

    const formatDate = (date) => {
        if (!date) return "";

        return new Date(date).toLocaleDateString("en-In", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const data = new FormData();

            data.append("description", formData.description);
            data.append("lastDate", formData.lastDate);

            if (formData.postImage instanceof File) {
                data.append("postImage", formData.postImage);
            }

            let response;
            let targetNoticeId;

            if (editNotice) {
                response = await api.put(`/notice/update-notice/${editNotice._id}`, data);
                targetNoticeId = editNotice._id;
            } else {
                response = await api.post("/notice/create-notice", data);
                targetNoticeId = response.data.noticeAdded._id;
            }

            toast.success(response.data.msg)

            setNewNoticeId(targetNoticeId);

            setFormData({
                postImage: "",
                description: "",
                lastDate: "",
            })

            setEditNotice(null)

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            await fetchNotices();
            setView("list");

        } catch (error) {
            console.log(error.response?.data?.msg);
            toast.error(error.response?.data?.msg || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (item) => {
        setEditNotice(item);

        setFormData({
            postImage: "",
            description: item.description,
            lastDate: item.lastDate?.split("T")[0] || "",
        });

        setView("form");
    };

    const resetForm = () => {
        setEditNotice(null);

        setFormData({
            postImage: "",
            description: "",
            lastDate: "",
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const deleteHandler = async (id) => {
        try {
            setLoading(true);

            const response = await api.delete(`/notice/delete-notice/${id}`);

            toast.success(response.data.msg || "Notice delete successfully")

            await fetchNotices();

        } catch (error) {
            console.log(error.response?.data?.msg);
            toast.error(error.response?.data?.msg || "Failed to delete Notice")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!newNoticeId || view !== "list") return;

        const element = document.getElementById(`notice-${newNoticeId}`);

        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });

            setNewNoticeId(null);
        }
    }, [newNoticeId, view, notices]);

    useEffect(() => {
        fetchNotices();
    }, []);

    return (
        <div className="min-h-screen bg-[#FAF8F4]">
            <AdminNavbar />
            <div className="max-w-5xl mx-auto px-6 sm:px-8 py-10 md:py-14">

                {view === "list" ? (
                    <>
                        {/* Back to Dashboard */}
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

                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 gap-4">
                            <div>
                                <p className="text-xs font-medium tracking-wide text-[#C9A227] mb-1">
                                    COMMUNITY
                                </p>

                                <h1 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D]">
                                    Notice Board
                                </h1>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    resetForm();
                                    setView("form");
                                }}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-lg
                               bg-[#14213D] text-[#FAF8F4] text-sm font-semibold
                               hover:bg-[#1D2E52] transition-colors shrink-0"
                            >
                                <FaPlus size={13} />
                                Post
                            </button>
                        </div>


                        {/* notices */}
                        <div className="space-y-5" ref={noticeListRef}>
                            {notices.map((item) => (
                                <div
                                    key={item._id}
                                    id={`notice-${item._id}`}
                                    className="rounded-xl bg-white border border-[#2B2D42]/10 shadow-sm overflow-hidden"
                                >
                                    {item.postImage && (
                                        <img
                                            src={item.postImage}
                                            alt=""
                                            className="w-full aspect-square object-cover"
                                        />
                                    )}
                                    <div className="p-5 sm:p-6">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div className="flex items-center gap-2">
                                                <FaUserCircle size={22} className="text-[#C9A227]" />
                                                <span className="text-sm font-medium text-[#14213D]">
                                                    {item.userId?.fullName}
                                                </span>
                                            </div>
                                            <div className="flex gap-1.5 shrink-0">

                                                {/* Edit - only for the notice owner */}
                                                {item.userId?._id?.toString() === user?._id?.toString() && (
                                                    <button
                                                        type="button"
                                                        aria-label="Edit notice"
                                                        onClick={() => handleEdit(item)}
                                                        className="w-8 h-8 rounded-md bg-[#14213D]/5 hover:bg-[#14213D]/10 flex items-center justify-center text-[#14213D] transition-colors"
                                                    >
                                                        <FaEdit size={13} />
                                                    </button>
                                                )}

                                                {/* Delete - admin can delete any notice */}
                                                <button
                                                    type="button"
                                                    aria-label="Delete notice"
                                                    onClick={() => deleteHandler(item._id)}
                                                    className="w-8 h-8 rounded-md bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-500 transition-colors"
                                                >
                                                    <FaTrashAlt size={13} />
                                                </button>

                                            </div>
                                        </div>

                                        <p className="text-sm text-[#2B2D42]/75 leading-relaxed">
                                            {item.description}
                                        </p>

                                        <div className="mt-4 pt-4 border-t border-[#2B2D42]/10 flex items-center gap-2 text-xs text-[#2B2D42]/60">
                                            <FaCalendarAlt size={12} className="text-[#3B5BA5]" />
                                            Last date: {formatDate(item.lastDate)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        {/* form header */}
                        <button
                            type="button"
                            onClick={() => {
                                resetForm();
                                setView("list");
                            }}
                            className="flex items-center gap-2 text-sm text-[#2B2D42]/60 hover:text-[#14213D] mb-6 transition-colors"
                        >
                            <FaArrowLeft size={13} />
                            Back to notices
                        </button>

                        <div className="rounded-xl bg-white border border-[#2B2D42]/10 shadow-sm p-6 sm:p-8 max-w-lg mx-auto">
                            <h2 className="font-['Fraunces',serif] text-xl text-[#14213D] mb-6">
                                {editNotice ? "Edit Notice" : "Post a Notice"}
                            </h2>

                            <form className="space-y-5" onSubmit={submitHandler}>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                        Post Image
                                    </label>

                                    {editNotice?.postImage && (
                                        <div className="mb-3">
                                            <p className="text-xs text-[#2B2D42]/60 mb-2">
                                                Current Image
                                            </p>

                                            <img
                                                src={editNotice.postImage}
                                                alt="Current notice"
                                                className="w-full max-h-64 object-cover rounded-lg border border-[#2B2D42]/10"
                                            />
                                        </div>
                                    )}
                                    <div className="relative">
                                        <FaImage
                                            size={15}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                        />
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            name="postImage"
                                            accept="image/*"
                                            onChange={changeHandler}
                                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#2B2D42]/15 text-sm outline-none file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:bg-[#14213D]/5 file:text-xs file:text-[#14213D]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                        Description
                                    </label>
                                    <div className="relative">
                                        <FaAlignLeft
                                            size={15}
                                            className="absolute left-3 top-3 text-[#2B2D42]/40"
                                        />
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={changeHandler}
                                            rows={4}
                                            placeholder="What's the notice about?"
                                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/15 text-sm outline-none focus:border-[#3B5BA5] resize-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1.5 text-[#2B2D42]">
                                        Last Date
                                    </label>
                                    <div className="relative">
                                        <FaCalendarAlt
                                            size={14}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B2D42]/40"
                                        />
                                        <input
                                            type="date"
                                            name="lastDate"
                                            value={formData.lastDate}
                                            onChange={changeHandler}
                                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-[#2B2D42]/15 text-sm outline-none focus:border-[#3B5BA5]"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#14213D] text-[#FAF8F4] text-sm font-semibold hover:bg-[#1D2E52] transition-colors disabled:opacity-50"
                                >
                                    <FaCloudUploadAlt size={16} />

                                    {loading
                                        ? editNotice
                                            ? "Updating..."
                                            : "Uploading..."
                                        : editNotice
                                            ? "Update Notice"
                                            : "Upload"
                                    }
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default NoticeBoardData