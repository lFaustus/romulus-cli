var Generator = require('yeoman-generator');
var path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // name of the app based on the directory name generated by React Native
    this.name = process.cwd().split(path.sep).pop();

    this.argument('component', { type: String, required: true });
    this.option('stateful');
  }

  writing() {
    var template = (this.options.stateful) ? 'stateful.js' : 'stateless.js';
    var component = this.options.component;

    // create entry points for Android and iOS
    this.fs.copyTpl(
      this.templatePath(template),
      this.destinationPath(`App/Components/${component}/index.js`),
      { name: this.name, component: component, }
    );

    this.fs.copyTpl(
      this.templatePath('styles.js'),
      this.destinationPath(`App/Components/${component}/styles.js`),
      { name: this.name, component: component, }
    );
  }
};
