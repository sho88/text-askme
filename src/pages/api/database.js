import {
  start,
  createData,
  readData,
  updateData,
  deleteData,
} from "@/utils/mongo";
import { auth0 } from "@/lib/auth0";
import { pusherServer } from "@/lib/pusher-server";

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
        // Fetching questions
        if (collection === "questions") {
          const filter = pinCode
            ? { pin: pinCode }
            : eventId
            ? { eventId }
            : {};
          const db = await start();
          const data = await db
            .collection("questions")
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();
          return res.status(200).json(data);
        }

        // Fetching rooms
        if (collection === "rooms" && userId && !id) {
          const allRooms = await readData(collection);
          return res
            .status(200)
            .json(allRooms.filter((r) => r.userId === userId));
        }

        const result = await readData(collection, id);
        return res.status(200).json(result);

      // case "POST":
      //   const payload = {
      //     ...req.body,
      //     createdAt: new Date(),
      //     author: userId || null,
      //   };

      //   if (collection === "rooms") payload.userId = userId;

      //   const newId = await createData(collection, payload);

      //   // only trigger Pusher for new questions once newId is generated...
      //   await pusherServer.trigger(
      //     `event-${payload.eventId}`,
      //     "new-question",
      //     true
      //   );

      //   // ...then return the full question data (including newId) in the response
      //   return res.status(201).json({ ...payload, _id: newId });

case "POST":
  const payload = {
    ...req.body,
    createdAt: new Date(),
    author: userId || null,
  };

  if (collection === "rooms") payload.userId = userId;

  const newId = await createData(collection, payload);

  // Send the full message payload to Pusher instead of `true`
  await pusherServer.trigger(
    `event-${payload.eventId}`,
    "new-question",
    { ...payload, _id: newId }
  );

  return res.status(201).json({ ...payload, _id: newId });

      // Inside your API handler (POST case):

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
