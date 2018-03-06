var Generator = require('yeoman-generator');
var path = require('path');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // name of the app based on the directory name generated by React Native
    this.name = process.cwd().split(path.sep).pop();

    this.argument('scene', { type: String, required: true });
  }

  writing() {
    var scene = this.options.scene;

    // create entry points for Android and iOS
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath(`App/Scenes/${scene}/index.js`),
      {
        scene: scene,
        name: this.name,
      }
    );

    this.fs.copyTpl(
      this.templatePath('Container.js'),
      this.destinationPath(`App/Scenes/${scene}/Container.js`),
      {
        scene: scene,
        name: this.name,
      }
    );
  }

  end() {
    var scene = this.options.scene;

    this.log('Please make sure to add this to your scenes export.');
    this.log('App/Scenes/index.js');
    this.log(`
      import ${scene} from '${this.name}/App/Scenes/${scene}/Container';

      export default {
        // ...other scenes
        ${scene}: ${scene},
      };
    `);
  }
};
