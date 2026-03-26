import { useEffect, useState } from "react";

const BASE_PATH = "/api/database";

// Redo this whole file. Make it into a custom hook
export const api = {
  get: (col, query = "") =>
    fetch(`${BASE_PATH}?collection=${col}&${query}`).then((r) => r.json()),
  post: (col, data) =>
    fetch(`${BASE_PATH}?collection=${col}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  put: (col, id, data) =>
    fetch(`${BASE_PATH}?collection=${col}&id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.ok),
  delete: (col, id) =>
    fetch(`${BASE_PATH}?collection=${col}&id=${id}`, {
      method: "DELETE",
    }).then((r) => r.ok),
};

export const createDocument = (collection, data) => api.post(collection, data);
// src/utils/api.js

export const updateDocument = async (collection, id, data) => {
  const response = await fetch(
    `/api/database?collection=${collection}&id=${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  // We return response.ok (which is true if status is 200-299)
  return response.ok;
};
export const deleteDocument = (collection, id) => api.delete(collection, id);
