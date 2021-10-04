const sinon = require("sinon");
const assert = require("assert");
const { Command, Help } = require("commander");
const OpsPlugin = require("../index");

describe("opsPlugin", () => {
  describe("#constructor", () => {
    it("should have constant", async () => {
      assert.strictEqual(OpsPlugin.MILES_PLUGIN_API, 1);
    });
  });
});
