console.log("The bot is starting");

//TWIT API library
var Twit = require('twit')
var config = require('./pibotconfig')
var T = new Twit(config)

var digits = [];
count = 1;

//GET PI DIGITS FROM API
const request = require('request');

request('https://uploadbeta.com/api/pi/?cached&n=1000', function (error, response, body) {

  for (let i = 2; i < body.length-1; i++) {
    digits.push(parseInt(body.charAt(i)));
  }
  //Initial tweet when bot is started
  tweetNextDigit();

});

//Send next digit every 12 hours
setInterval(tweetNextDigit, 1000*60*60*12);

function tweetNextDigit() {
  sendTweet('The #' + count + ' digit of pi is: ' + digits[count-1] + '.')
  count = ++count;
}

//TWEET using twit library
function sendTweet(txt) {
  var tweet = {status: txt }
  T.post('statuses/update', tweet, tweetSent);

  function tweetSent(err, data, response) {
    if (err) {
      console.log("Didn't work :(");
    } else {
      console.log("All seems good!");
    }
  }

}
