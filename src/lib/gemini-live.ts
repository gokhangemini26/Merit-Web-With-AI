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
          
          if (msg.serverContent?.modelTurn?.parts) {
            for (const part of msg.serverContent.modelTurn.parts) {
              if (part.inlineData?.data) {
                this.config.onAudioData?.(part.inlineData.data);
              }
              if (part.text && part.text.trim()) {
                this.config.onTranscription?.(part.text, false);
              }
            }
          }

          if (msg.serverContent?.interrupted) {
            this.config.onInterrupted?.();
          }

          const outTranscript =
            msg.serverContent?.outputAudioTranscription?.text ||
            msg.outputAudioTranscription?.text ||
            msg.serverContent?.outputTranscription?.text;
          if (outTranscript) {
            this.config.onTranscription?.(outTranscript, false);
          }

          const inTranscript =
            msg.serverContent?.inputAudioTranscription?.text ||
            msg.inputAudioTranscription?.text ||
            msg.serverContent?.inputTranscription?.text;
          if (inTranscript) {
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
      this.session.sendRealtimeInput({ text: "Başla" });
    }
  }

  close() {
    if (this.session) {
      this.session.close();
    }
  }
}
