var stylus = require('stylus');
var jade = require('jade');
var juice = require('juice');
var glob = require('glob');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

var templates = glob.sync(__dirname + '/templates/**/*.jade');
var mainStyleFile = __dirname + '/styl/main.styl';
var styl = fs.readFileSync(mainStyleFile).toString();

var templateLinks = [];

stylus.render(styl, { filename: mainStyleFile }, function(err, css) {
  if (err) throw err;

  templates.forEach(function (template) {
    var content = compileTemplate(template, css);
    var outputPath = generateOutputPath(template);
    mkdirp.sync(path.dirname(outputPath));
    templateLinks.push(path.relative(__dirname + '/html_templates', outputPath));
    fs.writeFileSync(outputPath, content);
  });

  fs.writeFileSync(
    __dirname + '/html_templates/index.html',
    templateLinks.map(function (link) { return "<a href='" + link + "'>" + link + "</a><br>" }).join('')
  );
});


function compileTemplate(templatePath, css) {
  var html = jade.renderFile(templatePath, {});
  var compiled = juice.inlineContent(html, css, { })
  return compiled;
};

function generateOutputPath(inputPath) {
  return path.join(
    __dirname + '/html_templates',
    path.relative(__dirname + '/templates', path.dirname(inputPath)),
    path.basename(inputPath, '.jade') + '.html'
  );
}
