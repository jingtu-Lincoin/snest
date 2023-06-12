export default class FileUtil {
  public static getExtension(file: Express.Multer.File) {
    const fileName = file.originalname;
    const extension = fileName.split('.').pop();
    return extension;
  }
}
