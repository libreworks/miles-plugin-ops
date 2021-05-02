/**
 * Handles the `miles ops status` command.
 */
class StatusCommand {
  /**
   * Creates a new StatusCommand.
   *
   * @param {OpsPlugin} opsPlugin - The OpsPlugin instance.
   */
  constructor(opsPlugin) {
    this.miles = opsPlugin.miles;
  }

  /**
   * Registers the commands with the nested Commander command.
   *
   * @param {Object} opsNestedCommand - The nested command instance.
   */
  addCommands(opsNestedCommand) {
    let nestedCommand = opsNestedCommand
      .command("status")
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
