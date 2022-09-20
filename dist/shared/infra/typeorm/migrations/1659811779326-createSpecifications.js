"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSpecifications1659811779326 = void 0;

var _typeorm = require("typeorm");

class createSpecifications1659811779326 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "specifications",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("specifications");
  }

}

exports.createSpecifications1659811779326 = createSpecifications1659811779326;