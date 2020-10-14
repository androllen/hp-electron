module.exports = {
	pluginOptions: {
		electronBuilder: {
			// List native deps here if they don't work
			externals: ['sqlite3'],
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