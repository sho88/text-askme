import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firestoreDatabase } from "./firebase";

/**
 * CREATE document...
 * @param String collectionName
 * @param String jsonObject
 * @returns
 */
export async function createDocument(collectionName = null, jsonObject = null) {
  if (collectionName === null || jsonObject === null) return false;

  try {
    const newDocument = await addDoc(
      collection(firestoreDatabase, collectionName),
      {
        ...jsonObject,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    );

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
export async function readDocument(collectionName, documentID = null) {
  if (collectionName === null || documentID === null) return false;

  const documentReference = doc(firestoreDatabase, collectionName, documentID);
  const documentSnapshot = await getDoc(documentReference);

  if (!documentSnapshot.exists()) {
    console.error(`ERROR:`, documentID, " does not exist");
    return false;
  }

  // @TODO: Come back to allow it to return the updatedDate
  const documentSnap = documentSnapshot.data();

  return Object.keys(documentSnap)
    .filter((key) => key !== "createdAt" && key !== "updatedAt")
    .reduce(
      (defaultObject, key) => ({
        ...defaultObject,
        [key]: documentSnap[key],
      }),
      {}
    );
}

/**
 * UPDATE document...
 * @param String collectionName
 * @returns
 */
export async function updateDocument(
  collectionName = null,
  documentId = null,
  jsonObject = null
) {
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
  if (collectionName === null) return false;
}

export async function createCollection() {}

/**
 * Responsible for getting all of the documents by collection...
 * @param String collectionName
 * @returns
 */
export async function getCollection(collectionName) {
  /**
   * IF there is no collectionName defined,
   * THEN log the error
   * AND return a blank array
   */
  if (!collectionName) {
    console.error(`You haven't specified a collection name`);
    return [];
  }

  // prepare and define the documents blank array...
  let documents = [];

  try {
    const collectionReference = collection(firestoreDatabase, collectionName);
    const querySnapshot = await getDocs(collectionReference);

    querySnapshot.forEach((document) => {
      documents = [...documents, { id: document.id, ...document.data() }];
    });
  } catch (error) {
    console.error(`ERROR:`, error);
  } finally {
    return documents;
  }
}
