import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, Instagram, Youtube, Mail, Phone, MapPin, 
  ChevronRight, Award, BookOpen, Briefcase, Star,
  Play, Image as ImageIcon, Trash2, Plus, Lock, MessageCircle
} from 'lucide-react';
import { PortfolioItem, Review } from './types';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PORTFOLIO', href: '#portfolio' },
    { name: 'ACADEMY', href: '#academy' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-lg py-4 shadow-sm text-dark' : 'bg-transparent py-6 text-white'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-serif font-bold tracking-widest">
          강다솜 <span className="text-primary">무용가</span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium tracking-widest hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#admin" className="text-sm font-medium opacity-30 hover:opacity-100 transition-opacity">
            <Lock size={16} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 flex flex-col items-center space-y-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-serif"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-16 text-center">
    <motion.span 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-primary text-sm font-bold tracking-[0.3em] uppercase block mb-4"
    >
      {subtitle}
    </motion.span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-4xl md:text-6xl font-serif"
    >
      {title}
    </motion.h2>
    <div className="w-20 h-px bg-primary mx-auto mt-8" />
  </div>
);

// --- Pages ---

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-dark">
    <div className="absolute inset-0 z-0">
      <img 
        src="https://picsum.photos/seed/dance1/1920/1080?blur=2" 
        className="w-full h-full object-cover opacity-40"
        alt="Hero Background"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark" />
    </div>
    
    <div className="relative z-10 text-center px-6">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-white/80 text-lg md:text-xl font-serif italic mb-6"
      >
        Movement that tells a story.
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-9xl text-white font-serif mb-12 tracking-tighter"
      >
        몸으로 감정을 <br /> <span className="text-primary">설계합니다.</span>
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col md:flex-row items-center justify-center gap-6"
      >
        <a href="#portfolio" className="px-10 py-4 bg-primary text-white font-bold tracking-widest hover:bg-white hover:text-primary transition-all duration-300 rounded-full">
          포트폴리오 보기
        </a>
        <a href="#academy" className="px-10 py-4 border border-white/30 text-white font-bold tracking-widest hover:bg-white/10 transition-all duration-300 rounded-full">
          클래스 문의하기
        </a>
      </motion.div>
    </div>

    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
    >
      <div className="w-px h-12 bg-white/30 mx-auto" />
    </motion.div>
  </section>
);

