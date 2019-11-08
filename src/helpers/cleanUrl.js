var cleanUrl = function (str) {
    var s = new RegExp('\s', 'g');
    var clean = str.replace(/\s/g, '-');
    return clean;
};
module.exports = cleanUrl;