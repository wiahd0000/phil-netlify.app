
import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Phone, Mail, MapPin, Globe, ArrowRight, CheckCircle, 
  Copy, Smartphone, CreditCard, Heart, ExternalLink, Users, Handshake,
  Activity, Shield, Facebook, Linkedin, Youtube, Instagram, Image as ImageIcon,
  Camera, Plus, Quote, Send, GraduationCap, Award, Briefcase, Microscope,
  ChevronLeft, ChevronRight, MessageCircle, Box, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";
import { CORE_VALUES, PROGRAMS, ACHIEVEMENTS, TESTIMONIALS, NEWS_UPDATES, GALLERY_ITEMS, BOARD_MEMBERS, PARTNERS } from './constants';
import { Program, Value, Achievement, Testimonial, NewsItem, GalleryItem, BoardMember, Partner } from './types';

const LOGO_URL = "https://res.cloudinary.com/dew5uptfr/image/upload/v1771073719/logo_znyfq9.jpg";
const FACEBOOK_URL = "https://www.facebook.com/share/1CLc4w3f4Y/";
const LINKEDIN_URL = "https://www.linkedin.com/company/progressive-health-initiative-of-liberia-phil-inc/";
const INSTAGRAM_URL = "https://www.instagram.com/philjuly2_2022?igsh=enIyOHdmcHRwc2M=";
const YOUTUBE_URL = "https://www.youtube.com/@ProgressiveHealthInitiativeofL";
const CEO_IMAGE = "https://res.cloudinary.com/dew5uptfr/image/upload/v1771071779/ceoreal_mjxffh.jpg";

// Scroll Reveal Hook
const useScrollReveal = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

// Components
const LogoMotion = ({ isScrolled }: { isScrolled: boolean }) => (
  <div className="relative flex items-center justify-center group">
    <div className="absolute inset-0 rounded-full bg-medicalBlue/40 animate-pulse-ring"></div>
    <div className={`absolute -inset-1 rounded-full border-2 border-dashed transition-colors duration-500 animate-spin-ring ${isScrolled ? 'border-medicalBlue/40' : 'border-white/40'}`}></div>
    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-medicalBlue bg-white shadow-xl animate-logo transition-transform duration-700 group-hover:rotate-[360deg]">
      <img src={LOGO_URL} alt="PHIL Inc. Logo" className="w-full h-full object-cover" />
    </div>
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'CEO', href: '#ceo' },
    { name: 'Incorporators', href: '#board' },
    { name: 'Partners', href: '#partners' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Impact', href: '#impact' },
    { name: 'Join Us', href: '#membership' },
    { name: 'Donate', href: '#donate' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <LogoMotion isScrolled={isScrolled} />
          <span className={`font-bold text-xl tracking-tight transition-colors duration-300 ${isScrolled ? 'text-profNavy' : 'text-white'}`}>PHIL Inc.</span>
        </div>

        <div className="hidden lg:flex items-center space-x-8">
          {menuItems.map((item) => (
            <a key={item.name} href={item.href} className={`text-sm font-medium transition-all hover:text-medicalBlue hover:translate-y-[-2px] ${isScrolled ? 'text-profNavy' : 'text-white'}`}>
              {item.name}
            </a>
          ))}
          <a href="#donate" className="bg-medicalBlue hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:scale-105 active:scale-95">
            Donate Now
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white outline-none">
          {isOpen ? <X className={isScrolled ? 'text-profNavy' : 'text-white'} /> : <Menu className={isScrolled ? 'text-profNavy' : 'text-white'} />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col space-y-4 animate-fadeInUp">
          {menuItems.map((item) => (
            <a key={item.name} href={item.href} className="text-profNavy text-lg font-medium border-b border-gray-100 pb-2 hover:text-medicalBlue transition-colors" onClick={() => setIsOpen(false)}>
              {item.name}
            </a>
          ))}
          <a href="#donate" className="bg-medicalBlue text-white text-center py-4 rounded-xl font-bold shadow-lg" onClick={() => setIsOpen(false)}>Donate Now</a>
        </div>
      )}
    </nav>
  );
};

