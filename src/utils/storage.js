export const uploadImage = async ({ imageFile }) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to upload image.");

  return await response.json();
};
