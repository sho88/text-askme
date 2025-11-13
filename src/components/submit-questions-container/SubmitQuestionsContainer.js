import React, { useState, useEffect } from "react";

function SubmitQuestionsContainer({ children }) {
  // State to determine if the element should be visible.
  // Start as false (hidden)
  const [isVisible, setIsVisible] = useState(false);

  // The threshold is 100vh in pixels
  const SCROLL_THRESHOLD = window.innerHeight;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // ⚠️ New Logic: Should be visible if scroll position is GREATER than the threshold
      const shouldBeVisible = currentScrollPos > SCROLL_THRESHOLD;

      // Only update state if the visibility status has changed
      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
      }
    };

    // Attach and clean up the scroll event listener
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible, SCROLL_THRESHOLD]);

  // If isVisible is true, use the default class; if false, use 'hidden-on-scroll'
  const containerClasses = `submit-questions ${isVisible ? "" : "hidden-on-scroll"
    }`;

  return <div className={containerClasses}>{children}</div>;
}

export default SubmitQuestionsContainer;
