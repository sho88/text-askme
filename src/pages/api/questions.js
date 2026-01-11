import dbConnect from "@/lib/dbConnect";
import Question from "@/models/Question";

export default async function questionsHandler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query; // Get ID from the URL query

  switch (method) {
    case "GET":
      try {
        const questions = await Question.find({}).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: questions });
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }

    case "POST":
      try {
        const newQuestion = await Question.create(req.body);
        return res.status(201).json({ success: true, data: newQuestion });
      } catch (e) {
        return res.status(400).json({ error: e.message });
      }

    case "DELETE":
      try {
        const deletedQuestion = await Question.deleteOne({ _id: id });
        if (!deletedQuestion)
          return res.status(404).json({ message: "Not found" });
        return res.status(200).json({ success: true });
      } catch (e) {
        return res.status(400).json({ error: e.message });
      }

    default:
      res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
