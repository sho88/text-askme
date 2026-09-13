import { start, readDataByParams } from "@/utils/mongo";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { pinCode } = req.query;

  try {
    await start();

    const rooms = await readDataByParams("rooms", Number(pinCode));

    if (rooms && rooms.length > 0) {
      return res.status(200).json({ success: true, eventId: rooms[0]._id });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
