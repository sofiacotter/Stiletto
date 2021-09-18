import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { FireService } from './fire.service';


@Injectable({
  providedIn: 'root',
})
export class PictureService {
  public photos: Photo;


  constructor(private fser: FireService) {}








  public async TakePhoto() {
     // Take a photo
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64, // file-based data; provides best performance
        source: CameraSource.Prompt, // automatically take a new photo with the camera //ou Camera
        allowEditing: false,
        quality: 100 // highest quality (0 to 100)
      });

      // Save the picture and add it to photo collection
      //const savedImageFile = await this.savePicture(capturedPhoto);
      //const response = await fetch(capturedPhoto.webPath!);
      //const blob = await response.blob(); 

      const timetoday = new Date().getTime();
      const newfilename = ''+timetoday+".jpg";
      console.log("newfilename: ", newfilename);
      console.log("PHOTO PATH: ", capturedPhoto.path);
      console.log("PHOTO WEBPATH: ", capturedPhoto.webPath);
      console.log("PHOTO DATA_URL: ", capturedPhoto.dataUrl);
      console.log("CAPTURED PHOTO: ", capturedPhoto);
      console.log("CAPTURED PHOTO BASE 64: ", capturedPhoto.base64String);
      console.log("CAPTURED PHOTO FILENAME: ", newfilename);

      return [capturedPhoto.base64String, newfilename]; //base64String
    }

  }

    









    /*
    private async savePicture(cameraPhoto: Photo) { 
      // Convert photo to base64 format, required by Filesystem API to save
      const base64Data = await this.readAsBase64(cameraPhoto);

      // Write the file to the data directory
      const fileName = new Date().getTime() + '.jpeg';
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data
      });

      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: cameraPhoto.webPath
      };
    }














    private async readAsBase64(cameraPhoto: Photo) {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(cameraPhoto.webPath!);
      const blob = await response.blob(); 
      return await this.convertBlobToBase64(blob) as string;
    }
  











    

    private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
      const reader = new FileReader;
      reader.onerror = reject;
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
    */










export interface CapturedPhoto {
  filepath: string;
  webviewPath: string;
}