const DeployCommand = require("./lib/commands/deploy.js");
const ParamCommand = require("./lib/commands/param.js");
const SetupCommand = require("./lib/commands/setup.js");
const StatusCommand = require("./lib/commands/status.js");

/**
 * I'm responsible for the infrastructure and governance side of Miles.
 */
class OpsPlugin {
  /**
   * A brand new me.
   */
  constructor() {}

  /**
   * When I wake up.
   */
  async init(miles) {
    this.miles = miles;
  }

  /**
   * Set up commander.
   *
   * @param {commander.Command} program - The Commander instance.
   */
  addCommands(program) {
    let opsNestedCommand = program
      .command("ops")
      .description("Control a Miles deployment.");
    const commands = [DeployCommand, ParamCommand, SetupCommand, StatusCommand];
    commands
      .map((clz) => new clz(this))
      .forEach((cmd) => opsNestedCommand.addCommand(cmd.createCommand()));
  }
}

OpsPlugin.MILES_PLUGIN_API = 1;

module.exports = OpsPlugin;
