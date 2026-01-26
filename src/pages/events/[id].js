// import { useState, useEffect } from "react";
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

// // 1. Functional Fix: Talk to MongoDB directly instead of a broken local fetch
// export const getServerSideProps = async ({ params }) => {
//   try {
//     const { start, readData } = await import("@/utils/mongo");
//     await start();

//     const roomData = await readData("rooms", params.id);

//     if (!roomData) {
//       return { notFound: true };
//     }

//     return {
//       props: {
//         room: JSON.parse(JSON.stringify(roomData)),
//       },
//     };
//   } catch (err) {
//     console.error("SSR Error:", err);
//     return { notFound: true };
//   }
// };

// export default function EventSingleComponent({ room, error }) {
//   const [questions, setQuestions] = useState([]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       const res = await fetch("/api/questions");
//       const result = await res.json();
//       if (result.success) setQuestions(result.data);
//     };
//     fetchQuestions();
//   }, []);

//   const handleDelete = async (id) => {
//     const res = await fetch(`/api/questions?id=${id}`, { method: "DELETE" });
//     if (res.ok) {
//       setQuestions(questions.filter((q) => q._id !== id));
//     }
//   };

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

//   if (!room) {
//     return <p>Loading. Please wait...</p>;
//   }

//   return (
//     <div>
//       {/* RESTORED: Original class structure and layers */}
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
//                   alt={room.title || room.name || "Event Image"}
//                   src={room.image || "/images/placeholder.png"}
//                   height={100}
//                   width={100}
//                 />
//               </div>
//             </div>
//             <div className="layer-3">
//               <div className="event__header">
//                 {/* 2. Functional Fix: Use dynamic room title */}
//                 <h1>{room.title || room.name}</h1>
//               </div>

//               <div className="event__content">
//                 {/* 3. Functional Fix: Use dynamic room description */}
//                 <p>{room.description}</p>
//                 <p className="emphasis">
//                   <i>Submit questions below</i>
//                 </p>
//               </div>
//             </div>

//             <div className="event__messages">
//               <h2 className="event__header-2">Questions</h2>

//               {questions.map((msgObj) => (
//                 <div key={msgObj._id} className="event__messages-2">
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
//                       alt="Delete"
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
import mainStyle from "@/styles/main.css";
import "@/styles/event.css";
import "@/styles/globals.css";

