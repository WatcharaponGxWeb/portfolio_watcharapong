import React, { useState, useEffect } from 'react';
import {
 User, Code2, GraduationCap, Mail, Phone,
  ChevronDown, Download, MapPin, Sparkles, ArrowRight, CheckCircle2,
  ArrowUp, Search, PenTool, Monitor, CheckSquare, Award, X
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = isDeleting ? 50 : 150;
  const [activeFilter, setActiveFilter] = useState('all');

  
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'a' || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollProgress((winScroll / height) * 100);
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, { threshold: 0.1 });

    if (!isLoading) {
      setTimeout(() => {
        document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer.observe(el));
      }, 100);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;
    
    const roles = ["Web Developer", "UX/UI Designer", "Frontend Developer"];
    const timer = setTimeout(() => {
      const currentRole = roles[loopNum % roles.length];
      if (isDeleting) {
        setText(currentRole.substring(0, text.length - 1));
      } else {
        setText(currentRole.substring(0, text.length + 1));
      }
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1500); 
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, isLoading]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedProject]);

  // อัปเดตข้อมูลส่วนตัวจาก Resume ใหม่
  const personalInfo = {
    name: "วัชรพงษ์ เพ็ชรจันทรโท",
    nickname: "นนท์",
    role: "Web Developer",
    university: "มหาวิทยาลัยราชภัฏสงขลา",
    faculty: "คณะวิทยาศาสตร์และเทคโนโลยี",
    major: "สาขาเทคโนโลยีสารสนเทศและนวัตกรรมดิจิทัล",
    gpa: "2.95",
    coopPeriod: "1 กรกฎาคม - 30 ตุลาคม",
    about: "นักศึกษาที่สนใจด้าน Web Development และ UX/UI Design มีพื้นฐาน HTML/CSS และการออกแบบ UI ด้วย Figma พร้อมเรียนรู้ทักษะใหม่ ๆ และสนใจการพัฒนาเว็บไซต์ที่ใช้งานง่ายและตอบโจทย์ผู้ใช้งาน",
    email: "watchara123pong12@gmail.com",
    phone: "065-762-6832",
    location: "ตำบลคอกกระบือ อำเภอปะนาเระ จังหวัดปัตตานี 94130",
    linkedin: "linkedin.com/in/your-profile"
  };

  // อัปเดตทักษะจาก Resume ใหม่
  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "UX/UI Design", "Figma"],
    backend: ["PHP", "MySQL", "Node.js"],
    tools: ["Visual Studio Code", "Git / GitHub", "Photoshop"],
    softSkills: ["เรียนรู้ทักษะใหม่ๆ", "พัฒนาทักษะอยู่เสมอ", "ใส่ใจประสบการณ์ผู้ใช้งาน (UX)"]
  };

  const techStackMarquee = [...skills.frontend, ...skills.backend, ...skills.tools];

  const workProcess = [
    { icon: <Search className="w-6 h-6"/>, title: "1. Research & Plan", desc: "วิเคราะห์ความต้องการของผู้ใช้และวางโครงสร้าง User Flow" },
    { icon: <PenTool className="w-6 h-6"/>, title: "2. UI Design", desc: "ออกแบบ Wireframe และทำ UI ให้สวยงาม ใช้งานง่ายด้วย Figma" },
    { icon: <Monitor className="w-6 h-6"/>, title: "3. Development", desc: "เขียนโค้ดและพัฒนาเว็บไซต์ให้สามารถใช้งานได้จริง" },
    { icon: <CheckSquare className="w-6 h-6"/>, title: "4. Test & Fix", desc: "ทดสอบการทำงานของระบบเพื่อหาข้อผิดพลาดและแก้ไขให้สมบูรณ์" }
  ];

  // อัปเดตผลงานจาก Resume ใหม่
 const projects = [
  {
    title: "Webboard Project",
    category: "web",
    type: "Full-stack Development",
    description: "พัฒนาเว็บบอร์ดออนไลน์ด้วย HTML, CSS, JavaScript, Node.js และ MySQL รองรับระบบ Login/Register พร้อม JWT Authentication สามารถสร้างโพสต์ แสดงความคิดเห็น กด Like และ Bookmark ได้ พร้อมระบบ Admin Panel จัดการผู้ใช้และโพสต์",
    problem: "ต้องการสร้างพื้นที่พูดคุยและแลกเปลี่ยนความคิดเห็นออนไลน์ที่มีความปลอดภัยในการเข้าสู่ระบบ พร้อมระบบแจ้งเตือน Like/Comment และผู้ดูแลสามารถจัดการข้อมูลผู้ใช้และโพสต์ได้อย่างมีประสิทธิภาพ",
    solution: "พัฒนาด้วย Node.js + Express.js (Backend) และ MySQL (Database) โดยใช้ JWT Authentication พร้อมระบบ Upload รูปภาพผ่าน Cloudinary รองรับฟีเจอร์ Like, Bookmark, Comment, Notification และ Admin Panel ที่มีกราฟสถิติและระบบรายงาน",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&q=80&w=800",
    technologies: ["Node.js", "Express.js", "MySQL", "JWT", "JavaScript", "Cloudinary", "Bootstrap"],
    link: "#"
  },
  {
    title: "PHP User Management (Testing)",
    category: "web",
    type: "Web Application Testing",
    description: "ระบบจัดการผู้ใช้งานที่มีการทดสอบระบบสมัครสมาชิก, เข้าสู่ระบบ, จัดการโปรไฟล์ และ Role System ผ่านการทดสอบ Unit, Integration และ Functional Testing อย่างครอบคลุม",
    problem: "ต้องการระบบที่สามารถจัดการสิทธิ์การใช้งาน (Role: User/Admin) ของผู้ใช้งานในระดับต่างๆ และลดข้อผิดพลาดในการทำงานของระบบ (Bugs) ให้ได้มากที่สุดก่อน Deploy ขึ้น Production",
    solution: "พัฒนาระบบด้วย PHP และทดสอบการทำงานอย่างละเอียดครบทั้ง 3 ระดับ ได้แก่ Unit Testing, Integration Testing และ Functional Testing เพื่อให้มั่นใจในคุณภาพของระบบก่อนนำไปใช้งานจริง",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    technologies: ["PHP", "MySQL", "Unit Testing", "Integration Testing", "Functional Testing"],
    link: "#"
  },
  {
    title: "UX/UI Design Projects",
    category: "design",
    type: "UI Design & Prototyping",
    description: "ออกแบบ Wireframe และ User Flow รวมถึงการจัดวางเลย์เอาต์ (Layout) ของหน้าจอแอปพลิเคชันให้ตอบโจทย์ผู้ใช้งานและมีความสวยงามน่าใช้ โดยใช้หลักการ UX/UI Design",
    problem: "แอปพลิเคชันทั่วไปมักมีความซับซ้อนและจัดโครงสร้างข้อมูลไม่ดี ทำให้ผู้ใช้เกิดความสับสนระหว่างการใช้งานและได้ประสบการณ์ที่ไม่ดี",
    solution: "นำหลักการออกแบบ UX/UI มาวิเคราะห์ความต้องการผู้ใช้ สร้าง User Flow ที่ชัดเจน ออกแบบ Wireframe และพัฒนา UI ด้วย Figma เพื่อเป็นต้นแบบ (Prototype) ก่อนนำไปพัฒนาจริง",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    technologies: ["Figma", "User Flow", "Wireframing", "Prototyping", "Layout Design"],
    link: "#"
  }
];

 const certificates = [
  { title: "ผ่านการอบรม Basic UX/UI Design", issuer: "คณะวิทยาศาสตร์และเทคโนโลยี มรภ.สงขลา", year: "2567" },
  { title: "เข้าร่วมกิจกรรม Hackathon ระดับมหาวิทยาลัย", issuer: "คณะวิทยาศาสตร์และเทคโนโลยี", year: "2566" },
  { title: "ผ่านการทดสอบ Web Development (HTML/CSS/JS)", issuer: "คอร์สออนไลน์", year: "2566" }
];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

 

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center cursor-none">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-r-4 border-cyan-400 border-solid rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            N.
          </span>
        </div>
        <p className="mt-8 text-slate-400 text-sm font-semibold tracking-[0.3em] animate-pulse">
          LOADING EXPERIENCE
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-200 selection:text-indigo-900 overflow-x-hidden cursor-none">
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #6366f1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: #4f46e5; }
      `}</style>

      {/* Custom Cursor */}
      <div className={`hidden md:block fixed w-8 h-8 border-2 rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${isHovering ? 'border-indigo-500 bg-indigo-500/20 scale-150' : 'border-slate-400 scale-100'}`} style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} />
      <div className="hidden md:block fixed w-1.5 h-1.5 bg-indigo-600 rounded-full pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} />

      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-indigo-600 to-cyan-400 z-[60] transition-all duration-300 ease-out" style={{ width: `${scrollProgress}%` }}></div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="font-extrabold text-2xl tracking-tighter cursor-pointer" onClick={scrollToTop}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">Portfolio</span>
            </div>
            <div className="hidden md:flex space-x-1 p-1 bg-slate-100/50 rounded-full backdrop-blur-sm border border-slate-200/50">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === item ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-200/50'}`}
                >
                  {item === 'home' ? 'หน้าแรก' : item === 'about' ? 'ประวัติ' : item === 'skills' ? 'ทักษะ' : item === 'projects' ? 'ผลงาน' : 'ติดต่อ'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50/80 border border-indigo-100 text-indigo-700 rounded-full text-sm font-semibold backdrop-blur-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>กำลังมองหาโอกาสสหกิจศึกษา</span>
                </div>
                
                <div className="space-y-4">
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                    สวัสดีครับ, ผม <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
                      {personalInfo.nickname} {personalInfo.name.split(' ')[0]}
                    </span>
                  </h1>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-700 min-h-[40px] flex items-center justify-center lg:justify-start gap-2">
                    <span>I am a</span>
                    <span className="text-indigo-600">{text}</span>
                    <span className="w-1 h-8 bg-indigo-600 animate-pulse"></span>
                  </h2>
                </div>
                
                <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  {personalInfo.about}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <button onClick={() => scrollToSection('contact')} className="group px-8 py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-indigo-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2">
                    ติดต่อนัดสัมภาษณ์
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                 <div className="relative group/resume">
  <button className="group px-8 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:border-indigo-200 hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm">
    <Download className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
    โหลด Resume (PDF)
    <ChevronDown className="w-4 h-4 text-slate-400" />
  </button>
  <div className="absolute top-full mt-2 left-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover/resume:opacity-100 group-hover/resume:visible transition-all duration-200 z-50 w-full">
    <a href="/resume-web.pdf" download="Resume_WebDeveloper_Watcharapong.pdf"
      className="flex items-center gap-3 px-5 py-3 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-colors text-sm font-medium">
      💻 Web Developer
    </a>
    <a href="/resume-graphic.pdf" download="Resume_GraphicDesign_Watcharapong.pdf"
      className="flex items-center gap-3 px-5 py-3 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 transition-colors text-sm font-medium border-t border-slate-100">
      🎨 Graphic Design
    </a>
  </div>
</div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                  <div className="absolute inset-0 rounded-full border-2 border-indigo-100/50 scale-[1.05]"></div>
                  <div className="absolute inset-0 rounded-full border border-blue-100/50 scale-[1.12]"></div>
                  
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-indigo-900/10 z-10 group">
                    <img 
                      src="/non.png"
                      alt="Profile" 
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-indigo-900/10 mix-blend-overlay"></div>
                  </div>

                  <div className="absolute top-8 -left-6 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl shadow-slate-200/50 z-20 border border-white/20 animate-bounce" style={{ animationDuration: '3s' }}>
                    <Code2 className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600" />
                  </div>
                  <div className="absolute bottom-12 -right-4 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-xl shadow-slate-200/50 z-20 border border-white/20 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                    <div className="flex flex-col items-center">
                      <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{personalInfo.gpa}</span>
                      <span className="text-[10px] font-bold text-slate-500 tracking-wider">GPAX</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center text-slate-400 hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => scrollToSection('about')}>
            <span className="text-xs font-semibold tracking-widest uppercase mb-2">Scroll</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </section>

        {/* Tech Stack Marquee */}
        <section className="py-8 bg-indigo-600 border-y border-indigo-700 overflow-hidden relative z-20">
          <div className="animate-marquee flex items-center justify-around whitespace-nowrap">
            {[...techStackMarquee, ...techStackMarquee].map((tech, index) => (
              <div key={index} className="flex items-center mx-8 text-indigo-100/70 hover:text-white transition-colors cursor-default">
                <Sparkles className="w-4 h-4 mr-3" />
                <span className="text-xl font-bold tracking-widest uppercase">{tech}</span>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-20 bg-white reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-baseline mb-12">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">เกี่ยวกับฉัน</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-indigo-600 to-blue-400 rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-colors">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mb-6 text-indigo-600">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">โปรไฟล์ส่วนตัว</h3>
                <p className="text-slate-600 leading-relaxed text-lg mb-8">{personalInfo.about}</p>
                <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-semibold text-sm">พร้อมเริ่มงาน:</span> 
                  <span className="text-indigo-600 font-medium text-sm">{personalInfo.coopPeriod}</span>
                </div>
              </div>

              <div className="lg:col-span-2 bg-slate-900 text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full filter blur-[64px] group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10 mb-6 text-indigo-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-8">ประวัติการศึกษา</h3>
                  <div className="space-y-8">
                    <div className="relative pl-6 border-l border-indigo-500/30">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-400 ring-4 ring-slate-900"></div>
                      <h4 className="text-lg font-bold text-white leading-tight mb-1">{personalInfo.university}</h4>
                      <p className="text-indigo-300 text-sm font-medium mb-1">{personalInfo.major}</p>
                      <p className="text-slate-400 text-xs mb-3">{personalInfo.faculty}</p>
                      <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg text-xs font-semibold text-white border border-white/5">GPAX: {personalInfo.gpa}</span>
                    </div>
                    <div className="relative pl-6 border-l border-slate-700">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-600 ring-4 ring-slate-900"></div>
                      <h4 className="text-base font-bold text-slate-300 leading-tight mb-1">โรงเรียนวุฒิชัยวิทยา</h4>
                      <p className="text-slate-400 text-sm">แผนการเรียนศิลป์ทั่วไป (เกรดเฉลี่ย 2.84)</p>
                      <p className="text-slate-500 text-xs mt-1">พ.ศ. 2560 - 2566</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-y border-slate-200/50 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">ทักษะและความถนัด</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">เครื่องมือและเทคโนโลยีที่ผมเชี่ยวชาญ พร้อมนำไปประยุกต์ใช้ในการทำงานจริง</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Frontend & UX/UI */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl"><Code2 className="w-5 h-5" /></div>
                  <h3 className="text-xl font-bold text-slate-800">UX/UI & Frontend</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.frontend.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-slate-50 border border-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-default">{skill}</span>
                  ))}
                </div>
              </div>
              {/* Backend */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl"><Sparkles className="w-5 h-5" /></div>
                  <h3 className="text-xl font-bold text-slate-800">Backend & Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {skills.backend.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-slate-50 border border-slate-100 text-slate-700 rounded-xl text-sm font-medium hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-colors cursor-default">{skill}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {skills.tools.map((skill, index) => (
                    <span key={index} className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-medium">{skill}</span>
                  ))}
                </div>
              </div>
              {/* Soft Skills */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200/60 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl"><User className="w-5 h-5" /></div>
                  <h3 className="text-xl font-bold text-slate-800">Soft Skills</h3>
                </div>
                <div className="space-y-4">
                  {skills.softSkills.map((skill, index) => (
                    <div key={index} className="flex items-center group">
                      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mr-4 group-hover:bg-teal-50 group-hover:border-teal-200 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-slate-300 group-hover:bg-teal-500 transition-colors"></div>
                      </div>
                      <span className="text-slate-700 font-medium group-hover:text-slate-900">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Working Process Section */}
        <section id="process" className="py-24 bg-white px-4 sm:px-6 lg:px-8 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">กระบวนการทำงาน</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">การทำงานที่เป็นระบบคือหัวใจสำคัญในการสร้างสรรค์ประสบการณ์ที่ดีให้ผู้ใช้งาน</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {workProcess.map((step, index) => (
                <div key={index} className="relative bg-slate-50 rounded-3xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-slate-100 group">
                  <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{step.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-slate-50 px-4 sm:px-6 lg:px-8 border-y border-slate-200/50 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">ผลงานที่โดดเด่น</h2>
                <p className="text-slate-500 max-w-xl mb-6">รวมโปรเจกต์ที่แสดงศักยภาพทางด้านการออกแบบและการเขียนโปรแกรม</p>
                
                <div className="flex gap-2 p-1 bg-white rounded-xl overflow-x-auto border border-slate-200/60 inline-flex shadow-sm">
                  {[
                    { id: 'all', label: 'ทั้งหมด' },
                    { id: 'web', label: 'Web Developer' },
                    { id: 'design', label: 'UX/UI & Media' }
                  ].map(filter => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-5 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                        activeFilter === filter.id 
                        ? 'bg-slate-900 text-white shadow-sm' 
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div key={index} className="group flex flex-col bg-white border border-slate-200/60 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-1 animate-in fade-in zoom-in duration-300">
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-xs font-bold text-slate-800 shadow-sm border border-white/50">{project.type}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col p-6 sm:p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                    <p className="text-slate-600 text-sm mb-6 flex-1 leading-relaxed line-clamp-2">{project.description}</p>
                    
                    <div className="space-y-6 mt-auto">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">{tech}</span>
                        ))}
                      </div>
                      <div className="pt-6 border-t border-slate-100">
                        <button 
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors group/link"
                        >
                          ดูรายละเอียดโปรเจกต์ <ArrowRight className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificates & Activities Section */}
        <section id="certificates" className="py-24 bg-white px-4 sm:px-6 lg:px-8 reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out delay-100">
          <div className="max-w-6xl mx-auto">
             <div className="flex flex-col md:flex-row gap-4 items-baseline mb-12">
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">เกียรติบัตรและกิจกรรม</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"></div>
            </div>

            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-indigo-50 hover:border-indigo-100 transition-colors group">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200 text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">{cert.title}</h4>
                      <p className="text-sm text-slate-500">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 group-hover:border-indigo-200 group-hover:text-indigo-600">
                    ปี {cert.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-slate-950 text-white relative overflow-hidden reveal-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full bg-indigo-600/10 blur-[100px]"></div>
             <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] rounded-full bg-blue-600/10 blur-[100px]"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <div>
                  <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">พร้อมร่วมงานกับทีมคุณ</h2>
                  <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                    หากบริษัทของคุณกำลังมองหานักศึกษาสหกิจที่พร้อมลุยงานจริง เรียนรู้ไว และมุ่งมั่นสร้างผลลัพธ์ที่ดี ติดต่อผมได้ทันทีครับ
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="group flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                    <div className="w-14 h-14 bg-white/5 flex items-center justify-center rounded-2xl text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300"><Mail className="w-6 h-6" /></div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1">ส่งอีเมลหาผม</p>
                      <a href={`mailto:${personalInfo.email}`} className="text-xl font-semibold text-slate-200 hover:text-white transition-colors">{personalInfo.email}</a>
                    </div>
                  </div>
                  
                  <div className="group flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                    <div className="w-14 h-14 bg-white/5 flex items-center justify-center rounded-2xl text-blue-400 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300"><Phone className="w-6 h-6" /></div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1">โทรศัพท์</p>
                      <a href={`tel:${personalInfo.phone}`} className="text-xl font-semibold text-slate-200 hover:text-white transition-colors">{personalInfo.phone}</a>
                    </div>
                  </div>

                  <div className="group flex items-center gap-5 p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
                    <div className="w-14 h-14 bg-white/5 flex items-center justify-center rounded-2xl text-teal-400 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300"><MapPin className="w-6 h-6" /></div>
                    <div>
                      <p className="text-slate-500 text-sm font-medium mb-1">ที่อยู่ปัจจุบัน</p>
                      <p className="text-base font-medium text-slate-300">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>


             
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal (Pop-up) โชว์รายละเอียด Project */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedProject(null)}></div>
          
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-64 md:h-full relative bg-slate-100">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
              
              <div className="p-8 sm:p-10 flex flex-col">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold w-fit mb-4 uppercase tracking-wider">
                  {selectedProject.type}
                </span>
                
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{selectedProject.title}</h2>
                <p className="text-slate-600 mb-8">{selectedProject.description}</p>
                
                <div className="space-y-6 flex-1">
                  <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
                    <h3 className="font-bold text-rose-800 flex items-center gap-2 mb-2">
                      <Search className="w-5 h-5" /> ปัญหาที่พบ (Problem)
                    </h3>
                    <p className="text-rose-700/80 text-sm leading-relaxed">{selectedProject.problem}</p>
                  </div>
                  
                  <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
                    <h3 className="font-bold text-emerald-800 flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5" /> วิธีการแก้ไข (Solution)
                    </h3>
                    <p className="text-emerald-700/80 text-sm leading-relaxed">{selectedProject.solution}</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800 mb-3">เครื่องมือที่ใช้:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-200">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top */}
      <button onClick={scrollToTop} className={`fixed bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-full shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 z-50 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
        <ArrowUp className="w-6 h-6" />
      </button>

      {/* Footer */}
      <footer className="bg-slate-950 py-8 text-center border-t border-white/10 relative z-20">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm font-medium">© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <span>Built for Cooperative Education Application</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}