import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export async function start() {
  if (db) return db;
  try {
    await client.connect();
    db = client.db("textqanda");
    console.log("Successfully connected to MongoDB");
    return db;
  } catch (error) {
    console.error(`[CONNECTION ERROR]:`, error.message);
    throw error;
  }
}

/**
 * POST
 * @param {string} collectionName
 * @param {object} data
 */
export async function createData(collectionName, data) {
  await start();
  try {
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    return result.insertedId;
  } catch (error) {
    console.error("Error creating data:", error);
    return null;
  }
}

/**
GET
 * @param {string} collectionName
 * @param {string} id
 */
export async function readData(collectionName, id = null) {
  await start();
  try {
    const collection = db.collection(collectionName);
    if (id) {
      // Find one by ID // finding specific rooms by userId or EventId, or either?
      return await collection.findOne({ _id: new ObjectId(id) });
    } else {
      return await collection.find({}).toArray();
    }
  } catch (error) {
    console.error("Error reading data:", error);
    return null;
  }
}

// Accessing a particular room by its PinCode / Guest experience of the app
export async function readDataByParams(collectionName, pinCode = null) {
  await start();

  try {
    const collection = db.collection(collectionName);
    // Looking for the 'pin' field in our 'rooms' document
    return await collection.find({ pin: pinCode }).toArray();
  } catch (error) {
    console.error("Error reading data:", error);
    return null;
  }
}

/**
PUT / Update
 * @param {string} collectionName
 * @param {string} id
 * @param {object} data
 */
export async function updateData(collectionName, id, data) {
  await start();

  try {
    const collection = db.collection(collectionName);
    if (Array.isArray(data)) {
      const result = await collection.insertMany(data);
      return result.acknowledged;
    }

    await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
}

/**
 * Equivalent to DELETE
 * @param {string} collectionName
 * @param {string} id
 */
export async function deleteData(collectionName, id) {
  await start();

  try {
    const collection = db.collection(collectionName);
    await collection.deleteOne({ _id: new ObjectId(id) });
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
}
