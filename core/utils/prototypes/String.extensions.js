if (!String.prototype.toProperCase) {
  String.prototype.toProperCase = function() {
    return this.replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substr(1).toLowerCase())
  }
}