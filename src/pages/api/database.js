import {
  start,
  createData,
  readData,
  updateData,
  deleteData,
} from "@/utils/mongo";
import { auth0 } from "@/lib/auth0";

export default async function handler(req, res) {
  try {
    await start();
    const { collection, id, eventId, pinCode } = req.query;
    const session = await auth0.getSession(req, res);
    const userId = session?.user?.sub;

    if (!collection)
      return res.status(400).json({ error: "Collection required" });

    switch (req.method) {
      case "GET":
        // Logic for Questions: Filter by EventId or Pin
        //
        // Fetching questions
        if (collection === "questions") {
          const filter = pinCode
            ? { pin: pinCode }
            : eventId
            ? { eventId }
            : {};
          const db = await start(); // Get the db instance
          const data = await db
            .collection("questions")
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();
          return res.status(200).json(data);
        }

        // // Logic for Rooms: If logged in and no specific ID, show only user's rooms
        //
        // Fetching rooms
        if (collection === "rooms" && userId && !id) {
          const allRooms = await readData(collection);
          return res
            .status(200)
            .json(allRooms.filter((r) => r.userId === userId));
        }

        // Default: Read specific item or all items
        const result = await readData(collection, id);
        return res.status(200).json(result);

      case "POST":
        const payload = { ...req.body, createdAt: new Date() };
        if (collection === "rooms") payload.userId = userId; // Tag room owner
        const newId = await createData(collection, payload);
        return res.status(201).json({ ...payload, _id: newId });

      // Inside src/pages/api/database.js switch statement:
      case "PUT":
        if (!id)
          return res.status(400).json({ error: "ID required for update" });
        const success = await updateData(collection, id, req.body);
        return res.status(200).json({ success });

      case "DELETE":
        if (!id) return res.status(400).json({ error: "ID required" });
        await deleteData(collection, id);
        return res.status(200).json({ success: true });

      default:
        return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
