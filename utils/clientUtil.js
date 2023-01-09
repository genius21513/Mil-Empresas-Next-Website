import { Alert } from "../services";

/** get image object to send to the server, from file */
export const getByteObjFromFile = (event) => {
    return new Promise(resolve => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];

            ////////////** Type validation   */
            // const file = event.target.files[0];
            // if (!file.type.match(imageMimeType)) {
            //     Alert.error('File format error.');
            //     return;
            // }

            const MIN_FILE_SIZE = 0 // 0
            const MAX_FILE_SIZE = 300 // 300KB
            const fileSizeKiloBytes = i.size / 1024;

            // console.log(fileSizeKiloBytes);
            if (fileSizeKiloBytes < MIN_FILE_SIZE || fileSizeKiloBytes > MAX_FILE_SIZE) {
                Alert.error('File size is not match. (1MB ~ 5MB)');
                return;
            }

            /** to show */
            const reader = new FileReader();
            reader.onload = (e) => {
                const b64 = btoa(e.target.result);
                const obj = {
                    'name': `${i.name}`,
                    'type': `image`,
                    'picByte': null,
                    'imageBase64': `${b64}`
                }
                //This is reslover.  
                resolve(obj);
            };
            reader.readAsBinaryString(i);
        }
    });
}
