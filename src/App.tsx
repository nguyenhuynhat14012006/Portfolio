import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// --- Reusable Components ---

const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "" }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Magnet = ({ children, padding = 150, strength = 3, activeTransition = "transform 0.3s ease-out", inactiveTransition = "transform 0.6s ease-in-out", className = "" }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Check if within padding
    const distanceX = Math.abs(e.clientX - centerX);
    const distanceY = Math.abs(e.clientY - centerY);
    
    if (distanceX < (width / 2 + padding) && distanceY < (height / 2 + padding)) {
      setIsHovered(true);
      setPosition({
        x: (e.clientX - centerX) / strength,
        y: (e.clientY - centerY) / strength,
      });
    } else {
      setIsHovered(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove as any);
    return () => window.removeEventListener('mousemove', handleMouseMove as any);
  }, []);

  return (
    <div
      ref={ref}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isHovered ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
};

const AnimatedText = ({ text, className = "" }: { text: string; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(" ");
  let charIndex = 0;

  return (
    <p ref={ref} className={`relative flex flex-wrap justify-center ${className}`}>
      {words.map((word, wIdx) => {
        const wordChars = word.split('');
        const wordElement = (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.3em]">
            {wordChars.map((char, cIdx) => {
              const start = charIndex / text.length;
              const end = (charIndex + 1) / text.length;
              const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
              charIndex++;
              return (
                <span key={cIdx} className="relative inline-block">
                  <span className="invisible">{char}</span>
                  <motion.span className="absolute top-0 left-0" style={{ opacity }}>
                    {char}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
        charIndex++; // Account for the space character
        return wordElement;
      })}
    </p>
  );
};

const ContactButton = () => (
  <a 
    href="#lien-he"
    className="inline-block rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base outline-none hover:opacity-90 transition-opacity cursor-pointer"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
      outline: '2px solid white',
      outlineOffset: '-3px'
    }}
  >
    Liên hệ
  </a>
);

const LiveProjectButton = () => (
  <button className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors">
    Live Project
  </button>
);

// --- Sections ---

const Navbar = () => {
  const navItems = [
    { name: "Giới thiệu", id: "gioi-thieu" },
    { name: "Học vấn & Kỹ năng", id: "hoc-van" },
    { name: "Dự án", id: "du-an" },
    { name: "Hoạt động & Kinh nghiệm", id: "hoat-dong" },
    { name: "Liên hệ", id: "lien-he" }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-[9999] bg-[#0C0C0C]/90 backdrop-blur-md pointer-events-auto shadow-sm">
      <FadeIn delay={0} y={-20} className="w-full">
        <nav className="flex justify-between items-center px-6 md:px-10 py-5 md:py-6 w-full">
          {navItems.map((item, idx) => (
            <a key={idx} href={`#${item.id}`} className="text-[#D7E2EA] font-medium uppercase tracking-wider text-[10px] sm:text-sm md:text-lg lg:text-[1.4rem] hover:opacity-100 opacity-70 transition-opacity duration-200 cursor-pointer pointer-events-auto">
              {item.name}
            </a>
          ))}
        </nav>
      </FadeIn>
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="h-screen flex flex-col overflow-x-clip relative">
      {/* Spacer to replace nav height in flex layout */}
      <div className="h-[80px] md:h-[100px] shrink-0" />

      <div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40} className="w-full text-center z-20">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            Hi, i'm huy
          </h1>
        </FadeIn>
      </div>

      <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none">
        <Magnet padding={150} strength={3} className="pointer-events-auto">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" alt="Huy Nhat Portrait" className="w-full h-auto" />
        </Magnet>
      </FadeIn>

      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 w-full z-20 absolute bottom-0">
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
            Sinh viên Kinh tế đối ngoại, hướng tới vị trí chuyên viên logistics.
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

const MarqueeSection = () => {
  const [scrollPos, setScrollPos] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const top = sectionRef.current.offsetTop;
        const offset = (window.scrollY - top + window.innerHeight) * 0.3;
        setScrollPos(offset);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const imagesRow1 = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  ];

  const imagesRow2 = [
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
  ];

  const repeatedRow1 = [...imagesRow1, ...imagesRow1, ...imagesRow1];
  const repeatedRow2 = [...imagesRow2, ...imagesRow2, ...imagesRow2];

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3 will-change-transform" style={{ transform: `translateX(${scrollPos - 200}px)` }}>
          {repeatedRow1.map((src, i) => (
            <img key={`r1-${i}`} src={src} loading="lazy" className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" alt="Work demo" />
          ))}
        </div>
        <div className="flex gap-3 will-change-transform" style={{ transform: `translateX(${-(scrollPos - 200)}px)` }}>
          {repeatedRow2.map((src, i) => (
            <img key={`r2-${i}`} src={src} loading="lazy" className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" alt="Work demo" />
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section className="min-h-screen relative flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
      
      {/* 3D Decorative Assets */}
      <FadeIn delay={0.1} x={-80} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" className="w-[120px] sm:w-[160px] md:w-[210px]" alt="Moon" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" className="w-[100px] sm:w-[140px] md:w-[180px]" alt="3D Object" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" className="w-[120px] sm:w-[160px] md:w-[210px]" alt="Lego" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]">
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" className="w-[130px] sm:w-[170px] md:w-[220px]" alt="Group" />
      </FadeIn>

      <div className="z-10 flex flex-col items-center">
        <FadeIn delay={0} y={40} className="mb-10 sm:mb-14 md:mb-16 text-center">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">About me</h2>
        </FadeIn>

        {/* Candidate Profile Element */}
        <FadeIn delay={0.2} y={30} className="mb-12">
          <div className="bg-[#151515]/80 backdrop-blur-md border border-[#D7E2EA]/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 max-w-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#7621B0]/20 to-transparent opacity-30"></div>
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#D7E2EA]/50 shrink-0 relative z-10">
               <img src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" className="w-full h-full object-cover scale-150 origin-top" alt="Huy Nhat" />
            </div>
            <div className="text-center sm:text-left relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#D7E2EA] mb-2 uppercase tracking-wide">Huy Nhật</h3>
              <p className="text-[#D7E2EA]/70 text-sm sm:text-base font-light mb-3">Hồ sơ ứng viên | Sinh viên Kinh tế đối ngoại</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-3 py-1 bg-[#D7E2EA]/10 rounded-full text-xs text-[#D7E2EA]">Logistics</span>
                <span className="px-3 py-1 bg-[#D7E2EA]/10 rounded-full text-xs text-[#D7E2EA]">Quản lý chuỗi cung ứng</span>
                <span className="px-3 py-1 bg-[#D7E2EA]/10 rounded-full text-xs text-[#D7E2EA]">Phân tích dữ liệu</span>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mb-16 sm:mb-20 md:mb-24">
          <AnimatedText 
            text="Tôi là sinh viên Kinh tế đối ngoại với đam mê cháy bỏng dành cho lĩnh vực Logistics và Chuỗi cung ứng. Tôi tập trung vào việc học hỏi và phát triển kỹ năng để trở thành một chuyên viên xuất sắc, sẵn sàng giải quyết những bài toán phức tạp trong môi trường làm việc thực tế."
            className="text-[#D7E2EA] font-medium leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)] text-center"
          />
        </div>

        <FadeIn delay={0.4} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const sectionsData = [
    {
      id: "gioi-thieu",
      title: "GIỚI THIỆU",
      content: (
        <div className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-80 space-y-3">
          <p>Xin chào, mình là Huy Nhật, sinh viên năm 3 chuyên ngành Kinh tế đối ngoại tại Đại học Ngoại thương. Mình có nền tảng về thương mại quốc tế và xuất nhập khẩu, và đang hướng tới vị trí chuyên viên logistics. Mình làm tốt ba việc: quản lý đội ngũ với vai trò chủ tịch câu lạc bộ, đọc và làm việc với tài liệu bằng tiếng Anh, và dùng Excel để xử lý số liệu.</p>
        </div>
      )
    },
    {
      id: "hoc-van",
      title: "HỌC VẤN VÀ KỸ NĂNG",
      content: (
        <div className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-80 space-y-3">
          <p>Đại học Ngoại thương, chuyên ngành Kinh tế đối ngoại, dự kiến tốt nghiệp 2028.</p>
          <p>Kỹ năng: IELTS 7.5 Overall; Microsoft Office Specialist (MOS) Excel, xử lý số liệu; quản lý đội nhóm, tổ chức sự kiện; chứng từ xuất nhập khẩu.</p>
        </div>
      )
    },
    {
      id: "du-an",
      title: "DỰ ÁN",
      content: (
        <div className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-80 space-y-3">
          <p>Phân tích hợp đồng xuất khẩu cà phê Robusta từ Việt Nam sang Nga. Môn Giao dịch thương mại quốc tế, nhóm trưởng, nhóm 6 thành viên.</p>
          <p>Nhóm phân tích một hợp đồng xuất khẩu thực tế: cà phê nhân Robusta S18 loại 1 đánh bóng, giao từ TP. Hồ Chí Minh đến cảng cá Vladivostok (Nga) theo điều kiện CIF Incoterms 2020, thanh toán bằng T/T. Báo cáo gồm bốn phần: cơ sở lý thuyết về hợp đồng mua bán quốc tế; phân tích hợp đồng và phụ lục, kèm đánh giá điểm mạnh, điểm yếu và đề xuất; phân tích bộ chứng từ (Commercial Invoice, Packing List, Bill of Lading, C/O mẫu EAV, giấy chứng nhận khử trùng, kiểm dịch thực vật, bảo hiểm hàng hải, giám định SGS); và quy trình thực hiện xuất khẩu. Với vai trò nhóm trưởng, tôi phân công công việc, theo dõi tiến độ và tổng hợp báo cáo cuối cùng. Báo cáo viết hoàn toàn bằng tiếng Anh.</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {['CIF', 'T/T', 'C/O form EAV', 'SGS', 'Chứng từ xuất khẩu'].map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-[#0C0C0C]/5 rounded-full text-xs font-medium text-[#0C0C0C] border border-[#0C0C0C]/10">{tag}</span>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "hoat-dong",
      title: "HOẠT ĐỘNG VÀ KINH NGHIỆM",
      content: (
        <ul className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-80 space-y-3 list-disc pl-5">
          <li>Học việc tại văn phòng chứng từ, công ty xuất nhập khẩu máy lọc nước Nhật Bản, tháng 3 đến tháng 5/2026.</li>
          <li>Chủ tịch Câu lạc bộ Kỹ năng sống LSC FTU, Đại học Ngoại thương, 2025 đến 2026. Điều hành 50 thành viên, phụ trách tổ chức sự kiện, cuộc thi và hoạt động tình nguyện.</li>
          <li>Học việc chăm sóc khách hàng tại một ngân hàng tư nhân, tháng 6 đến tháng 8/2026.</li>
        </ul>
      )
    },
    {
      id: "lien-he",
      title: "LIÊN HỆ",
      content: (
        <div className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-80 space-y-3">
          <p>
            <span className="font-medium">Email:</span>{' '}
            <a href="mailto:nhatnh17.lsc@gmail.com" className="hover:underline transition-colors hover:text-[#B600A8]">
              nhatnh17.lsc@gmail.com
            </a>
          </p>
          <p>
            <span className="font-medium">LinkedIn:</span>{' '}
            <a href="https://www.linkedin.com/in/nhật-nguyễn-huy-002084431/" target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors hover:text-[#B600A8] break-all">
              https://www.linkedin.com/in/nhật-nguyễn-huy-002084431/
            </a>
          </p>
        </div>
      )
    }
  ];

  return (
    <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <FadeIn y={30} className="mb-16 sm:mb-20 md:mb-28 text-center">
        <h2 className="text-[#0C0C0C] font-black uppercase text-[clamp(3rem,12vw,160px)]">Tiềm Năng</h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto flex flex-col">
        {sectionsData.map((item, index) => {
          const num = String(index + 1).padStart(2, '0');
          return (
            <FadeIn key={index} delay={index * 0.1} y={20}>
              <div id={item.id} className="flex flex-col sm:flex-row gap-6 sm:gap-10 border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 items-start sm:items-center">
                <div className="font-black text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] leading-none w-24 sm:w-32 md:w-48 shrink-0">
                  {num}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] text-[#0C0C0C] mb-4">{item.title}</h3>
                  {item.content}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
};

// Removed LiveProjectButton since it's unused.

const ProjectCard = ({ project, index, totalCards, scrollYProgress }: any) => {
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  
  const scale = useTransform(
    scrollYProgress,
    [index / totalCards, 1],
    [1, targetScale]
  );

  return (
    <motion.div 
      className="sticky top-24 md:top-32 w-full max-w-6xl mx-auto h-[auto] min-h-[60vh] origin-top"
      style={{
        scale,
        top: `calc(6rem + ${index * 28}px)`
      }}
    >
      <div className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-6 sm:p-8 md:p-12 flex flex-col">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/10 pb-8">
          <div className="flex items-center gap-6 sm:gap-8">
            <span className="font-black text-[#D7E2EA] text-[clamp(4rem,10vw,120px)] leading-none">{project.num}</span>
            <div>
              <p className="text-[#D7E2EA]/60 uppercase text-sm sm:text-base tracking-wider mb-2">{project.category}</p>
              <h3 className="text-[#D7E2EA] font-medium uppercase text-2xl sm:text-3xl md:text-5xl max-w-4xl leading-snug">{project.title}</h3>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center py-4">
          <p className="text-[#D7E2EA]/90 font-light text-[clamp(1rem,1.8vw,1.4rem)] leading-relaxed max-w-5xl mb-10">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {project.tags.map((tag: string, i: number) => (
              <span key={i} className="px-4 py-2 bg-[#D7E2EA]/10 rounded-full text-sm sm:text-base font-medium text-[#D7E2EA] border border-[#D7E2EA]/20">
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const projects = [
    {
      num: "01",
      category: "MÔN GIAO DỊCH THƯƠNG MẠI QUỐC TẾ",
      title: "PHÂN TÍCH HỢP ĐỒNG XUẤT KHẨU CÀ PHÊ ROBUSTA VIỆT NAM - NGA",
      description: "Nhóm trưởng, nhóm 6 thành viên. Nhóm phân tích một hợp đồng xuất khẩu thực tế: cà phê nhân Robusta S18 loại 1 đánh bóng, giao từ TP. Hồ Chí Minh đến cảng cá Vladivostok (Nga) theo điều kiện CIF Incoterms 2020, thanh toán bằng T/T. Báo cáo gồm bốn phần: cơ sở lý thuyết về hợp đồng mua bán quốc tế; phân tích hợp đồng và phụ lục, kèm đánh giá điểm mạnh, điểm yếu và đề xuất; phân tích bộ chứng từ (Commercial Invoice, Packing List, Bill of Lading, C/O mẫu EAV, giấy chứng nhận khử trùng, kiểm dịch thực vật, bảo hiểm hàng hải, giám định SGS); và quy trình thực hiện xuất khẩu. Với vai trò nhóm trưởng, tôi phân công công việc, theo dõi tiến độ và tổng hợp báo cáo cuối cùng. Báo cáo viết hoàn toàn bằng tiếng Anh.",
      tags: ["CIF", "T/T", "C/O form EAV", "SGS", "Chứng từ xuất khẩu"]
    }
  ];

  return (
    <section className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 relative pb-32">
      <div className="pt-20 sm:pt-24 md:pt-32 mb-16 text-center">
        <h2 className="hero-heading font-black uppercase text-[clamp(3rem,12vw,160px)]">Dự Án</h2>
      </div>

      <div ref={containerRef} className="relative w-full px-5 sm:px-8 md:px-10" style={{ height: `${projects.length * 100}vh` }}>
        <div className="sticky top-0 h-screen flex flex-col items-center pt-10">
          {projects.map((proj, i) => (
            <ProjectCard 
              key={i} 
              project={proj} 
              index={i} 
              totalCards={projects.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="bg-[#0C0C0C] min-h-screen relative">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  );
}
