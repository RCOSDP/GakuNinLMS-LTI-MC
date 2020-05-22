var md = new MobileDetect(window.navigator.userAgent);
if (md.mobile()) {
  $("head").prepend(
    '<meta name="viewport" content="width=device-width,initial-scale=1.0" id="viewport">',
    '<link type="text/css" rel="stylesheet" href="./static/css/mobile.css" />'
  );
}
