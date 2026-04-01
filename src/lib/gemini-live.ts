import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";

export interface GeminiLiveConfig {
  systemInstruction?: string;
  onAudioData?: (data: string) => void;
  onTranscription?: (text: string, isUser: boolean) => void;
  onInterrupted?: () => void;
  onError?: (error: any) => void;
  onClose?: () => void;
}

export class GeminiLiveClient {
  private ai: GoogleGenAI;
  private session: any;
  private config: GeminiLiveConfig;

  constructor(apiKey: string, config: GeminiLiveConfig) {
    this.ai = new GoogleGenAI({ apiKey });
    this.config = config;
  }

  async connect() {
    this.session = await this.ai.live.connect({
      model: "gemini-3.1-flash-live-preview",
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
        },
        systemInstruction: this.config.systemInstruction || "You are a helpful assistant.",
        outputAudioTranscription: {},
        inputAudioTranscription: {},
      },
      callbacks: {
        onopen: () => {
          console.log("Gemini Live connected");
        },
        onmessage: async (message: LiveServerMessage) => {
          const msg = message as any;
          console.log("[GeminiLive] message:", JSON.stringify(msg).slice(0, 400));

          // 1. Audio data from model turn parts
          if (msg.serverContent?.modelTurn?.parts) {
            for (const part of msg.serverContent.modelTurn.parts) {
              if (part.inlineData?.data) {
                this.config.onAudioData?.(part.inlineData.data);
              }
              // Some API versions return text transcription inline
              if (part.text && part.text.trim()) {
                this.config.onTranscription?.(part.text, false);
              }
            }
          }

          // 2. Interruption signal
          if (msg.serverContent?.interrupted) {
            this.config.onInterrupted?.();
          }

          // 3. Output audio transcription (bot speech → text)
          // Try multiple known field locations across SDK versions
          const outTranscript =
            msg.serverContent?.outputAudioTranscription?.text ||
            msg.outputAudioTranscription?.text ||
            msg.serverContent?.outputTranscription?.text;
          if (outTranscript) {
            console.log("[GeminiLive] BOT transcription:", outTranscript);
            this.config.onTranscription?.(outTranscript, false);
          }

          // 4. Input audio transcription (user speech → text)
          const inTranscript =
            msg.serverContent?.inputAudioTranscription?.text ||
            msg.inputAudioTranscription?.text ||
            msg.serverContent?.inputTranscription?.text;
          if (inTranscript) {
            console.log("[GeminiLive] USER transcription:", inTranscript);
            this.config.onTranscription?.(inTranscript, true);
          }
        },
        onerror: (error) => {
          console.error("Gemini Live error:", error);
          this.config.onError?.(error);
        },
        onclose: () => {
          console.log("Gemini Live closed");
          this.config.onClose?.();
        },
      },
    });
  }


  sendAudio(base64Data: string) {
    if (this.session) {
      this.session.sendRealtimeInput({
        audio: { data: base64Data, mimeType: "audio/pcm;rate=16000" },
      });
    }
  }

  sendVideo(base64Data: string) {
    if (this.session) {
      this.session.sendRealtimeInput({
        video: { data: base64Data, mimeType: "image/jpeg" },
      });
    }
  }

  sendText(text: string) {
    if (this.session) {
      this.session.sendRealtimeInput({ text });
    }
  }

  triggerGreeting() {
    if (this.session) {
      // Use sendRealtimeInput with text — more reliable in audio streaming sessions.
      // The system instruction will make the model respond with the welcome greeting.
      this.session.sendRealtimeInput({ text: "Başla" });
    }
  }

  close() {
    if (this.session) {
      this.session.close();
    }
  }
}
