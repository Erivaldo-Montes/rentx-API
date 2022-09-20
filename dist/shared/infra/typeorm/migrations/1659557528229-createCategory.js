"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCategory1659557528229 = void 0;

var _typeorm = require("typeorm");

class createCategory1659557528229 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "categories",
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
    await queryRunner.dropTable("categories");
  }

}

exports.createCategory1659557528229 = createCategory1659557528229;