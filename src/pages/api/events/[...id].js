export default function handler(req, res) {
  console.log(req.id);
  res.status(200).json({
    event_id: "EVT-55021-Z",
    event_name: "Modern Web Architecture 2026",
    title: "Building Scalable Microservices for good",
    image: "/images/NEW-Opening.webp",
    description:
      "An intensive workshop covering the transition from monolithic architectures to cloud-native microservices using Docker and Kubernetes.",
  });
}
