const assert = require("assert");
const plugin = require("../index");

describe("index", () => {
  describe("constructor", () => {
    it("should construct", async () => {
      const obj = new plugin();
      assert.ok("init" in obj);
      assert.strictEqual(plugin.MILES_PLUGIN_API, 1);
    });
  });
});
