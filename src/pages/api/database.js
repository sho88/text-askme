import {
  start,
  createData,
  readData,
  updateData,
  deleteData,
} from "../../utils/mongo";

/**
 * NAMED EXPORTS for Server-Side use (getServerSideProps)
 * This fixes the "readData is not a function" error.
 */
export async function readDocument(collection, id) {
  await start();
  return await readData(collection, id);
}

// You can export others if you need them server-side later
export async function createDocument(collection, data) {
  await start();
  return await createData(collection, data);
}

// /**
//  * DEFAULT EXPORT for API Route use (fetch)
//  */
// export default async function handler(req, res) {
//   try {
//     await start();

//     const { collection, id } = req.query;

//     if (!collection) {
//       return res.status(400).json({ error: "Collection name is required" });
//     }

//     // --- HANDLE GET (READ) ---
//     if (req.method === "GET") {
//       const data = await readData(collection, id);
//       if (!data) return res.status(404).json({ error: "Data not found" });
//       return res.status(200).json(data);
//     }

//     // --- HANDLE POST (CREATE) ---
//     if (req.method === "POST") {
//       const insertedId = await createData(collection, req.body);
//       return res.status(200).json({ ...req.body, _id: insertedId });
//     }

// Add this import at the top
import { auth0 } from "@/lib/auth0";

export default async function handler(req, res) {
  try {
    await start();
    const { collection, id } = req.query;

    // 1. Get the current user session
    const session = await auth0.getSession(req, res);
    const userId = session?.user?.sub; // This is the unique "Name Tag"

    if (!collection)
      return res.status(400).json({ error: "Collection name is required" });

    // --- HANDLE GET (READ) ---
    if (req.method === "GET") {
      // If asking for rooms and logged in, ONLY show rooms owned by this user
      let query = id;
      if (collection === "rooms" && userId && !id) {
        // This is the secret sauce: filtering by userId
        const allRooms = await readData(collection);
        const userRooms = allRooms.filter((room) => room.userId === userId);
        return res.status(200).json(userRooms);
      }

      const data = await readData(collection, id);
      return res.status(200).json(data);
    }

    // --- HANDLE POST (CREATE) ---
    if (req.method === "POST") {
      // Attach the owner's ID to the data before saving it
      const dataWithStatus = {
        ...req.body,
        userId: userId, // Permanently labels the room with the creator's ID
      };
      const insertedId = await createData(collection, dataWithStatus);
      return res.status(200).json({ ...dataWithStatus, _id: insertedId });
    }
    // ... rest of your code

    // --- HANDLE PUT (UPDATE) ---
    if (req.method === "PUT") {
      if (!id) return res.status(400).json({ error: "ID required" });
      const success = await updateData(collection, id, req.body);
      return res.status(200).json({ success });
    }

    // --- HANDLE DELETE (DELETE) ---
    if (req.method === "DELETE") {
      if (!id) return res.status(400).json({ error: "ID required" });
      const success = await deleteData(collection, id);
      return res.status(200).json({ success });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("API ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
