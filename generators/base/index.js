var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // name of the app based on the directory name generated by React Native
    this.name = this.appname;
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'nodeVersion',
        message: 'Which version of Node do you want to use?',
        default: '6.9.5',
      },
      {
        type: 'confirm',
        name: 'createGit',
        message: 'Create a local git repo?',
        default: true,
      },
      {
        type: 'list',
        name: 'router',
        message: 'Which router would you like to use?',
        default: 'react-native-router-flux@3.41.0',
        choices: ['react-native-router-flux@3.41.0', 'react-navigation'],
      },
    ]).then((answers) => {
      this.nodeVersion = answers.nodeVersion;
      this.createGit = answers.createGit;
      this.router = answers.router;
    });
  }

  writing() {
    if (this.createGit) {
      this.composeWith(require.resolve('generator-git-init'));
    }

    // write node verison
    this.fs.copyTpl(
      this.templatePath('.nvmrc'),
      this.destinationPath('.nvmrc'),
      { verison: this.nodeVersion }
    );

    // create entry points for Android and iOS
    this.fs.copyTpl(
      this.templatePath('index.ios.js'),
      this.destinationPath('index.ios.js'),
      { name: this.name }
    );

    this.fs.copyTpl(
      this.templatePath('index.android.js'),
      this.destinationPath('index.android.js'),
      { name: this.name }
    );

    // copy root app file that the entry points use
    if (this.router === 'react-navigation') {
      this.fs.copyTpl(
        this.templatePath('App/App.react-navigation.js'),
        this.destinationPath(`App/${this.name}.js`),
        { name: this.name }
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('App/App.js'),
        this.destinationPath(`App/${this.name}.js`),
        { name: this.name }
      );
    }

    // copy router
    if (this.router === 'react-navigation') {
      this.fs.copyTpl(
        this.templatePath('App/Router.react-navigation.js'),
        this.destinationPath('App/Router.js'),
        { name: this.name }
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('App/Router.js'),
        this.destinationPath('App/Router.js'),
        { name: this.name }
      );
    }

    // copy scenes
    this.fs.copyTpl(
      this.templatePath('App/Scenes'),
      this.destinationPath('App/Scenes'),
      {
        name: this.name,
        router: this.router,
      }
    );

    // copy components
    this.fs.copyTpl(
      this.templatePath('App/Components'),
      this.destinationPath('App/Components'),
      { name: this.name }
    );

    // copy store
    if (this.router === 'react-navigation') {
      this.fs.copyTpl(
        this.templatePath('App/Store/index.react-navigation.js'),
        this.destinationPath('App/Store/index.js'),
        { name: this.name }
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('App/Store/index.js'),
        this.destinationPath('App/Store/index.js'),
        { name: this.name }
      );
    }

    // copy store middleware
    this.fs.copyTpl(
      this.templatePath('App/Store/Middleware/Buffer.js'),
      this.destinationPath('App/Store/Middleware/Buffer.js'),
      { name: this.name }
    );
    this.fs.copyTpl(
      this.templatePath('App/Store/Middleware/index.js'),
      this.destinationPath('App/Store/Middleware/index.js'),
      { name: this.name }
    );
    this.fs.copyTpl(
      this.templatePath('App/Store/Middleware/Saga.js'),
      this.destinationPath('App/Store/Middleware/Saga.js'),
      { name: this.name }
    );
    if (this.router === 'react-navigation') {
      this.fs.copyTpl(
        this.templatePath('App/Store/Middleware/Logger.react-navigation.js'),
        this.destinationPath('App/Store/Middleware/Logger.js'),
        { name: this.name }
      );
    } else {
      this.fs.copyTpl(
        this.templatePath('App/Store/Middleware/Logger.js'),
        this.destinationPath('App/Store/Middleware/Logger.js'),
        { name: this.name }
      );
    }

    // copy reducers
    this.fs.copyTpl(
      this.templatePath('App/Reducers/App.js'),
      this.destinationPath('App/Reducers/App.js'),
      { name: this.name }
    );

    this.fs.copyTpl(
      this.templatePath('App/Reducers/index.js'),
      this.destinationPath('App/Reducers/index.js'),
      {
        name: this.name,
        reducers: (this.router === 'react-navigation') ? ['App', 'Nav'] : ['App'],
      }
    );

    if (this.router === 'react-navigation') {
      this.fs.copyTpl(
        this.templatePath('App/Reducers/Nav.js'),
        this.destinationPath('App/Reducers/Nav.js'),
        { name: this.name }
      );
    }

    // copy actions
    this.fs.copyTpl(
      this.templatePath('App/Actions'),
      this.destinationPath('App/Actions'),
      { name: this.name }
    );

    // copy sagas
    this.fs.copyTpl(
      this.templatePath('App/Sagas'),
      this.destinationPath('App/Sagas'),
      { name: this.name }
    );

    // copy services
    this.fs.copyTpl(
      this.templatePath('App/Services'),
      this.destinationPath('App/Services'),
      { name: this.name }
    );

    // copy helpers
    this.fs.copyTpl(
      this.templatePath('App/Helpers'),
      this.destinationPath('App/Helpers'),
      { name: this.name }
    );

    // copy styles
    this.fs.copyTpl(
      this.templatePath('App/Styles'),
      this.destinationPath('App/Styles'),
      { name: this.name }
    );

    // copy config
    this.fs.copyTpl(
      this.templatePath('App/Config'),
      this.destinationPath('App/Config'),
      { name: this.name }
    );

    // copy default .env
    this.fs.copyTpl(
      this.templatePath('.env'),
      this.destinationPath('.env'),
      {
        env: 'development',
        api_url: 'http://localhost:3000',
      }
    );
    this.fs.copyTpl(
      this.templatePath('.env'),
      this.destinationPath('.env.development'),
      {
        env: 'development',
        api_url: 'http://localhost:3000',
      }
    );
    this.fs.copyTpl(
      this.templatePath('.env'),
      this.destinationPath('.env.production'),
      {
        env: 'production',
        api_url: 'http://localhost:3000',
      }
    );

    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('.babelrc')
    );

    this.fs.copy(
      this.templatePath('App/Assets'),
      this.destinationPath('App/Assets')
    );

    this.fs.copy(
      this.templatePath('App/Types'),
      this.destinationPath('App/Types')
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { name: this.name, nameLower: this.name.toLowerCase() }
    );

    //  copy shell scripts
    this.fs.copyTpl(
      this.templatePath('bin'),
      this.destinationPath('bin'),
      { name: this.name }
    );
  }

  install() {
    return;
    this.yarnInstall([
      'axios',
      'react-native-dotenv',
      this.router,
      'react-redux',
      'redux',
      'redux-action-buffer',
      'redux-logger',
      'redux-persist',
      'redux-saga',
    ]);

    this.yarnInstall([
      'flow-bin@',
    ], {
      'dev': true
    });
  }

  end() {
    this.log('Setup complete!');
    this.log('Please refer to the post-install notes');
    this.log('https://github.com/simpleweb/generator-react-native#after-react-nativebase');
  }
};
