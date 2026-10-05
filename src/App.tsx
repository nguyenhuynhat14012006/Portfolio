import { useRef, type MouseEvent, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import avatar from './avatar.jpg';

// Cuộn mượt tới một phần theo id (dùng JS để chắc chắn bấm được)
const goTo = (id: string) => (e: MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

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

// Chữ sáng dần theo từng TỪ (giữ khoảng trắng, không bị gãy từ)
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

const ContactButton = () => (
  <a
    href="#lien-he"
    onClick={goTo('lien-he')}
    className="inline-block rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base hover:opacity-90 transition-opacity cursor-pointer"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
      outline: '2px solid white',
      outlineOffset: '-3px',
    }}
  >
    Liên hệ
  </a>
);

const Navbar = () => {
  const items = [
    { name: 'Giới thiệu', id: 'gioi-thieu' },
    { name: 'Học vấn & Kỹ năng', id: 'hoc-van' },
    { name: 'Dự án', id: 'du-an' },
    { name: 'Hoạt động & Kinh nghiệm', id: 'hoat-dong' },
    { name: 'Liên hệ', id: 'lien-he' },
  ];
  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-[#0C0C0C]/90 backdrop-blur-md flex justify-between items-center px-6 md:px-10 py-5 md:py-6">
      {items.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          onClick={goTo(it.id)}
          className="text-[#D7E2EA] font-medium uppercase tracking-wider text-[10px] sm:text-sm md:text-lg lg:text-[1.4rem] opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        >
          {it.name}
        </a>
      ))}
    </nav>
  );
};

const HeroSection = () => (
  <section className="h-screen flex flex-col relative overflow-hidden">
    <div className="flex-1 flex flex-col justify-center items-center pt-16">
      <FadeIn delay={0.15} y={40} className="w-full text-center relative z-20">
        <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
          Huy Nhật
        </h1>
      </FadeIn>
    </div>
    <FadeIn delay={0.5} y={30} className="absolute left-1/2 -translate-x-1/2 z-10 bottom-24 sm:bottom-0 w-[190px] sm:w-[250px] md:w-[300px]">
      <img src={avatar} alt="Huy Nhật" className="w-full h-auto rounded-t-[40px] object-cover" />
    </FadeIn>
    <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 w-full z-20 absolute bottom-0">
      <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug text-[clamp(0.75rem,1.4vw,1.5rem)] max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
        Sinh viên Kinh tế đối ngoại, hướng tới vị trí chuyên viên logistics.
      </p>
      <ContactButton />
    </div>
  </section>
);

