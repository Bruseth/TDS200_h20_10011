import { useState } from "react";
import { auth, storage } from "../nhost"


export const useImageUpload = () => {

  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const startUploading = async ([{ base64String, filenameWithExtension }] : 
    [{ base64String: string, filenameWithExtension: string }]) => {

    await storage.putString(`/public/${filenameWithExtension}`, 
    base64String, "data_url", null, (pe: ProgressEvent) =>
     {
      setUploadProgress((pe.loaded / pe.total) * 100);
      //Clear progress
      setTimeout(() => setUploadProgress(0), 10000);
    });
  }

  return {
    startUploading,
    uploadProgress
  }
}


