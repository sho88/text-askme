import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { firestoreDatabase } from "./firebase";

/**
 * CREATE document...
 * @param String collectionName 
 * @param String jsonObject 
 * @returns 
 */
export async function createDocument(collectionName = null, jsonObject = null) {
  if (collectionName === null || jsonObject === null) return null;

  try {
    const newDocument = await addDoc(collection(firestoreDatabase, collectionName), {
      ...jsonObject,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { id: newDocument.id, ...jsonObject };
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * READ document...
 * @param String collectionName 
 * @returns 
 */
export async function readDocument(collectionName = null) {
  if (collectionName === null) return null;


}

/**
 * UPDATE document...
 * @param String collectionName 
 * @returns 
 */
export async function updateDocument(collectionName = null, documentId = null, jsonObject = null) {
  if (collectionName === null || documentId === null || jsonObject === null) {
    console.error("Missing collection name, document ID, or update data.");
    return false;
  }

  try {
    const documentRef = doc(firestoreDatabase, collectionName, documentId);
    await updateDoc(documentRef, {
      ...jsonObject,
      updatedAt: new Date(), // Always update the timestamp
    });
    return true; 
  } catch (error) {
    console.error("Error updating document:", error);
    return false;
  }
}

/**
 * DELETE document...
 * @param String collectionName 
 * @returns 
 */
export async function deleteDocument(collectionName = null) {
  if (collectionName === null) return null;
  
}


export async function createCollection() {

}