const AboutSection = () => (
  <section id="gioi-thieu" className="scroll-mt-24 relative flex flex-col items-center px-5 sm:px-8 md:px-10 py-24">
    <FadeIn className="mb-12 text-center">
      <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-[clamp(3rem,12vw,160px)]">Giới thiệu</h2>
    </FadeIn>
    <FadeIn delay={0.2} className="mb-12">
      <div className="bg-[#151515]/80 border border-[#D7E2EA]/20 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 max-w-2xl">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#D7E2EA]/50 shrink-0">
          <img src={avatar} className="w-full h-full object-cover object-top" alt="Huy Nhật" />
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#D7E2EA] mb-2 uppercase tracking-wide">Huy Nhật</h3>
          <p className="text-[#D7E2EA]/70 text-sm sm:text-base font-light mb-3">Đại học Ngoại thương | Kinh tế đối ngoại | Dự kiến tốt nghiệp 2028</p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {['Logistics', 'Xuất nhập khẩu', 'IELTS 7.5', 'MOS Excel'].map((t) => (
              <span key={t} className="px-3 py-1 bg-[#D7E2EA]/10 rounded-full text-xs text-[#D7E2EA]">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </FadeIn>
    <AnimatedText
      text="Xin chào, mình là Huy Nhật, sinh viên năm 3 chuyên ngành Kinh tế đối ngoại tại Đại học Ngoại thương. Mình có nền tảng về thương mại quốc tế và xuất nhập khẩu, và đang hướng tới vị trí chuyên viên logistics. Mình làm tốt ba việc: quản lý đội ngũ với vai trò chủ tịch câu lạc bộ, đọc và làm việc với tài liệu bằng tiếng Anh, và dùng Excel để xử lý số liệu. Mình từng dẫn dắt chương trình gây quỹ huy động 70 triệu đồng cho 100 em nhỏ vùng cao."
      className="text-[#D7E2EA] font-medium leading-relaxed max-w-[620px] text-[clamp(1rem,2vw,1.35rem)] text-center mb-16"
    />
    <ContactButton />
  </section>
);

const Row = ({ id, num, title, children }: { id: string; num: string; title: string; children: ReactNode }) => (
  <FadeIn y={20}>
    <div id={id} className="scroll-mt-24 flex flex-col sm:flex-row gap-6 sm:gap-10 border-b border-[rgba(12,12,12,0.15)] py-8 sm:py-10 md:py-12 items-start">
      <div className="font-black text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] leading-none w-24 sm:w-32 md:w-48 shrink-0">{num}</div>
      <div className="flex flex-col">
        <h3 className="font-medium uppercase text-[clamp(1rem,2.2vw,2.1rem)] text-[#0C0C0C] mb-4">{title}</h3>
        <div className="font-light leading-relaxed max-w-2xl text-[clamp(0.95rem,1.6vw,1.25rem)] text-[#0C0C0C]/80 space-y-3">{children}</div>
      </div>
    </div>
  </FadeIn>
);

const EducationSection = () => (
  <section className="relative bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-16 pb-6">
    <div className="max-w-5xl mx-auto">
      <Row id="hoc-van" num="01" title="Học vấn và kỹ năng">
        <p>Đại học Ngoại thương, chuyên ngành Kinh tế đối ngoại, dự kiến tốt nghiệp 2028.</p>
        <p>Kỹ năng: IELTS 7.5 Overall; Microsoft Office Specialist (MOS) Excel, xử lý số liệu; quản lý đội nhóm, tổ chức sự kiện; chứng từ xuất nhập khẩu.</p>
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
  <section id="du-an" className="scroll-mt-0 relative bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 px-5 sm:px-8 md:px-10 pb-24">
    <div className="pt-20 sm:pt-24 mb-16 text-center">
      <h2 className="hero-heading font-black uppercase text-[clamp(3rem,12vw,160px)]">Dự án</h2>
    </div>
    {projects.map((p) => (
      <FadeIn key={p.num} className="mb-10">
        <div className="w-full max-w-6xl mx-auto rounded-[40px] md:rounded-[60px] border-2 border-[#D7E2EA] p-6 sm:p-8 md:p-12">
          <div className="flex items-center gap-6 sm:gap-8 border-b border-white/10 pb-8 mb-8">
            <span className="font-black text-[#D7E2EA] text-[clamp(3.5rem,9vw,110px)] leading-none">{p.num}</span>
            <div>
              <p className="text-[#D7E2EA]/60 uppercase text-xs sm:text-sm tracking-wider mb-2">{p.category}</p>
              <h3 className="text-[#D7E2EA] font-medium uppercase text-xl sm:text-3xl md:text-4xl leading-snug">{p.title}</h3>
            </div>
          </div>
          <p className="text-[#D7E2EA]/90 font-light text-[clamp(1rem,1.6vw,1.3rem)] leading-relaxed max-w-5xl mb-8">{p.description}</p>
          <div className="flex flex-wrap gap-3">
            {p.tags.map((t) => (
              <span key={t} className="px-4 py-2 bg-[#D7E2EA]/10 rounded-full text-sm font-medium text-[#D7E2EA] border border-[#D7E2EA]/20">{t}</span>
            ))}
          </div>
        </div>
      </FadeIn>
    ))}
  </section>
);

const ActivitySection = () => (
  <section className="relative bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 px-5 sm:px-8 md:px-10 pt-16 pb-24">
    <div className="max-w-5xl mx-auto">
      <Row id="hoat-dong" num="02" title="Hoạt động và kinh nghiệm">
        <ul className="list-disc pl-5 space-y-3">
          <li>Học việc tại văn phòng chứng từ, công ty xuất nhập khẩu máy lọc nước Nhật Bản, tháng 3 đến tháng 5/2026.</li>
          <li>Chủ tịch Câu lạc bộ Kỹ năng sống LSC FTU, Đại học Ngoại thương, 2025 đến 2026. Điều hành 50 thành viên, phụ trách tổ chức sự kiện, cuộc thi và hoạt động tình nguyện.</li>
          <li>Học việc chăm sóc khách hàng tại một ngân hàng tư nhân, tháng 6 đến tháng 8/2026.</li>
        </ul>
      </Row>
      <Row id="lien-he" num="03" title="Liên hệ">
        <p>
          <span className="font-medium">Email:</span>{' '}
          <a href="mailto:nhatnh17.lsc@gmail.com" className="underline hover:text-[#B600A8]">nhatnh17.lsc@gmail.com</a>
        </p>
        <p>
          <span className="font-medium">LinkedIn:</span>{' '}
          <a href="https://www.linkedin.com/in/nh%E1%BA%ADt-nguy%E1%BB%85n-huy-002084431/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#B600A8] break-all">
            linkedin.com/in/nhật-nguyễn-huy
          </a>
        </p>
      </Row>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="bg-[#0C0C0C] min-h-screen relative">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <ProjectsSection />
      <ActivitySection />
    </div>
  );
}
