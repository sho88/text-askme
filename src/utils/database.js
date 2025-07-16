import {
  child,
  get,
  push,
  ref,
  remove,
  set,
  update,
  onValue,
} from "firebase/database";
import { database } from "@/utils/firebase";

/**
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
 * Responsible for updating data
 * @param String path
 * @param Object data
 * @returns
 */
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
