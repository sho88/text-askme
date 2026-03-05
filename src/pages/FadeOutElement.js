import React, { useState, useEffect } from "react";
import Image from "next/image"; // Assuming you are using Next.js Image component

const FadeOutElement = () => {
  // 1. Controls the opacity (fading)
  const [isVisible, setIsVisible] = useState(true);
  // 2. Controls the display: none (unmounting/hiding)
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Phase 1: After a short delay (e.g., 2000ms), start the fade-out
    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1200); // Element visible for 2 seconds

    // Phase 2: After the fade-out duration (must match the CSS transition duration), set display: none
    // Assuming the CSS transition is 1000ms (1 second)
    const hideTimer = setTimeout(() => {
      setIsMounted(false);
    }, 2000 + 1000); // 2s initial delay + 1s fade duration

    // Cleanup timers when the component unmounts
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []); // Run only once on mount

  if (!isMounted) {
    return null; // Equivalent to display: none;
  }

  return (
    <div className={`login-page-first ${isVisible ? "visible" : "hidden"}`}>
      <Image src="/images/logo-1.png" width={150} height={150} alt="Logo" />
    </div>
  );
};

export default FadeOutElement;
