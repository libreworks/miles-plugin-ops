const { Command } = require("commander");

/**
 * Handles the `miles ops param` command.
 */
class ParamCommand {
  /**
   * Creates a new ParamCommand.
   */
  constructor() {}

  /**
   * Registers the commands with the nested Commander command.
   *
   * @return {commander.Command} the Commander command to register.
   */
  createCommand() {
    const command = new Command("param");
    const getCommand = new Command("get");
    const setCommand = new Command("set");
    return command
      .description("Inspect or adjust Miles deployment parameters.")
      .addCommand(
        getCommand
          .description("Gets the value of a Miles deployment parameter.")
          .action(this.get.bind(this))
      )
      .addCommand(
        setCommand
          .description("Sets the new value of a Miles deployment parameter.")
          .action(this.set.bind(this))
      );
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
