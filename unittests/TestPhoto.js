"use strict";
describe("Component Photo", function () {
  var modelPhoto;

  before(function (done) {
    require(["../app/Components/photo/Photo.js"], function (Photo) {
      modelPhoto = Photo;
      done();
    });
  });

  describe("Photo", function () {
    it("Class round for photo", function () {
      let Photo;
      console.log(modelPhoto);
      Photo =  new modelPhoto();
      let result = Photo.round;
      assert.equal(result, "");
    });
  });
});
