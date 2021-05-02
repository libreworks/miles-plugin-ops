/**
 * Handles the `miles ops param` command.
 */
class ParamCommand {
  /**
   * Creates a new ParamCommand.
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
      .command("param")
      .description("Inspect or adjust Miles deployment parameters.");
    nestedCommand
      .command("get")
      .description("Gets the current value of a Miles deployment parameter.")
      .action(this.get.bind(this));
    nestedCommand
      .command("set")
      .description("Sets the new value of a Miles deployment parameter.")
      .action(this.set.bind(this));
  }

  /**
   * Run the `get` command.
   */
  get() {
    throw new Error("This command has not been implemented yet.");
  }

  /**
   * Run the `set` command.
   */
  set() {
    throw new Error("This command has not been implemented yet.");
  }
}

module.exports = ParamCommand;
