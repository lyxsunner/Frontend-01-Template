var page = require('webpage').create();
page.open('http://baidu.com', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    // page.render('./baidu.png');
    var title = page.evaluate(function(){
        return document.title;
    });
    console.log('Page title is ' + title);
    phantom.exit();
  }
  phantom.exit();
});