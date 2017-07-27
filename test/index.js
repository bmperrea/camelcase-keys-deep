var expect = require("chai").expect;
var camelcaseKeysDeep = require("../index");

describe("camelcaseKeysDeep", function() {
  var extract;

  it("should deeply camelcase the keys of a JSON object", function() {
    var aDate = new Date(2016, 3, 15);
    var json = {
      unicorn_rainbow: {
        foo_bar: 1,
        a_date: aDate,
        an_array: [1, 2, {foo_bar: 3}]
      }
    };
    expect(camelcaseKeysDeep(json)).to.be.deep.equal({
      unicornRainbow: {
        fooBar: 1,
        aDate: aDate,
        anArray: [1, 2, {fooBar: 3}]
      }
    });
  });

  it("should raise if camelcased key would overwrite existing key of the JSON object", function() {
    var json = {unicorn_rainbow: {foo_bar: 1, fooBar: 2}};
    expect(function() {
      camelcaseKeysDeep(json);
    }).to.throw();

    json = {foo: 1}
    expect(function() {
      camelcaseKeysDeep(json);
    }).to.not.throw();
  });

  it("should take less than 200μs (on average)", function() {
    var num = 10000;

    // initialization
    var jsons = [];
    var results = [];
    for (var j=0; j<num; j++) {
      jsons.push({
        unicorn_rainbow: {
          foo_bar: 1,
          a_date: ( new Date(2016, 3, 15) ),
          an_array: [1, 2, {foo_bar: 3}]
        }
      });
      results.push({})
    }

    // timing
    var start = process.hrtime();
    for(j=0; j<num; j++){
      results[j] = camelcaseKeysDeep(jsons[j])
    }
    var time = process.hrtime(start);

    console.info("Execution time (hr): %ds %dμs", time[0]/num, time[1]/(1000*num));
  });

});
