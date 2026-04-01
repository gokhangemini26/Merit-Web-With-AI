"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, MicOff, Monitor, MonitorOff, Play, Square, 
  Calendar, ArrowRight, Sparkles, Workflow, Cpu, 
  Layers, MessageSquare, ChevronRight, Menu, X,
  PhoneCall, Globe, Zap, ShieldCheck, XCircle, Camera, CameraOff
} from "lucide-react";
import { GeminiLiveClient } from "@/lib/gemini-live";
import { usePathname, useRouter } from "next/navigation";

// --- i18n Translations ---

const TRANSLATIONS: Record<string, any> = {
  tr: {
    btnChat: "Danışmanla Sohbet Et",
    btnEnd: "Görüşmeyi Bitir",
    btnConnecting: "Bağlanıyor...",
    welcomeTitle: "Merit Tekstil",
    welcomeSubtitle: "Yapay Zeka Danışmanı",
    welcomeDesc: "Merit Tekstil'in dünyasını yapay zeka danışmanımız eşliğinde keşfetmeye hazır mısınız?",
    welcomeBtn: "Görüşmeyi Başlat",
    greeting: "Merhaba, Merit Tekstil'e hoş geldiniz. Size yardımcı olmaktan mutluluk duyarım.",
    aiRole: "Sen Merit Tekstil'in yapay zeka danışmanısın. Tekstil üretimi, sürdürülebilirlik ve küresel operasyonlar konularında bilgi veriyorsun.",
    indicatorNavigating: "Yönlendiriliyorsunuz",
    indicatorShowing: "gösteriliyor",
    errorTitle: "Erişim Sorunu",
    errorMic: "Mikrofon erişimi reddedildi.",
  },
  en: {
    btnChat: "Talk to Consultant",
    btnEnd: "End Conversation",
    btnConnecting: "Connecting...",
    welcomeTitle: "Merit Tekstil",
    welcomeSubtitle: "AI Consultant",
    welcomeDesc: "Are you ready to explore the world of Merit Tekstil with our AI consultant?",
    welcomeBtn: "Start Session",
    greeting: "Hello, welcome to Merit Tekstil. I would be happy to help you.",
    aiRole: "You are Merit Tekstil's AI consultant. You provide information about textile production, sustainability, and global operations.",
    indicatorNavigating: "Navigating to",
    indicatorShowing: "showing",
    errorTitle: "Access Issue",
    errorMic: "Microphone access denied.",
  },
  es: {
    btnChat: "Hablar con Consultor",
    btnEnd: "Finalizar",
    welcomeTitle: "Merit Tekstil",
    welcomeSubtitle: "Consultor de IA",
    welcomeDesc: "¿Estás listo para explorar el mundo de Merit Tekstil con nuestro consultor de IA?",
    welcomeBtn: "Iniciar Sesión",
    greeting: "Hola, bienvenido a Merit Tekstil. Estaré encantado de ayudarte.",
    aiRole: "Eres el consultor de IA de Merit Tekstil. Brindas información sobre producción textil, sostenibilidad y operaciones globales.",
    indicatorNavigating: "Navegando a",
    indicatorShowing: "mostrando",
  },
  it: {
    btnChat: "Parla con il Consulente",
    btnEnd: "Termina",
    welcomeTitle: "Merit Tekstil",
    welcomeSubtitle: "Consulente IA",
    welcomeDesc: "Sei pronto a esplorare il mondo di Merit Tekstil con il nostro consulente IA?",
    welcomeBtn: "Inizia Sessione",
    greeting: "Buongiorno, benvenuto in Merit Tekstil. Sarei felice di aiutarla.",
    aiRole: "Sei il consulente IA di Merit Tekstil. Fornisci informazioni sulla produzione tessile, la sostenibilità e le operazioni globali.",
    indicatorNavigating: "Navigazione verso",
    indicatorShowing: "mostrando",
  }
};

const LOGO_URL = "/images/logo.png";

