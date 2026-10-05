import { useRef, type MouseEvent, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { Ship, Plane, Truck, Package, Anchor, Globe } from 'lucide-react';
import avatar from './avatar.jpg';

const goTo = (id: string) => (e: MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

// --- Hiệu ứng nền Ambient Glow (Ánh sáng môi trường) ---
const AmbientGlow = ({ color = 'from-[#7621B0] to-[#B600A8]', className = '' }: { color?: string; className?: string }) => (
  <motion.div
    animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2], rotate: [0, 45, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    className={`absolute pointer-events-none rounded-full blur-[100px] bg-gradient-to-tr ${color} ${className}`}
  />
);

const FadeIn = ({ children, delay = 0, y = 30, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '50px', amount: 0 }}
    transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const Word = ({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }} className="inline-block mr-[0.3em]">{word}</motion.span>;
};

const AnimatedText = ({ text, className = '' }: { text: string; className?: string }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const words = text.split(' ');
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
};

// --- Icon bay lơ lửng có phản hồi Hover ---
const Float = ({ icon, className, delay = 0 }: { icon: ReactNode; className: string; delay?: number }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute z-0 text-[#D7E2EA]/25 cursor-pointer hover:text-[#B600A8]/80 transition-colors ${className}`}
      animate={reduce ? undefined : { y: [0, -18, 0], rotate: [-5, 5, -5] }}
      whileHover={{ scale: 1.3, rotate: 15 }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {icon}
    </motion.div>
  );
};

// --- Tiến độ cuộn trang (Máy bay & Xe tải) ---
const ScrollTravel = () => {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const left = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  return (
    <div className="pointer-events-none fixed inset-0 z-40 mix-blend-difference text-white">
      <div className="hidden md:block absolute right-4 top-28 bottom-12 border-l border-dashed border-white/40">
        <motion.div style={{ top }} className="absolute -left-[11px] rotate-[135deg]">
          <Plane size={22} />
        </motion.div>
      </div>
      <div className="absolute inset-x-6 bottom-2 border-t border-dashed border-white/40">
        <motion.div style={{ left }} className="absolute -top-[22px] -translate-x-1/2">
          <Truck size={24} />
        </motion.div>
      </div>
    </div>
  );
};

const TitleIcon = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <motion.span
    initial={{ scale: 0, rotate: -45 }}
    whileInView={{ scale: 1, rotate: 0 }}
    viewport={{ once: true }}
    whileHover={{ rotate: 180, scale: 1.15 }}
    transition={{ type: 'spring', stiffness: 200, damping: 12 }}
    className={`inline-flex items-center justify-center w-9 h-9 rounded-full mr-3 align-middle shrink-0 cursor-pointer ${
      dark ? 'bg-[#D7E2EA]/10 text-[#D7E2EA]' : 'bg-[#0C0C0C]/5 text-[#0C0C0C]'
    }`}
  >
    {children}
  </motion.span>
);

const BigTitle = ({ icon, children }: { icon: ReactNode; children: ReactNode }) => (
  <div className="flex flex-col items-center gap-4 text-center">
    <TitleIcon dark>{icon}</TitleIcon>
    <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">{children}</h2>
  </div>
);

const ContactButton = () => (
  <motion.a
    href="#lien-he"
    onClick={goTo('lien-he')}
    whileHover={{ scale: 1.05, boxShadow: '0px 8px 25px rgba(181, 1, 167, 0.5)' }}
    whileTap={{ scale: 0.95 }}
    className="inline-block rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base transition-all cursor-pointer"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
      outline: '2px solid white',
      outlineOffset: '-3px',
    }}
  >
    Liên hệ
  </motion.a>
);

const Navbar = () => {
  const items = [
    { name: 'Giới thiệu', id: 'gioi-thieu' },
    { name: 'Học vấn & Kỹ năng', id: 'hoc-van' },
    { name: 'Hoạt động & Kinh nghiệm', id: 'hoat-dong' },
    { name: 'Liên hệ', id: 'lien-he' },
    { name: 'Dự án', id: 'du-an' },
  ];
  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-[#0C0C0C]/80 backdrop-blur-lg flex justify-between items-center px-6 md:px-10 py-5 md:py-6 border-b border-white/5">
      {items.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          onClick={goTo(it.id)}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-[10px] sm:text-sm md:text-lg lg:text-[1.4rem] opacity-70 hover:opacity-100 hover:text-[#B600A8] transition-all cursor-pointer"
        >
          {it.name}
        </a>
      ))}
    </nav>
  );
};

