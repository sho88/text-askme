const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// start the application AFTER connecting to MongoDB...
export async function start() {
  try {
    await client.connect();

    // get the database...
    const db = await client.db("textqanda");
  } catch (error) {
    console.log(`[ERROR]:`, error.message);
  }
}

// Check google docs document for connections codes

// CRUD
// create

// READ FUNCTION

// UPDATE

// DELETE

import { database } from "@/utils/firebase";

/**
 * Equivalent to POST
 * Responsible for creating data
 * @param String path
 * @param Object data
 * @returns
 */
export async function createData(path, data) {
  try {
    const newPostRef = push(ref(database, path), data);
    return (await newPostRef).key;
  } catch (error) {
    console.error("Error creating data:", error);
    return null;
  }
}

/**
 * Equivalent to GET
 * Responsible for reading data
 * @param String path
 * @returns
 */
export async function readData(path) {
  try {
    const snapshot = await get(ref(database, path));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available at", path);
      return null;
    }
  } catch (error) {
    console.error("Error reading data:", error);
    return null;
  }
}

/**
 * Equivalent to PUT
 * Responsible for updating data
 * @param String path
 * @param Object data
 * @returns
 */

// hereeeee
export async function updateData(path, data) {
  let updates = {};

  if (!Array.isArray(data)) updates = { ...data };
  else
    data.forEach((item) => {
      const newItemRef = push(ref(database, path));
      updates[newItemRef.key] = item;
    });

  try {
    await update(ref(database, path), updates);
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  }
}

/**
 * Equivalent to DELETE
 * Responsible for deleting data
 * @param String path
 * @returns
 */
export async function deleteData(path) {
  try {
    await remove(ref(database, path));
    return true;
  } catch (error) {
    console.error("Error deleting data:", error);
    return false;
  }
}
