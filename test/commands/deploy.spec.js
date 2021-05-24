const assert = require("assert");
const { Help, Command } = require("commander");
const DeployCommand = require("../../lib/commands/deploy");

describe("DeployCommand", () => {
  describe("#constructor", () => {
    it("should have the miles property", async () => {
      const miles = {};
      const opsPlugin = { miles };
      const object = new DeployCommand(opsPlugin);
      assert.strictEqual(object.miles, miles);
    });
  });
  describe("#install", () => {
    it("should throw", async () => {
      const object = new DeployCommand({ miles: {} });
      assert.throws(() => object.install(), {
        name: "Error",
        message: "This command has not been implemented yet.",
      });
    });
  });
  describe("#upgrade", () => {
    it("should throw", async () => {
      const object = new DeployCommand({ miles: {} });
      assert.throws(() => object.upgrade(), {
        name: "Error",
        message: "This command has not been implemented yet.",
      });
    });
  });
  describe("#remove", () => {
    it("should throw", async () => {
      const object = new DeployCommand({ miles: {} });
      assert.throws(() => object.remove(), {
        name: "Error",
        message: "This command has not been implemented yet.",
      });
    });
  });
  describe("#createCommand", () => {
    it("should register things", async () => {
      const obj = new DeployCommand({ miles: {} });
      const deployCommand = obj.createCommand();
      assert.ok(deployCommand);
      assert.strictEqual(
        deployCommand.description(),
        "Install Miles or upgrade a Miles deployment."
      );
      const subHelp = new Help();
      const subCommands = subHelp.visibleCommands(deployCommand);
      const [installCommand] = subCommands.filter(
        (command) => command.name() === "install"
      );
      assert.ok(installCommand);
      assert.strictEqual(
        installCommand.description(),
        "Creates a new Miles deployment."
      );
      const [upgradeCommand] = subCommands.filter(
        (command) => command.name() === "upgrade"
      );
      assert.ok(upgradeCommand);
      assert.strictEqual(
        upgradeCommand.description(),
        "Upgrades an existing Miles deployment."
      );
      const [removeCommand] = subCommands.filter(
        (command) => command.name() === "remove"
      );
      assert.ok(removeCommand);
      assert.strictEqual(
        removeCommand.description(),
        "Completely removes a Miles deployment."
      );
    });
  });
});
