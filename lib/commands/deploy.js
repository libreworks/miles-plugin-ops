const { Command } = require("commander");

/**
 * Handles the `miles ops deploy` command.
 */
class DeployCommand {
  /**
   * Creates a new DeployCommand.
   */
  constructor() {}

  /**
   * Registers the commands with the nested Commander command.
   *
   * @return {commander.Command} the Commander command to register.
   */
  createCommand() {
    const command = new Command("deploy");
    const installCommand = new Command("install");
    const upgradeCommand = new Command("upgrade");
    const removeCommand = new Command("remove");
    return command
      .description("Install Miles or upgrade a Miles deployment.")
      .addCommand(
        installCommand
          .description("Creates a new Miles deployment.")
          .action(this.install.bind(this))
      )
      .addCommand(
        upgradeCommand
          .description("Upgrades an existing Miles deployment.")
          .action(this.upgrade.bind(this))
      )
      .addCommand(
        removeCommand
          .description("Completely removes a Miles deployment.")
          .action(this.remove.bind(this))
      );
  }

  // Gather input from following environment variables:
  // AWS_ACCOUNT_ID
  // AWS_ACCESS_KEY_ID
  // AWS_SECRET_ACCESS_KEY
  // AWS_DEFAULT_REGION

  /**
   * Run the `install` command.
   */
  install() {
    throw new Error("This command has not been implemented yet.");
  }

  /**
   * Run the `upgrade` command.
   */
  upgrade() {
    throw new Error("This command has not been implemented yet.");
  }

  /**
   * Run the `remove` command.
   */
  remove() {
    throw new Error("This command has not been implemented yet.");
  }
}

module.exports = DeployCommand;
