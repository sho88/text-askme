import React, { useState, useEffect } from "react";

function SubmitQuestionsContainer({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 1. Move threshold inside to ensure window is defined
    const SCROLL_THRESHOLD = window.innerHeight;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const shouldBeVisible = currentScrollPos > SCROLL_THRESHOLD;

      // 2. Use functional update to avoid re-triggering the effect
      setIsVisible((prevVisible) => {
        if (prevVisible !== shouldBeVisible) {
          return shouldBeVisible;
        }
        return prevVisible;
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Initial check in case the page loads already scrolled down
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array: listener is setup only once

  const containerClasses = `submit-questions ${
    isVisible ? "" : "hidden-on-scroll"
  }`;

  return <div className={containerClasses}>{children}</div>;
}

export default SubmitQuestionsContainer;