export const getServerSideProps = async ({ params }) => {
  try {
    const { start, readData } = await import("@/utils/mongo");
    await start();
    const roomData = await readData("rooms", params.id);

    if (!roomData) return { notFound: true };

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

export default function EventSingleComponent({ room }) {
  const [questions, setQuestions] = useState([]);

  // FETCH: Only get questions for THIS room ID
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!room?._id) return;
      const res = await fetch(`/api/questions?eventId=${room._id}`);
      const result = await res.json();
      if (result.success) setQuestions(result.data);
    };
    fetchQuestions();
  }, [room?._id]);

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

    // ATTACH ID: Add the current room's ID to the payload
    const payload = {
      ...formValues,
      eventId: room._id,
    };

    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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

  if (!room) return <p>Loading. Please wait...</p>;

  return (
    <div>
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
                <h1>{room.title || room.name}</h1>
              </div>
              <div className="event__content">
                <p>{room.description}</p>
                <p className="emphasis">
                  <i>Submit questions below</i>
                </p>
              </div>
            </div>

            <div className="event__messages">
              <h2 className="event__header-2">
                Questions ({questions.length})
              </h2>
              {questions.map((msgObj) => (
                <div key={msgObj._id} className="event__messages-2">
                  <p>{msgObj.question}</p>
                  <button
                    onClick={() => handleDelete(msgObj._id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Image
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

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
// import HeaderComponent from "@/components/header";
// import SubmitQuestionsContainer from "@/components/submit-questions-container/SubmitQuestionsContainer";
// import mainStyle from "@/styles/main.css";
// import "@/styles/event.css";
// import "@/styles/globals.css";

// export const getServerSideProps = async ({ params }) => {
//   try {
//     const { start, readData } = await import("@/utils/mongo");
//     await start();
//     const roomData = await readData("rooms", params.id);
//     if (!roomData) return { notFound: true };

//     return {
//       props: {
//         room: JSON.parse(JSON.stringify(roomData)),
//       },
//     };
//   } catch (err) {
//     console.error("SSR Error:", err);
//     return { notFound: true };
//   }
// };

// export default function EventSingleComponent({ room }) {
//   const [questions, setQuestions] = useState([]);

//   // FETCH: Load questions only for this room
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       if (!room?._id) return;
//       // We pass the eventId as a query parameter
//       const res = await fetch(`/api/questions?eventId=${room._id}`);
//       const result = await res.json();
//       if (result.success) setQuestions(result.data);
//     };
//     fetchQuestions();
//   }, [room?._id]);

//   const handleDelete = async (id) => {
//     const res = await fetch(`/api/questions?id=${id}`, { method: "DELETE" });
//     if (res.ok) {
//       setQuestions(questions.filter((q) => q._id !== id));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const formValues = Object.fromEntries(formData.entries());

//     // IMPORTANT: Explicitly add the eventId to the data being sent to MongoDB
//     const payload = {
//       ...formValues,
//       eventId: room._id,
//     };

//     try {
//       const res = await fetch("/api/questions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         const result = await res.json();
//         // Add the new question to the top of the list locally
//         setQuestions((prev) => [result.data, ...prev]);
//         e.target.reset();
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   if (!room) return <p>Loading...</p>;

//   return (
//     <div>
//       <div className={mainStyle["entire-dashboard-page"]}>
//         <HeaderComponent />
//         <div className="event">
//           <div className="event__container">
//             <div className="background-2"></div>
//             <div className="layer-3">
//               <div className="event__header">
//                 <h1>{room.title || room.name}</h1>
//               </div>
//               <div className="event__content">
//                 <p>{room.description}</p>
//               </div>
//             </div>

//             <div className="event__messages">
//               <h2 className="event__header-2">Questions</h2>
//               {questions.length === 0 ? (
//                 <p style={{ opacity: 0.5 }}>No questions yet.</p>
//               ) : (
//                 questions.map((msgObj) => (
//                   <div key={msgObj._id} className="event__messages-2">
//                     <p>{msgObj.question}</p>
//                     <button
//                       onClick={() => handleDelete(msgObj._id)}
//                       style={{
//                         background: "none",
//                         border: "none",
//                         cursor: "pointer",
//                       }}
//                     >
//                       <Image
//                         src="/images/cross-cancel.png"
//                         alt="Delete"
//                         height="10"
//                         width="10"
//                       />
//                     </button>
//                   </div>
//                 ))
//               )}
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
//         </div>
//         <DashboardBottomNav />
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
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

// // 1. Functional Fix: Talk to MongoDB directly instead of a broken local fetch
// export const getServerSideProps = async ({ params }) => {
//   try {
//     const { start, readData } = await import("@/utils/mongo");
//     await start();

//     const roomData = await readData("rooms", params.id);

//     if (!roomData) {
//       return { notFound: true };
//     }

//     return {
//       props: {
//         room: JSON.parse(JSON.stringify(roomData)),
//       },
//     };
//   } catch (err) {
//     console.error("SSR Error:", err);
//     return { notFound: true };
//   }
// };

// export default function EventSingleComponent({ room, error }) {
//   const [questions, setQuestions] = useState([]);

//   // FETCH FIX: Filter questions by the current room's ID
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       if (!room?._id) return;
//       const res = await fetch(`/api/questions?eventId=${room._id}`);
//       const result = await res.json();
//       if (result.success) setQuestions(result.data);
//     };
//     fetchQuestions();
//   }, [room?._id]);

//   const handleDelete = async (id) => {
//     const res = await fetch(`/api/questions?id=${id}`, { method: "DELETE" });
//     if (res.ok) {
//       setQuestions(questions.filter((q) => q._id !== id));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const formValues = Object.fromEntries(formData.entries());

//     // SUBMIT FIX: Attach the room's ID so this question belongs to this room
//     const payload = {
//       ...formValues,
//       eventId: room._id,
//     };

//     try {
//       const res = await fetch("/api/questions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
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

//   if (!room) {
//     return <p>Loading. Please wait...</p>;
//   }

//   return (
//     <div>
//       {/* RESTORED: Original class structure and layers */}
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
//                   alt={room.title || room.name || "Event Image"}
//                   src={room.image || "/images/placeholder.png"}
//                   height={100}
//                   width={100}
//                 />
//               </div>
//             </div>
//             <div className="layer-3">
//               <div className="event__header">
//                 {/* 2. Functional Fix: Use dynamic room title */}
//                 <h1>{room.title || room.name}</h1>
//               </div>

//               <div className="event__content">
//                 {/* 3. Functional Fix: Use dynamic room description */}
//                 <p>{room.description}</p>
//                 <p className="emphasis">
//                   <i>Submit questions below</i>
//                 </p>
//               </div>
//             </div>

//             <div className="event__messages">
//               <h2 className="event__header-2">Questions</h2>

//               {questions.map((msgObj) => (
//                 <div key={msgObj._id} className="event__messages-2">
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
//                       alt="Delete"
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

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { DashboardBottomNav } from "@/components/dashboard/DashboardBottomNav";
// import HeaderComponent from "@/components/header";
// import SubmitQuestionsContainer from "@/components/submit-questions-container/SubmitQuestionsContainer";

// import mainStyle from "@/styles/main.css";
// import "@/styles/event.css";
// import "@/styles/globals.css";

// export const getServerSideProps = async ({ params }) => {
//   try {
//     const { start, readData } = await import("@/utils/mongo");
//     await start();
//     const roomData = await readData("rooms", params.id);

//     if (!roomData) return { notFound: true };

//     return {
//       props: {
//         room: JSON.parse(JSON.stringify(roomData)),
//       },
//     };
//   } catch (err) {
//     console.error("SSR Error:", err);
//     return { notFound: true };
//   }
// };

// export default function EventSingleComponent({ room }) {
//   const [questions, setQuestions] = useState([]);

//   // FETCH LOGIC
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       if (!room?._id) return;

//       // DEBUG: Look at your console to see if this ID is correct!
//       console.log("Fetching questions for room:", room._id);

//       const res = await fetch(`/api/questions?eventId=${room._id}`);
//       const result = await res.json();
//       if (result.success) setQuestions(result.data);
//     };
//     fetchQuestions();
//   }, [room?._id]);

//   const handleDelete = async (id) => {
//     const res = await fetch(`/api/questions?id=${id}`, { method: "DELETE" });
//     if (res.ok) {
//       setQuestions(questions.filter((q) => q._id !== id));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const formValues = Object.fromEntries(formData.entries());

//     // We manually add the eventId to ensure it's saved in Mongo
//     const payload = {
//       ...formValues,
//       eventId: room._id,
//     };

//     try {
//       const res = await fetch("/api/questions", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         const result = await res.json();
//         setQuestions((prev) => [result.data, ...prev]);
//         e.target.reset();
//       }
//     } catch (error) {
//       console.error("Error submitting question:", error);
//     }
//   };

//   if (!room) return <p>Loading...</p>;

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
//                   alt={room.title || room.name || "Event Image"}
//                   src={room.image || "/images/placeholder.png"}
//                   height={100}
//                   width={100}
//                 />
//               </div>
//             </div>
//             <div className="layer-3">
//               <div className="event__header">
//                 <h1>{room.title || room.name}</h1>
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
//                 <div key={msgObj._id} className="event__messages-2">
//                   <p>{msgObj.question}</p>
//                   <button
//                     onClick={() => handleDelete(msgObj._id)}
//                     style={{
//                       background: "none",
//                       border: "none",
//                       cursor: "pointer",
//                     }}
//                   >
//                     <Image
//                       className="delete-question"
//                       src="/images/cross-cancel.png"
//                       alt="Delete"
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
//                       alt="Send"
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
