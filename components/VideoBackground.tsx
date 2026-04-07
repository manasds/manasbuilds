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

  if (!showVideo) return null

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="fixed top-0 left-0 w-full h-full object-cover object-top -z-50 opacity-60"
    >
      <source src="/leaves.mp4" type="video/mp4" />
    </video>
  )
}