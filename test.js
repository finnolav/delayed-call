var test = require('ava').test;
var delayedCall = require('./');

test.cb('should wait 1000ms and call the function with the payload supplied', t => {
  delayedCall.create(1000, function (count, message) {
    t.is(count, 50, 'count should be 50');
    t.is(message, 'hello', 'message should be hello');
    t.end();
  }, 50, 'hello');
});

test.cb('should work without a payload', t => {
  delayedCall.create(500, function () {
    t.end();
  });
});

test.cb('should handle this', t => {
  var me = this;
  delayedCall.create(500, (function () {
    t.is(this, me, 'handle this');
    t.end();
  }).bind(this));
});

test.cb('should handle this and payload', t => {
  var me = this;
  delayedCall.create(500, (function (arg1) {
    t.is(this, me, 'handle this');
    t.is(arg1, 'hello', 'message should be hello');
    t.end();
  }).bind(this), 'hello');
});

test.cb('should handle multiple delayed calls', t => {
  var count = 0;
  delayedCall.create(200, function () {
    count++;
  });
  delayedCall.create(300, function () {
    count++;
  });
  delayedCall.create(4000, function () {
    count++;
    t.is(count, 3);
    t.end();
  });
});

test.cb('should clear all delayed calls', t => {
  var count = 0;
  delayedCall.create(200, function () {
    count++;
  });
  delayedCall.create(200, function () {
    count++;
  });

  delayedCall.clearAll();

  delayedCall.create(400, function () {
    t.is(count, 0);
    t.end();
  });
});

test.cb('should clear single delayed call', t => {
  var count = 0;
  var id = delayedCall.create(200, function () {
    count++;
  });
  delayedCall.clearById(id);
  delayedCall.clearById(1000);

  delayedCall.create(300, function () {
    t.is(count, 0);
    t.end();
  });
});
