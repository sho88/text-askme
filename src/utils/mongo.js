// src/utils/mongo.js
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI; // Correctly pulls from .env.local

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

export async function start() {
  if (db) return; // Prevent multiple connections
  try {
    await client.connect();
    db = client.db("textqanda"); // Ensure this matches your URI database name
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

export async function readDataByParams(collectionName, pinCode = null) {
  try {
    const collection = db.collection(collectionName);
    if (pinCode) {
      // Ensure this matches the parameter name
      return await collection.find({ pin: pinCode }).toArray();
    }
    return await collection.find({}).toArray();
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
