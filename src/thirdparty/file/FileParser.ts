import FileUtil from './FileUtil';
import { extractRawText } from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

export default class FileParser {
  static async readText(file: Express.Multer.File) {
    let text = '';
    const extension = FileUtil.getExtension(file);
    console.log('extension', extension);
    if (extension === 'docx') {
      text = await FileParser.readTextFromDocx(file);
    } else if (extension === 'pdf') {
      text = await FileParser.readTextFromPdf(file);
    }
    return text;
  }

  private static async readTextFromPdf(file: Express.Multer.File) {
    let text = '';
    const loadingTask = pdfjsLib.getDocument(file.buffer);
    await loadingTask.promise.then(async (pdf: any) => {
      const maxPages = pdf.numPages;
      for (let j = 1; j <= maxPages; j++) {
        const page = await pdf.getPage(j);
        const tokenizedText = await page.getTextContent();
        const pageText = tokenizedText.items
          .map((token: any) => token.str)
          .join(' ');
        text += pageText;
      }
    });
    return text;
  }

  private static async readTextFromDocx(file: Express.Multer.File) {
    let text = '';
    await extractRawText({ buffer: file.buffer }).then(function (result) {
      text = result.value; // The raw text
      console.log('text1', text);
    });
    return text;
  }
}
