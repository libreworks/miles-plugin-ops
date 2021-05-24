const assert = require("assert");
const { Command, Help } = require("commander");
const StatusCommand = require("../../lib/commands/status");

describe("StatusCommand", () => {
  describe("#constructor", () => {
    it("should have the miles property", async () => {
      const miles = {};
      const opsPlugin = { miles };
      const object = new StatusCommand(opsPlugin);
      assert.strictEqual(object.miles, miles);
    });
  });
  describe("#run", () => {
    const object = new StatusCommand({ miles: {} });
    it("should throw", async () => {
      assert.throws(() => object.run(), {
        name: "Error",
        message: "This command has not been implemented yet.",
      });
    });
  });
  describe("#createCommand", () => {
    it("should register things", async () => {
      const obj = new StatusCommand({ miles: {} });
      const statusCommand = obj.createCommand();
      assert.ok(statusCommand);
      assert.strictEqual(
        statusCommand.description(),
        "View the health of the Miles deployment."
      );
    });
  });
});
