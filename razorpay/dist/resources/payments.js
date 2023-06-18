'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _require = require('../utils/razorpay-utils');

var normalizeDate = _require.normalizeDate;
var normalizeNotes = _require.normalizeNotes;


module.exports = function (api) {
  return {
    all: function all() {
      var params = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var callback = arguments[1];
      var from = params.from;
      var to = params.to;
      var count = params.count;
      var skip = params.skip;


      if (from) {
        from = normalizeDate(from);
      }

      if (to) {
        to = normalizeDate(to);
      }

      count = Number(count) || 10;
      skip = Number(skip) || 0;

      return api.get({
        url: '/payments',
        data: {
          from: from,
          to: to,
          count: count,
          skip: skip
        }
      }, callback);
    },
    fetch: function fetch(paymentId, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }

      return api.get({
        url: '/payments/' + paymentId
      }, callback);
    },
    capture: function capture(paymentId, amount, callback) {
      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }

      if (!amount) {
        throw new Error('`amount` is mandatory');
      }

      return api.post({
        url: '/payments/' + paymentId + '/capture',
        data: {
          amount: amount
        }
      }, callback);
    },
    refund: function refund(paymentId) {
      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var callback = arguments[2];
      var notes = params.notes;

      var otherParams = _objectWithoutProperties(params, ['notes']);

      if (!paymentId) {
        throw new Error('`payment_id` is mandatory');
      }

      var data = Object.assign(otherParams, normalizeNotes(notes));
      return api.post({
        url: '/payments/' + paymentId + '/refund',
        data: data
      }, callback);
    }
  };
};