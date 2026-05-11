/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Youtube, 
  Facebook, 
  Twitter, 
  Mail, 
  MapPin, 
  Calendar, 
  ChevronDown, 
  Edit3, 
  Check, 
  X,
  FileText,
  Video,
  Award,
  Globe,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface ProfileData {
  name: string;
  zodiac: string;
  bloodType: string;
  birthday: string;
  email: string;
  avatar: string;
  socials: {
    linkedin: string;
    instagram: string;
    youtube: string;
    facebook: string;
    twitter: string;
  };
  intro: string;
  education: {
    period: string;
    school: string;
    major: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  certificates: string[];
  travelPosts: {
    id: number;
    title: string;
    subtitle: string;
    content: string[];
  }[];
  aiWork: {
    title: string;
    image: string;
    description: string;
  };
  videoUrl: string;
}

// --- Initial Data ---

const INITIAL_DATA: ProfileData = {
  name: "陳柏亘",
  zodiac: "巨蟹座",
  bloodType: "B型",
  birthday: "2007-07-03",
  email: "a111182126@nkust.edu.tw",
  avatar: "https://www.image2url.com/r2/default/images/1777826761305-37dc44aa-9ed3-4aba-834f-a15b2863c732.jpg", // 更新頭像圖片
  socials: {
    linkedin: "#",
    instagram: "#",
    youtube: "#",
    facebook: "#",
    twitter: "#",
  },
  intro: "我叫陳柏亘，目前就讀高雄科技大學 航海科五專四年級。在學期間培養了良好的紀律觀念與責任感。航海專業的訓練讓我習慣按照進度完成任務，也學會在壓力下保持冷静與專注。\n\n我個性踏實、做事細心，對於交辦事項都會確實完成。我不僅在航海領域努力，也熱愛探索 AI 技術與創意實踐。希望透過這份工作累積實務經驗，展現我的反應力與團隊協作能力。",
  education: [
    {
      period: "2022-09 ~ 現在",
      school: "國立高雄科技大學",
      major: "航海科 五專部四年級"
    }
  ],
  languages: [
    { name: "中文/台語", level: "母語精通" },
    { name: "英文", level: "技術性溝通" }
  ],
  certificates: [
    "STCW 基本安全訓練",
    "船舶保全意識與職責",
    "救生艇筏及救難艇操縱",
    "進階滅火訓練證書",
    "AI 工具應用基礎"
  ],
  travelPosts: [
    {
      id: 1,
      title: "旅遊文字：印度生存挑戰",
      subtitle: "九人「極限露宿與靈魂衝擊」六日全記錄",
      content: [
        "這是一場關於邊界測試的旅行。在德里與瓦拉納西，我們選擇了最原始的方式感觸大地的脈動。",
        "",
        "Day 1-2：墜落德里、首晚月台露宿",
        "● 15:00 抵達德里 IGI 機場，搭快線直奔新德里火車站 (NDLS)。",
        "● 18:00 不進旅館：九人在火車站大廳尋找靠柱子的空地，建立臨時營地。",
        "● 22:00 月台露宿：鋪開睡墊跟毯子，背對背圍成一圈，這就是我們的守夜起點。",
        "",
        "Day 3：死亡之城、枕恆河入睡",
        "● 05:00 抵達瓦拉納西，徒步穿梭古老迷宮般的巷弄，直抵恆河階梯 (Ghats)。",
        "● 18:00 恆河祭典：在 Ganga Aarti 的煙霧與火光中，感受千年不滅的信仰靈魂。",
        "● 23:00 階梯露宿：直接卡位河邊石階，枕著河水聲與蚊蠅叮咬入睡。"
      ]
    }
  ],
  aiWork: {
    title: "AI 創意公仔：香蕉星人 (Banana Mood)",
    image: "https://www.image2url.com/r2/default/images/1777826900973-81e6446a-138f-4299-a1f9-e5fadfa72b3f.png",
    description: "這款 'Banana Mood' 公仔結合了超寫實渲染技術與趣味香蕉服飾設計。它代表了一種在嚴謹生活中的幽默感，也象徵著我對於 AI 數位建模與 3D 創意展現的熱忱。"
  },
  videoUrl: "https://www.youtube.com/embed/rEx9V1p4-gA"
};

// --- Components ---

export default function App() {
  const [data, setData] = useState<ProfileData>(INITIAL_DATA);
  const [isEditMode, setIsEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('portfolio');

  // Handle text change
  const handleTextChange = (path: string, value: string) => {
    const newData = { ...data };
    // Simple deep path update for demo
    if (path === 'name') newData.name = value;
    if (path === 'intro') newData.intro = value;
    if (path === 'email') newData.email = value;
    setData(newData);
  };

  // Handle Image Change
  const triggerImageEdit = (key: keyof ProfileData | 'aiImage') => {
    if (!isEditMode) return;
    const url = prompt('請輸入新的圖片網址:', key === 'avatar' ? data.avatar : data.aiWork.image);
    if (url) {
      if (key === 'avatar') setData({ ...data, avatar: url });
      if (key === 'aiImage') setData({ ...data, aiWork: { ...data.aiWork, image: url } });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-yellow-400 selection:text-neutral-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter">
            <span className="text-yellow-400">線上</span>履歷
          </div>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                isEditMode ? 'bg-yellow-400 text-black' : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {isEditMode ? <Check size={16} /> : <Edit3 size={16} />}
              {isEditMode ? '完成編輯' : '編輯模式'}
            </button>
            <div className="hidden md:flex gap-6 text-sm font-medium text-neutral-400">
              <a href="#hero" className="hover:text-yellow-400 transition-colors">首頁</a>
              <a href="#portfolio" className="hover:text-yellow-400 transition-colors">作品集</a>
              <a href="#contact" className="hover:text-yellow-400 transition-colors">聯絡我</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {/* Hero Section */}
        <section id="hero" className="relative h-[500px] bg-neutral-900 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 h-full flex flex-col md:flex-row items-center gap-12 py-12 relative z-10">
            {/* Avatar */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative group shrink-0"
            >
              <div 
                onClick={() => triggerImageEdit('avatar')}
                className={`w-64 h-80 rounded-2xl overflow-hidden cursor-pointer border-4 transition-all ${
                  isEditMode ? 'border-yellow-400 border-dashed animate-pulse' : 'border-neutral-800 group-hover:border-yellow-400'
                }`}
              >
                <img 
                  src={data.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {isEditMode && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Plus className="text-yellow-400" size={48} />
                  </div>
                )}
              </div>
            </motion.div>

            {/* Basic Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              <div className="mb-6">
                {isEditMode ? (
                  <input 
                    type="text" 
                    value={data.name} 
                    onChange={(e) => handleTextChange('name', e.target.value)}
                    className="text-5xl font-black bg-neutral-800 border-b-2 border-yellow-400 outline-none w-full mb-2"
                  />
                ) : (
                  <h1 className="text-5xl font-black mb-2">{data.name}</h1>
                )}
                <div className="flex gap-4 text-neutral-400 font-medium">
                  <span>{data.zodiac}</span>
                  <span>|</span>
                  <span>{data.bloodType}</span>
                  <span>|</span>
                  <span>{data.birthday}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-neutral-300 mb-8 p-3 bg-neutral-800/50 rounded-lg w-fit border border-neutral-700">
                <Mail size={18} className="text-yellow-400" />
                <span>{data.email}</span>
              </div>

              {/* Socials */}
              <div className="flex gap-4">
                {[
                  { icon: Linkedin, color: 'hover:text-blue-500' },
                  { icon: Instagram, color: 'hover:text-pink-500' },
                  { icon: Youtube, color: 'hover:text-red-500' },
                  { icon: Facebook, color: 'hover:text-blue-600' },
                  { icon: Twitter, color: 'hover:text-sky-400' }
                ].map((social, idx) => (
                  <a key={idx} href="#" className={`text-neutral-500 transition-all hover:scale-110 ${social.color}`}>
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Intro Section */}
        <section className="bg-neutral-950 py-20 px-6">
          <div className="max-w-4xl mx-auto">
            {isEditMode ? (
              <textarea 
                value={data.intro}
                onChange={(e) => handleTextChange('intro', e.target.value)}
                className="w-full h-48 bg-neutral-800 text-neutral-200 p-6 rounded-2xl outline-none border-2 border-yellow-400"
              />
            ) : (
              <p className="text-lg leading-relaxed text-neutral-300 whitespace-pre-wrap">
                {data.intro}
              </p>
            )}
          </div>
        </section>

        {/* Skills & Education */}
        <section className="bg-neutral-900/50 py-20 px-6 border-y border-neutral-800">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
            {/* Education */}
            <div className="bg-neutral-800/80 p-8 rounded-3xl border border-neutral-700">
              <h3 className="text-yellow-400 text-xl font-bold mb-6 flex items-center gap-2">
                <FileText size={20} /> 學歷
              </h3>
              {data.education.map((edu, i) => (
                <div key={i} className="mb-4">
                  <div className="text-sm text-neutral-500 font-mono mb-1">{edu.period}</div>
                  <div className="text-lg font-bold">{edu.school}</div>
                  <div className="text-neutral-400">{edu.major}</div>
                </div>
              ))}
            </div>

            {/* Language */}
            <div className="bg-neutral-800/80 p-8 rounded-3xl border border-neutral-700">
              <h3 className="text-yellow-400 text-xl font-bold mb-6 flex items-center gap-2">
                <Globe size={20} /> 語言能力
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {data.languages.map((lang, i) => (
                  <div key={i} className="bg-neutral-700/50 p-4 rounded-xl text-center">
                    <div className="text-sm text-neutral-400 mb-1">{lang.name}</div>
                    <div className="font-bold">{lang.level}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-neutral-800/80 p-8 rounded-3xl border border-neutral-700">
              <h3 className="text-yellow-400 text-xl font-bold mb-6 flex items-center gap-2">
                <Award size={20} /> 專業證照
              </h3>
              <ul className="space-y-3">
                {data.certificates.map((cert, i) => (
                  <li key={i} className="flex items-center gap-3 text-neutral-300">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rotate-45" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Portfolio Tabs */}
        <section id="portfolio" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-8 border-b border-neutral-800 mb-12">
              {['旅遊文字', '簡報', 'AI個人公仔', '影片'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-lg font-bold transition-all relative ${
                    activeTab === tab ? 'text-yellow-400' : 'text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400" 
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="min-h-[400px]"
              >
                {activeTab === '旅遊文字' && (
                  <div className="bg-neutral-800/30 p-12 rounded-3xl border border-neutral-800">
                    {data.travelPosts.map((post) => (
                      <div key={post.id} className="max-w-2xl">
                        <h2 className="text-4xl font-black mb-4">{post.title}</h2>
                        <p className="text-yellow-400 font-bold mb-8 text-xl">{post.subtitle}</p>
                        <div className="space-y-4 text-neutral-300 leading-relaxed">
                          {post.content.map((line, idx) => (
                            <p key={idx} className={line.startsWith('Day') ? 'font-bold text-neutral-100' : ''}>{line}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === '簡報' && (
                  <div className="aspect-video w-full bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-800 relative shadow-2xl">
                    <iframe 
                      src="https://docs.google.com/presentation/d/1KBEyJfg_rU5COYQpwzZFYza3Jk-QOTZfuBiMOCkiUR4/embed?start=false&loop=false&delayms=3000"
                      frameBorder="0"
                      className="w-full h-full"
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                )}

                {activeTab === 'AI個人公仔' && (
                  <div className="grid md:grid-cols-2 gap-12 items-center bg-neutral-800/30 p-12 rounded-3xl">
                    <div 
                      onClick={() => triggerImageEdit('aiImage')}
                      className={`aspect-square bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl relative group cursor-pointer ${
                        isEditMode ? 'ring-4 ring-yellow-400 ring-dashed' : ''
                      }`}
                    >
                      <img 
                        src={data.aiWork.image} 
                        alt="AI 3D Figure" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      {isEditMode && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Plus className="text-yellow-400" size={48} />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                        {data.aiWork.description}
                      </p>
                      <button 
                        onClick={() => window.open('https://studio.tripo3d.ai/3d-model/5adae32f-99e8-44cf-9638-c622d483f14f?invite_code=W1V9ON', '_blank')}
                        className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full hover:scale-105 transition-all flex items-center gap-2"
                      >
                        <Globe size={18} /> 查看 3D 模型作品
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === '影片' && (
                  <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden relative group shadow-2xl border border-neutral-800">
                    <iframe 
                      src={data.videoUrl} 
                      className="w-full h-full"
                      title="Portfolio Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    {isEditMode && (
                      <button 
                        onClick={() => {
                          const url = prompt('請輸入影片網址:', data.videoUrl);
                          if (url) setData({...data, videoUrl: url});
                        }}
                        className="absolute inset-0 bg-yellow-400/20 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Plus size={48} className="text-yellow-400 mb-4" />
                        <p className="text-yellow-400 font-bold">更換影片來源</p>
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Footer Area / Contact */}
        <section id="contact" className="py-20 px-6 bg-neutral-900 flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 bg-yellow-400 text-black font-black text-xl rounded-full shadow-[0_0_40px_rgba(250,204,21,0.2)] hover:shadow-[0_0_60px_rgba(250,204,21,0.4)] transition-all"
          >
            與我聯絡
          </motion.button>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-neutral-800 text-center text-neutral-500 text-sm">
        <p>© 2026 {data.name} | 個人數位作品集</p>
      </footer>
    </div>
  );
}

