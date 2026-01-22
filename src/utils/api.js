export const createDocument = async (collection, data) => {
  const response = await fetch(`/api/database?collection=${collection}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json(); // If this fails, the server sent HTML instead of JSON
  if (!response.ok)
    throw new Error(result.error || "Failed to create document");
  return result;
};

export const updateDocument = async (collection, id, data) => {
  const response = await fetch(
    `/api/database?collection=${collection}&id=${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  return response.ok;
};

// src/utils/api.js
export async function deleteDocument(collection, id) {
  const res = await fetch(`/api/database?collection=${collection}&id=${id}`, {
    method: "DELETE",
  });
  return res.ok;
}
