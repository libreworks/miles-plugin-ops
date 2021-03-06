const assert = require("assert");
const { Help, Command } = require("commander");
const ParamCommand = require("../../lib/commands/param");

describe("ParamCommand", () => {
  describe("#get", () => {
    it("should throw", async () => {
      const object = new ParamCommand({ miles: {} });
      assert.throws(() => object.get(), {
        name: "Error",
        message: "This command has not been implemented yet.",
      });
    });
  });
  describe("#set", () => {
    it("should throw", async () => {
      const object = new ParamCommand({ miles: {} });
      assert.throws(() => object.set(), {
        name: "Error",
        message: "This command has not been implemented yet.",
      });
    });
  });
  describe("#createCommand", () => {
    it("should register things", async () => {
      const obj = new ParamCommand({ miles: {} });
      const paramCommand = obj.createCommand();
      assert.ok(paramCommand);
      assert.strictEqual(
        paramCommand.description(),
        "Inspect or adjust Miles deployment parameters."
      );
      const subHelp = new Help();
      const subCommands = subHelp.visibleCommands(paramCommand);
      assert.ok(Array.isArray(subCommands));
      const [getCommand] = subCommands.filter(
        (command) => command.name() === "get"
      );
      assert.ok(getCommand);
      assert.strictEqual(
        getCommand.description(),
        "Gets the value of a Miles deployment parameter."
      );
      const [setCommand] = subCommands.filter(
        (command) => command.name() === "set"
      );
      assert.ok(setCommand);
      assert.strictEqual(
        setCommand.description(),
        "Sets the new value of a Miles deployment parameter."
      );
    });
  });
});
