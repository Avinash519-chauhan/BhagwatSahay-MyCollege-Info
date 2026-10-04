import { useState } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaFileAlt, FaExternalLinkAlt, FaUniversity } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import ReactMarkdown from "react-markdown";
import api from "../../services/api";


const SECTIONS = [
    {
        title: "Admission",
        items: [
            "Application/admission form printout",
            "Fee receipt",
            "10th and 12th marksheets",
            "Graduation semester marksheets, where applicable",
            "Caste certificate",
            "Income certificate, where applicable",
            "Transfer Certificate",
            "Migration Certificate",
            "Aadhaar",
            "Proctorial Board form",
            "Anti-ragging affidavit",
            "Passport photographs",
            "Eligibility certificate, where applicable",
            "Original documents + self-attested photocopies, for verification",
        ],
    },
    {
        title: "Scholarship",
        items: [
            "Aadhaar Card",
            "Samagra ID",
            "Caste Certificate",
            "Income Certificate",
            "MP Domicile / मूल निवासी प्रमाण पत्र",
            "Previous/latest marksheet",
            "Current admission/enrollment details",
            "Current-year fee receipt",
            "Bank passbook/account details",
            "Passport-size photograph",
            "Scholarship application/registration printout",
            "Mobile number linked with Aadhaar/bank, where applicable",
        ],
        note: "SC and ST scholarships use this same core set — Aadhaar, caste, income, domicile — with payment via DBT to an Aadhaar-linked bank account.",
    },
    {
        title: "Admission Cancellation",
        groups: [
            {
                heading: "Through MP e-Pravesh",
                items: [
                    "e-Pravesh application/registration details",
                    "Admission/allotment letter",
                    "Fee payment receipt",
                    "Aadhaar/valid ID",
                    "Student registration/application number",
                    "College admission receipt",
                    "Bank details, if a refund applies",
                    "Written cancellation application, if the college asks for it",
                ],
            },
            {
                heading: "Directly at college (additionally)",
                items: [
                    "Written application for admission cancellation",
                    "Original fee receipt",
                    "College ID card, if issued",
                    "Enrollment/registration details",
                    "Bank details for refund, if applicable",
                ],
            },
        ],
        note: "Don't permanently surrender original marksheets just for cancellation — get a written acknowledgment for anything handed over.",
    },
    {
        title: "Transfer to Another College",
        groups: [
            {
                heading: "Within MP / e-Pravesh",
                items: [
                    "e-Pravesh registration/application details",
                    "Current college admission/fee receipt",
                    "Current college ID",
                    "Aadhaar",
                    "Latest marksheet/result",
                    "Enrollment number",
                    "Samagra ID, where applicable",
                    "Transfer application",
                    "Transfer approval/order, if generated",
                ],
            },
            {
                heading: "If leaving one college to join another",
                items: [
                    "Transfer Certificate (TC)",
                    "Migration Certificate, if applicable",
                    "Eligibility Certificate, if applicable",
                    "Previous marksheets",
                    "Admission/cancellation proof",
                    "Character certificate, if requested",
                ],
            },
        ],
        note: "College transfer isn't the same as migration — migration applies to moving between universities, not between colleges.",
    },
    {
        title: "Migration",
        items: [
            "Migration application/form",
            "Final/latest marksheet",
            "Enrollment number",
            "University roll number",
            "Aadhaar/ID",
            "Transfer Certificate",
            "Admission/cancellation/college-leaving proof, where applicable",
            "Migration fee receipt",
            "Passport-size photographs, if required",
            "Eligibility-related document, if required",
        ],
        note: "Moving to another Jiwaji-affiliated college is not the same as moving to another university — migration applies to the latter.",
    },
    {
        title: "Exam Form",
        items: [
            "Enrollment number",
            "College ID",
            "Aadhaar/ID",
            "Previous/latest marksheet",
            "Current admission/renewal details",
            "Current-year fee receipt",
            "Examination fee receipt",
            "Exam form printout, if the college asks for it",
            "Passport-size photograph, if required",
            "Previous exam and subject/paper details",
        ],
        note: "ATKT/Supplementary/EX exam forms are a separate process from the regular exam form.",
    },
    {
        title: "Enrollment",
        items: [
            "Enrollment application/form",
            "Admission form",
            "Fee receipt",
            "10th and 12th marksheets",
            "Graduation marksheets, for PG applicants",
            "Aadhaar",
            "Caste certificate, if applicable",
            "Income certificate, if applicable",
            "Transfer Certificate",
            "Migration Certificate, if applicable",
            "Gap Certificate, if applicable",
            "Eligibility Certificate, if applicable",
            "Passport-size photographs",
            "College admission/registration details",
        ],
        note: "Bring originals for verification along with self-attested photocopies.",
    },
    {
        title: "Caste / Category Benefit",
        groups: [
            {
                heading: "Basic set",
                items: [
                    "Valid caste certificate",
                    "Aadhaar",
                    "Samagra ID",
                    "MP Domicile / मूल निवासी प्रमाण पत्र",
                    "Income certificate",
                    "Latest marksheet",
                    "Admission/fee receipt",
                ],
            },
            {
                heading: "OBC",
                items: [
                    "OBC certificate",
                    "Non-Creamy Layer status, where required",
                    "Income certificate",
                    "Domicile",
                ],
            },
            {
                heading: "EWS",
                items: [
                    "EWS certificate",
                    "Income/asset documentation as prescribed",
                    "Domicile, where applicable",
                    "Aadhaar",
                    "Academic documents",
                ],
            },
        ],
        note: "A caste certificate and an income certificate are different documents — many benefits need both.",
    },
    {
        title: "Degree / Marksheet",
        groups: [
            {
                heading: "Normal marksheet (duplicate/reissue)",
                items: [
                    "Enrollment number",
                    "Roll number",
                    "Exam/year/semester details",
                    "Aadhaar/ID",
                    "Examination result details",
                    "Fee/payment receipt",
                ],
            },
            {
                heading: "Provisional Degree",
                items: [
                    "Final result/marksheets",
                    "Enrollment number",
                    "Roll number",
                    "Aadhaar/ID",
                    "Degree application",
                    "Fee receipt",
                    "Photographs/signature, where the form asks",
                ],
            },
            {
                heading: "Final Degree",
                items: [
                    "All semester/year marksheets",
                    "Enrollment number",
                    "Final result",
                    "Degree application",
                    "Fee receipt",
                    "Identification document",
                    "Any university-required verification documents",
                ],
            },
        ],
    },
    {
        title: "Supplementary Exam (ATKT / SUPP / EX)",
        items: [
            "Previous semester/year marksheet",
            "Supplementary/failed-subject result",
            "Enrollment number",
            "University roll number",
            "College ID",
            "Aadhaar/ID",
            "Supplementary examination form",
            "Examination fee receipt",
            "Current admission/college fee receipt, if requested",
            "Previous exam details and subject/paper code",
        ],
        note: "Keep the original result showing the backlog subject safe — it's often needed when filling the ATKT/SUPP form.",
    },
    {
        title: "ABC / APAAR",
        items: [
            "Aadhaar",
            "Aadhaar-linked mobile number, where required",
            "Name exactly matching academic records",
            "Date of birth and gender",
            "Father's name and mother's name",
            "College/student details",
            "Enrollment/registration information",
            "Existing APAAR/ABC ID, if already created",
            "DigiLocker account",
        ],
        note: "Never create more than one ABC/APAAR ID — each person should have only one, and a duplicate can get the older ID disabled. Keep your APAAR/ABC ID saved permanently.",
    },
    {
        title: "Submit After Paying Fees Every Year",
        items: [
            "College fee payment receipt",
            "e-Pravesh admission-renewal/promotion receipt or form",
            "Previous year's/latest marksheet",
            "College ID card",
            "Jiwaji enrollment number",
            "Aadhaar photocopy, if requested",
            "APAAR/ABC ID",
            "Samagra ID, if requested",
            "Scholarship-related documents, if applying",
            "Caste certificate, if the college is updating category records",
            "Income certificate, if required for scholarship/category benefit",
            "Passport-size photograph, if an updated record is needed",
        ],
    },
];

