export const questionsHandler = (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    console.log("Data received on server:", data);

    res.status(200).json({
      message: "Success. It worked!",
      received: data,
    });
  } else {
    res.status(405).json({ message: "Error with the method" });
  }
};

export default questionsHandler;