const HeroSection = () => (
  <section className="h-screen flex flex-col relative overflow-hidden bg-[#0C0C0C]">
    <AmbientGlow className="top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px]" />

    <Float icon={<Ship size={72} />} className="top-[22%] left-[6%]" />
    <Float icon={<Plane size={64} />} className="top-[18%] right-[8%]" delay={1} />
    <Float icon={<Package size={56} />} className="top-[52%] left-[14%]" delay={2} />
    <Float icon={<Truck size={64} />} className="top-[50%] right-[14%]" delay={3} />
    <Float icon={<Globe size={52} />} className="top-[70%] left-[4%]" delay={4} />
    <Float icon={<Anchor size={52} />} className="top-[68%] right-[5%]" delay={5} />

    <div className="flex-1 flex flex-col justify-center items-center pt-16">
      <FadeIn delay={0.15} y={40} className="w-full text-center relative z-20">
        <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
          Huy Nhật
        </h1>
      </FadeIn>
    </div>

    {/* Frame Avatar với quầng sáng phát sáng & Zoom interactive */}
    <FadeIn delay={0.5} y={30} className="absolute left-1/2 -translate-x-1/2 z-10 bottom-24 sm:bottom-0 w-[190px] sm:w-[250px] md:w-[300px] group">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#B600A8] via-[#7621B0] to-[#BE4C00] rounded-t-[42px] blur-lg opacity-40 group-hover:opacity-100 transition duration-700 group-hover:duration-200" />
        <motion.div whileHover={{ scale: 1.04 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="relative overflow-hidden rounded-t-[40px]">
          <img src={avatar} alt="Huy Nhật" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
        </motion.div>
      </div>
    </FadeIn>

    <div className="flex justify-between items-end pb-10 sm:pb-12 px-6 md:px-10 w-full z-20 absolute bottom-0">
      <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
        Sinh viên Kinh tế đối ngoại, hướng tới vị trí chuyên viên logistics.
      </p>
      <ContactButton />
    </div>
  </section>
);

const AboutSection = () => (
  <section id="gioi-thieu" className="scroll-mt-24 relative flex flex-col items-center px-5 sm:px-8 md:px-10 py-24 bg-[#0C0C0C] overflow-hidden">
    <AmbientGlow color="from-[#7621B0]/20 to-blue-600/20" className="bottom-10 right-10 w-[400px] h-[400px]" />
    
    <FadeIn className="mb-12">
      <BigTitle icon={<Globe size={20} />}>Giới thiệu</BigTitle>
    </FadeIn>
    
    <FadeIn delay={0.2} className="mb-12 w-full max-w-2xl">
      <motion.div 
        whileHover={{ y: -5, borderColor: 'rgba(215, 226, 234, 0.4)' }}
        className="bg-[#151515]/80 backdrop-blur-md border border-[#D7E2EA]/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 shadow-2xl transition-all"
      >
        <motion.div 
          whileHover={{ scale: 1.08, rotate: 3 }}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#D7E2EA]/50 shrink-0 shadow-lg relative group cursor-pointer"
        >
          <img src={avatar} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" alt="Huy Nhật" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#B600A8]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
        
        <div className="text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#D7E2EA] mb-2 uppercase tracking-wide">Huy Nhật</h3>
          <p className="text-[#D7E2EA]/70 text-sm sm:text-base font-light mb-3">Đại học Ngoại thương | Kinh tế đối ngoại | Dự kiến tốt nghiệp 2028</p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {['Logistics', 'Xuất nhập khẩu', 'IELTS 7.5', 'MOS Excel'].map((t) => (
              <motion.span 
                key={t} 
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(182, 0, 168, 0.3)' }}
                className="px-3 py-1 bg-[#D7E2EA]/10 rounded-full text-xs text-[#D7E2EA] border border-white/5 transition-colors cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </FadeIn>

    <AnimatedText
      text="Xin chào, mình là Huy Nhật, sinh viên năm 3 chuyên ngành Kinh tế đối ngoại tại Đại học Ngoại thương. Mình có nền tảng về thương mại quốc tế và xuất nhập khẩu, và đang hướng tới vị trí chuyên viên logistics. Mình làm tốt ba việc: quản lý đội ngũ với vai trò chủ tịch câu lạc bộ, đọc và làm việc với tài liệu bằng tiếng Anh, và dùng Excel để xử lý số liệu. Mình từng dẫn dắt chương trình gây quỹ huy động 70 triệu đồng cho 100 em nhỏ vùng cao."
      className="text-[#D7E2EA] font-medium leading-relaxed max-w-[620px] text-[clamp(1rem,2vw,1.35rem)] text-center mb-16"
    />
    <ContactButton />
  </section>
);

const Row = ({ id, num, title, icon, children }: { id: string; num: string; title: string; icon: ReactNode; children: ReactNode }) => (
  <FadeIn y={20}>
    <div id={id} className="scroll-mt-24 flex flex-col sm:flex-row gap-6 sm:gap-10 border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 items-start group">
      <motion.div 
        whileHover={{ scale: 1.05, x: 5 }}
        className="font-black text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] leading-none w-24 sm:w-32 md:w-48 shrink-0 transition-transform"
      >
        {num}
      </motion.div>
      <div className="flex flex-col">
        <h3 className="flex items-center font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] text-[#0C0C0C] mb-4">
          <TitleIcon>{icon}</TitleIcon>
          {title}
        </h3>
        <div className="font-light leading-relaxed max-w-2xl text-[clamp(0.95rem,1.6vw,1.25rem)] text-[#0C0C0C]/80 space-y-3">{children}</div>
      </div>
    </div>
  </FadeIn>
);

const ProfileSection = () => (
  <section className="relative bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-16 pb-24 pr-8 md:pr-14 shadow-2xl">
    <div className="max-w-5xl mx-auto">
      <Row id="hoc-van" num="01" title="Học vấn và kỹ năng" icon={<Package size={20} />}>
        <p>Đại học Ngoại thương, chuyên ngành Kinh tế đối ngoại, dự kiến tốt nghiệp 2028.</p>
        <p><span className="font-medium">Thành thạo:</span> Excel, gồm các hàm, pivot table và xử lý số liệu (có chứng chỉ MOS Excel). Tiếng Anh, IELTS 7.5 Overall. Quản lý đội nhóm và tổ chức sự kiện. Chứng từ xuất nhập khẩu.</p>
        <p><span className="font-medium">Đang hoàn thiện:</span> Chứng chỉ Google Data Analytics.</p>
      </Row>
      <Row id="muc-tieu" num="02" title="Mục tiêu nghề nghiệp" icon={<Ship size={20} />}>
        <p>Mình muốn phát triển ở vị trí Pricing Executive tại công ty forwarder. Mình sẽ dùng nền tảng xuất nhập khẩu, tiếng Anh và Excel để làm việc với bảng giá cước và báo giá, đồng thời học thêm phân tích dữ liệu để theo dõi và so sánh giá tốt hơn.</p>
      </Row>
      <Row id="hoat-dong" num="03" title="Hoạt động và kinh nghiệm" icon={<Truck size={20} />}>
        <ul className="list-disc pl-5 space-y-3">
          <li>Học việc tại văn phòng chứng từ, công ty xuất nhập khẩu máy lọc nước Nhật Bản, tháng 3 đến tháng 5/2026.</li>
          <li>Chủ tịch Câu lạc bộ Kỹ năng sống LSC FTU, Đại học Ngoại thương, 2025 đến 2026. Điều hành 50 thành viên, phụ trách tổ chức sự kiện, cuộc thi và hoạt động tình nguyện.</li>
          <li>Học việc chăm sóc khách hàng tại một ngân hàng tư nhân, tháng 6 đến tháng 8/2026.</li>
        </ul>
      </Row>
      <Row id="lien-he" num="04" title="Liên hệ" icon={<Plane size={20} />}>
        <p>
          <span className="font-medium">Email:</span>{' '}
          <a href="mailto:nhatnh17.lsc@gmail.com" className="underline hover:text-[#B600A8] transition-colors">nhatnh17.lsc@gmail.com</a>
        </p>
        <p>
          <span className="font-medium">LinkedIn:</span>{' '}
          <a href="https://www.linkedin.com/in/nh%E1%BA%ADt-nguy%E1%BB%85n-huy-002084431/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#B600A8] break-all transition-colors">
            linkedin.com/in/nhật-nguyễn-huy
          </a>
        </p>
      </Row>
    </div>
  </section>
);

const projects = [
  {
    num: '01',
    category: 'Câu lạc bộ Kỹ năng sống LSC FTU | 2025',
    title: 'Chương trình gây quỹ "Tết đỏ cho em"',
    description:
      'Trưởng chương trình. Mình là trưởng chương trình gây quỹ "Tết đỏ cho em" của câu lạc bộ, huy động được 70 triệu đồng để hỗ trợ 100 em nhỏ mẫu giáo tại Tuyên Quang có một cái Tết ấm no. Mình trực tiếp lên kế hoạch cho chương trình, làm việc và đại diện câu lạc bộ trao đổi với các bên liên quan để giữ cả chương trình đi đúng tiến độ đến ngày trao quà.',
    tags: ['Lãnh đạo dự án', 'Lập kế hoạch', 'Gây quỹ', 'Điều phối các bên', 'Tổ chức sự kiện'],
  },
  {
    num: '02',
    category: 'Môn Giao dịch thương mại quốc tế',
    title: 'Phân tích hợp đồng xuất khẩu cà phê Robusta Việt Nam - Nga',
    description:
      'Nhóm trưởng, nhóm 6 thành viên. Nhóm phân tích một hợp đồng xuất khẩu thực tế: cà phê nhân Robusta S18 loại 1 đánh bóng, giao từ TP. Hồ Chí Minh đến cảng cá Vladivostok (Nga) theo điều kiện CIF Incoterms 2020, thanh toán bằng T/T. Báo cáo gồm bốn phần: cơ sở lý thuyết về hợp đồng mua bán quốc tế; phân tích hợp đồng và phụ lục, kèm đánh giá điểm mạnh, điểm yếu và đề xuất; phân tích bộ chứng từ (Commercial Invoice, Packing List, Bill of Lading, C/O mẫu EAV, giấy chứng nhận khử trùng, kiểm dịch thực vật, bảo hiểm hàng hải, giám định SGS); và quy trình thực hiện xuất khẩu. Với vai trò nhóm trưởng, tôi phân công công việc, theo dõi tiến độ và tổng hợp báo cáo cuối cùng. Báo cáo viết hoàn toàn bằng tiếng Anh.',
    tags: ['CIF', 'T/T', 'C/O form EAV', 'SGS', 'Chứng từ xuất khẩu'],
  },
];

const ProjectsSection = () => (
  <section id="du-an" className="relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 px-5 sm:px-8 md:px-10 pb-28 md:pr-14 overflow-hidden">
    <AmbientGlow color="from-[#B600A8]/30 to-[#BE4C00]/20" className="top-1/3 left-10 w-[500px] h-[500px]" />
    
    <div className="pt-20 sm:pt-24 mb-16 relative z-10">
      <BigTitle icon={<Anchor size={20} />}>Dự án</BigTitle>
    </div>
    
    {projects.map((p) => (
      <FadeIn key={p.num} className="mb-10 relative z-10">
        <motion.div 
          whileHover={{ y: -8, borderColor: 'rgba(182, 0, 168, 0.6)' }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-6xl mx-auto rounded-[40px] md:rounded-[60px] border-2 border-[#D7E2EA]/40 bg-[#121212]/60 backdrop-blur-md p-6 sm:p-8 md:p-12 shadow-2xl group"
        >
          <div className="flex items-center gap-6 sm:gap-8 border-b border-white/10 pb-8 mb-8">
            <span className="font-black text-[#D7E2EA] group-hover:text-[#B600A8] transition-colors text-[clamp(3.5rem,9vw,110px)] leading-none">{p.num}</span>
            <div>
              <p className="text-[#D7E2EA]/60 uppercase text-xs sm:text-sm tracking-wider mb-2">{p.category}</p>
              <h3 className="text-[#D7E2EA] font-medium uppercase text-xl sm:text-3xl md:text-4xl leading-snug">{p.title}</h3>
            </div>
          </div>
          <p className="text-[#D7E2EA]/90 font-light text-[clamp(1rem,1.6vw,1.3rem)] leading-relaxed max-w-5xl mb-8">{p.description}</p>
          <div className="flex flex-wrap gap-3">
            {p.tags.map((t) => (
              <motion.span 
                key={t} 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(215, 226, 234, 0.25)' }}
                className="px-4 py-2 bg-[#D7E2EA]/10 rounded-full text-sm font-medium text-[#D7E2EA] border border-[#D7E2EA]/20 transition-colors cursor-default"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </FadeIn>
    ))}
  </section>
);

export default function App() {
  return (
    <div className="bg-[#0C0C0C] min-h-screen relative font-sans selection:bg-[#B600A8] selection:text-white">
      <Navbar />
      <ScrollTravel />
      <HeroSection />
      <AboutSection />
      <ProfileSection />
      <ProjectsSection />
    </div>
  );
}
