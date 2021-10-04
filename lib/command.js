const { Command } = require("commander");

const COMMANDS = Symbol("commands");

/**
 * Handles the `miles ops` command.
 */
class OpsCommand {
  /**
   * @param {Object[]} commands - The nested commands.
   */
  constructor(commands) {
    this[COMMANDS] = commands;
  }

  /**
   * Factory function.
   *
   * @param {container.Container} container - The dependency injection container.
   * @return {OpsCommand} a new instance of this class.
   */
  static async create(container) {
    const commands = await container.getAll([
      "plugin.ops.command.deploy",
      "plugin.ops.command.param",
      "plugin.ops.command.setup",
      "plugin.ops.command.status",
    ]);
    return new OpsCommand(commands);
  }

  /**
   * Visits a Commander.js instance.
   *
   * @param {commander.Commander} program - The Commander.js instance.
   */
  visitCommander(program) {
    program.addCommand(this.createCommand());
  }

  /**
   * Creates a Commander command.
   *
   * @return {commander.Command} the created Commander command.
   */
  createCommand() {
    const command = new Command("ops");
    command.description("Control a Miles deployment.");
    for (const nestedCommand of this[COMMANDS]) {
      command.addCommand(nestedCommand.createCommand());
    }
    return command;
  }
}

module.exports = OpsCommand;
