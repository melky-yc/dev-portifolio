"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { motion, AnimatePresence } from "framer-motion"

const FADE_DURATION_MS = 500

type TransitionOverlayContextValue = {
  triggerTransition: (callback: () => void) => void
}

const TransitionOverlayContext = createContext<TransitionOverlayContextValue | null>(null)

export function useTransitionOverlay() {
  const ctx = useContext(TransitionOverlayContext)
  if (!ctx) throw new Error("useTransitionOverlay must be used within TransitionOverlayProvider")
  return ctx
}

const INITIAL_REVEAL_DURATION_MS = 400

export function TransitionOverlayProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [initialReveal, setInitialReveal] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)
  const pendingCallbackRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduceMotion(mq.matches)
    const handler = () => setReduceMotion(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    if (reduceMotion) setInitialReveal(false)
  }, [reduceMotion])

  const triggerTransition = useCallback(
    (callback: () => void) => {
      if (reduceMotion) {
        callback()
        return
      }
      pendingCallbackRef.current = callback
      setVisible(true)
    },
    [reduceMotion]
  )

  const handleEnterComplete = useCallback(() => {
    if (pendingCallbackRef.current) {
      pendingCallbackRef.current()
      pendingCallbackRef.current = null
    }
    setVisible(false)
  }, [])

  return (
    <TransitionOverlayContext.Provider value={{ triggerTransition }}>
      {children}
      <AnimatePresence>
        {initialReveal && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: INITIAL_REVEAL_DURATION_MS / 1000,
              ease: "easeInOut",
            }}
            onAnimationComplete={() => setInitialReveal(false)}
            aria-hidden="true"
            style={{ pointerEvents: "none" }}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_DURATION_MS / 1000, ease: "easeInOut" }}
            onAnimationComplete={(definition) => {
              if (typeof definition === "object" && "opacity" in definition && definition.opacity === 1) {
                handleEnterComplete()
              }
            }}
            aria-hidden="true"
            style={{ pointerEvents: "auto" }}
          />
        )}
      </AnimatePresence>
    </TransitionOverlayContext.Provider>
  )
}
