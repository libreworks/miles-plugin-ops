const { Command } = require("commander");

const PARAM_SERVICE = Symbol("paramService");
const OUTPUT_SERVICE = Symbol("outputService");

/**
 * Handles the `miles ops param` command.
 */
class ParamCommand {
  /**
   * Creates a new ParamCommand.
   *
   * @param {ParamService} paramService - The AWS Parameter Store service.
   * @param {OutputService} outputService - The Miles CLI output service.
   */
  constructor(paramService, outputService) {
    this[PARAM_SERVICE] = paramService;
    this[OUTPUT_SERVICE] = outputService;
  }

  /**
   * Factory function.
   *
   * @param {container.Container} container - The dependency injection container.
   * @return {ParamCommand} a new instance of this class.
   */
  static async create(container) {
    const [paramService, outputService] = await container.getAll([
      "plugin.ops.param.service",
      "io.output-service",
    ]);
    return new ParamCommand(paramService, outputService);
  }

  /**
   * Creates the Commander command for the nested "get" action.
   *
   * @return {commander.Command} the new Commander command.
   */
  createGetCommand() {
    const getCommand = new Command("get");
    return getCommand
      .arguments("<name>")
      .description("Gets the value of a Miles deployment parameter.")
      .option("-a, --all", "Retrieve the entire JSON Parameter object.")
      .option("-n, --no-decrypt", "Do not decrypt the value of a SecretString.")
      .action(this.get.bind(this));
  }

  /**
   * Creates the Commander command for the nested "set" action.
   *
   * @return {commander.Command} the new Commander command.
   */
  createSetCommand() {
    const setCommand = new Command("set");
    return setCommand
      .arguments("<name> <value>")
      .description("Sets the new value of a Miles deployment parameter.")
      .option("-s, --secret", "Stores the value as a SecretString.")
      .action(this.set.bind(this));
  }

  /**
   * Creates the "miles ops param" Commander command.
   *
   * @return {commander.Command} the new Commander command.
   */
  createCommand() {
    const command = new Command("param");
    return command
      .description("Inspect or adjust Miles deployment parameters.")
      .addCommand(this.createGetCommand())
      .addCommand(this.createSetCommand());
  }

  /**
   * Run the `get` command.
   *
   * @param {string} name - The name of parameter to retrieve.
   * @param {Object} options - The provided CLI options.
   */
  async get(name, options) {
    const response = await this[OUTPUT_SERVICE].spinForPromise(
      this[PARAM_SERVICE].get(name, options.decrypt),
      "Retrieving parameter"
    );
    this[OUTPUT_SERVICE].write(
      options.all ? response.Parameter : response.Parameter.Value
    );
  }

  /**
   * Run the `set` command.
   *
   * @param {string} name - The name of parameter to retrieve.
   * @param {string} value - The value to store.
   * @param {Object} options - The provided CLI options.
   */
  async set(name, value, options) {
    await this[OUTPUT_SERVICE].spinForPromise(
      this[PARAM_SERVICE].set(name, value, !!options.secret),
      "Storing parameter"
    );
  }
}

module.exports = ParamCommand;
