"use strict";

var _tsyringe = require("tsyringe");

var _dayjsDateProvider = require("./implementations/dayjsDateProvider");

_tsyringe.container.registerSingleton("DayjsDateProvider", _dayjsDateProvider.DayjsDateProvider);