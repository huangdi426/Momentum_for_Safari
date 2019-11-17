safari.application.addEventListener("open", onOpen, true);  // 
safari.application.addEventListener("message", onMessage, false);  // 客户端接收服务端数据时触发

function onOpen(e) {
  if (e.target instanceof SafariBrowserTab) {
    e.target.addEventListener("beforeNavigate", onBeforeNavigate, false);

    timer = setTimeout(function (){
      e.target.removeEventListener("beforeNavigate", onBeforeNavigate, false);
      if(e.target.url === null || e.target.url === "") {
        e.target.url = safari.extension.baseURI + "MomentumForSafari.html"
      }
    }, 300);
  }
}

function onBeforeNavigate(e) {
  clearTimeout(timer);
  if (e.url === null || e.url === "") {
    e.preventDefault();
    e.target.url = safari.extension.baseURI + "MomentumForSafari.html";
  }
}

function onMessage(envelope) {
  if (envelope.name.indexOf("MomentumForSafari.html") !== -1) {
    var tab = safari.application.activeBrowserWindow.activeTab;
  }
}