const JIWAJI_LINKS = [
    { label: "Jiwaji University — Previous Year Exam Paper", url: "https://www.jiwajionline.com/" },
    { label: "Jiwaji University — Notice Board for Exam Date & Result etc.", url: "https://jiwaji.edu/notice-board" },
    { label: "Jiwaji University — Home Page", url: "https://www.jiwaji.edu/" },
    { label: "Jiwaji University — Multiple Courses", url: "https://jiwaji.edu/academics/courses-offered" },
];

const Documents = () => {

    const [showAI, setShowAI] = useState(false);
    const [question, setQuestion] = useState("");
    const [aiAnswer, setAIAnswer] = useState("");
    const [loading, setLoading] = useState(false);


    const loadAnswer = async (e) => {
        e.preventDefault();

        if (!question.trim()) return;

        const askedQuestion = question.trim();
        setQuestion("");

        try {
            setLoading(true);

            const response = await api.post("/ai/ask", {
                question: askedQuestion
            })

            setAIAnswer(response.data.answer);

        } catch (error) {
            console.log(error);
            setAIAnswer("Something went wrong. Please Try Again")
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen bg-[#FAF8F4]">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10 md:py-14">
                {/* header */}
                <div className="mb-10 text-center">
                    <p className="text-xs font-medium tracking-wide text-[#C9A227] mb-1">
                        DOCUMENTS
                    </p>
                    <h1 className="font-['Fraunces',serif] text-2xl sm:text-3xl text-[#14213D]">
                        Document Requirements
                    </h1>
                    <p className="mt-2 text-sm text-[#2B2D42]/60 max-w-md mx-auto">
                        What to keep ready for admission, scholarships, exams and other
                        college processes.
                    </p>
                </div>

                {/* sections */}
                <div className="space-y-4">
                    {SECTIONS.map((section) => (
                        <details
                            key={section.title}
                            className="group rounded-xl bg-white border border-[#2B2D42]/10 shadow-sm overflow-hidden"
                        >
                            <summary className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 cursor-pointer list-none">
                                <span className="flex items-center gap-3 font-['Fraunces',serif] text-base sm:text-lg text-[#14213D]">
                                    <FaFileAlt size={15} className="text-[#C9A227] shrink-0" />
                                    {section.title}
                                </span>
                                <span className="text-[#2B2D42]/40 text-sm group-open:rotate-180 transition-transform shrink-0">
                                    ▾
                                </span>
                            </summary>

                            <div className="px-5 sm:px-6 pb-6 pt-1">
                                {section.items && (
                                    <ul className="space-y-1.5">
                                        {section.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-2 text-sm text-[#2B2D42]/75"
                                            >
                                                <span className="w-1 h-1 mt-2 rounded-full bg-[#C9A227] shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {section.groups &&
                                    section.groups.map((group) => (
                                        <div key={group.heading} className="mt-4 first:mt-0">
                                            <p className="text-xs font-semibold text-[#3B5BA5] mb-2">
                                                {group.heading}
                                            </p>
                                            <ul className="space-y-1.5">
                                                {group.items.map((item) => (
                                                    <li
                                                        key={item}
                                                        className="flex items-start gap-2 text-sm text-[#2B2D42]/75"
                                                    >
                                                        <span className="w-1 h-1 mt-2 rounded-full bg-[#C9A227] shrink-0" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}

                                {section.note && (
                                    <p className="mt-4 text-xs text-[#14213D]/70 bg-[#14213D]/5 rounded-lg px-3 py-2.5 leading-relaxed">
                                        {section.note}
                                    </p>
                                )}
                            </div>
                        </details>
                    ))}
                </div>

                {/* OFFICIAL JIWAJI LINKS — collapsible, same as the sections above */}
                <details className="group mt-10 rounded-xl bg-white border border-[#2B2D42]/10 shadow-sm overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4 cursor-pointer list-none">
                        <span className="flex items-center gap-3 font-['Fraunces',serif] text-base sm:text-lg text-[#14213D]">
                            <FaUniversity size={16} className="text-[#C9A227] shrink-0" />
                            Official Jiwaji Links
                        </span>
                        <span className="text-[#2B2D42]/40 text-sm group-open:rotate-180 transition-transform shrink-0">
                            ▾
                        </span>
                    </summary>

                    <div className="px-5 sm:px-6 pb-6 pt-1">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {JIWAJI_LINKS.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-[#2B2D42]/10 hover:border-[#3B5BA5]/40 hover:bg-[#14213D]/5 transition-colors text-sm text-[#2B2D42]/80"
                                >
                                    {link.label}
                                    <FaExternalLinkAlt
                                        size={12}
                                        className="text-[#3B5BA5] shrink-0"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </details>
                <p className="mt-4 text-xs text-[#14213D]/70 bg-[#14213D]/5 rounded-lg px-3 py-2.5 leading-relaxed">
                    <strong>Note:</strong> Please consult your teacher as well to confirm the required documents and procedure before proceeding.
                </p>
            </div>

            {/* FIXED AI BUTTON — stays in place, doesn't move with page scroll */}
            <button
                type="button"
                onClick={() => setShowAI(true)}
                aria-label="Ask about these documents"
                className="fixed bottom-12 right-15 z-40 w-14 h-14 rounded-full bg-[#14213D] text-[#C9A227] shadow-xl flex items-center justify-center hover:bg-[#1D2E52] transition-colors"
            >
                <FaRobot size={22} />
            </button>

            {/* AI POPUP */}
            {showAI && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                    {/* backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40"
                        onClick={() => setShowAI(false)}
                    />

                    {/* popup card */}
                    <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
                        <div
                            className="flex items-center justify-between px-5 py-4 text-white"
                            style={{ background: "#14213D" }}
                        >
                            <div className="flex items-center gap-2">
                                <FaRobot size={16} className="text-[#C9A227]" />
                                <span className="font-['Fraunces',serif] text-base">
                                    Ask about these documents
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowAI(false)}
                                aria-label="Close"
                                className="text-white/70 hover:text-white"
                            >
                                <FaTimes size={16} />
                            </button>
                        </div>

                        <div className="px-5 py-4 max-h-80 overflow-y-auto space-y-3">

                            {question && (
                                <div className="ml-auto max-w-[85%] bg-[#14213D] text-white text-sm rounded-lg rounded-tr-none px-3 py-2">
                                    {question}
                                </div>
                            )}

                            {loading && (
                                <div className="mr-auto max-w-[85%] bg-[#14213D]/5 text-[#2B2D42] text-sm rounded-lg rounded-tl-none px-3 py-2">
                                    Thinking...
                                </div>
                            )}

                            {aiAnswer && !loading && (
                                <div className="mr-auto max-w-[90%] bg-[#14213D]/5 text-[#2B2D42] text-sm rounded-lg rounded-tl-none px-4 py-3">
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ children }) => (
                                                <h1 className="text-lg font-semibold mb-2">
                                                    {children}
                                                </h1>
                                            ),

                                            h2: ({ children }) => (
                                                <h2 className="text-base font-semibold mb-2">
                                                    {children}
                                                </h2>
                                            ),

                                            h3: ({ children }) => (
                                                <h3 className="text-sm font-semibold mb-1.5">
                                                    {children}
                                                </h3>
                                            ),

                                            p: ({ children }) => (
                                                <p className="mb-2 last:mb-0 leading-relaxed">
                                                    {children}
                                                </p>
                                            ),

                                            ul: ({ children }) => (
                                                <ul className="list-disc ml-5 mb-2 space-y-1">
                                                    {children}
                                                </ul>
                                            ),

                                            ol: ({ children }) => (
                                                <ol className="list-decimal ml-5 mb-2 space-y-1">
                                                    {children}
                                                </ol>
                                            ),

                                            li: ({ children }) => (
                                                <li className="leading-relaxed">
                                                    {children}
                                                </li>
                                            ),

                                            strong: ({ children }) => (
                                                <strong className="font-semibold">
                                                    {children}
                                                </strong>
                                            ),

                                            a: ({ href, children }) => (
                                                <a
                                                    href={href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#3B5BA5] underline"
                                                >
                                                    {children}
                                                </a>
                                            ),
                                        }}
                                    >
                                        {aiAnswer}
                                    </ReactMarkdown>
                                </div>
                            )}

                        </div>

                        {/* input row — uncontrolled, no submit logic */}
                        <form className="flex items-center gap-2 px-4 py-3 border-t border-[#2B2D42]/10" onSubmit={loadAnswer}>
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                placeholder="Type your question..."
                                className="flex-1 px-3 py-2 rounded-lg border border-[#2B2D42]/15 text-sm outline-none focus:border-[#3B5BA5]"
                            />
                            <button
                                type="submit"
                                className="w-9 h-9 shrink-0 rounded-lg bg-[#14213D] text-[#C9A227] flex items-center justify-center hover:bg-[#1D2E52] transition-colors"
                                aria-label="Send question"
                            >
                                <FaPaperPlane size={13} />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Documents