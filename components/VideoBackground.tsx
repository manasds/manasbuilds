"use client"

import { useState, useEffect } from "react"

export function VideoBackground() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"))

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "s" && !e.ctrlKey && !e.metaKey) {
        setIsEnabled((prev) => !prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.documentElement.classList.contains("dark")) {
        setIsEnabled(false)
        setIsDark(true)
      } else {
        setIsDark(false)
      }
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  const showVideo = isEnabled && !isDark

  return (
    <>
      {!isDark && (
        <div className="fixed top-8 left-4 z-50 flex items-center gap-1 text-xs font-mono text-gray-500 dark:text-gray-400 select-none pointer-events-none">
          press
          <kbd className="px-1.5 py-0.5 rounded border border-gray-400 dark:border-gray-600">
            S
          </kbd>
          to change vibes
        </div>
      )}

      {showVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover object-top -z-50 opacity-60"
        >
          <source src="/leaves.mp4" type="video/mp4" />
        </video>
      )}
    </>
  )
}