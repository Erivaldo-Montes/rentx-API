"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImportCategoriesUseCase = void 0;

var _csvParse = require("csv-parse");

var _fs = _interopRequireDefault(require("fs"));

var _tsyringe = require("tsyringe");

var _categoriesRepository = require("@modules/cars/infra/typeorm/repositories/categoriesRepository");

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ImportCategoriesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CategoriesRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _categoriesRepository.CategoriesRepository === "undefined" ? Object : _categoriesRepository.CategoriesRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ImportCategoriesUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  loadCategories(file) {
    // transforma uma função que não é assíncrona em uma
    return new Promise((resolve, reject) => {
      const stream = _fs.default.createReadStream(file.path);

      const categories = [];
      const parseFile = (0, _csvParse.parse)({
        delimiter: ";"
      });
      stream.pipe(parseFile);
      parseFile.on("data", async line => {
        const [name, description] = line;
        categories.push({
          name,
          description
        });
      }).on("end", () => {
        // em caso de sucesso retorna.
        resolve(categories);

        _fs.default.unlink(file.path, err => {
          if (err) throw err;
          return null;
        });
      }).on("error", err => {
        // em caso de falha
        reject(err);
      });
    });
  }

  async execute(file) {
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const categoryExist = await this.categoriesRepository.findByName(category.name);
      const {
        name,
        description
      } = category;

      if (!categoryExist) {
        await this.categoriesRepository.create({
          name,
          description
        });
      }
    });
  }

}) || _class) || _class) || _class) || _class);
exports.ImportCategoriesUseCase = ImportCategoriesUseCase;