/* 显示quote */
safari.self.addEventListener("message", onMessage, false);
document.addEventListener("DOMContentLoaded", function() {
  safari.self.tab.dispatchMessage(window.location.href, null);
  setData();
});

function onMessage(msg) {
  if (msg.name === "quote") {
    document.getElementById("quote").textContent = msg.message.quote;
    document.getElementById("author").textContent = msg.message.author;
  }
}

function greeting(hour) {
  if (hour >= 6 && hour < 12) {
    return "Good morning, Di";
  } else if (hour >= 12 && hour < 18) {
    return "Good afternoon, Di";
  } else {
    return "Good evening, Di";
  }
}

function padLeft(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

function setData() {
  var $time = document.getElementById("time")
  var $ampm = document.getElementById("ampm")
  var $greeting = document.getElementById("greeting")

  if(!$time || !$ampm || !$greeting) { return; }

  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();

  $time.textContent =
    (h > 12 ? h - 12 : h) + ":" + padLeft(m);

  var ampm = h >= 12 ? "pm" : "am";
  $ampm.textContent = ampm;

  $greeting.textContent = greeting(h);
}


