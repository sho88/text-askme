import { useState } from "react";
import usePusher from "@/hooks/usePusher";
import useRoom from "@/hooks/room";
import { readData } from "@/utils/mongo";
import { notFound } from "next/navigation";
import { auth0 } from "@/lib/auth0";

export const PracticePusher = ({ session }) => {
  // states
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedin, setIsLoggedIn] = useState(session?.user);

  // defining room
  const room = { _id: "test-room" };

  // imports
  const {
    questions: pusherQuestions,
    setQuestions: setPusherQuestions,
    error,
  } = usePusher(room);

  const {
    questions,
    setQuestions,
    createQuestionApi,
    deleteQuestionApi,
    updateQuestionApi,
  } = useRoom(room);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const payload = {
        text: userInput,
        eventId: room._id,
      };

      await createQuestionApi(payload);
    } catch (err) {
      console.log(err, "ekj fejkbhceakjb");
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  const handleDelete = async (id) => {
    await deleteQuestionApi(id);
  };

  return (
    <div>
      {isLoggedin ? <div>User is logged in</div> : <div>Unknown</div>}

      <div>
        {" "}
        {questions.map((ques) => (
          <div key={ques._id}>
            <small> {ques.author} </small>
            <p> {ques.text} </p>
            <span>
              <button onClick={() => handleDelete(ques._id)}>Delete</button>
            </span>
          </div>
        ))}{" "}
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <input
            required
            placeholder="send question here..."
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PracticePusher;
