"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alterUserDeleteUsername1660050262383 = void 0;

var _typeorm = require("typeorm");

class alterUserDeleteUsername1660050262383 {
  async up(queryRunner) {
    await queryRunner.dropColumn("users", "username");
  }

  async down(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "username",
      type: "varchar"
    }));
  }

}

exports.alterUserDeleteUsername1660050262383 = alterUserDeleteUsername1660050262383;