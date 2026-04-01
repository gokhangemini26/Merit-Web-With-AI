"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpotlightContextType {
  highlightId: string | null;
  setHighlight: (id: string | null) => void;
}

const SpotlightContext = createContext<SpotlightContextType | undefined>(undefined);

export function SpotlightProvider({ children }: { children: ReactNode }) {
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const setHighlight = useCallback((id: string | null) => {
    setHighlightId(id);
    if (id) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  return (
    <SpotlightContext.Provider value={{ highlightId, setHighlight }}>
      {children}
      <AnimatePresence>
        {highlightId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm pointer-events-none"
            style={{
              maskImage: `radial-gradient(circle at center, transparent 0%, transparent 100%)`, // Placeholder, we'll use a better approach if needed
            }}
          />
        )}
      </AnimatePresence>
    </SpotlightContext.Provider>
  );
}

export function useSpotlight() {
  const context = useContext(SpotlightContext);
  if (!context) {
    throw new Error("useSpotlight must be used within a SpotlightProvider");
  }
  return context;
}