const SectionHeading = ({ subtitle, title, light = false, centered = false }: { subtitle: string; title: string; light?: boolean; centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-center lg:text-left'} reveal-on-scroll`}>
    <h4 className={`text-medicalBlue font-bold tracking-[0.2em] uppercase text-sm mb-3 ${light ? 'text-blue-300' : ''}`}>{subtitle}</h4>
    <h2 className={`text-3xl md:text-5xl font-bold leading-tight ${light ? 'text-white' : 'text-profNavy'}`}>{title}</h2>
    <div className={`relative h-2 mt-6 rounded-full overflow-hidden ${centered ? 'mx-auto w-24' : 'w-20'} ${light ? 'bg-white/10' : 'bg-medicalBlue/10'}`}>
      <div className={`absolute inset-0 rounded-full animate-shimmer ${light ? 'bg-white' : 'bg-medicalBlue'}`}></div>
    </div>
  </div>
);

const App: React.FC = () => {
  useScrollReveal();
  const [activeFilter, setActiveFilter] = useState('All');
  const [donationAmount, setDonationAmount] = useState<string>('');
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [chatMessages, setChatMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const [showSettings, setShowSettings] = useState(false);

  const WELCOME_MESSAGE = `### **Welcome to the PHIL Assistant** 🏥
*Advancing Health Equity and Empowering Communities in Liberia*

Greetings! I am the **PHIL Assistant**, your dedicated virtual guide to the **Progressive Health Initiative of Liberia (PHIL Inc.)**. 

Our mission is to advance health equity and empower underserved communities across Liberia through sustainable healthcare solutions and advocacy. I am here to provide you with detailed information about our programs, initiatives, and how you can support our vision.

**How can I assist you today?** You can explore:
*   🚀 **Our Programs**: WASH, Mental Health, Maternal & Child Health, and more.
*   🤝 **Get Involved**: Information on volunteering and partnership opportunities.
*   💰 **Support Our Mission**: Details on how to make a donation.
*   📍 **Contact Us**: Reach our offices in Maryland County, Liberia.

What would you like to learn about first?`;

  const startConversation = () => {
    setChatMessages([{ text: WELCOME_MESSAGE, sender: 'bot' }]);
  };
  const [chatMode, setChatMode] = useState<'n8n' | 'gemini' | 'openai'>(() => (localStorage.getItem('PHIL_CHAT_MODE') as any) || 'n8n');
  const [n8nUrl, setN8nUrl] = useState(() => localStorage.getItem('PHIL_N8N_URL') || 'https://lufnet.app.n8n.cloud/webhook/254e99e6-2295-4f70-af83-ec4d07e37fa6/chat');
  const [customApiKey, setCustomApiKey] = useState(() => localStorage.getItem('PHIL_GEMINI_API_KEY') || '');
  const [openaiKey, setOpenaiKey] = useState(() => localStorage.getItem('PHIL_OPENAI_KEY') || '');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const saveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('PHIL_CHAT_MODE', chatMode);
    localStorage.setItem('PHIL_N8N_URL', n8nUrl);
    localStorage.setItem('PHIL_GEMINI_API_KEY', customApiKey);
    localStorage.setItem('PHIL_OPENAI_KEY', openaiKey);
    setShowSettings(false);
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setChatInput('');
    setIsTyping(true);

    // Professional Greeting Interceptor
    const greetings = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'hi there', 'hello there'];
    if (greetings.includes(userMessage.toLowerCase().trim().replace(/[^\w\s]/gi, ''))) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const greetingResponse = `Hello! 👋
It's a pleasure to connect with you! I am the **PHIL Assistant**, your virtual guide to the **Progressive Health Initiative of Liberia (PHIL Inc.)**.

I am here to help you understand our mission of advancing health equity and to provide details on our various community-driven programs.

How can I assist you today?`;
      setChatMessages(prev => [...prev, { text: greetingResponse, sender: 'bot' }]);
      setIsTyping(false);
      return;
    }

    // Add a small artificial delay for other messages
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      let botResponse = "";

      if (chatMode === 'n8n') {
        const response = await fetch(n8nUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            chatInput: userMessage,
            message: userMessage,
            sessionId: sessionId
          })
        });
        
        if (!response.ok) throw new Error('n8n connection failed');
        const data = await response.json();
        
        if (typeof data === 'string') botResponse = data;
        else if (Array.isArray(data)) botResponse = data[0]?.output || data[0]?.text || data[0]?.message || JSON.stringify(data[0]);
        else if (typeof data === 'object' && data !== null) botResponse = data.output || data.text || data.message || data.response || JSON.stringify(data);
      } 
      else if (chatMode === 'openai') {
        if (!openaiKey) throw new Error('OpenAI Key not set');
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openaiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { 
                role: "system", 
                content: `You are the PHIL Assistant, a highly professional and empathetic virtual healthcare assistant for the Progressive Health Initiative of Liberia (PHIL Inc.). 
                Your goal is to provide detailed, well-formatted, and accurate information about PHIL Inc., its programs, mission, and general health-related topics.
                
                About PHIL Inc.:
                - Motto: HEALTH IS LIFE!
                - Mission: Advancing health equity and empowering underserved communities across Liberia through sustainable healthcare solutions and advocacy.
                - Programs: Public Health Promotion, Mental Health & Psychosocial Support, Water, Sanitation & Hygiene (WASH), Sexual and Reproductive Health, Maternal and Child Health, Nutrition, Youth Empowerment, Emergency Health Response.
                - Contact: philliberiajuly2@gmail.com, +231 775 001 972, +231 880 934 689.
                - Location: Maryland County, Liberia.
                
                Response Guidelines:
                - **Professionalism**: Maintain a formal yet warm and welcoming tone.
                - **Formatting**: Use Markdown extensively. Use bold text for emphasis, bullet points for lists, and clear headings if needed.
                - **Greetings**: When a user greets you (e.g., "hey", "hello", "hi"), respond with a professional greeting and a brief, formatted summary of how you can assist them, specifically mentioning PHIL Inc.'s core areas.
                - **Medical Disclaimer**: If asked for medical advice, always state: "*Disclaimer: I am an AI assistant. Please consult a professional healthcare provider for medical concerns.*"
                - **Conciseness**: Be detailed but scannable. Avoid long blocks of text.
                - **Call to Action**: Encourage users to learn about programs or get involved through volunteering/donations.`
              },
              { role: "user", content: userMessage }
            ]
          })
        });
        if (!response.ok) throw new Error('OpenAI connection failed');
        const data = await response.json();
        botResponse = data.choices[0].message.content;
      }
      else {
        const apiKey = customApiKey || process.env.GEMINI_API_KEY;
        if (!apiKey || apiKey === 'undefined') {
          throw new Error('GEMINI_API_KEY is not set.');
        }

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [{ role: "user", parts: [{ text: userMessage }] }],
          config: {
            systemInstruction: `You are the PHIL Assistant, a highly professional and empathetic virtual healthcare assistant for the Progressive Health Initiative of Liberia (PHIL Inc.). 
            Your goal is to provide detailed, well-formatted, and accurate information about PHIL Inc., its programs, mission, and general health-related topics.
            
            About PHIL Inc.:
            - Motto: HEALTH IS LIFE!
            - Mission: Advancing health equity and empowering underserved communities across Liberia through sustainable healthcare solutions and advocacy.
            - Programs: Public Health Promotion, Mental Health & Psychosocial Support, Water, Sanitation & Hygiene (WASH), Sexual and Reproductive Health, Maternal and Child Health, Nutrition, Youth Empowerment, Emergency Health Response.
            - Contact: philliberiajuly2@gmail.com, +231 775 001 972, +231 880 934 689.
            - Location: Maryland County, Liberia.
            
            Response Guidelines:
            - **Professionalism**: Maintain a formal yet warm and welcoming tone.
            - **Formatting**: Use Markdown extensively. Use bold text for emphasis, bullet points for lists, and clear headings if needed.
            - **Greetings**: When a user greets you (e.g., "hey", "hello", "hi"), respond with a professional greeting and a brief, formatted summary of how you can assist them, specifically mentioning PHIL Inc.'s core areas.
            - **Medical Disclaimer**: If asked for medical advice, always state: "*Disclaimer: I am an AI assistant. Please consult a professional healthcare provider for medical concerns.*"
            - **Conciseness**: Be detailed but scannable. Avoid long blocks of text.
            - **Call to Action**: Encourage users to learn about programs or get involved through volunteering/donations.`
          }
        });
        botResponse = response.text || "";
      }

      if (!botResponse || botResponse === "{}") {
        botResponse = "I've received your message, but I'm having trouble generating a response right now.";
      }
      
      setChatMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, { 
        text: `Sorry, I'm having trouble connecting to the ${chatMode.toUpperCase()} service. Please check your settings and connection.`, 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const filters = ['All', 'Hygiene', 'Engagement', 'Donations', 'Staff', 'Media'];

  const filteredItems = activeFilter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    setTimeout(() => setIsCopied(null), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative"
    >
      <Navbar />

      {/* Chat Widget */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-20 right-0 w-[90vw] md:w-[400px] h-[650px] bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            >
              {showWelcome ? (
                <div className="relative h-full w-full flex flex-col justify-end overflow-hidden bg-white">
                  {/* Background Doctor Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="https://res.cloudinary.com/dysfuy1yx/image/upload/v1772073885/pnllvg5dmohr7miitztn.jpg" 
                      alt="Healthcare Professional" 
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
                  </div>

                  <button 
                    onClick={() => setIsChatOpen(false)}
                    className="absolute top-6 right-6 z-20 p-2 bg-black/10 backdrop-blur-md hover:bg-black/20 rounded-full text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Welcome Card */}
                  <motion.div 
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 25 }}
                    className="relative z-10 bg-white m-5 p-10 rounded-[3rem] shadow-[0_10px_40px_rgba(0,0,0,0.08)] text-center space-y-6"
                  >
                    <div className="space-y-2">
                      <h3 className="text-[24px] font-[800] text-[#000000] leading-tight tracking-tight">
                        Your Virtual <br />
                        Healthcare <span className="text-[#4477ce]">Chatbot</span>
                      </h3>
                      <p className="text-[#8e8e8e] text-[13px] font-medium leading-relaxed px-1">
                        Your Virtual Healthcare Assistant: Partner in wellness, just a message away.
                      </p>
                    </div>

                    <button 
                      onClick={() => setShowWelcome(false)}
                      className="w-full bg-[#4477ce] hover:bg-[#3b6bc1] text-white p-2 rounded-full font-bold flex items-center justify-between group transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-[#4477ce]/20"
                    >
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                        <Box className="w-6 h-6 text-[#4477ce]" />
                      </div>
                      <span className="text-[16px] font-bold ml-2">Get Started</span>
                      <div className="flex items-center pr-5 text-white/60 group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4 -mr-2.5" />
                        <ChevronRight className="w-4 h-4 -mr-2.5" />
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="bg-medicalBlue p-6 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setShowWelcome(true)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold">PHIL Assistant</h4>
                          <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                        </div>
                        <p className="text-[10px] opacity-80 uppercase tracking-widest">Online & Ready</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        title="Chat Settings"
                      >
                        <Settings className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setIsChatOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {showSettings && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="bg-white border-b border-gray-100 p-6 space-y-4 shadow-inner"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-sm text-profNavy uppercase tracking-wider">Chat Settings</h5>
                        <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-profNavy">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Configure how the assistant connects to your AI services.
                      </p>
                      <form onSubmit={saveSettings} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase text-gray-400">Connection Mode</label>
                          <select 
                            value={chatMode}
                            onChange={(e) => setChatMode(e.target.value as any)}
                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-medicalBlue"
                          >
                            <option value="n8n">n8n Webhook (Recommended)</option>
                            <option value="gemini">Gemini AI</option>
                            <option value="openai">OpenAI Direct</option>
                          </select>
                        </div>

                        {chatMode === 'n8n' && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400">n8n Webhook URL</label>
                            <input 
                              type="text" 
                              value={n8nUrl}
                              onChange={(e) => setN8nUrl(e.target.value)}
                              placeholder="https://..."
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-medicalBlue"
                            />
                          </div>
                        )}

                        {chatMode === 'gemini' && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400">Gemini API Key</label>
                            <input 
                              type="password" 
                              value={customApiKey}
                              onChange={(e) => setCustomApiKey(e.target.value)}
                              placeholder="Enter Gemini Key"
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-medicalBlue"
                            />
                          </div>
                        )}

                        {chatMode === 'openai' && (
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400">OpenAI API Key</label>
                            <input 
                              type="password" 
                              value={openaiKey}
                              onChange={(e) => setOpenaiKey(e.target.value)}
                              placeholder="sk-..."
                              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-medicalBlue"
                            />
                          </div>
                        )}

                        <button 
                          type="submit"
                          className="w-full bg-medicalBlue text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all"
                        >
                          Save Settings
                        </button>
                      </form>
                    </motion.div>
                  )}
                  <div className="flex-grow flex flex-col bg-gray-50 overflow-hidden relative">
                    <div className="flex-grow overflow-y-auto p-6 space-y-4">
                      {chatMessages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                          <div className="w-16 h-16 bg-medicalBlue/10 rounded-2xl flex items-center justify-center text-medicalBlue animate-bounce">
                            <MessageCircle className="w-8 h-8" />
                          </div>
                          <div className="space-y-1">
                            <h5 className="font-bold text-profNavy">Start a Conversation</h5>
                            <p className="text-xs text-gray-500">Click below to begin chatting with our assistant.</p>
                          </div>
                          <button 
                            onClick={startConversation}
                            className="bg-medicalBlue text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-600 transition-all"
                          >
                            Start Chat
                          </button>
                        </div>
                      ) : (
                        <>
                          {chatMessages.map((msg, idx) => (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              key={idx}
                              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`max-w-[85%] p-4 rounded-2xl text-sm break-words ${
                                msg.sender === 'user' 
                                  ? 'bg-medicalBlue text-white rounded-tr-none shadow-md' 
                                  : 'bg-white text-profNavy rounded-tl-none shadow-md border border-gray-100'
                              }`}>
                                <div className="markdown-body">
                                  <Markdown>{msg.text}</Markdown>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                          {isTyping && (
                            <div className="flex justify-start">
                              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1">
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      <div ref={chatEndRef} />
                    </div>
                    
                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-grow bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-medicalBlue transition-all"
                      />
                      <button 
                        type="submit"
                        disabled={!chatInput.trim() || isTyping}
                        className="bg-medicalBlue text-white p-3 rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isChatOpen ? 'bg-profNavy text-white rotate-90' : 'bg-medicalBlue text-white'}`}
        >
          {isChatOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
          {!isChatOpen && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-healthTeal border-2 border-white rounded-full animate-pulse"></span>
          )}
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img src="https://res.cloudinary.com/dew5uptfr/image/upload/v1771076652/phil_page_dynxko.jpg" className="w-full h-full object-cover animate-slow-zoom" alt="NGO community work" />
          <div className="absolute inset-0 bg-gradient-to-r from-profNavy/95 via-profNavy/75 to-profNavy/30"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-8 animate-reveal">
            <span className="inline-block bg-healthTeal/20 backdrop-blur-md text-healthTeal border border-healthTeal/30 px-5 py-2 rounded-full text-xs font-bold tracking-[0.2em] uppercase">Motto: HEALTH IS LIFE!</span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1]">Advancing <span className="text-medicalBlue inline-block hover:scale-105 transition-transform duration-500">Health Equity</span> and Empowering Communities</h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-xl leading-relaxed font-light">PHIL Inc. is a registered nonprofit health organization committed to improving health outcomes through education, advocacy, and sustainable programs across Liberia.</p>
            <div className="flex flex-wrap gap-5 pt-4">
              <a href="#donate" className="bg-medicalBlue hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl transition-all hover:scale-105 hover:translate-y-[-4px] active:scale-95">Donate Now</a>
              <button 
                onClick={() => setIsChatOpen(true)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-bold transition-all hover:translate-y-[-4px] flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> Chat with Support
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Section - High Impact Layout */}
      <section id="ceo" className="py-32 bg-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 transform origin-top translate-x-20 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Sticky Photo and Core Titles */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="relative group">
                <div className="absolute -inset-4 bg-medicalBlue/5 rounded-[4rem] blur-2xl group-hover:bg-medicalBlue/10 transition-all duration-700"></div>
                <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl aspect-[4/5] border-8 border-white">
                  <img 
                    src={CEO_IMAGE} 
                    alt="Isaac Mendoabor Bleh, Jr." 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-profNavy/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-10 left-10 text-white">
                    <h3 className="text-3xl font-bold mb-1">Isaac M. Bleh, Jr.</h3>
                    <p className="text-healthTeal font-bold uppercase tracking-widest text-sm">Founder & Executive Director</p>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-6 bg-white p-8 rounded-3xl shadow-xl flex items-center gap-6 animate-float">
                  <div className="p-4 bg-medicalBlue/10 rounded-2xl text-medicalBlue">
                    <Globe className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-profNavy">Global Leader</p>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-tighter">Emerging Health Champion</p>
                  </div>
                </div>
              </div>

              <div className="mt-20 flex gap-4">
                <a href={LINKEDIN_URL} target="_blank" className="bg-profNavy text-white p-4 rounded-2xl hover:bg-medicalBlue transition-all">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href={FACEBOOK_URL} target="_blank" className="bg-profNavy text-white p-4 rounded-2xl hover:bg-medicalBlue transition-all">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Right: Detailed Biography */}
            <div className="lg:col-span-7 space-y-12">
              <div className="reveal-on-scroll">
                <h4 className="text-medicalBlue font-black tracking-[0.3em] uppercase text-sm mb-4">Leadership Spotlight</h4>
                <h2 className="text-4xl md:text-6xl font-extrabold text-profNavy leading-tight mb-8">Isaac Mendoabor <br/><span className="text-medicalBlue">Bleh, Jr.</span></h2>
                <div className="w-24 h-2 bg-healthTeal rounded-full mb-12"></div>
                
                <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed italic mb-10 border-l-4 border-medicalBlue pl-8">
                  "Isaac is a public health advocate, community development practitioner, and emerging global health leader committed to improving health outcomes in marginalized and underserved communities across Liberia."
                </p>
              </div>

              {/* Academic Background */}
              <div className="bg-gray-50 p-10 rounded-[2.5rem] reveal-on-scroll border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-medicalBlue">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h5 className="text-xl font-bold text-profNavy uppercase tracking-widest">Academic Excellence</h5>
                </div>
                <div className="space-y-6">
                  <div className="flex gap-6 items-start">
                    <div className="w-2 h-2 rounded-full bg-medicalBlue mt-2 shrink-0"></div>
                    <p className="text-gray-600 leading-relaxed font-medium">Currently studying <span className="text-profNavy font-bold">Biology</span> at William V.S. Tubman University and pursuing a <span className="text-profNavy font-bold">B.Sc. in Public Health</span> at the University of the People (USA – online).</p>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-2 h-2 rounded-full bg-medicalBlue mt-2 shrink-0"></div>
                    <p className="text-gray-600 leading-relaxed font-medium">Graduate of the <span className="text-profNavy font-bold">Aspire Leaders Program (Harvard Business School, USA)</span> and holds a Diploma in Global Leadership and Strategic Management.</p>
                  </div>
                </div>
              </div>

              {/* Professional Experience Grid */}
              <div className="grid md:grid-cols-2 gap-6 reveal-on-scroll">
                <div className="p-8 bg-white border border-gray-100 rounded-[2rem] hover:shadow-lg transition-all">
                  <Briefcase className="text-healthTeal w-8 h-8 mb-6" />
                  <h6 className="font-bold text-profNavy mb-3 text-lg">Current Roles</h6>
                  <ul className="text-sm text-gray-500 space-y-3 font-medium">
                    <li>• Rural Advocacy Officer (Street Child International)</li>
                    <li>• Officer Coordinator (Mission Support Ministry)</li>
                    <li>• President-Elect (Edu-Think Africa, 2025)</li>
                  </ul>
                </div>
                <div className="p-8 bg-white border border-gray-100 rounded-[2rem] hover:shadow-lg transition-all">
                  <Microscope className="text-medicalBlue w-8 h-8 mb-6" />
                  <h6 className="font-bold text-profNavy mb-3 text-lg">Advocacy Focus</h6>
                  <ul className="text-sm text-gray-500 space-y-3 font-medium">
                    <li>• Preventive Health & Behavioral Change</li>
                    <li>• Maternal & Child Health Equity</li>
                    <li>• Water, Sanitation & Hygiene (WASH)</li>
                  </ul>
                </div>
              </div>

              {/* The Vision & Founding */}
              <div className="reveal-on-scroll space-y-8 pt-8">
                <h5 className="text-2xl font-bold text-profNavy flex items-center gap-3">
                  <Award className="text-medicalBlue" /> The Founding Vision
                </h5>
                <p className="text-gray-600 leading-relaxed text-lg font-light">
                  Isaac founded the <span className="font-bold text-medicalBlue">Progressive Health Initiative of Liberia (PHIL Inc.)</span> in response to the persistent health challenges facing marginalized populations, especially in rural and underserved environments.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg font-light">
                  His vision is to strengthen community knowledge, promote preventive healthcare, and support sustainable health interventions that empower individuals and communities to take ownership of their well-being.
                </p>
                <div className="p-10 bg-profNavy rounded-[3rem] text-white relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                      <Shield className="w-40 h-40" />
                   </div>
                   <h6 className="text-healthTeal font-black uppercase tracking-[0.2em] text-xs mb-6">Values Guided Leadership</h6>
                   <p className="text-white text-lg font-medium leading-relaxed">
                     Guided by the values of equity, service, integrity, and community empowerment, Isaac is passionate about building partnerships and developing young leaders for improved public health in Liberia and beyond.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors Section */}
      <section id="board" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="PHIL'S" title="INCORPORATORS" centered />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mt-20">
            {BOARD_MEMBERS.map((member, idx) => (
              <div 
                key={member.id} 
                className="bg-gray-50 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 group border border-gray-100/50 reveal-on-scroll"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-profNavy/0 group-hover:bg-profNavy/40 transition-colors duration-500 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100">
                    <div className="space-y-4 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-3 text-white/80">
                        <MapPin className="w-5 h-5 text-healthTeal" />
                        <p className="text-xs font-medium leading-relaxed">{member.address}</p>
                      </div>
                      <div className="flex items-center gap-3 text-white/80">
                        <Phone className="w-5 h-5 text-healthTeal" />
                        <p className="text-xs font-medium">{member.cell}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-profNavy mb-2 group-hover:text-medicalBlue transition-colors">{member.name}</h3>
                  <p className="text-medicalBlue font-black uppercase tracking-[0.2em] text-[10px]">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Our Network" title="Institution Partners" centered />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {PARTNERS.map((partner, idx) => (
              <div 
                key={partner.id} 
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group flex flex-col items-center justify-center text-center reveal-on-scroll"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-full aspect-square mb-6 overflow-hidden rounded-2xl flex items-center justify-center bg-gray-50">
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h4 className="text-sm font-bold text-profNavy leading-tight">{partner.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative group reveal-on-scroll">
              <div className="relative z-10 overflow-hidden rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                <img src="https://res.cloudinary.com/dew5uptfr/image/upload/v1771073234/ceo-2_huaif8.jpg" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Health outreach" />
              </div>
              <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-healthTeal/10 rounded-full blur-[100px] z-0 animate-pulse"></div>
            </div>
            <div>
              <SectionHeading subtitle="Who We Are" title="Dedicated to a Healthier Liberia" />
              <p className="text-gray-600 mb-10 leading-relaxed text-xl font-light reveal-on-scroll">Progressive Health Initiative of Liberia (PHIL Inc.) is a registered not-for-profit health NGO. We specialize in advancing health equity, empowering communities, and improving access to healthcare services across the underserved sectors of Liberia.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16 reveal-on-scroll">
                {CORE_VALUES.map((val) => (
                  <div key={val.title} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-500 group">
                    <div className="text-medicalBlue mb-6 group-hover:scale-110 group-hover:rotate-[10deg] transition-transform duration-500">{val.icon}</div>
                    <h5 className="font-bold text-profNavy mb-2 text-lg">{val.title}</h5>
                    <p className="text-gray-500 text-xs leading-relaxed font-medium uppercase tracking-wider">{val.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="What We Do" title="Our Core Programs" centered />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
            {PROGRAMS.map((program, idx) => (
              <div 
                key={program.id} 
                className="p-10 rounded-[3rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-700 group reveal-on-scroll"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-16 h-16 bg-medicalBlue/10 rounded-2xl flex items-center justify-center text-medicalBlue mb-8 group-hover:scale-110 group-hover:bg-medicalBlue group-hover:text-white transition-all duration-500 shadow-sm">
                  {React.cloneElement(program.icon as any, { className: "w-8 h-8" })}
                </div>
                <h3 className="text-2xl font-bold text-profNavy mb-4 group-hover:text-medicalBlue transition-colors">{program.title}</h3>
                <p className="text-gray-500 leading-relaxed font-light">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 reveal-on-scroll">
            <div className="w-16 h-16 bg-medicalBlue/10 rounded-2xl flex items-center justify-center text-medicalBlue mb-6 shadow-sm border border-medicalBlue/5">
              <Camera className="w-8 h-8" />
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-profNavy mb-4 text-center">Our Gallery</h2>
            <p className="text-gray-500 text-lg max-w-2xl text-center font-light leading-relaxed">
              Capturing the journey of excellence, health equity, and community development at PHIL Inc.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-16 reveal-on-scroll">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 border ${
                  activeFilter === filter 
                    ? 'bg-profNavy border-profNavy text-white shadow-xl scale-105' 
                    : 'bg-white border-gray-100 text-gray-500 hover:border-medicalBlue/30 hover:bg-gray-50'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.map((item, idx) => (
              <div 
                key={item.id} 
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 group border border-gray-100/50 reveal-on-scroll"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-profNavy/0 group-hover:bg-profNavy/20 transition-colors duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                      <Plus className="w-6 h-6 text-medicalBlue" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-2 h-2 bg-medicalBlue rounded-full"></span>
                    <span className="text-medicalBlue text-[10px] font-black uppercase tracking-[0.2em] block">{item.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-profNavy group-hover:text-medicalBlue transition-colors duration-300">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-[#F3F4F6] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-medicalBlue rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-healthTeal rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading subtitle="Voices of Impact" title="What the Community Says" centered />
          
          <div className="relative mt-24 max-w-6xl mx-auto">
            {/* Navigation Arrows */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-20 w-12 h-12 bg-healthTeal rounded-full flex items-center justify-center text-white shadow-lg hover:bg-medicalBlue transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-20 w-12 h-12 bg-healthTeal rounded-full flex items-center justify-center text-white shadow-lg hover:bg-medicalBlue transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="overflow-hidden px-4">
              <motion.div 
                className="flex gap-8"
                animate={{ x: isMobile ? `-${testimonialIndex * 100}%` : `0%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {TESTIMONIALS.map((testimonial, idx) => (
                  <div 
                    key={idx} 
                    className={`${isMobile ? 'min-w-full' : 'min-w-[calc(33.333%-1.33rem)]'} bg-white rounded-[2rem] overflow-hidden flex flex-col shadow-sm group reveal-on-scroll`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    {/* Top White Section with Avatar */}
                    <div className="h-28 w-full bg-white relative flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-100 overflow-hidden shadow-md z-10 transform group-hover:scale-110 transition-transform duration-500">
                        <img src={testimonial.photo} alt={testimonial.name} className="w-full h-full object-cover" />
                      </div>
                    </div>

                    {/* Bottom Green Section */}
                    <div className="bg-healthTeal p-10 pt-12 pb-14 rounded-t-[3.5rem] text-white text-center relative flex-grow flex flex-col">
                      <Quote className="absolute top-8 left-8 w-6 h-6 opacity-30" />
                      <p className="serif italic text-lg leading-relaxed mb-10 flex-grow">
                        "{testimonial.text}"
                      </p>
                      <Quote className="absolute bottom-24 right-8 w-6 h-6 opacity-30 rotate-180" />
                      
                      <div className="mt-auto">
                        <h4 className="font-bold text-xl tracking-[0.2em] uppercase mb-4">{testimonial.name}</h4>
                        <div className="w-8 h-2 bg-white mx-auto rounded-full opacity-50"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-12">
              {TESTIMONIALS.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${testimonialIndex === idx ? 'bg-healthTeal w-8' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle="Measured Success" title="Tangible Impact Across Liberia" centered />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {ACHIEVEMENTS.map((ach, idx) => (
              <div 
                key={ach.label} 
                className="text-center p-12 bg-gray-50 rounded-[3.5rem] border border-gray-100 hover:bg-profNavy transition-all duration-700 group hover:scale-105 shadow-sm reveal-on-scroll"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="relative inline-block mb-6">
                  <div className="absolute -inset-4 bg-medicalBlue/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  <p className="text-5xl lg:text-7xl font-black text-medicalBlue group-hover:text-healthTeal transition-colors relative z-10">
                    {ach.value}{ach.suffix}
                  </p>
                </div>
                <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[10px] group-hover:text-white/60 transition-colors">
                  {ach.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section id="membership" className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <SectionHeading subtitle="Join Our Mission" title="Become a Member" centered />
            
            <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl border border-gray-100 relative overflow-hidden reveal-on-scroll text-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-medicalBlue/5 rounded-bl-[10rem] -z-0"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-healthTeal/5 rounded-tr-[8rem] -z-0"></div>
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                <div className="inline-block p-1 bg-white rounded-3xl mb-4 shadow-sm overflow-hidden border border-gray-100">
                  <img 
                    src="https://res.cloudinary.com/dew5uptfr/image/upload/v1771073719/logo_znyfq9.jpg" 
                    alt="PHIL Inc. Logo" 
                    className="w-24 h-24 object-cover rounded-[1.5rem]" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold text-profNavy">Ready to make a difference?</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Join PHIL Inc. and be part of a dedicated team working to advance health equity and community development in Liberia. We are looking for passionate volunteers, health professionals, and advocates.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                  <a 
                    href="https://forms.gle/ySAHGY4m92CZFiPD8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-medicalBlue hover:bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl hover:translate-y-[-4px] flex items-center justify-center gap-3"
                  >
                    Fill Out Membership Form <ExternalLink className="w-5 h-5" />
                  </a>
                  <a 
                    href="#contact" 
                    className="w-full sm:w-auto bg-white border-2 border-gray-100 hover:border-medicalBlue/30 text-profNavy px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:bg-gray-50"
                  >
                    Contact Us First
                  </a>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-healthTeal" /> Volunteer
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-healthTeal" /> Partner
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-healthTeal" /> Advocate
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
            {/* Top Banner */}
            <div className="inline-block bg-profNavy text-white px-8 py-3 rounded-xl font-black tracking-[0.2em] text-xs mb-12 shadow-lg">
              SUPPORT COMMUNITY HEALTH
            </div>

            {/* Main Headline */}
            <h2 className="text-5xl md:text-7xl font-black text-profNavy mb-10 leading-[1.1] tracking-tight">
              HELP US IMPROVE <span className="text-medicalBlue">HEALTH</span> AND SAVE <span className="text-healthTeal">LIVES.</span>
            </h2>

            {/* Sub-Text */}
            <div className="space-y-6 text-gray-600 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed mb-12">
              <p>
                Your donation supports life-saving health programs, medical outreach, sanitation initiatives, and community health education for underserved populations.
              </p>
              <p>
                Every contribution helps expand access to essential healthcare services across Liberia and the world.
              </p>
              <p className="text-2xl pt-4">
                👇 Click below to make an impact today.
              </p>
            </div>

            {/* Main Action Button */}
            <a 
              href="#payment-options"
              className="inline-block border-4 border-profNavy hover:bg-profNavy hover:text-white text-profNavy px-12 py-6 rounded-2xl font-black text-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:translate-y-[-4px] mb-24 uppercase tracking-widest"
            >
              DONATE TO SUPPORT HEALTH
            </a>

            {/* Liberia Map Graphic */}
            <div className="relative max-w-2xl mx-auto opacity-80 group">
              <img 
                src="https://res.cloudinary.com/dew5uptfr/image/upload/v1771076652/phil_page_dynxko.jpg" 
                className="w-full h-auto rounded-[3rem] grayscale group-hover:grayscale-0 transition-all duration-1000" 
                alt="Liberia Community Impact" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
              
              {/* Decorative Pins (Simulating the map in the image) */}
              {[
                { top: '20%', left: '30%' },
                { top: '40%', left: '50%' },
                { top: '60%', left: '40%' },
                { top: '30%', left: '70%' },
                { top: '70%', left: '60%' },
                { top: '50%', left: '20%' },
              ].map((pin, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute w-4 h-4 bg-medicalBlue rounded-full shadow-[0_0_20px_rgba(0,82,204,0.6)]"
                  style={{ top: pin.top, left: pin.left }}
                >
                  <div className="absolute inset-0 animate-ping bg-medicalBlue rounded-full opacity-75"></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Payment Options (Target for the button) */}
          <div id="payment-options" className="mt-32 pt-32 border-t border-gray-100">
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-profNavy mb-4">Choose Your Payment Method</h3>
              <p className="text-gray-500">Direct support via Bank or Mobile Money</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-start reveal-on-scroll max-w-5xl mx-auto">
              {/* Bank Transfer */}
              <div className="bg-white rounded-[3rem] p-12 shadow-2xl border border-gray-50">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 bg-medicalBlue rounded-2xl">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-profNavy">Bank Transfer</h3>
                </div>
                <div className="space-y-6">
                  <div className="bg-gray-50 p-8 rounded-3xl border-2 border-gray-100 flex justify-between items-center hover:border-medicalBlue/50 transition-all">
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Account Number (USD)</p>
                      <p className="font-bold text-xl sm:text-2xl tracking-tight text-profNavy">00421851403140302</p>
                    </div>
                    <button onClick={() => copyToClipboard('00421851403140302', 'bank')} className="p-4 bg-medicalBlue/10 text-medicalBlue hover:bg-medicalBlue hover:text-white rounded-2xl transition-all">
                      {isCopied === 'bank' ? <CheckCircle className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                    </button>
                  </div>
                  <div className="p-6 bg-medicalBlue/5 rounded-2xl border border-medicalBlue/10">
                    <p className="text-sm text-medicalBlue font-medium flex items-center gap-2">
                      <Shield className="w-4 h-4" /> Secure institutional account for PHIL Inc.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Money */}
              <div className="bg-profNavy rounded-[3rem] p-12 shadow-2xl text-white">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 bg-healthTeal rounded-2xl">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold">Mobile Money</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex justify-between items-center hover:border-medicalBlue/50 transition-all">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Primary Number</p>
                      <a href="tel:+231889561405" className="font-bold text-xl hover:text-medicalBlue transition-colors">+231 889 561 405</a>
                    </div>
                    <button onClick={() => copyToClipboard('+231889561405', 'mtn1')} className="p-3 bg-white/5 hover:bg-medicalBlue rounded-xl transition-all">
                      {isCopied === 'mtn1' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex justify-between items-center hover:border-medicalBlue/50 transition-all">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Secondary Number</p>
                      <a href="tel:+231775001972" className="font-bold text-xl hover:text-medicalBlue transition-colors">+231 775 001 972</a>
                    </div>
                    <button onClick={() => copyToClipboard('+231775001972', 'mtn2')} className="p-3 bg-white/5 hover:bg-medicalBlue rounded-xl transition-all">
                      {isCopied === 'mtn2' ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 reveal-on-scroll">
              <SectionHeading 
                subtitle="Get In Touch" 
                title="Have Questions? We're Here to Help." 
                centered
              />
              <p className="text-gray-600 text-lg mt-6 leading-relaxed">
                Whether you're interested in volunteering, partnering with us, or simply want to learn more about our health initiatives, our team is ready to connect with you.
              </p>
            </div>
            
            <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 reveal-on-scroll overflow-hidden flex flex-col h-[600px]">
              {/* Embedded Chat Header */}
              <div className="bg-medicalBlue p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">PHIL Assistant</h4>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-healthTeal rounded-full animate-pulse"></span>
                      <p className="text-xs opacity-80 uppercase tracking-widest">Online & Ready</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  title="Chat Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              {showSettings && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="bg-white border-b border-gray-100 p-6 space-y-4 shadow-inner"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-sm text-profNavy uppercase tracking-wider">Chat Settings</h5>
                    <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-profNavy">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <form onSubmit={saveSettings} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase text-gray-400">Connection Mode</label>
                      <select 
                        value={chatMode}
                        onChange={(e) => setChatMode(e.target.value as any)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-medicalBlue"
                      >
                        <option value="n8n">n8n Webhook (Recommended)</option>
                        <option value="gemini">Gemini AI</option>
                        <option value="openai">OpenAI Direct</option>
                      </select>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-medicalBlue text-white py-3 rounded-xl font-bold text-sm hover:bg-blue-600 transition-all"
                    >
                      Save Settings
                    </button>
                  </form>
                </motion.div>
              )}

              <div className="flex-grow flex flex-col bg-gray-50 overflow-hidden relative">
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {chatMessages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-6">
                      <div className="w-20 h-20 bg-medicalBlue/10 rounded-3xl flex items-center justify-center text-medicalBlue animate-bounce">
                        <MessageCircle className="w-10 h-10" />
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-xl font-bold text-profNavy">Welcome to PHIL Support</h5>
                        <p className="text-gray-500 text-sm max-w-xs">Our assistant is ready to help you with any questions about our health initiatives.</p>
                      </div>
                      <button 
                        onClick={startConversation}
                        className="bg-medicalBlue text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-600 transition-all hover:scale-105 active:scale-95"
                      >
                        Start Conversation
                      </button>
                    </div>
                  ) : (
                    <>
                      {chatMessages.map((msg, idx) => (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={idx}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[85%] p-4 rounded-2xl text-sm break-words ${
                            msg.sender === 'user' 
                              ? 'bg-medicalBlue text-white rounded-tr-none shadow-md' 
                              : 'bg-white text-profNavy rounded-tl-none shadow-md border border-gray-100'
                          }`}>
                            <div className="markdown-body">
                              <Markdown>{msg.text}</Markdown>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex gap-1">
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                  <div ref={chatEndRef} />
                </div>
                
                <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-medicalBlue transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!chatInput.trim() || isTyping}
                    className="bg-medicalBlue text-white p-3 rounded-xl hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Footer */}
      <footer className="bg-profNavy text-white pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-medicalBlue via-healthTeal to-medicalBlue opacity-20"></div>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-16 mb-24">
            <div className="lg:col-span-1 space-y-8">
              <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                <LogoMotion isScrolled={false} />
                <span className="font-bold text-3xl tracking-tight">PHIL Inc.</span>
              </div>
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                Advancing health equity and empowering underserved communities across Liberia through sustainable healthcare solutions and advocacy.
              </p>
              <div className="space-y-1 text-[10px] text-gray-500 font-bold uppercase tracking-widest border-l-2 border-medicalBlue/30 pl-4">
                <p>Est. July 2, 2022</p>
                <p>Initial Registration date: July 25, 2023</p>
                <p>Registration date: August 15, 2023</p>
                <p>Date of Issuance: August 15, 2023</p>
              </div>
              <div className="flex gap-4">
                <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-medicalBlue transition-all border border-white/10">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-medicalBlue transition-all border border-white/10">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-medicalBlue transition-all border border-white/10">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center hover:bg-medicalBlue transition-all border border-white/10">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-10 uppercase tracking-[0.2em] text-medicalBlue">Explore PHIL</h4>
              <ul className="space-y-4 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Our Mission</a></li>
                <li><a href="#programs" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Core Programs</a></li>
                <li><a href="#gallery" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Activity Gallery</a></li>
                <li><a href="#donate" className="hover:text-white transition-colors flex items-center gap-2 group"><ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /> Make a Donation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-10 uppercase tracking-[0.2em] text-medicalBlue">Contact Us</h4>
              <ul className="space-y-6 text-gray-400">
                <li className="flex gap-4">
                  <MapPin className="w-6 h-6 text-healthTeal shrink-0" />
                  <span>Maryland County, Liberia</span>
                </li>
                <li className="flex gap-4">
                  <Phone className="w-6 h-6 text-healthTeal shrink-0" />
                  <span>
                    <a href="tel:+231775001972" className="hover:text-white transition-colors">+231 775 001 972</a><br />
                    <a href="tel:+231880934689" className="hover:text-white transition-colors">+231 880 934 689</a>
                  </span>
                </li>
                <li className="flex gap-4">
                  <Mail className="w-6 h-6 text-healthTeal shrink-0" />
                  <span>
                    <a href="mailto:philliberiajuly2@gmail.com" className="hover:text-white transition-colors">philliberiajuly2@gmail.com</a>
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-bold text-sm mb-10 uppercase tracking-[0.2em] text-medicalBlue">Stay Updated</h4>
              <p className="text-gray-400 text-sm">Join our newsletter to receive updates on our health missions.</p>
              <div className="relative group">
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 focus:border-medicalBlue focus:outline-none transition-all pr-16" />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-medicalBlue p-3 rounded-xl hover:bg-blue-600 transition-all">
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500 font-medium italic">
                <Shield className="w-4 h-4" /> Your data is secure with us.
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="text-gray-500 text-sm font-medium tracking-wide uppercase tracking-widest">
              © 2026 PROGRESSIVE HEALTH INITIATIVE OF LIBERIA (PHIL INC.) • ALL RIGHTS RESERVED
            </div>
            <div className="flex gap-8 text-xs font-bold text-gray-500 tracking-widest">
              <a href="#" className="hover:text-white transition-colors uppercase">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors uppercase">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default App;
