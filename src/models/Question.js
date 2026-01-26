// import mongoose from "mongoose";

// const QuestionSchema = new mongoose.Schema({
//   question: {
//     type: String,
//     required: [true, "Please provide a question."],
//     maxlength: [500, "Question cannot be more than 500 characters."],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.Question ||
//   mongoose.model("Question", QuestionSchema);

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

// import mongoose from "mongoose";

// const QuestionSchema = new mongoose.Schema({
//   question: {
//     type: String,
//     required: [true, "Please provide a question."],
//     maxlength: [500, "Question cannot be more than 500 characters."],
//   },
//   // ADDED THIS: Without this, eventId is deleted by Mongoose before saving
//   eventId: {
//     type: String,
//     required: [true, "Each question must belong to a room."],
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // IMPORTANT: We export the model.
// // If it already exists in the cache, we use that; otherwise, we create it.
// export default mongoose.models.Question ||
//   mongoose.model("Question", QuestionSchema);
