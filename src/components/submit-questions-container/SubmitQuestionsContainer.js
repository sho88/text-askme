import React, { useState, useEffect } from "react";

function SubmitQuestionsContainer({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  const SCROLL_THRESHOLD = window.innerHeight;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      const shouldBeVisible = currentScrollPos > SCROLL_THRESHOLD;

      if (shouldBeVisible !== isVisible) {
        setIsVisible(shouldBeVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible, SCROLL_THRESHOLD]);

  const containerClasses = `submit-questions ${
    isVisible ? "" : "hidden-on-scroll"
  }`;

  return <div className={containerClasses}>{children}</div>;
}

export default SubmitQuestionsContainer;
