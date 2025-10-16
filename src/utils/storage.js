import {
  storageRef,
  getDownloadURL,
  storage,
  uploadBytesResumable,
} from "./firebase";

/**
 * Responsible for uploading images to Firebase Storage
 */
export const uploadImageToFirebase = (imageMetaData) =>
  new Promise((resolve, reject) => {
    // FIRST, Create the unique name for the file that will be uploaded...
    const uniqueFileName = `${imageMetaData.id}__${imageMetaData.imageFile.name}`;

    // THEN, Create a storage reference...
    const storageReference = storageRef(storage, `/files/${uniqueFileName}`);

    // THEN, Upload the file...
    const uploadTask = uploadBytesResumable(
      storageReference,
      imageMetaData.imageFile,
      {
        contentType: imageMetaData.imageFile.type,
      }
    );

    // WHEN the uploadTask is running, every time the state_changed event happens...
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // Update progress state
        console.log(`Upload is ${percent}% done.`);

        // WHEN the snapshot state is...
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },

      // in the case of an error, log it...
      (err) => console.error(err),

      () => {
        // get the url of the recently uploaded file...
        getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve({ url }));
      }
    );
  });
