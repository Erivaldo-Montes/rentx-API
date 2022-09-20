"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoriesRepositoryInMemory = void 0;

var _category = require("../../infra/typeorm/entities/category");

class CategoriesRepositoryInMemory {
  constructor() {
    this.categories = [];
  }

  async findByName(name) {
    const category = this.categories.find(category => category.name === name);
    return category;
  }

  async create({
    name,
    description
  }) {
    const category = new _category.Category();
    Object.assign(category, {
      name,
      description
    });
    this.categories.push(category);
  }

  async list() {
    return this.categories;
  }

}

exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;