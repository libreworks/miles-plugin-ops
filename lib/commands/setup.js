const promptly = require("promptly");
const { Command } = require("commander");

const PATTERN_AWS_ACCOUNT_ID = /^\d{12}$/;
const PATTERN_ACCESS_KEY_ID = /(?<![A-Z0-9])[A-Z0-9]{20}(?![A-Z0-9])/;
const PATTERN_SECRET_ACCESS_KEY = /(?<![A-Za-z0-9/+=])[A-Za-z0-9/+=]{40}(?![A-Za-z0-9/+=])/;
const PATTERN_REGION_CODE = /(us(-gov)?|ap|ca|cn|eu|sa)-(central|(north|south)?(east|west)?)-\d/;

/**
 * Handles the `miles ops setup` command.
 */
class SetupCommand {
  /**
   * Creates a new SetupCommand.
   *
   * @param {OpsPlugin} opsPlugin - The OpsPlugin instance.
   */
  constructor(opsPlugin) {
    this.input = opsPlugin.miles.input;
    this.config = opsPlugin.miles.config;
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
      .option("--access-key-id <value>", "Supply the AWS access key ID.")
      .option(
        "--secret-access-key <value>",
        "Supply the AWS secret access key."
      )
      .action(this.run.bind(this));
  }

  /**
   * Gets the AWS account ID from a command line option or prompt for it.
   *
   * @return {string} The validated AWS account ID.
   */
  async getAccountId(options) {
    return await this.input.getOptionOrPrompt(
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
   * Gets the AWS access key ID from a command line option or prompt for it.
   *
   * @return {string} The validated AWS access key ID.
   */
  async getAccessKeyId(options) {
    return await this.input.getOptionOrPrompt(
      options,
      "accessKeyId",
      "Enter your IAM access key ID: ",
      (value) => {
        if (!PATTERN_ACCESS_KEY_ID.test(value)) {
          throw new Error("Invalid access key ID.");
        }
        return value;
      }
    );
  }

  /**
   * Gets the AWS secret access key from a command line option or prompt for it.
   *
   * @return {string} The validated AWS secret access key.
   */
  async getSecretAccessKey(options) {
    return await this.input.getOptionOrPrompt(
      options,
      "secretAccessKey",
      "Enter your IAM secret access key: ",
      (value) => {
        if (!PATTERN_SECRET_ACCESS_KEY.test(value)) {
          throw new Error("Invalid secret access key.");
        }
        return value;
      }
    );
  }

  /**
   * Gets the AWS region code from a command line option or prompt for it.
   *
   * @return {string} The validated AWS region code.
   */
  async getRegionCode(options) {
    return await this.input.getOptionOrPrompt(
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
   * Run the `setup` command.
   */
  async run(options) {
    const awsAccountId = await this.getAccountId(options);
    const regionCode = await this.getRegionCode(options);
    const accessKeyId = await this.getAccessKeyId(options);
    const secretAccessKey = await this.getSecretAccessKey(options);
    console.log({ awsAccountId, regionCode, accessKeyId, secretAccessKey });
  }
}

module.exports = SetupCommand;
