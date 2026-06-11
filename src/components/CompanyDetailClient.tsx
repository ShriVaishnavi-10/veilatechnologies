"use client";

import React, { useState } from "react";
import { CheckCircle2, Building2, Briefcase, Mail, MapPin, Clock, Award, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence, type Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CompanyDetail, jobOpeningsList } from "@/lib/companyData";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import Magnetic from "@/components/Magnetic";

const valuesContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

const valueItemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 70, damping: 15 }
  }
};

const iconMap = {
  about: Building2,
  careers: Briefcase,
};

function JobOpeningCard({ job, itemVariants, idx, onApply }: {
  job: typeof jobOpeningsList[0];
  itemVariants: Variants;
  idx: number;
  onApply: (title: string) => void;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const contentX = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });
  const contentY = useSpring(useTransform(my, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    mx.set((mouseX - width / 2) / width);
    my.set((mouseY - height / 2) / height);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <Magnetic range={150} strength={0.08}>
      <div className="flex w-full">
        <motion.div
          variants={itemVariants}
          custom={idx}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ originX: 0, zIndex: 10 - idx }}
          whileHover={{ 
            scale: 1.01, 
            borderColor: "rgba(255, 106, 0, 0.25)", 
            boxShadow: "0 20px 40px -15px rgba(255, 106, 0, 0.12)",
            backgroundColor: "rgba(22, 22, 26, 0.98)" 
          }}
          className="p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a]/40 text-left w-full cursor-pointer relative overflow-hidden"
        >
          <motion.div style={{ x: contentX, y: contentY }} className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 w-full">
            <div className="space-y-4 text-left w-full">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[10px] font-mono text-[#ff6a00] bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-2 py-0.5 rounded font-bold uppercase">
                  {job.department}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                  <MapPin className="w-3 h-3" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                  <Clock className="w-3 h-3" />
                  {job.experience}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">{job.title}</h3>
              <p className="text-slate-300 text-xs font-light leading-relaxed max-w-3xl">
                {job.description}
              </p>
              
              <div className="space-y-2 pt-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Requirements:</h4>
                <ul className="space-y-1">
                  {job.requirements.map((req, rIdx) => (
                    <li key={rIdx} className="flex items-center gap-2 text-xs text-slate-300 font-light text-left">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00]/50 shrink-0"></span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="shrink-0 pt-2 lg:pt-0">
              <Magnetic range={60} strength={0.3}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onApply(job.title);
                  }}
                  className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] hover:from-[#ff7300] hover:to-[#ff1a00] shadow-sm transition-all inline-flex items-center justify-center cursor-pointer border-none outline-none focus:outline-none"
                >
                  Apply Now
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Magnetic>
  );
}

interface CompanyDetailClientProps {
  company: CompanyDetail;
}

