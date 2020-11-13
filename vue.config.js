module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "com.4dogs.tx",
        // app.exe name
        productName: "TxMain",
        // options placed here will be merged with default configuration and passed to electron-builder
        files: [
          "**/*",
        ],
        extraFiles: [
          {
            "from": "TXThrift",
            "to": "./resources/TXThrift",
            "filter": ["**/*"]
          }
        ],
        asar: false
      },
      // List native deps here if they don't work
      externals: ['sqlite3', 'zeromq'],
      nodeIntegration: true,
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ['./node_modules']
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}