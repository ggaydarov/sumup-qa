let site = require('./site.json');

exports.JESTTIMEOUT = 100000;
exports.FULLPAGE = { fullPage: true };

exports.DESKTOP_VIEWPORT = {width: 1980, height: 1080};
exports.TABLET_VIEWPORT = {width: 768, height: 1080};
exports.MOBILE_VIEWPORT = {width: 375, height: 1080};

const SITE = site.host;
const PROTOCOL = "https://";
const BASEURL = PROTOCOL + SITE;

exports.HOME = BASEURL + site.pages.home;
