const handler = (_, response) => {

  return response.status(200).json({
    event_id: "EVT-55021-Z",
    event_name: "Modern Web Architecture 2026",
    title: "Building Scalable Microservices",
    image: "https://cdn.example.com/assets/event-banners/microservices-workshop.png",
    description: "A hard study covering the transition from monolithic architectures to cloud-native microservices using Docker and Kubernetes.",
    questions: [
      {
        question_id: 63921,
        content: "Does this session cover Kubernetes deployment patterns?",
        answered: true,
        timestamp: "2025-12-20T09:15:00Z",
      },
      {
        question_id: 12844,
        content:
          "Will the slide decks be available for download after the presentation?",
        answered: false,
        timestamp: "2025-12-20T10:45:22Z",
      },
      {
        question_id: 99382,
        content: "What are the hardware prerequisites for the hands-on lab?",
        answered: true,
        timestamp: "2025-12-20T11:02:15Z",
      },
    ],
  });

}

export default handler;

