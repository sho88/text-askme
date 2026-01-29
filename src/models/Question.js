import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please provide a question."],
    maxlength: [500, "Question cannot be more than 500 characters."],
  },
  // ADD THIS: Links the question to a specific room/event
  eventId: {
    type: String,
    required: [true, "Event ID is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
