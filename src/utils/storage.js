import { ref, getDownloadURL, storage, uploadBytesResumable } from "./firebase";

export const uploadImageToFirebase = (configuration) => {
  // Create a storage reference
  const storageRef = ref(storage, `/files/${configuration.name}`);

  // Upload the file
  const uploadTask = uploadBytesResumable(storageRef, configuration);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // Update progress state
      console.log(percent);
    },
    (err) => console.log(err),
    () => {
      // Download the URL of the uploaded file
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
      });
    }
  );
};
