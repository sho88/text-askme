// import { useState, useEffect } from "react";
// import { readDocument } from "@/utils/firestore";
// import Image from "next/image";
// import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
// import HeaderComponent from "@/components/header";
// import SubmitQuestionsContainer from "@/components/submit-questions-container/SubmitQuestionsContainer";

// /**
//  * Import the stylesheets here...
//  */
// import mainStyle from "@/styles/main.css";
// import "@/styles/event.css";
// import "@/styles/globals.css";

// // Added { params } destructuring to fix the reference error in your fetch
// export const getServerSideProps = async ({ params }) => {
//   let room = {};
//   let error = null;

//   try {
//     const res = await fetch(`http://localhost:3000/api/events/${params.id}`);

//     if (res.status === 200) {
//       room = await res.json();
//     } else {
//       error = `There has been an error. This is the code for it: ${res.status}`;
//       console.error(error);
//     }
//   } catch (err) {
//     console.error(err);
//   }

//   return { props: { room, error } };
// };

// export default function EventSingleComponent({ room, error }) {
//   const [questions, setQuestions] = useState([]); // Now stores [{_id, question}, ...]

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const res = await fetch("/api/questions");
//       const result = await res.json();
//       if (result.success) setQuestions(result.data); // Store full objects
//     };
//     fetchQuestions();
//   }, []);

//   const handleDelete = async (id) => {
//     const res = await fetch(`/api/questions?id=${id}`, { method: "DELETE" });
//     if (res.ok) {
//       // Remove from UI immediately
//       setQuestions(questions.filter((q) => q._id !== id));
//     }
//   };

//   if (!room) {
//     return <p>Loading. Please wait...</p>;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const formValues = Object.fromEntries(formData.entries());

//     try {
//       const res = await fetch("/api/questions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formValues),
//       });

//       if (res.ok) {
//         const result = await res.json();
//         setQuestions((prev) => [result.data, ...prev]);
//         e.target.reset();
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div>
//       <div className={mainStyle["entire-dashboard-page"]}>
//         <HeaderComponent />

//         <div className="event">
//           <div className="event__container">
//             <div className="background-2"></div>
//             <div className="layer-1">
//               <div>
//                 <div className="layer-1-filter"></div>
//                 <div className="layer-2-filter"></div>
//                 <Image
//                   className="event__image"
//                   loading="lazy"
//                   alt={room.title || "Event Image"}
//                   src={room.image}
//                   height={100}
//                   width={100}
//                 />
//               </div>
//             </div>
//             <div className="layer-3">
//               <div className="event__header">
//                 <h1>{room.title}</h1>
//               </div>

//               <div className="event__content">
//                 <p>{room.description}</p>
//                 <p className="emphasis">
//                   <i>Submit questions below</i>
//                 </p>
//               </div>
//             </div>

//             <div className="event__messages">
//               <h2 className="event__header-2">Questions</h2>

//               {questions.map((msgObj) => (
//                 <div
//                   key={msgObj._id}
//                   className="event__messages-2"
//                   // style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <p>{msgObj.question}</p>
//                   <button
//                     onClick={() => handleDelete(msgObj._id)}
//                     style={{
//                       background: "none",
//                       border: "none",
//                       color: "red",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Image
//                       className="delete-question"
//                       src="/images/cross-cancel.png"
//                       alt="Paper plane"
//                       height="10"
//                       width="10"
//                     />
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <SubmitQuestionsContainer>
//               <form onSubmit={handleSubmit}>
//                 <div className="submit-questions-container">
//                   <textarea
//                     name="question"
//                     className="submit-questions-textarea"
//                     placeholder="Ask a question here..."
//                     required
//                   ></textarea>
//                   <button className="submit-questions-button" type="submit">
//                     <Image
//                       src="/images/fn-send.png"
//                       alt="Paper plane"
//                       height="50"
//                       width="50"
//                     />
//                   </button>
//                 </div>
//               </form>
//             </SubmitQuestionsContainer>
//           </div>

//           <div className="random-box"></div>
//         </div>

//         <DashboardBottomNav />
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import Image from "next/image";
import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
import HeaderComponent from "@/components/header";
import SubmitQuestionsContainer from "@/components/submit-questions-container/SubmitQuestionsContainer";

/**
 * Import the stylesheets here...
 */
import mainStyle from "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";

// 1. Functional Fix: Talk to MongoDB directly instead of a broken local fetch
export const getServerSideProps = async ({ params }) => {
  try {
    const { start, readData } = await import("@/utils/mongo");
    await start();

    const roomData = await readData("rooms", params.id);

    if (!roomData) {
      return { notFound: true };
    }

    return {
      props: {
        room: JSON.parse(JSON.stringify(roomData)),
      },
    };
  } catch (err) {
    console.error("SSR Error:", err);
    return { notFound: true };
  }
};

export default function EventSingleComponent({ room, error }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("/api/questions");
      const result = await res.json();
      if (result.success) setQuestions(result.data);
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/questions?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setQuestions(questions.filter((q) => q._id !== id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (res.ok) {
        const result = await res.json();
        setQuestions((prev) => [result.data, ...prev]);
        e.target.reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (!room) {
    return <p>Loading. Please wait...</p>;
  }

  return (
    <div>
      {/* RESTORED: Original class structure and layers */}
      <div className={mainStyle["entire-dashboard-page"]}>
        <HeaderComponent />

        <div className="event">
          <div className="event__container">
            <div className="background-2"></div>
            <div className="layer-1">
              <div>
                <div className="layer-1-filter"></div>
                <div className="layer-2-filter"></div>
                <Image
                  className="event__image"
                  loading="lazy"
                  alt={room.title || room.name || "Event Image"}
                  src={room.image || "/images/placeholder.png"}
                  height={100}
                  width={100}
                />
              </div>
            </div>
            <div className="layer-3">
              <div className="event__header">
                {/* 2. Functional Fix: Use dynamic room title */}
                <h1>{room.title || room.name}</h1>
              </div>

              <div className="event__content">
                {/* 3. Functional Fix: Use dynamic room description */}
                <p>{room.description}</p>
                <p className="emphasis">
                  <i>Submit questions below</i>
                </p>
              </div>
            </div>

            <div className="event__messages">
              <h2 className="event__header-2">Questions</h2>

              {questions.map((msgObj) => (
                <div key={msgObj._id} className="event__messages-2">
                  <p>{msgObj.question}</p>
                  <button
                    onClick={() => handleDelete(msgObj._id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    <Image
                      className="delete-question"
                      src="/images/cross-cancel.png"
                      alt="Delete"
                      height="10"
                      width="10"
                    />
                  </button>
                </div>
              ))}
            </div>

            <SubmitQuestionsContainer>
              <form onSubmit={handleSubmit}>
                <div className="submit-questions-container">
                  <textarea
                    name="question"
                    className="submit-questions-textarea"
                    placeholder="Ask a question here..."
                    required
                  ></textarea>
                  <button className="submit-questions-button" type="submit">
                    <Image
                      src="/images/fn-send.png"
                      alt="Paper plane"
                      height="50"
                      width="50"
                    />
                  </button>
                </div>
              </form>
            </SubmitQuestionsContainer>
          </div>

          <div className="random-box"></div>
        </div>

        <DashboardBottomNav />
      </div>
    </div>
  );
}
