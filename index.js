class OpsPlugin {
  constructor() {}

  async init(miles) {
    this.miles = miles;
  }

  addCommands(program) {}
}

OpsPlugin.MILES_PLUGIN_API = 1;

module.exports = OpsPlugin;
