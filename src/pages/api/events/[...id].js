export default function handler(req, res) {
  console.log(req.id);
  res.status(200).json({
    event_id: "EVT-55021-Z",
    event_name: "Modern Web Architecture 2026",
    title: "Building Scalable Microservices for good",
    image:
      "https://cdn.example.com/assets/event-banners/microservices-workshop.png",
    description:
      "An intensive workshop covering the transition from monolithic architectures to cloud-native microservices using Docker and Kubernetes.",
  });
}

// Do api/questions -respond with questions and render them in the frontend

// so create a questions.js file in the api folder

// Create handler function. this returns a response
