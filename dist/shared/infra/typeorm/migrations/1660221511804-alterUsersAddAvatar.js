"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alterUsersAddAvatar1660221511804 = void 0;

var _typeorm = require("typeorm");

class alterUsersAddAvatar1660221511804 {
  async up(queryRunner) {
    await queryRunner.addColumn("users", new _typeorm.TableColumn({
      name: "avatar",
      type: "varchar",
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn("users", "avatar");
  }

}

exports.alterUsersAddAvatar1660221511804 = alterUsersAddAvatar1660221511804;