/**
* Utility for MongoDB API calls
*/

export async function createDocument(collection, data) {
const response = await fetch(`/api/${collection}`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data),
});
return response.ok ? await response.json() : null;
}

export async function updateDocument(collection, id, data) {
const response = await fetch(`/api/${collection}/${id}`, {
method: 'PATCH',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data),
});
return response.ok;
}

export async function deleteDocument(collection, id) {
const response = await fetch(`/api/${collection}/${id}`, {
method: 'DELETE',
});
return response.ok;
}
