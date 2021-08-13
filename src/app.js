function index() {
  const { app, BrowserWindow } = require("electron");
  const path = require("path");
  const time1 = new Date().getTime();
  require("v8-compile-cache");

  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  if (require("electron-squirrel-startup")) {
    // eslint-disable-line global-require
    app.quit();
  }

  const createWindow = () => {
    // Create the browser window.
    const time2 = new Date().getTime();

    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
    });
    mainWindow.on("ready-to-show", () => {
      // 向测试套件进程发送IPC消息
      console.log("time:", new Date().getTime() - time1);
      console.log("time:", new Date().getTime() - time2);
      console.log("time:", time2 - time1);
    });
    const time3 = new Date().getTime();
    // const child = new BrowserWindow({ parent: mainWindow })
    // child.loadURL('http://www.baidu.com')
    // child.show()
    // child.on('ready-to-show',()=>{
    //   console.log(new Date().getTime()-time3);
    //   console.log(time3-time2);
    // })
    mainWindow.show();
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "index.html"));
    // mainWindow.loadURL('http://www.baidu.com')

    // const next = new BrowserWindow({
    //   width:200,
    //   height:500
    // })
    // next.show();
    // next.setParentWindow(child)
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
  };

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", createWindow);

  // Quit when all windows ars closed, except on macOS. There, it's common
  // for applications and their menu bar to stay active until the user quits
  // explicitly with Cmd + Q.
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and import them here.
};

module.exports ={ index }