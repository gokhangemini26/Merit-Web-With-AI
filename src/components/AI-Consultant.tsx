"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, ArrowRight, X, Square, Languages
} from "lucide-react";
import { GeminiLiveClient } from "@/lib/gemini-live";
import { usePathname, useRouter, Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { useSpotlight } from "@/components/SpotlightProvider";

const LOGO_URL = "/images/logo.png";

export function AIConsultant() {
  const t = useTranslations("consultant");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { setHighlight } = useSpotlight();
  
  const [isLive, setIsLive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [transcriptions, setTranscriptions] = useState<{ text: string; isUser: boolean }[]>([]);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const [showPermissionError, setShowPermissionError] = useState(false);
  const [permissionErrorMessage, setPermissionErrorMessage] = useState("");

  const clientRef = useRef<GeminiLiveClient | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioQueueRef = useRef<string[]>([]);
  const isPlayingRef = useRef(false);
  const pendingAudioStreamRef = useRef<MediaStream | null>(null);
  const activeSourceRef = useRef<AudioBufferSourceNode | null>(null);

  const addDebug = (msg: string) => {
    console.log(`[AIConsultant] ${msg}`);
  };

  const stopActiveAudio = useCallback(() => {
    if (activeSourceRef.current) {
      try {
        activeSourceRef.current.stop();
      } catch (e) {}
      activeSourceRef.current = null;
    }
    isPlayingRef.current = false;
  }, []);

  // --- Auto-open after 1s ---
  useEffect(() => {
    const timer = setTimeout(() => setIsWelcomeVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

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
    
    activeSourceRef.current = source;
    
    source.onended = () => {
      if (activeSourceRef.current === source) {
        activeSourceRef.current = null;
      }
      isPlayingRef.current = false;
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
        
        const sum = inputData.reduce((a, b) => a + Math.abs(b), 0);
        setAudioLevel(sum / inputData.length * 5);
      };
      
      source.connect(processor);
      processor.connect(audioContext.destination);
      processorRef.current = processor;
      setIsMicOn(true);
    } catch (err: any) {
      addDebug(`Mic error: ${err.message}`);
    }
  };

  const detectAndNavigate = useCallback((text: string) => {
    const t = text.toLowerCase();
    
    // 1. Handle Language Switch Command from AI
    const langMatch = t.match(/\[set_lang:\s*(tr|en|de|it|zh)\]/i);
    if (langMatch && langMatch[1]) {
      const newLang = langMatch[1].toLowerCase();
      if (newLang !== locale) {
        // Redirect to same path but different locale
        const newPath = pathname; 
        router.push(newPath as any, { locale: newLang });
        return;
      }
    }

    let targetSection: string | null = null;
    let targetPath: string | null = null;

    if (/hakkımızda|about us|über uns|chi siamo|关于我们/.test(t)) {
      targetPath = '/';
      targetSection = 'about';
    } else if (/ürün|product|produkt|prodotto|产品/.test(t)) {
      targetPath = '/products';
      targetSection = 'products';
    } else if (/süreç|process|prozess|processo|生产工艺|工艺/.test(t)) {
      targetPath = '/process';
      targetSection = 'process';
    } else if (/müşteri|client|kunden|clienti|客户/.test(t)) {
      targetPath = '/clients';
      targetSection = 'clients';
    } else if (/iletişim|contact|kontakt|contatti|联系/.test(t)) {
      targetPath = '/contact';
      targetSection = 'contact';
    } else if (/sosyal|social|sürdürülebilirlik|sustainability|verantwortung|responsabilità|责任|可持续/.test(t)) {
      targetPath = '/social-responsibility';
      targetSection = 'social';
    }
    
    if (targetPath) {
      router.push(targetPath as any);
      if (targetSection) {
        setTimeout(() => {
          setHighlight(targetSection);
          setTimeout(() => setHighlight(null), 16000); 
        }, 800);
      }
    }
  }, [router, setHighlight, locale, pathname]);

  const getSystemInstruction = useCallback(() => {
    return `
${t("aiRole")}
ROLE: You are the Merit Textile AI Consultant. You are polyglot and you MUST respond in the SAME language the user speaks to you.
SUPPORTED LANGUAGES: Turkish, English, German, Italian, Chinese.

LANGUAGE SWITCHING:
If the user starts speaking a different language than the current one (${locale}), you MUST:
1. Respond in that new language.
2. At the VERY END of your response, append the command: [SET_LANG: xx] where xx is the ISO code (tr, en, de, it, zh).
Example: "Benvenuto! Come posso aiutarla oggi? [SET_LANG: it]"

GİRİŞ: Start the conversation with: "${t("greeting")}"

NAVIGATION & SPOTLIGHT:
Include keywords to trigger navigation when relevant.
- About Us: mention "About Us" or "History".
- Products: mention "Products", "T-shirts", "Polo".
- Process: mention "Production process" or "Manufacturing".
- Clients: mention "Our clients".
- Contact: mention "Contact us".
- Social Responsibility: mention "Sustainability".

STYLE: Professional, visionery, textile industry expert.
`;
  }, [locale, t]);

  const toggleLive = async () => {
    if (isLive) {
      clientRef.current?.close();
      clientRef.current = null;
      streamRef.current?.getTracks().forEach(t => t.stop());
      processorRef.current?.disconnect();
      setIsLive(false);
      setIsMicOn(false);
      setIsConnecting(false);
      setHighlight(null);
      return;
    }

    let audioStream: MediaStream | undefined;
    try {
      audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (err: any) {
      setPermissionErrorMessage("Mikrofon izni verilmedi.");
      setShowPermissionError(true);
      return;
    }

    setIsConnecting(true);
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      setPermissionErrorMessage("API Key missing.");
      setShowPermissionError(true);
      audioStream.getTracks().forEach(t => t.stop());
      setIsConnecting(false);
      return;
    }

    clientRef.current = new GeminiLiveClient(apiKey, {
      systemInstruction: getSystemInstruction(),
      onAudioData: (data) => {
        audioQueueRef.current.push(data);
        playNextAudio();
        if (pendingAudioStreamRef.current) {
          const stream = pendingAudioStreamRef.current;
          pendingAudioStreamRef.current = null;
          setTimeout(() => startAudioCapture(stream), 1500);
        }
      },
      onTranscription: (text, isUser) => {
        setTranscriptions(prev => [...prev.slice(-4), { text, isUser }]);
        if (text) {
          detectAndNavigate(text);
          
          // Trigger Carousel sliding if bot mentions products
          if (!isUser && /aşağıda ürettiğimiz bazı ürünleri|see some of the products|sehen sie einige der produkte|vedere alcuni dei prodotti|下面您可以看到/.test(text.toLowerCase())) {
            // Slide a few times for demonstration
            let count = 0;
            const interval = setInterval(() => {
              window.dispatchEvent(new CustomEvent("merit:next-product"));
              count++;
              if (count >= 3) clearInterval(interval);
            }, 3000);
          }
        }
      },
      onInterrupted: () => {
        addDebug("Interrupted by user");
        audioQueueRef.current = [];
        stopActiveAudio();
      },
      onClose: () => setIsLive(false),
      onError: (err) => addDebug(`Error: ${err.message}`)
    });

    try {
      await clientRef.current.connect();
      setIsLive(true);
      setIsConnecting(false);
      pendingAudioStreamRef.current = audioStream;
      clientRef.current.triggerGreeting();
    } catch (err: any) {
      audioStream.getTracks().forEach(t => t.stop());
      setIsConnecting(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        
        @media (max-width: 640px) {
          .consultant-modal { padding: 32px 20px !important; border-radius: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; }
          .consultant-modal h2 { font-size: 20px !important; margin-bottom: 12px !important; }
          .consultant-modal p { font-size: 14px !important; margin-bottom: 24px !important; }
          .consultant-modal .logo-img { h: 50px !important; margin-bottom: 20px !important; }
          .consultant-modal button { font-size: 15px !important; padding: 14px 20px !important; }
          
          .floating-btn-container { bottom: 20px !important; right: 20px !important; }
          .consultant-btn { height: 48px !important; width: 48px !important; }
          .chat-bubble { width: calc(100vw - 40px) !important; bottom: 80px !important; right: 20px !important; }
        }
        
        body { padding-bottom: 120px !important; }
      `}</style>

      <div className="floating-btn-container fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-4">
        <AnimatePresence>
          {isLive && (
            <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} className="chat-bubble bg-[#002e5d]/95 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl w-80 mb-2">
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">LIVE AI ASSISTANT</span>
                </div>
                <button onClick={toggleLive} style={{ cursor: 'pointer' }} className="text-white/50 hover:text-white p-1"><X size={16} /></button>
              </div>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {transcriptions.map((tr, i) => (
                  <div key={i} className={`flex flex-col ${tr.isUser ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] text-white/40 mb-1 uppercase tracking-tighter">{tr.isUser ? 'You' : 'Merit AI'}</span>
                    <div className={`p-2 rounded-lg text-xs leading-relaxed ${tr.isUser ? 'bg-white/10 text-white rounded-tr-none' : 'bg-[#e63946]/20 text-white rounded-tl-none border border-[#e63946]/30'}`}>
                      {tr.text}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {!isLive && !isWelcomeVisible && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 20 }} 
                className="bg-white text-[#002e5d] px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-[#002e5d]/10"
              >
                {t("btnChat")}
              </motion.div>
            )}
          </AnimatePresence>
          <button 
            onClick={() => isLive ? toggleLive() : setIsWelcomeVisible(true)} 
            style={{ cursor: 'pointer' }}
            className={`consultant-btn group h-14 w-14 rounded-full flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 relative ${isLive ? 'bg-red-600' : 'bg-[#002e5d]'}`}
          >
            {isLive ? <Square className="text-white w-5 h-5 fill-current" /> : <Languages className="text-white w-6 h-6" />}
            {isLive && <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 rounded-full bg-red-500 -z-10" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isWelcomeVisible && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#002e5d] p-0 overflow-hidden">
            <div className="consultant-modal bg-white/5 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 max-w-xl w-full text-center shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center">
              <motion.img initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} src={LOGO_URL} className="logo-img h-16 mx-auto mb-8 brightness-0 invert" />
              <h2 className="text-3xl font-bold mb-4 text-white uppercase tracking-tight">{t("welcomeTitle")}</h2>
              <p className="text-white/60 mb-10 text-lg leading-relaxed font-light">{t("welcomeDesc")}</p>
              
              <div className="flex flex-col gap-4 w-full px-6">
                <button 
                  onClick={() => { setIsWelcomeVisible(false); toggleLive(); }} 
                  style={{ cursor: 'pointer' }}
                  className="bg-[#e63946] text-white px-8 py-5 rounded-full text-lg font-bold flex items-center justify-center gap-3 hover:bg-red-700 transition-all shadow-xl hover:shadow-red-900/40"
                >
                  {isConnecting ? t("btnConnecting") : t("welcomeBtn")} <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setIsWelcomeVisible(false)} 
                  style={{ cursor: 'pointer' }}
                  className="text-white/40 hover:text-white text-sm transition-colors uppercase tracking-widest font-bold mt-2"
                >
                  {t("maybeLater") || "Maybe later"}
                </button>
              </div>
              
              {showPermissionError && (<p className="text-red-400 mt-6 text-sm bg-red-400/10 p-3 rounded-xl border border-red-400/20">{permissionErrorMessage}</p>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
