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

        const pinCode = req.query.pinCode;
        if (pinCode) {
          const questions = await Question.find({ pin: pinCode }).sort({
            createdAt: -1,
          });
          return res.status(200).json({ success: true, data: questions });
        }

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
