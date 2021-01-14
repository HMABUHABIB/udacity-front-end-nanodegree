let context = new AudioContext();
//on iOS, the context will be started on the first valid user action on the #playButton element
StartAudioContext(context, "#playButton");

(function (d, m) {
 var kommunicateSettings =
  { "appId": "e37c337240cf460b2d79ddafee541516", "popupWidget": true, "automaticChatOpenOnNavigation": true };
 var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
 s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
 var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
 window.kommunicate = m; m._globals = kommunicateSettings;
})(document, window.kommunicate || {});
/* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */


