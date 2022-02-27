const { SSMClient } = require("@aws-sdk/client-ssm");
const { fromIni } = require("@aws-sdk/credential-provider-ini");

const CONFIG_SERVICE = Symbol("configService");
const CREDENTIALS = Symbol("credentials");
const REGION = Symbol("region");
const PROFILE = Symbol("profile");
const SSM = Symbol("ssm");

/**
 * Lazily creates AWS SDK clients.
 */
class ClientFactory {
  /**
   * Creates a new Client.
   *
   * @param {miles.ConfigService} configService - The Miles config service.
   */
  constructor(configService) {
    this[CONFIG_SERVICE] = configService;
    this[PROFILE] = configService.get("ops", "aws.profile");
    this[REGION] =
      configService.get("ops", "aws.region-code") ||
      process.env.AWS_DEFAULT_REGION ||
      process.env.AWS_REGION;
  }

  /**
   * Creates a new instance.
   *
   * @return {Client} The new instance.
   */
  static async create(container) {
    const [configService] = await container.getAll(["config.service"]);
    return new ClientFactory(configService);
  }

  /**
   * Gets the credentials.
   *
   * @return {Function<Promise<Object>>} A function that returns a Promise.
   */
  get credentials() {
    if (!this[CREDENTIALS]) {
      this[CREDENTIALS] = fromIni({ profile: this[PROFILE] });
    }
    return this[CREDENTIALS];
  }

  /**
   * Gets the SSM Client.
   *
   * @return {@aws-sdk/client-ssm.SSMClient} The SSM Client.
   */
  get ssm() {
    if (!this[SSM]) {
      const params = {};
      if (this[REGION]) {
        params.region = this[REGION];
      }
      if (this[PROFILE]) {
        params.credentials = this.credentials;
      }
      this[SSM] = new SSMClient(params);
    }
    return this[SSM];
  }
}

module.exports = ClientFactory;
