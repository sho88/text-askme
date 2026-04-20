import React, { useState, useEffect } from "react";

function SubmitQuestionsContainer({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = window.innerHeight;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const shouldBeVisible = currentScrollPos > SCROLL_THRESHOLD;

      setIsVisible((prevVisible) => {
        if (prevVisible !== shouldBeVisible) {
          return shouldBeVisible;
        }
        return prevVisible;
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerClasses = `submit-questions ${
    isVisible ? "" : "hidden-on-scroll"
  }`;

  return <div className={containerClasses}>{children}</div>;
}

export default SubmitQuestionsContainer;
