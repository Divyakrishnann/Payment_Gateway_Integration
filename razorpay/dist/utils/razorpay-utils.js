"use strict";

function normalizeDate(date) {
  return isNumber(date) ? date : +new Date(date) / 1000;
}

function isNumber(num) {
  return !isNaN(Number(num));
}

function normalizeBoolean(bool) {
  return bool ? 1 : 0;
}

function normalizeNotes() {
  var notes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var normalizedNotes = {};
  for (var key in notes) {
    normalizedNotes["notes[" + key + "]"] = notes[key];
  }
  return normalizedNotes;
}

module.exports = {
  normalizeNotes: normalizeNotes,
  normalizeDate: normalizeDate,
  normalizeBoolean: normalizeBoolean,
  isNumber: isNumber
};