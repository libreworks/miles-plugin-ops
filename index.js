const ClientFactory = require("./lib/aws/client-factory");
const ParamService = require("./lib/param/service");
const OpsCommand = require("./lib/command");
const DeployCommand = require("./lib/commands/deploy");
const ParamCommand = require("./lib/commands/param");
const SetupCommand = require("./lib/commands/setup");
const StatusCommand = require("./lib/commands/status");

/**
 * I'm responsible for the infrastructure and governance side of Miles.
 */
const plugin = async function opsPluginStart(builder) {
  builder
    .register("plugin.ops.command.deploy", () => new DeployCommand())
    .register(
      "plugin.ops.command.param",
      async (c) => await ParamCommand.create(c)
    )
    .register(
      "plugin.ops.command.setup",
      async (c) => await SetupCommand.create(c)
    )
    .register("plugin.ops.command.status", () => new StatusCommand())
    .register("plugin.ops.command", async (c) => await OpsCommand.create(c), [
      "commander-visitor",
    ])
    .register(
      "plugin.ops.param.service",
      async (c) => await ParamService.create(c)
    )
    .register(
      "plugin.ops.aws.client-factory",
      async (c) => await ClientFactory.create(c)
    );

  return {
    name: "Ops",
    version: "0.2.0",
    description: "Control a Miles deployment",
    author: "LibreWorks",
  };
};

plugin.MILES_PLUGIN_API = 1;

module.exports = plugin;
