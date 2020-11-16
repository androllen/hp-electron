# tx-electron

## Project setup

```sh
yarn install
```

### Compiles electron and Run hot-reloads for development

```sh
yarn electron:serve
```

### Compiles and minifies for production

```sh
yarn electron:build
```

### Install Dependencies

```sh
yarn add element-ui
yarn add sqlite3
yarn add zeromq
```

### Package Build

```
cd ./tx-electron\dist_electron\win-unpacked\resources
# put TXThrift to this dir 
mklink /d TXThrift  D:\4Dogs\V3.0_TX\TXThrift
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/)
See [github.io vue-cli-plugin-electron-builder](https://nklayman.github.io/vue-cli-plugin-electron-builder/)
