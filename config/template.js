/**
 * Created by steven on 15/4/3.
 */

var fs = require('fs');
var path = require('path');

module.exports = function(isRTL){
  var defaultAppName = process.env.APP ? process.env.APP : 'app';
  var webpack_host = process.env.WHOST ? process.env.WHOST : 'localhost';
  var webpack_dev_server_port = process.env.WPORT ? process.env.WPORT : 8079;
  var html = fs.readFileSync(path.join(process.cwd(), 'src', 'views', 'index.html'), {
    encoding: 'utf8'
  });
  var createStyleTag = function(file, media) {
    media = media || 'screen';
    return "    <link media='"+media+"' rel='stylesheet' type='text/css' href='"+file+"'>\n";
  };

  var stylesheets = '';
  if(process.env.NODE_ENV === 'development') {
    stylesheets += createStyleTag('/css/'+defaultAppName+'/raw/{dir}/main.css', 'screen,print');
    stylesheets += createStyleTag('/css/'+defaultAppName+'/raw/{dir}/theme.css');
    stylesheets += createStyleTag('/css/'+defaultAppName+'/raw/{dir}/colors.css');
    stylesheets += createStyleTag('/css/'+defaultAppName+'/raw/{dir}/font-faces.css');
    html = html.replace(new RegExp('{appscript}', 'g'), 'http://'+webpack_host+':'+webpack_dev_server_port+'/scripts/bundle.js');
  } else {
    stylesheets += createStyleTag('/css/'+defaultAppName+'/blessed/{dir}/main-blessed1.css', 'screen,print');
    stylesheets += createStyleTag('/css/'+defaultAppName+'/blessed/{dir}/main.css', 'screen,print');
    stylesheets += createStyleTag('/css/'+defaultAppName+'/blessed/{dir}/theme.css');
    stylesheets += createStyleTag('/css/'+defaultAppName+'/blessed/{dir}/colors-blessed1.css');
    stylesheets += createStyleTag('/css/'+defaultAppName+'/blessed/{dir}/colors.css');
    stylesheets += createStyleTag('/css/'+defaultAppName+'/blessed/{dir}/font-faces.css');
    html = html.replace(new RegExp('{appscript}', 'g'), '/js/app.js');
  }

  html = html.replace(new RegExp('{stylesheets}', 'g'), stylesheets);
  html = html.replace(new RegExp('{version}', 'g'), "1.0.0");

  var ltr = html.replace(new RegExp('{dir}', 'g'), 'ltr');
  var rtl = html.replace(new RegExp('{dir}', 'g'), 'rtl');
  if(isRTL)
    return rtl;
  else
    return ltr;
}