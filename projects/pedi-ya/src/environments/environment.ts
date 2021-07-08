// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --configuration production` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const packageJson = require('../../../../package.json');

export const environment = {
  appName: 'Pedi Ya',
  envName: 'DEV',
  production: false,
  test: false,
  i18nPrefix: '',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress'],
    eslint: packageJson.devDependencies['eslint']
  },
  firebase: {
    apiKey: "AIzaSyDP1ylYI2522V8_p_SLNXovS58Rn2kO_hk",
    authDomain: "pediya-cde90.firebaseapp.com",
    databaseURL: "https://pediya-cde90-default-rtdb.firebaseio.com",
    projectId: "pediya-cde90",
    storageBucket: "pediya-cde90.appspot.com",
    messagingSenderId: "653352018722",
    appId: "1:653352018722:web:329ea432ba7face6c7bb7b"
  }
};