export default function CompanyDetailClient({ company }: CompanyDetailClientProps) {
  const IconComponent = iconMap[company.slug as keyof typeof iconMap] || Building2;

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleOpenApplyModal = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setIsApplyModalOpen(true);
    setSubmitSuccess(false);
    setSubmitError("");
    setResumeFile(null);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setSubmitError("Please select a resume file to upload.");
      return;
    }
    setIsSubmitting(true);
    setSubmitError("");

    try {
      let finalResumeUrl = "";

      if (isSupabaseConfigured && supabase) {
        const fileExt = resumeFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(filePath, resumeFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("resumes")
          .getPublicUrl(filePath);

        finalResumeUrl = publicUrl;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        finalResumeUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(resumeFile);
        });
      }

      const payload = {
        job_title: selectedJob,
        applicant_name: applicantName,
        applicant_email: applicantEmail,
        applicant_phone: applicantPhone,
        resume_url: finalResumeUrl,
        portfolio_url: portfolioUrl || "",
        cover_letter: coverLetter
      };

      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from("job_applications").insert([payload]);
        if (error) throw error;
      } else {
        if (typeof window !== "undefined") {
          const existing = localStorage.getItem("veila_job_applications");
          const list = existing ? JSON.parse(existing) : [];
          const newApp = {
            id: Math.random().toString(36).substring(2, 9),
            created_at: new Date().toISOString(),
            status: "New",
            ...payload
          };
          localStorage.setItem("veila_job_applications", JSON.stringify([newApp, ...list]));
        }
      }

      setSubmitSuccess(true);
      setApplicantName("");
      setApplicantEmail("");
      setApplicantPhone("");
      setResumeFile(null);
      setPortfolioUrl("");
      setCoverLetter("");
    } catch (err) {
      const rawMsg = err instanceof Error ? err.message : String(err);
      let errMsg = rawMsg;
      if (rawMsg.toLowerCase().includes("bucket") && (rawMsg.toLowerCase().includes("not found") || rawMsg.toLowerCase().includes("exist"))) {
        errMsg = "Supabase Storage bucket 'resumes' was not found. Please create a PUBLIC bucket named 'resumes' in your Supabase dashboard -> Storage, and add SELECT/INSERT policies to enable uploads.";
      }
      setSubmitError(`${errMsg} (Raw Error: ${rawMsg})`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0,
      transition: { type: "spring", stiffness: 70, damping: 15 }
    }
  };

  return (
    <div key={company.slug} className="flex flex-col min-h-screen bg-[#0B0B0C] text-slate-100 overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ff6a00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#ff2b00]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6a00]/10 border border-[#ff6a00]/20"
                >
                  <span className="text-[10px] font-mono tracking-widest text-[#ff6a00] uppercase font-bold">
                    {company.category}
                  </span>
                </motion.div>
                <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white leading-tight flex flex-wrap gap-x-[0.2em] overflow-hidden">
                  {company.title.split(" ").map((word, idx) => (
                    <span key={idx} className="inline-block overflow-hidden py-1">
                      <motion.span
                        inherit={false}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                          delay: idx * 0.05
                        }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h1>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-2xl"
                >
                  {company.description}
                </motion.p>
              </div>

              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <IconComponent className="w-4 h-4 text-[#ff6a00]" />
                  <span>At a glance</span>
                </h3>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
                >
                  {company.details.map((detail, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="flex items-start gap-2.5 text-xs text-slate-300 font-light"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#ff6a00] mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-5 flex items-center justify-center relative w-full overflow-visible"
            >
              <div className="absolute w-[80%] h-[80%] bg-gradient-to-br from-[#ff8a00]/20 to-[#ff2b00]/20 rounded-full blur-[80px] opacity-40 z-0 pointer-events-none" />
              
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full aspect-[4/3] rounded-2xl border border-white/[0.08] bg-[#16161a]/60 p-2 shadow-2xl overflow-hidden z-10"
              >
                <img
                  src={company.imagePath}
                  alt={company.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            </motion.div>
          </div>

          {company.slug === "about" && (
            <div className="border-t border-white/[0.04] pt-16 sm:pt-24 space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6 text-left"
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#ff6a00] font-mono">Our Narrative</h3>
                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    Veila Technologies was established in 2026 with a vision to make premium digital solutions accessible to businesses globally. We specialize in building fast Next.js websites, optimizing organic search ranking routes, scaling marketing reach, and structuring engaging content.
                  </p>
                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    Based in Virudhunagar, Tamilnadu, we have designed a 100% remote working model that gathers top technology talent to deliver standard-compliant web architectures worldwide.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{ duration: 0.6 }}
                  whileHover={{ scale: 1.01, borderColor: "rgba(255, 106, 0, 0.25)" }}
                  className="p-6 sm:p-8 rounded-xl border border-white/[0.04] bg-[#16161a]/40 space-y-6 transition-all duration-300"
                >
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#ff6a00]" />
                    <span>Our Core Values</span>
                  </h3>
                  <motion.div
                    variants={valuesContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                    className="space-y-4 text-left"
                  >
                    <motion.div variants={valueItemVariants} style={{ originX: 0 }} className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] mt-2 shrink-0"></span>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quality Engineering</h4>
                        <p className="text-[11px] text-slate-400 font-light mt-0.5">We write clean, standard-compliant code, ensuring maximum performance and SEO capabilities.</p>
                      </div>
                    </motion.div>
                    <motion.div variants={valueItemVariants} style={{ originX: 0 }} className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] mt-2 shrink-0"></span>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Trust</h4>
                        <p className="text-[11px] text-slate-400 font-light mt-0.5">Direct communication with lead engineers and strategists, avoiding middle-management delays.</p>
                      </div>
                    </motion.div>
                    <motion.div variants={valueItemVariants} style={{ originX: 0 }} className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6a00] mt-2 shrink-0"></span>
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Business Impact</h4>
                        <p className="text-[11px] text-slate-400 font-light mt-0.5">Every layout choice, design grid, and copywriting piece is engineered to capture leads and drive sales.</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          )}

          {company.slug === "careers" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="border-t border-white/[0.04] pt-16 sm:pt-24 space-y-12"
            >
              <div className="max-w-xl">
                <h2 className="text-[11px] font-mono tracking-widest text-[#ff6a00] uppercase font-semibold">
                  Open Positions
                </h2>
                <h2 className="mt-3 font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white flex flex-wrap gap-x-[0.2em]">
                  {"Work with us from anywhere".split(" ").map((word, idx) => (
                    <span key={idx} className="inline-block py-1">
                      <motion.span
                        inherit={false}
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: false, amount: 0.15 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                        className="inline-block"
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </h2>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                className="space-y-6"
              >
                {jobOpeningsList.map((job, idx) => (
                  <JobOpeningCard
                    key={idx}
                    job={job}
                    itemVariants={itemVariants}
                    idx={idx}
                    onApply={handleOpenApplyModal}
                  />
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.01, borderColor: "rgba(255, 106, 0, 0.2)", boxShadow: "0 20px 40px -15px rgba(255, 106, 0, 0.1)" }}
                className="p-8 sm:p-10 rounded-2xl border border-white/[0.06] bg-[#16161a]/30 shadow-xl text-center max-w-3xl mx-auto transition-all duration-300"
              >
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mb-2">Don&apos;t see a suitable role?</h3>
                <p className="text-xs text-slate-400 font-light mb-6 max-w-lg mx-auto">
                  We are always looking for passionate React/Next.js developers, creative designers, and growth hackers. Send your resume for future considerations.
                </p>
                <a
                  href="mailto:veilatechnologies@gmail.com"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#ff6a00] hover:text-[#ff2b00] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>veilatechnologies@gmail.com</span>
                </a>
              </motion.div>
            </motion.div>
          )}

        </div>
      </main>

      <AnimatePresence>
        {isApplyModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="relative w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#16161a] p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh] text-left"
            >
              <button
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute top-4 right-4 p-1 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {submitSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-serif text-2xl text-white">Application Transmitted</h3>
                  <p className="text-xs text-slate-400 font-light max-w-md mx-auto leading-relaxed">
                    Thank you for applying to Veila Technologies! Your candidacy parameters for <strong>{selectedJob}</strong> have been logged. Our development managers will review your profile shortly.
                  </p>
                  <button
                    onClick={() => setIsApplyModalOpen(false)}
                    className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] hover:from-[#ff7300] hover:to-[#ff1a00] transition-all cursor-pointer border-none"
                  >
                    Return to Careers
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-[#ff6a00] uppercase font-bold">
                      Career Submission
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-medium text-white mt-1">
                      Apply: {selectedJob}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-light mt-1">
                      Complete the parameters below to register your candidacy.
                    </p>
                  </div>

                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full px-3 py-2 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6a00]/40 focus:bg-[#1e1e24]/60 transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="johndoe@email.com"
                          value={applicantEmail}
                          onChange={(e) => setApplicantEmail(e.target.value)}
                          className="w-full px-3 py-2 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6a00]/40 focus:bg-[#1e1e24]/60 transition-all"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={applicantPhone}
                          onChange={(e) => setApplicantPhone(e.target.value)}
                          className="w-full px-3 py-2 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6a00]/40 focus:bg-[#1e1e24]/60 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                        Upload Resume (PDF, DOC, DOCX)
                      </label>
                      <div className="relative flex items-center justify-between px-3 py-2 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-slate-300">
                        <span className="truncate max-w-[250px]">
                          {resumeFile ? resumeFile.name : "No file chosen"}
                        </span>
                        <label className="px-2.5 py-1 rounded bg-[#ff6a00]/10 hover:bg-[#ff6a00]/20 text-[#ff6a00] hover:text-[#ff7300] text-[10px] font-mono tracking-wide font-bold uppercase cursor-pointer border border-[#ff6a00]/20 transition-all shrink-0">
                          Browse
                          <input
                            type="file"
                            required
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setResumeFile(e.target.files[0]);
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                        Portfolio / GitHub Link (Optional)
                      </label>
                      <input
                        type="url"
                        placeholder="https://github.com/username or personal website"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        className="w-full px-3 py-2 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6a00]/40 focus:bg-[#1e1e24]/60 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono tracking-wider text-slate-400 uppercase font-semibold">
                        Brief Cover Letter / Introduction
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Tell us about your background, experience, and why you want to join Veila Technologies..."
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        className="w-full px-3 py-2 rounded border border-white/[0.08] bg-[#1e1e24]/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff6a00]/40 focus:bg-[#1e1e24]/60 transition-all resize-none"
                      />
                    </div>

                    {submitError && (
                      <div className="text-[10px] text-rose-500 font-mono p-3 rounded border border-rose-500/20 bg-rose-500/[0.02]">
                        {submitError}
                      </div>
                    )}

                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsApplyModalOpen(false)}
                        className="flex-1 py-2.5 rounded border border-white/10 hover:bg-white/5 text-xs text-slate-300 font-semibold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 rounded bg-gradient-to-r from-[#ff8a00] to-[#ff2b00] hover:from-[#ff7300] hover:to-[#ff1a00] text-xs text-white font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50 transition-all cursor-pointer border-none"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Transmitting...
                          </>
                        ) : (
                          "Submit Application"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
