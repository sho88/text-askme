// import dbConnect from "@/lib/dbConnect";
// import Question from "@/models/Question";

// export default async function questionsHandler(req, res) {
//   await dbConnect();

//   const { method } = req;
//   const { id } = req.query; // Get ID from the URL query

//   switch (method) {
//     case "GET":
//       try {
//         const questions = await Question.find({}).sort({ createdAt: -1 });
//         return res.status(200).json({ success: true, data: questions });
//       } catch (error) {
//         return res.status(500).json({ error: error.message });
//       }

//     case "POST":
//       try {
//         const newQuestion = await Question.create(req.body);
//         return res.status(201).json({ success: true, data: newQuestion });
//       } catch (error) {
//         return res.status(400).json({ error: error.message });
//       }

//     case "DELETE":
//       try {
//         const deletedQuestion = await Question.deleteOne({ _id: id });
//         if (!deletedQuestion)
//           return res.status(404).json({ message: "Not found" });
//         return res.status(200).json({ success: true });
//       } catch (error) {
//         return res.status(400).json({ error: error.message });
//       }

//     default:
//       res.status(405).json({ message: "Method not allowed" });
//       break;
//   }
// }

import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Question";

export default async function questionsHandler(req, res) {
  await dbConnect();

  const { method } = req;
  // Extract both 'id' (for deletes) and 'eventId' (for filtering)
  const { id, eventId } = req.query;

  switch (method) {
    case "GET":
      try {
        /**
         * FIX: If eventId is provided in the URL, filter by it.
         * Otherwise, fetch nothing or everything based on your preference.
         * Using { eventId } ensures rooms don't share questions.
         */
        const filter = eventId ? { eventId } : {};
        const questions = await Question.find(filter).sort({ createdAt: -1 });

        return res.status(200).json({ success: true, data: questions });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

    case "POST":
      try {
        // req.body will now include the eventId sent from our updated frontend
        const newQuestion = await Question.create(req.body);
        return res.status(201).json({ success: true, data: newQuestion });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case "DELETE":
      try {
        const deletedQuestion = await Question.deleteOne({ _id: id });
        if (deletedQuestion.deletedCount === 0) {
          return res.status(404).json({ message: "Not found" });
        }
        return res.status(200).json({ success: true });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).json({ message: `Method ${method} not allowed` });
      break;
  }
}

// import dbConnect from "@/lib/dbConnect";
// import Question from "@/models/Question";

// export default async function questionsHandler(req, res) {
//   await dbConnect();

//   const { method } = req;
//   const { id, eventId } = req.query;

//   switch (method) {
//     case "GET":
//       try {
//         // If eventId is provided, only get questions for that room.
//         // Otherwise, get all (good for debugging).
//         const filter = eventId ? { eventId: eventId } : {};
//         const questions = await Question.find(filter).sort({ createdAt: -1 });
//         return res.status(200).json({ success: true, data: questions });
//       } catch (error) {
//         return res.status(500).json({ error: error.message });
//       }

//     case "POST":
//       try {
//         // Ensure eventId is present in the body
//         if (!req.body.eventId) {
//           return res.status(400).json({ error: "Missing eventId" });
//         }
//         const newQuestion = await Question.create(req.body);
//         return res.status(201).json({ success: true, data: newQuestion });
//       } catch (error) {
//         return res.status(400).json({ error: error.message });
//       }

//     case "DELETE":
//       try {
//         const deletedQuestion = await Question.deleteOne({ _id: id });
//         if (deletedQuestion.deletedCount === 0)
//           return res.status(404).json({ message: "Not found" });
//         return res.status(200).json({ success: true });
//       } catch (error) {
//         return res.status(400).json({ error: error.message });
//       }

//     default:
//       res.setHeader("Allow", ["GET", "POST", "DELETE"]);
//       res.status(405).json({ message: `Method ${method} not allowed` });
//       break;
//   }
// }

// import dbConnect from "@/lib/dbConnect";
// import Question from "@/models/Question";

// export default async function questionsHandler(req, res) {
//   await dbConnect();

//   const { method } = req;
//   const { id, eventId } = req.query;

//   switch (method) {
//     case "GET":
//       try {
//         // If we have an eventId, filter by it.
//         // If we don't, return nothing (this prevents room mixing).
//         const filter = eventId ? { eventId: eventId } : { eventId: "none" };
//         const questions = await Question.find(filter).sort({ createdAt: -1 });

//         return res.status(200).json({ success: true, data: questions });
//       } catch (error) {
//         return res.status(500).json({ error: error.message });
//       }

//     case "POST":
//       try {
//         // Double check: Does the body actually contain the eventId?
//         if (!req.body.eventId) {
//           return res
//             .status(400)
//             .json({ error: "No eventId provided in request body" });
//         }

//         const newQuestion = await Question.create(req.body);
//         return res.status(201).json({ success: true, data: newQuestion });
//       } catch (error) {
//         return res.status(400).json({ error: error.message });
//       }

//     case "DELETE":
//       try {
//         const deletedQuestion = await Question.deleteOne({ _id: id });
//         if (deletedQuestion.deletedCount === 0)
//           return res.status(404).json({ message: "Not found" });
//         return res.status(200).json({ success: true });
//       } catch (error) {
//         return res.status(400).json({ error: error.message });
//       }

//     default:
//       res.setHeader("Allow", ["GET", "POST", "DELETE"]);
//       res.status(405).json({ message: `Method ${method} not allowed` });
//       break;
//   }
// }
