import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please provide a question."],
    maxlength: [500, "Question cannot be more than 500 characters."],
  },
  eventId: {
    type: String,
    required: [true, "Event ID is required"],
  },
  pin: {
    type: Number,
    required: [true, "PIN is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Question ||
  mongoose.model("Question", QuestionSchema);