const getSystemInstruction = (lang: string) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return `
${t.aiRole}
GİRİŞ: "Başla" komutunu aldığında, kullanıcıya HEMEN şu cümleyle başla: "${t.greeting}"

SEKSIYON YÖNLENDiRME: Konu değiştiğinde mutlaka anahtar kelimeleri söyle:
- Ürünler/Products: "ürünlerimizi inceleyelim" veya "products"
- Süreç/Process: "üretim sürecimiz" veya "production process"
- Müşteriler/Clients: "müşterilerimiz" veya "clients"
- İletişim/Contact: "iletişim sayfası" veya "contact"
- Sosyal Sorumluluk/Sustainability: "sosyal sorumluluk" veya "sustainability"

Konuşma tarzın: Profesyonel, bilgilendirici, kurumsal.
Dil: ${lang === 'tr' ? 'Türkçe' : lang === 'es' ? 'Español' : lang === 'it' ? 'Italiano' : 'English'}.
`;
};

export function AIConsultant() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [lang, setLang] = useState('en');
  const [isLive, setIsLive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [transcriptions, setTranscriptions] = useState<{ text: string; isUser: boolean }[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);
  const [aiCursorPos, setAiCursorPos] = useState({ x: -200, y: -200 });
  const [aiCursorVisible, setAiCursorVisible] = useState(false);

  const clientRef = useRef<GeminiLiveClient | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const pendingAudioStreamRef = useRef<MediaStream | null>(null);

  // --- Auto-open after 1s ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWelcomeVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- IP-based Language Detection ---
  useEffect(() => {
    const fetchGeo = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        const country = data.country_code?.toUpperCase();
        if (country === 'TR') setLang('tr');
        else if (['ES', 'MX', 'AR', 'CO', 'CL', 'PE'].includes(country)) setLang('es');
        else if (country === 'IT') setLang('it');
        else setLang('en');
      } catch {
        const browserLang = navigator.language.split('-')[0];
        if (['tr', 'es', 'it'].includes(browserLang)) setLang(browserLang);
        else setLang('en');
      }
    };
    fetchGeo();
  }, []);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({
        sampleRate: 16000,
      });
    }
    return audioContextRef.current;
  }, []);

  const playNextAudio = useCallback(async () => {
    if (audioQueueRef.current.length === 0 || isPlayingRef.current) return;
    isPlayingRef.current = true;
    const base64Data = audioQueueRef.current.shift()!;
    const audioContext = getAudioContext();
    const binaryString = atob(base64Data);
    const bytes = new Int16Array(binaryString.length / 2);
    for (let i = 0; i < binaryString.length; i += 2) {
      bytes[i / 2] = (binaryString.charCodeAt(i + 1) << 8) | binaryString.charCodeAt(i);
    }
    const float32Data = new Float32Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) float32Data[i] = bytes[i] / 32768.0;

    const buffer = audioContext.createBuffer(1, float32Data.length, 24000);
    buffer.getChannelData(0).set(float32Data);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    const updateLevel = () => {
      if (!isPlayingRef.current) return;
      analyser.getByteFrequencyData(dataArray);
      setAudioLevel(dataArray.reduce((a, b) => a + b) / dataArray.length / 128);
      requestAnimationFrame(updateLevel);
    };
    updateLevel();

    source.onended = () => {
      isPlayingRef.current = false;
      setAudioLevel(0);
      playNextAudio();
    };
    source.start();
  }, [getAudioContext]);

  const startAudioCapture = async (existingStream?: MediaStream) => {
    try {
      const stream = existingStream || await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const audioContext = getAudioContext();
      if (audioContext.state === 'suspended') await audioContext.resume();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
        const base64Data = btoa(String.fromCharCode(...new Uint8Array(pcmData.buffer)));
        clientRef.current?.sendAudio(base64Data);
      };
      source.connect(processor);
      processor.connect(audioContext.destination);
      processorRef.current = processor;
      setIsMicOn(true);
    } catch (err) {
      console.error("Mic error:", err);
    }
  };

  const detectAndNavigate = useCallback((text: string) => {
    const t = text.toLowerCase();
    if (/ürün|product/.test(t)) { router.push('/products'); setActiveSection('products'); }
    else if (/müşteri|client/.test(t)) { router.push('/clients'); setActiveSection('clients'); }
    else if (/süreç|process/.test(t)) { router.push('/process'); setActiveSection('process'); }
    else if (/iletişim|contact/.test(t)) { router.push('/contact'); setActiveSection('contact'); }
    else if (/sosyal|social|sürdürülebilirlik|sustainability/.test(t)) { router.push('/social-responsibility'); setActiveSection('social'); }
    
    if (activeSection) {
      setIsSpotlightActive(true);
      setTimeout(() => setIsSpotlightActive(false), 5000);
    }
  }, [router, activeSection]);

  const toggleLive = async () => {
    if (isLive) {
      clientRef.current?.close();
      clientRef.current = null;
      streamRef.current?.getTracks().forEach(t => t.stop());
      setIsLive(false);
      setIsMicOn(false);
      return;
    }

    setIsConnecting(true);
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      clientRef.current = new GeminiLiveClient(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "", {
        systemInstruction: getSystemInstruction(lang),
        onAudioData: (data) => {
          audioQueueRef.current.push(data);
          playNextAudio();
          if (pendingAudioStreamRef.current) {
            const stream = pendingAudioStreamRef.current;
            pendingAudioStreamRef.current = null;
            setTimeout(() => startAudioCapture(stream), 1000);
          }
        },
        onTranscription: (text, isUser) => {
          setTranscriptions(prev => [...prev.slice(-3), { text, isUser }]);
          if (text) detectAndNavigate(text);
        },
        onClose: () => setIsLive(false),
      });

      await clientRef.current.connect();
      setIsLive(true);
      setIsConnecting(false);
      pendingAudioStreamRef.current = audioStream;
      clientRef.current.triggerGreeting();
    } catch (err) {
      console.error("Connection failed:", err);
      setIsConnecting(false);
    }
  };

  return (
    <>
      {/* Spotlight Effect */}
      <AnimatePresence>
        {isSpotlightActive && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isLive && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-[#002e5d]/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-2xl w-72 mb-2"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-widest">Live Consultant</span>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto no-scrollbar">
                {transcriptions.map((tr, i) => (
                  <div key={i} className={`text-sm ${tr.isUser ? 'text-gray-300 italic' : 'text-white font-medium'}`}>
                    {tr.isUser ? 'You: ' : 'AI: '}{tr.text}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => isLive ? toggleLive() : setIsWelcomeVisible(true)}
          className={`group h-16 w-16 rounded-full flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 ${
            isLive ? 'bg-red-600' : 'bg-[#e63946]'
          }`}
        >
          {isLive ? <Square className="text-white w-6 h-6 fill-current" /> : <MessageSquare className="text-white w-7 h-7" />}
          
          {/* Audio Visualizer Ring */}
          {isLive && (
            <motion.div 
              animate={{ scale: 1 + audioLevel * 0.5, opacity: 0.5 - audioLevel * 0.3 }}
              className="absolute inset-0 rounded-full bg-red-500 -z-10"
            />
          )}
        </button>
      </div>

      {/* Welcome Screen Overlay */}
      <AnimatePresence>
        {isWelcomeVisible && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-[#002e5d]"
          >
            <div className="text-center p-8 max-w-lg">
              <motion.img 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                src={LOGO_URL} 
                className="h-24 mx-auto mb-8 grayscale brightness-200"
              />
              <h2 className="text-4xl font-bold mb-4 text-white">{t.welcomeTitle}</h2>
              <p className="text-white/70 mb-10 text-lg leading-relaxed">{t.welcomeDesc}</p>
              <button 
                onClick={() => { setIsWelcomeVisible(false); toggleLive(); }}
                className="bg-[#e63946] text-white px-10 py-5 rounded-full text-xl font-bold flex items-center gap-3 mx-auto hover:bg-red-700 transition-colors shadow-2xl"
              >
                {t.welcomeBtn} <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
