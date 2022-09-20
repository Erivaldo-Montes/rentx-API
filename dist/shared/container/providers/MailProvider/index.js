"use strict";

var _tsyringe = require("tsyringe");

var _etherealMailProvider = require("./implementation/etherealMailProvider");

var _SESMailProvider = require("./implementation/SESMailProvider");

const mailProvider = {
  ethereal: _tsyringe.container.resolve(_etherealMailProvider.EtherealMailProvider),
  ses: _tsyringe.container.resolve(_SESMailProvider.SESmailProvider)
};

_tsyringe.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);