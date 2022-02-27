const {
  GetParameterCommand,
  PutParameterCommand,
} = require("@aws-sdk/client-ssm");

const SSM = Symbol("ssm");

const PARAM_FORMAT = /^([a-zA-Z0-9_.-]+|(\/[a-zA-Z0-9_.-]+)+)$/i;
const SLASH = /\//g;

/**
 * Service to interact with AWS SSM Parameter Store.
 */
class ParamService {
  /**
   * Creates a new Parameter Service.
   *
   * @param {SSMClient} ssmClient - The AWS SDK client for SSM.
   */
  constructor(ssmClient) {
    this[SSM] = ssmClient;
  }

  /**
   * Creates a new Parameter Service.
   *
   * @param {container.Container} container - The dependency injection container.
   * @return {Service} The new instance.
   */
  static async create(container) {
    const clientFactory = await container.get("plugin.ops.aws.client-factory");
    return new ParamService(clientFactory.ssm);
  }

  /**
   * Validate the incoming parameter name will work with AWS before the call.
   *
   * @param {string} name - The incoming parameter name to validate.
   * @throws {Error} if the parameter name contains invalid characters
   * @throws {Error} if the parameter name has more than 15 levels
   */
  validateName(name) {
    let paramName = "" + name;
    if (!PARAM_FORMAT.test(paramName)) {
      throw new Error(
        "Parameter names must only contain the characters [a-zA-Z0-9_.-] and can be nested with leading slashes (e.g. /foo/bar)"
      );
    }
    if ((paramName.match(SLASH) || []).length > 14) {
      throw new Error("Parameter names cannot contain more than 15 levels");
    }
    if (paramName[0] == '/') {
      paramName = paramName.substring(1);
    }
    return `/miles/${paramName}`;
  }

  /**
   * Gets a parameter.
   *
   * @param {string} name - The parameter name.
   * @param {boolean} [decrypt=true] - Whether to decrypt the value
   * @return {@aws-sdk/client-ssm.GetParameterResult} The result of the API call.
   */
  async get(name, decrypt = true) {
    const command = new GetParameterCommand({
      Name: this.validateName(name),
      WithDecryption: decrypt,
    });
    return await this[SSM].send(command);
  }

  /**
   * Sets a parameter.
   *
   * @param {string} name - The parameter name.
   * @param {string} value - The parameter value.
   * @param {boolean} secret - Whether to store the value as a SecretString.
   * @return {@aws-sdk/client-ssm.SetParameterResult} The result of the API call.
   */
  async set(name, value, secret) {
    const paramName = this.validateName(name);
    const command = new PutParameterCommand({
      Name: paramName,
      Value: "" + value,
      Overwrite: true,
      Type: secret ? "SecureString" : "String",
    });
    return await this[SSM].send(command);
  }
}

module.exports = ParamService;
