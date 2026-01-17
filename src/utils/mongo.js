import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

// Construct the URI using your provided credentials
const uri =
  "mongo-connection-string - but do it the professional, secure way...";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

/**
 * Initializes the connection to MongoDB
 */
export async function start() {
  try {
    await client.connect();
    db = client.db("textqanda_"); // Your DB name
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error(`[CONNECTION ERROR]:`, error.message);
  }
}

/**
 * Equivalent to POST / Firebase Push
 * @param {string} collectionName - The name of the collection
 * @param {object} data - The document to insert
 */
export async function createData(collectionName, data) {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    return result.insertedId; // Returns the new MongoDB ObjectId
  } catch (error) {
    console.error("Error creating data:", error);
    return null;
  }
}

/**
 * Equivalent to GET
 * @param {string} collectionName
 * @param {string} id - Optional ID to find a specific document
 */
export async function readData(collectionName, id = null) {
  try {
    const collection = db.collection(collectionName);
    if (id) {
      // Find one by ID
      return await collection.findOne({ _id: new ObjectId(id) });
    } else {
      // Find all in collection
      return await collection.find({}).toArray();
    }
  } catch (error) {
    console.error("Error reading data:", error);
    return null;
  }
}

/**
 * Equivalent to PUT / Update
 * @param {string} collectionName
 * @param {string} id - The document ID to update
 * @param {object} data - The data to set
 */
export async function updateData(collectionName, id, data) {
  try {
    const collection = db.collection(collectionName);

    // If data is an array, we treat it as an insertMany (per your Firebase logic)
    if (Array.isArray(data)) {
      const result = await collection.insertMany(data);
      return result.acknowledged;
    }

    // Otherwise, perform a standard update
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
 * @param {string} id - The document ID to delete
 */
export async function deleteData(collectionName, id) {
  try {
    const collection = db.collection(collectionName);
    await collection.deleteOne({ _id: new ObjectId(id) });
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
}
