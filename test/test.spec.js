const Application = require("spectron").Application;
const assert = require("assert");
const electronPath = require("electron"); // Require Electron from the binaries included in node_modules.
const path = require("path");

describe("Application launch", function () {
  this.timeout(10000);

  beforeEach(() => {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, "..")],
    });
    return this.app.start();
  });
  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });
  it("time", function () {
    return this.app.client.getMainProcessLogs().then(() => {
      let timeInner = [];
      logs.forEach(function (log) {
        if (log.split(":")[0] === "time") {
          timeInner.push(log.split(":")[1]);
        }
      });
      console.log(timeInner);
    });
  });
  it("time", function () {
    return this.app.client.getMainProcessLogs().then(() => {
      let timeInner = [];
      logs.forEach(function (log) {
        if (log.split(":")[0] === "time") {
          timeInner.push(log.split(":")[1]);
        }
      });
      console.log(timeInner);
    });
  });
});
