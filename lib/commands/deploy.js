/**
 * Handles the `miles ops deploy` command.
 */
class DeployCommand {
  /**
   * Creates a new DeployCommand.
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
      .command("deploy")
      .description("Install Miles or upgrade a Miles deployment.");
    nestedCommand
      .command("install")
      .description("Creates a new Miles deployment.")
      .action(this.install.bind(this));
    nestedCommand
      .command("upgrade")
      .description("Upgrades an existing Miles deployment.")
      .action(this.upgrade.bind(this));
    nestedCommand
      .command("remove")
      .description("Completely removes a Miles deployment.")
      .action(this.remove.bind(this));
  }

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
