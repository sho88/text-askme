// Hook responsible for QUESTIONS

import { add } from "date-fns";
import { useEffect, useState } from "react";

const useRoom = (room) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchingRoomsOne = async () => {
      if (!room) return;
      try {
        const res = await fetch(
          `/api/database?collection=questions&eventId=${room._id}`
        );
        const data = await res.json();
        // no need for a function to ensure it's an array
        setQuestions(data);
      } catch (err) {
        console.error(err.message);
        setError(true);
      }
    };
    fetchingRoomsOne();
  }, [room?._id]);

  // createQuestionApi
  // add new data to prev

  const createQuestionApi = async (payload) => {
    if (!payload) return;

    try {
      const res = await fetch(`/api/database?collection=questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res) {
        throw new Error("this is an error message");
      }

      const data = await res.json();

      const addingToExisting = (existing) => {
        const theNew = [data, ...existing];
        return theNew;
      };

      setQuestions(addingToExisting);
    } catch (err) {
      console.error(err.message);
      setError(true);
    }
  };

  const deleteQuestionApi = async (id) => {
    if (!id) return;

    try {
      const res = await fetch(`/api/database?collection=questions&id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("ERROR, as res is not okay.");
      }

      const deleteFunction = (prev) => {
        const remaining = prev.filter((question) => question._id !== id);
        return remaining;
      };

      setQuestions(deleteFunction);
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateQuestionApi = async (id, payload) => {
    if (!id || !payload) return;

    try {
      const res = await fetch(`/api/database?collection=questions&id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("ERROR, as res is not okay.");
      }

      const updatingFunction = (prev) => {
        const updated = prev.map((q) =>
          q._id === id ? { ...q, ...payload } : q
        );
        return updated;
      };

      setQuestions(updatingFunction);
    } catch (err) {
      console.error(err.message);
    }
  };

  return {
    questions,
    setQuestions,
    room,
    createQuestionApi,
    deleteQuestionApi,
    updateQuestionApi,
  };
};

export default useRoom;
