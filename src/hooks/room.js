// Hook responsible for QUESTIONS

import { asyncify } from "@/utils";
import { useEffect, useState } from "react";

const useRoom = (room) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!room?._id) return;

      const [error, response] = await asyncify(
        fetch(`/api/database?collection=questions&eventId=${room._id}`)
      );

      if (error) {
        console.error("Error fetching questions:", error);
        return;
      }

      const result = await response.json();
      if (result) {
        setQuestions(Array.isArray(result) ? result : result.data || []);
      }
    };

    fetchQuestions();
  }, [room?._id]);

  async function createQuestionApi(newQuestion) {
    const status = { success: false, message: "" };

    const [error, response] = await asyncify(
      fetch("/api/database?collection=questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      })
    );

    if (error) {
      console.error("Error creating question:", error);

      return {
        ...status,
        message: "Failed to create question",
        error,
      };
    }

    const result = await response.json();

    const newDoc = result.data || result;
    setQuestions((prev) => [newDoc, ...prev]);

    return {
      ...status,
      success: true,
      message: "Question created successfully",
    };
  }

  async function deleteQuestionApi(id) {
    const status = { success: false, message: "" };

    const [error, response] = await asyncify(
      fetch(`/api/database?collection=questions&id=${id}`, { method: "DELETE" })
    );

    if (error) {
      return {
        ...status,
        message: "Failed to delete question",
        error,
      };
    }

    if (!response.ok) {
      return {
        ...status,
        message: "Failed to delete question",
      };
    }

    setQuestions(questions.filter((q) => q._id !== id));

    return {
      ...status,
      success: true,
    };
  }

  return {
    questions,
    setQuestions,
    room,

    createQuestionApi,
    deleteQuestionApi,
  };
};

export default useRoom;
