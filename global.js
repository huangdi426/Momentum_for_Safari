safari.application.addEventListener("open", onOpen, true);  // 连接建立时触发
safari.application.addEventListener("message", onMessage, false);  // 客户端接收服务端数据时触发

var timer;  // 定义计时器变量

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
    setTabContent();
  }
}

function setTabContent() {
  var tab = safari.application.activeBrowserWindow.activeTab;
  var hourFromNow = new Date();
  hourFromNow.setHours(hourFromNow.getHours() + 1);

  var tomorrow = new Date();
  tomorrow.setHours(24, 1, 0, 0);

  tab.page.dispatchMessage("quote", getQuote());
}

function getQuote() {
  var allQuotes = quotes();
  var index = cache.get("quoteIndex");

  if (!index) {
    var tomorrow = new Date();
    tomorrow.setHours(24, 1, 0, 0);

    cache.set("quoteIndex", random(0, allQuotes.length), {
      expires: tomorrow
    });
  }

  return allQuotes[index || 0];
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var cache = {
  set: function(k, v, opts) {
    opts = opts || {};

    var val = {
      value: v,
      expires:
        opts.expires && opts.expires instanceof Date
          ? opts.expires.getTime()
          : ""
    };

    localStorage.setItem(k, JSON.stringify(val));
  },

  get: function(k) {
    if (!k) {
      return null;
    }

    var rawVal = localStorage.getItem(k);

    if (!rawVal) {
      return null;
    }

    var val = JSON.parse(rawVal);
    var now = new Date().getTime();

    if (val.expires && now > val.expires) {
      return null;
    }

    return val.value;
  }
};

function quotes() {
  return [
    {
      quote: "When you're going through hell, keep going",
      author: "Winston Churchill"
    },
    {
      quote:
        "Whatever the mind of man can conceive and believe, it can achieve.",
      author: "Napoleon Hill"
    },
    {
      quote: "Strive not to be a success, but rather to be of value.",
      author: "Albert Einstein"
    },
    {
      quote:
        "Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference. ",
      author: "Robert Frost"
    },
    {
      quote: "I attribute my success to this: I never gave or took any excuse.",
      author: "Florence Nightingale"
    },
    {
      quote: "You miss 100% of the shots you don't take.",
      author: "Wayne Gretzky"
    },
    {
      quote:
        "I've missed more than 9000 shots in my career. I've lost almost 300 games. 26 times I've been trusted to take the game winning shot and missed. I've failed over and over and over again in my life. And that is why I succeed.",
      author: "Michael Jordan"
    },
    {
      quote:
        "The most difficult thing is the decision to act, the rest is merely tenacity.",
      author: "Amelia Earhart"
    },
    {
      quote: "Every strike brings me closer to the next home run.",
      author: "Babe Ruth"
    },
    {
      quote:
        "Definiteness of purpose is the starting point of all achievement.",
      author: "W. Clement Stone"
    },
    {
      quote:
        "Life isn't about getting and having, it's about giving and being.",
      author: "Kevin Kruse"
    },
    {
      quote:
        "Life is what happens to you while you're busy making other plans.",
      author: "John Lennon"
    },
    {
      quote: "We become what we think about.",
      author: "Earl Nightingale"
    },
    {
      quote:
        "wenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.  Explore, Dream, Discover.",
      author: "Mark Twain"
    },
    {
      quote: "ife is 10% what happens to me and 90% of how I react to it.",
      author: "Charles Swindoll"
    },
    {
      quote:
        "The most common way people give up their power is by thinking they don't have any.",
      author: "Alice Walker"
    },
    {
      quote: "The mind is everything. What you think you become. ",
      author: "Buddha"
    },
    {
      quote:
        "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb"
    },
    {
      quote: "An unexamined life is not worth living.",
      author: "Socrates"
    },
    {
      quote: "Eighty percent of success is showing up.",
      author: "Woody Allen"
    },
    {
      quote:
        "Your time is limited, so don't waste it living someone else's life.",
      author: "Steve Jobs"
    },
    {
      quote: "Winning isn't everything, but wanting to win is.",
      author: "Vince Lombardi"
    },
    {
      quote:
        "I am not a product of my circumstances. I am a product of my decisions.",
      author: "Stephen Covey"
    },
    {
      quote:
        "Every child is an artist.  The problem is how to remain an artist once he grows up.",
      author: "Pablo Picasso"
    },
    {
      quote:
        "You can never cross the ocean until you have the courage to lose sight of the shore.",
      author: "Christopher Columbus"
    },
    {
      quote:
        "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
      author: "Maya Angelou"
    },
    {
      quote: "Either you run the day, or the day runs you.",
      author: "Jim Rohn"
    },
    {
      quote: "Whether you think you can or you think you can't, you're right.",
      author: "Henry Ford"
    },
    {
      quote:
        "The two most important days in your life are the day you are born and the day you find out why.",
      author: "Mark Twain"
    },
    {
      quote:
        "Whatever you can do, or dream you can, begin it.  Boldness has genius, power and magic in it.",
      author: "Johann Wolfgang von Goethe"
    },
    {
      quote: "The best revenge is massive success.",
      author: "Frank Sinatra"
    },
    {
      quote:
        "People often say that motivation doesn't last. Well, neither does bathing.  That's why we recommend it daily.",
      author: "Zig Ziglar"
    },
    {
      quote: "Life shrinks or expands in proportion to one's courage.",
      author: "Anais Nin"
    },
    {
      quote:
        "If you hear a voice within you say “you cannot paint,” then by all means paint and that voice will be silenced.",
      author: "Vincent Van Gogh"
    },
    {
      quote:
        "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.",
      author: "Aristotle"
    },
    {
      quote:
        "Ask and it will be given to you; search, and you will find; knock and the door will be opened for you.",
      author: "Jesus"
    },
    {
      quote:
        "The only person you are destined to become is the person you decide to be.",
      author: "Ralph Waldo Emerson"
    },
    {
      quote:
        "Go confidently in the direction of your dreams.  Live the life you have imagined.",
      author: "Henry David Thoreau"
    },
    {
      quote:
        "When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left and could say, I used everything you gave me.",
      author: "Erma Bombeck"
    },
    {
      quote:
        "Few things can help an individual more than to place responsibility on him, and to let him know that you trust him. ",
      author: "Booker T. Washington"
    },
    {
      quote:
        "Certain things catch your eye, but pursue only those that capture the heart.",
      author: " Ancient Indian Proverb"
    },
    {
      quote: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt"
    },
    {
      quote: "Everything you've ever wanted is on the other side of fear.",
      author: "George Addair"
    },
    {
      quote:
        "We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.",
      author: "Plato"
    },
    {
      quote:
        'Teach thy tongue to say, "I do not know," and thous shalt progress.',
      author: "Maimonides"
    },
    {
      quote: "Start where you are. Use what you have.  Do what you can.",
      author: "Arthur Ashe"
    },
    {
      quote:
        "When I was 5 years old, my mother always told me that happiness was the key to life.  When I went to school, they asked me what I wanted to be when I grew up.  I wrote down ‘happy'.  They told me I didn't understand the assignment, and I told them they didn't understand life.",
      author: "John Lennon"
    },
    {
      quote: "Fall seven times and stand up eight.",
      author: "Japanese Proverb"
    },
    {
      quote:
        "When one door of happiness closes, another opens, but often we look so long at the closed door that we do not see the one that has been opened for us.",
      author: "Helen Keller"
    },
    {
      quote: "Everything has beauty, but not everyone can see.",
      author: "Confucius"
    },
    {
      quote:
        "How wonderful it is that nobody need wait a single moment before starting to improve the world.",
      author: "Anne Frank"
    },
    {
      quote: "When I let go of what I am, I become what I might be.",
      author: "Lao Tzu"
    },
    {
      quote:
        "Life is not measured by the number of breaths we take, but by the moments that take our breath away.",
      author: "Maya Angelou"
    },
    {
      quote:
        "Happiness is not something readymade. It comes from your own actions.",
      author: "Dalai Lama"
    }
  ];
}
