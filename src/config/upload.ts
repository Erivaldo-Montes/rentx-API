import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  storage: multer.diskStorage({
    // informa o destino
    destination: tmpFolder,
    filename: (request, file, callback) => {
      // cria um nome aleatório para o arquivo
      const fileHash = crypto.randomBytes(16).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
