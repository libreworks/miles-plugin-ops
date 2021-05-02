const sinon = require("sinon");
const assert = require("assert");
const { Command, Help } = require("commander");
const OpsPlugin = require("../index");

describe("OpsPlugin", () => {
  describe("#constructor", () => {
    it("should construct", async () => {
      const obj = new OpsPlugin();
      assert.ok("init" in obj);
      assert.strictEqual(OpsPlugin.MILES_PLUGIN_API, 1);
    });
  });
  describe("#init", () => {
    it("should return a Promise", async () => {
      const miles = {};
      const obj = new OpsPlugin();
      await obj.init(miles);
      assert.strictEqual(obj.miles, miles);
    });
  });
  describe("#addCommands", () => {
    it("should call Commander methods", async () => {
      const obj = new OpsPlugin();
      const program = new Command();
      obj.addCommands(program);
      const help = new Help();
      const commands = help.visibleCommands(program);
      assert.ok(Array.isArray(commands));
      assert.ok(
        commands.some((command) => {
          const subHelp = new Help();
          const subCommands = subHelp.visibleCommands(command);
          return (
            command.name() === "ops" &&
            command.description() === "Control a Miles deployment."
          );
          subCommands.length > 1;
        })
      );
    });
  });
});
