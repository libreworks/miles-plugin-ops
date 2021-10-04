const { Command } = require("commander");

/**
 * Handles the `miles ops status` command.
 */
class StatusCommand {
  /**
   * Creates a new StatusCommand.
   */
  constructor() {}

  /**
   * Registers the commands with the nested Commander command.
   *
   * @return {commander.Command} the Commander command to register.
   */
  createCommand() {
    const command = new Command("status");
    return command
      .description("View the health of the Miles deployment.")
      .action(this.run.bind(this));
  }

  /**
   * Run the command.
   */
  run() {
    throw new Error("This command has not been implemented yet.");
  }
}

module.exports = StatusCommand;
