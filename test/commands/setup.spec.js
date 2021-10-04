const assert = require("assert");
const sinon = require("sinon");
const { Command, Help } = require("commander");
const SetupCommand = require("../../lib/commands/setup");

describe("SetupCommand", () => {
  describe("#run", () => {
    it("should run successfully", async () => {
      const input = {
        getOptionOrPrompt: () => {},
      };
      const inputStub = sinon.stub(input, "getOptionOrPrompt");
      inputStub.callsFake(async (options, key, message, validator) => {
        return validator(options[key]);
      });
      const configService = {
        set: () => {},
      };
      const secretService = {
        set: () => {},
      };
      const object = new SetupCommand(input, configService, secretService);
      const options = {
        awsAccountId: "1234-1234-1234",
        regionCode: "us-east-1",
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      };
      const consoleStub = sinon.stub(console, "log");
      try {
        await object.run(options);
      } finally {
        consoleStub.restore();
      }
      assert.strictEqual(inputStub.callCount, 4);
    });
    it("should throw for bad account number", async () => {
      const input = {
        getOptionOrPrompt: () => {},
      };
      const inputStub = sinon.stub(input, "getOptionOrPrompt");
      inputStub.callsFake(async (options, key, message, validator) => {
        return validator(options[key]);
      });
      const configService = {
        set: () => {},
      };
      const secretService = {
        set: () => {},
      };
      const object = new SetupCommand(input, configService, secretService);
      const options = {
        awsAccountId: "123-123-123",
        regionCode: "us-east-1",
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      };
      const consoleStub = sinon.stub(console, "log");
      try {
        await assert.rejects(() => object.run(options), {
          name: "Error",
          message: "Invalid AWS account ID.",
        });
      } finally {
        consoleStub.restore();
      }
    });
    it("should throw for bad region code", async () => {
      const input = {
        getOptionOrPrompt: () => {},
      };
      const inputStub = sinon.stub(input, "getOptionOrPrompt");
      inputStub.callsFake(async (options, key, message, validator) => {
        return validator(options[key]);
      });
      const configService = {
        set: () => {},
      };
      const secretService = {
        set: () => {},
      };
      const object = new SetupCommand(input, configService, secretService);
      const options = {
        awsAccountId: "1234-1234-1234",
        regionCode: "us-foo-bar",
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      };
      const consoleStub = sinon.stub(console, "log");
      try {
        await assert.rejects(() => object.run(options), {
          name: "Error",
          message: "Invalid region code.",
        });
      } finally {
        consoleStub.restore();
      }
    });
    it("should throw for bad access key id", async () => {
      const input = {
        getOptionOrPrompt: () => {},
      };
      const inputStub = sinon.stub(input, "getOptionOrPrompt");
      inputStub.callsFake(async (options, key, message, validator) => {
        return validator(options[key]);
      });
      const configService = {
        set: () => {},
      };
      const secretService = {
        set: () => {},
      };
      const object = new SetupCommand(input, configService, secretService);
      const options = {
        awsAccountId: "1234-1234-1234",
        regionCode: "us-west-2",
        accessKeyId: "bogus, man",
        secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
      };
      const consoleStub = sinon.stub(console, "log");
      try {
        await assert.rejects(() => object.run(options), {
          name: "Error",
          message: "Invalid access key ID.",
        });
      } finally {
        consoleStub.restore();
      }
    });
    it("should throw for bad secret access key", async () => {
      const input = {
        getOptionOrPrompt: () => {},
      };
      const inputStub = sinon.stub(input, "getOptionOrPrompt");
      inputStub.callsFake(async (options, key, message, validator) => {
        return validator(options[key]);
      });
      const configService = {
        set: () => {},
      };
      const secretService = {
        set: () => {},
      };
      const object = new SetupCommand(input, configService, secretService);
      const options = {
        awsAccountId: "1234-1234-1234",
        regionCode: "us-west-2",
        accessKeyId: "AKIAIOSFODNN7EXAMPLE",
        secretAccessKey: "not a chance",
      };
      const consoleStub = sinon.stub(console, "log");
      try {
        await assert.rejects(() => object.run(options), {
          name: "Error",
          message: "Invalid secret access key.",
        });
      } finally {
        consoleStub.restore();
      }
    });
  });
  describe("#createCommand", () => {
    it("should register things", async () => {
      const obj = new SetupCommand({ miles: { input: {} } });
      const setupCommand = obj.createCommand();
      assert.ok(setupCommand);
      assert.strictEqual(
        setupCommand.description(),
        "Perform initial configuration of your AWS account info."
      );
    });
  });
});
