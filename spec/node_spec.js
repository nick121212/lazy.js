var fs = require("fs");

require("./support/person.js");
require("./lazy_spec.js");
require("./map_spec.js");
require("./filter_spec.js");
require("./reverse_spec.js");
require("./concat_spec.js");
require("./flatten_spec.js");
require("./take_spec.js");
require("./drop_spec.js");

describe("working with streams", function() {

  // TODO: Figure out a smart way to test HTTP streams and other types of
  // streams as well.

  describe("file streams", function() {
    describe("lines", function() {
      it("reads every line of a file", function() {
        var lines = [];

        runs(function() {
          Lazy.readFile("./spec/data/lines.txt")
            .lines()
            .each(function(line) {
              lines.push(line);
            });
        });

        waitsFor(function() {
          return lines.length >= 25;
        });

        runs(function() {
          expect(lines).toEqual(Lazy.repeat("The quick brown fox jumped over the lazy dog.", 25).toArray());
        });
      });
    });

    describe("wrapping a stream directly", function() {
      it("works the same as calling a helper, e.g., readFile", function() {
        var lines = [];

        runs(function() {
          Lazy(fs.createReadStream("./spec/data/lines.txt"))
            .lines()
            .take(1)
            .each(function(line) {
              lines.push(line);
            });
        });

        waitsFor(function() {
          return lines.length > 0;
        });

        runs(function() {
          expect(lines[0]).toEqual("The quick brown fox jumped over the lazy dog.");
        });
      });
    });
  });
});
