const { Command } = require("commander");

const PATTERN_AWS_ACCOUNT_ID = /^\d{12}$/;
const PATTERN_REGION_CODE = /(us(-gov)?|ap|ca|cn|eu|sa)-(central|(north|south)?(east|west)?)-\d/;
const CONFIG_SERVICE = Symbol("configService");
const INPUT_SERVICE = Symbol("inputService");

/**
 * Handles the `miles ops setup` command.
 */
class SetupCommand {
  /**
   * Creates a new SetupCommand.
   *
   * @param {InputService} inputService - The input utility.
   * @param {ConfigService} configService - The Miles config service.
   * @param {SecretService} secretService - The Miles secret service.
   */
  constructor(input, configService) {
    this[INPUT_SERVICE] = input;
    this[CONFIG_SERVICE] = configService;
  }

  /**
   * Factory function.
   *
   * @param {container.Container} container - The dependency injection container.
   * @return {SetupCommand} a new instance of this class.
   */
  static async create(container) {
    const [input, configService] = await container.getAll([
      "io.input-service",
      "config.service",
    ]);
    return new SetupCommand(input, configService);
  }

  /**
   * Registers the commands with the nested Commander command.
   *
   * @return {commander.Command} the Commander command to register.
   */
  createCommand() {
    const command = new Command("setup");
    return command
      .description("Perform initial configuration of your AWS account info.")
      .option("--aws-account-id <value>", "Supply the AWS account ID.")
      .option("--region-code <value>", "Supply the AWS region code.")
      .option("--profile <value>", "Supply the AWS SDK profile name.")
      .action(this.run.bind(this));
  }

  /**
   * Gets the AWS account ID from a command line option or prompt for it.
   *
   * @return {string} The validated AWS account ID.
   */
  async getAccountId(options) {
    return await this[INPUT_SERVICE].getOptionOrPrompt(
      options,
      "awsAccountId",
      "Enter your AWS account ID: ",
      (value) => {
        let sanitized = value.replace(/\D/g, "");
        if (!PATTERN_AWS_ACCOUNT_ID.test(sanitized)) {
          throw new Error("Invalid AWS account ID.");
        }
        return sanitized;
      }
    );
  }

  /**
   * Gets the AWS region code from a command line option or prompt for it.
   *
   * @return {string} The validated AWS region code.
   */
  async getRegionCode(options) {
    return await this[INPUT_SERVICE].getOptionOrPrompt(
      options,
      "regionCode",
      "Enter your AWS region code: ",
      (value) => {
        if (!PATTERN_REGION_CODE.test(value)) {
          throw new Error("Invalid region code.");
        }
        return value;
      }
    );
  }

  /**
   * Gets the AWS SDK profile from a command line option or prompt for it.
   *
   * @return {string} The profile name.
   */
  async getProfile(options) {
    return await this[INPUT_SERVICE].getOptionOrPrompt(
      options,
      "profile",
      "Enter your AWS CLI profile name (optional): "
    );
  }

  /**
   * Run the `setup` command.
   */
  async run(options) {
    const awsAccountId = await this.getAccountId(options);
    const regionCode = await this.getRegionCode(options);
    const profile = await this.getProfile(options);
    this[CONFIG_SERVICE].set("ops", "aws.account-id", awsAccountId);
    this[CONFIG_SERVICE].set("ops", "aws.region-code", regionCode);
    if (profile) {
      this[CONFIG_SERVICE].set("ops", "aws.profile", profile);
    }
    await this[CONFIG_SERVICE].save();
    console.log({ awsAccountId, regionCode });
  }
}

module.exports = SetupCommand;
