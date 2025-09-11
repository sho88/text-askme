import { addDoc, collection, doc } from "firebase/firestore";
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
export async function updateDocument(collectionName = null) {
  if (collectionName === null) return null;
  
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