const About = () => {
  const education = [
    { year: '2013 - 2017', title: '세종대학교', desc: '무용과 현대무용 졸업' },
    { year: '2010 - 2013', title: '덕원예술고등학교', desc: '무용과 졸업' },
  ];

  const experience = [
    { year: '2026', title: '엠비규어스 / 국립현대무용단', desc: '‘항해’ 영국공연, 크리틱스초이스 활동예정' },
    { year: '2018 - Present', title: 'Blackpool dance 대표', desc: '일반인 무용단 연출 및 안무자' },
    { year: '2025', title: 'FORCE', desc: '미디어+서커스+현대무용 신작 <유영> 출연' },
    { year: '2025', title: '국립무용단', desc: "안무가 프로젝트 '죽페스' 무용수" },
    { year: '2025', title: '국립현대무용단 청년단원', desc: "출연작: 정영두 '항해 Voyag‘, 야렉 '잠재 Unseen’" },
    { year: '2025', title: '오사카엑스포 한국관', desc: '3관 영상 안무감독 및 연출' },
    { year: '2024', title: '노트르담 드 파리', desc: '뮤지컬 댄서' },
    { year: '2021 - 2024', title: '국립현대무용단', desc: '<구두점의 나라에서> 출연' },
    { year: '2020 - 2021', title: '티랩 / move move', desc: '필라테스 및 모던핏 강사' },
    { year: '2019 - 2021', title: '안다르', desc: '앰버서더 활동' },
    { year: '2018 - 2020', title: '엠비규어스 컴퍼니', desc: '무용수' },
    { year: '2018 - 2019', title: '국립현대무용단', desc: '<라벨과 스트라빈스키>, <쓰리볼레로> 출연' },
    { year: '2017 - 2019', title: '안양예고 영재학급', desc: '현대무용 강사' },
    { year: '2016 - 2018', title: '서울댄스컴퍼니', desc: '모던발레, 현대무용 SDC 무용단장' },
  ];

  return (
    <section id="about" className="py-32 bg-paper">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://picsum.photos/seed/dancer-profile/800/1200" 
                className="w-full h-full object-cover"
                alt="Profile"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 -z-10 rounded-full blur-3xl" />
          </motion.div>

          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Professional Profile</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">무용가 / 안무가 / <br className="hidden md:block" /> 블랙풀댄스 아카데미 대표 강다솜</h2>
            <p className="text-lg text-dark/70 leading-relaxed mb-12">
              현대무용을 기반으로 방송댄스, 창작 안무 등 경계를 넘나드는 퍼포먼스를 선보입니다. 
              신체의 움직임을 통해 보이지 않는 감정을 시각화하고, 관객과 깊은 정서적 교감을 나누는 것을 목표로 합니다.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-black/5">
                <h4 className="font-bold text-2xl mb-2">10+</h4>
                <p className="text-sm text-dark/50 uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-black/5">
                <h4 className="font-bold text-2xl mb-2">50+</h4>
                <p className="text-sm text-dark/50 uppercase tracking-wider">Performances</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-serif mb-10 flex items-center gap-3">
              <BookOpen className="text-primary" /> 학력
            </h3>
            <div className="space-y-8">
              {education.map((item, i) => (
                <div key={i} className="border-l-2 border-primary/30 pl-6 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <span className="text-sm font-bold text-primary mb-1 block">{item.year}</span>
                  <h4 className="text-xl font-serif mb-2">{item.title}</h4>
                  <p className="text-dark/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-serif mb-10 flex items-center gap-3">
              <Briefcase className="text-primary" /> 주요 경력
            </h3>
            <div className="space-y-8">
              {experience.map((item, i) => (
                <div key={i} className="border-l-2 border-primary/30 pl-6 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <span className="text-sm font-bold text-primary mb-1 block">{item.year}</span>
                  <h4 className="text-xl font-serif mb-2">{item.title}</h4>
                  <p className="text-dark/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 pt-24 border-t border-black/5">
          <h3 className="text-2xl font-serif mb-12 flex items-center gap-3">
            <Award className="text-primary" /> 자격증 및 수상경력
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" /> 자격증
              </h4>
              <ul className="space-y-4">
                {[
                  '국제재활필라테스 자격증 수료',
                  'Abyasa 아비야사 요가 자격증 수료',
                  '매트필라테스 자격증 2급 수료'
                ].map((cert, i) => (
                  <li key={i} className="flex items-start gap-3 text-dark/70">
                    <span className="text-primary mt-1">•</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full" /> 수상경력
              </h4>
              <ul className="space-y-4">
                {[
                  '2016 KIMDC 컨템포러리 무용 준결선진출',
                  '2016 제34회 전국대학무용 콩쿠르 전체 2위 \'은상\'',
                  '2016 동아무용콩쿠르 본선합격 후 일반부 \'4위\'',
                  '2014 (사)한국현대무용협회 21회 \'장려상\'',
                  '2014 문예총 장관상 국제 콩쿠르 \'은상\''
                ].map((award, i) => (
                  <li key={i} className="flex items-start gap-3 text-dark/70">
                    <span className="text-primary mt-1">•</span>
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState('공연 및 출연');

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(setItems);
  }, []);

  const categories = ['공연 및 출연', '움직임 및 수업영상', '인스타그램'];
  const filteredItems = items.filter(i => i.category === filter);

  // Group items by year (description field) for Performance category
  const groupedItems = filter === '공연 및 출연' 
    ? filteredItems.reduce((acc, item) => {
        const year = item.description || 'Other';
        if (!acc[year]) acc[year] = [];
        acc[year].push(item);
        return acc;
      }, {} as Record<string, PortfolioItem[]>)
    : null;

  const years = groupedItems ? Object.keys(groupedItems).sort((a, b) => b.localeCompare(a)) : [];

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle title="Portfolio" subtitle="Selected Works" />
        
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-2 rounded-full text-sm font-bold tracking-widest transition-all ${filter === cat ? 'bg-primary text-white' : 'bg-paper text-dark/40 hover:bg-primary/10'}`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {filter === '공연 및 출연' && groupedItems ? (
            <div className="space-y-20">
              {years.map(year => (
                <div key={year} className="relative">
                  <div className="sticky top-24 z-10 mb-8">
                    <span className="text-6xl font-serif text-primary/10 absolute -top-8 -left-4 select-none">{year}</span>
                    <h3 className="text-2xl font-serif text-dark relative">{year}</h3>
                  </div>
                  <div className="divide-y divide-black/5 border-t border-black/5">
                    {groupedItems[year].map((item) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        key={item.id}
                        className="py-6 flex items-center justify-between group"
                      >
                        <div className="flex-1 pr-8">
                          <h4 className="text-lg font-medium group-hover:text-primary transition-colors duration-300">
                            {item.title}
                          </h4>
                        </div>
                        <a 
                          href={item.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-dark/20 hover:text-primary transition-colors p-2"
                        >
                          {item.type === 'Video' ? <Play size={18} /> : <ChevronRight size={18} />}
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y divide-black/5 border-t border-black/5">
              {filteredItems.map((item) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.id}
                  className="py-10 flex flex-col md:flex-row md:items-center justify-between group"
                >
                  <div className="mb-6 md:mb-0 md:pr-10">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-primary text-[10px] font-bold tracking-[0.2em] uppercase px-2 py-1 bg-primary/5 rounded">
                        {item.category}
                      </span>
                      <span className="text-dark/20 text-[10px] font-bold tracking-[0.2em] uppercase">
                        {item.type}
                      </span>
                    </div>
                    <h4 className="text-2xl md:text-3xl font-serif group-hover:text-primary transition-colors duration-500 leading-tight">
                      {item.title}
                    </h4>
                  </div>
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-dark/40 hover:text-primary transition-all duration-300 group/link"
                  >
                    <span className="border-b border-transparent group-hover/link:border-primary pb-1">View Project</span>
                    <div className="w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center group-hover/link:border-primary group-hover/link:bg-primary group-hover/link:text-white transition-all">
                      <ChevronRight size={14} />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Academy = () => {
  const classes = [
    { name: '키즈반', target: '6세 - 초등학생', desc: '창의적 움직임과 기초 체력 증진' },
    { name: '입시반', target: '중·고등학생', desc: '예고 및 대학 입시를 위한 전문 커리큘럼' },
    { name: '취미반', target: '성인 일반', desc: '스트레스 해소와 체형 교정을 위한 현대무용' },
    { name: '전문반', target: '전공자 및 프로', desc: '테크닉 심화 및 안무법 연구' },
  ];

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(setReviews);
  }, []);

  return (
    <section id="academy" className="py-32 bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Education Brand</span>
          <h2 className="text-5xl md:text-7xl font-serif mb-8">BLACKPOOL <br /> DANCE ACADEMY</h2>
          <p className="text-white/50 max-w-2xl mx-auto">
            블랙풀댄스 아카데미는 단순한 기술 전수를 넘어, 개개인의 예술적 잠재력을 발견하고 
            무대 위에서 가장 빛나는 순간을 함께 만들어갑니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {classes.map((cls, i) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={i} 
              className="p-10 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors"
            >
              <h4 className="text-2xl font-serif text-primary mb-4">{cls.name}</h4>
              <p className="text-sm font-bold text-white/40 mb-6 uppercase tracking-widest">{cls.target}</p>
              <p className="text-white/70 leading-relaxed">{cls.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-32">
          <SectionTitle title="Student Reviews" subtitle="Testimonials" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.length > 0 ? reviews.map((rev) => (
              <div key={rev.id} className="p-8 bg-white/5 rounded-2xl border border-white/10">
                <div className="flex text-primary mb-6">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-white/80 italic mb-8 leading-relaxed">"{rev.content}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {rev.author[0]}
                  </div>
                  <div>
                    <h5 className="font-bold">{rev.author}</h5>
                    <p className="text-xs text-white/40 uppercase tracking-widest">{rev.role}</p>
                  </div>
                </div>
              </div>
            )) : (
              <p className="col-span-full text-center text-white/30">등록된 후기가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-paper">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <SectionTitle title="Get In Touch" subtitle="Contact" />
            <p className="text-lg text-dark/60 mb-12">
              공연 섭외, 안무 의뢰, 클래스 문의 등 궁금하신 점이 있다면 언제든 편하게 연락주세요. 
              24시간 이내에 답변 드립니다.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-primary">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-dark/40 uppercase tracking-widest">KAKAOTALK ID</p>
                  <p className="text-xl font-serif">somdayinmay</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-dark/40 uppercase tracking-widest">Location</p>
                  <p className="text-xl font-serif">서울특별시 성동구 응답동 235-8 JS빌딩 지하 2층 블랙플댄스스클</p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex gap-6">
              <a href="#" className="w-12 h-12 rounded-full bg-dark text-white flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-dark text-white flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="bg-white p-12 rounded-3xl shadow-xl border border-black/5">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-2 block">Name</label>
                  <input type="text" className="w-full px-6 py-4 bg-paper rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none" placeholder="이름" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-2 block">Phone</label>
                  <input type="text" className="w-full px-6 py-4 bg-paper rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none" placeholder="연락처" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-2 block">Type</label>
                <select className="w-full px-6 py-4 bg-paper rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none appearance-none">
                  <option>공연 섭외</option>
                  <option>클래스 문의</option>
                  <option>협업 제안</option>
                  <option>기타</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-dark/40 mb-2 block">Message</label>
                <textarea rows={5} className="w-full px-6 py-4 bg-paper rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none resize-none" placeholder="문의 내용을 입력해주세요."></textarea>
              </div>
              <button className="w-full py-5 bg-dark text-white font-bold tracking-widest rounded-xl hover:bg-primary transition-colors">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Performance',
    type: 'Video',
    url: '',
    thumbnail: '',
    description: ''
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1308') {
      setIsAuthorized(true);
      fetchItems();
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const fetchItems = () => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(setItems);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newItem, password })
    });
    if (res.ok) {
      fetchItems();
      setNewItem({ title: '', category: 'Performance', type: 'Video', url: '', thumbnail: '', description: '' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    const res = await fetch(`/api/portfolio/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (res.ok) fetchItems();
  };

  if (!isAuthorized) {
    return (
      <section id="admin" className="py-32 flex items-center justify-center min-h-screen bg-paper">
        <div className="max-w-md w-full p-12 bg-white rounded-3xl shadow-xl border border-black/5 text-center">
          <Lock className="mx-auto mb-6 text-primary" size={48} />
          <h2 className="text-3xl font-serif mb-8">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-paper rounded-xl border-none outline-none text-center"
              placeholder="Password"
            />
            <button className="w-full py-4 bg-dark text-white font-bold tracking-widest rounded-xl">
              LOGIN
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="py-32 bg-paper min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-4xl font-serif">Portfolio Management</h2>
          <button onClick={() => setIsAuthorized(false)} className="text-sm font-bold text-dark/40 hover:text-dark">LOGOUT</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 sticky top-32">
              <h3 className="text-xl font-serif mb-6 flex items-center gap-2">
                <Plus size={20} className="text-primary" /> Add New Item
              </h3>
              <form onSubmit={handleAdd} className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Title" 
                  value={newItem.title}
                  onChange={e => setNewItem({...newItem, title: e.target.value})}
                  className="w-full px-4 py-3 bg-paper rounded-lg outline-none" 
                  required
                />
                <select 
                  value={newItem.category}
                  onChange={e => setNewItem({...newItem, category: e.target.value as any})}
                  className="w-full px-4 py-3 bg-paper rounded-lg outline-none"
                >
                  <option value="Performance">Performance</option>
                  <option value="Choreography">Choreography</option>
                  <option value="Teaching">Teaching</option>
                </select>
                <select 
                  value={newItem.type}
                  onChange={e => setNewItem({...newItem, type: e.target.value as any})}
                  className="w-full px-4 py-3 bg-paper rounded-lg outline-none"
                >
                  <option value="Video">Video</option>
                  <option value="Photo">Photo</option>
                </select>
                <input 
                  type="text" 
                  placeholder="URL (Youtube or Image)" 
                  value={newItem.url}
                  onChange={e => setNewItem({...newItem, url: e.target.value})}
                  className="w-full px-4 py-3 bg-paper rounded-lg outline-none" 
                  required
                />
                <input 
                  type="text" 
                  placeholder="Thumbnail URL (Optional)" 
                  value={newItem.thumbnail}
                  onChange={e => setNewItem({...newItem, thumbnail: e.target.value})}
                  className="w-full px-4 py-3 bg-paper rounded-lg outline-none" 
                />
                <button className="w-full py-4 bg-primary text-white font-bold tracking-widest rounded-lg">
                  ADD ITEM
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-paper">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-dark/40">Item</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-dark/40">Category</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-dark/40">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {items.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={item.thumbnail || `https://picsum.photos/seed/${item.id}/100/100`} className="w-12 h-12 rounded object-cover" referrerPolicy="no-referrer" />
                          <div>
                            <p className="font-bold">{item.title}</p>
                            <p className="text-xs text-dark/40">{item.type}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 bg-dark text-white border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-serif font-bold tracking-widest mb-4"><span className="text-white">강다솜</span> <span className="text-primary">무용가</span></h3>
        <p className="text-white/30 text-sm">© 2026 강다솜 무용가. All rights reserved.</p>
      </div>
      
      <div className="flex gap-8">
        <a href="#home" className="text-xs font-bold tracking-widest text-white/50 hover:text-primary transition-colors">HOME</a>
        <a href="#about" className="text-xs font-bold tracking-widest text-white/50 hover:text-primary transition-colors">ABOUT</a>
        <a href="#portfolio" className="text-xs font-bold tracking-widest text-white/50 hover:text-primary transition-colors">PORTFOLIO</a>
        <a href="#academy" className="text-xs font-bold tracking-widest text-white/50 hover:text-primary transition-colors">ACADEMY</a>
      </div>

      <div className="flex gap-4">
        <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all">
          <Instagram size={18} />
        </a>
        <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all">
          <Youtube size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Academy />
        <Contact />
        <Admin />
      </main>
      <Footer />
    </div>
  );
}
