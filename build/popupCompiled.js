/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

document.addEventListener('DOMContentLoaded', function () {

  var onOffButton = document.getElementById('toggleContentScript');
  var resetButton = document.getElementById('reset');
  var message = document.getElementById('message');

  var url = void 0;
  var eraserState = void 0;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { data: 'get current page' }, function (res) {
      url = res.data;
      checkStorageForEraserState(url).then(function (eraser) {
        eraserState = eraser;
        toggleEraserAndSaveSettings(eraserState);
        changeViewBasedOnEraserState(eraserState, onOffButton, resetButton, message);
      });
    });
  });

  onOffButton.addEventListener('click', function (e) {
    e.preventDefault();

    eraserState = !eraserState;

    changeViewBasedOnEraserState(eraserState, onOffButton, resetButton, message);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { data: 'get current page' }, function (res) {
        console.log(res.data + ' response from get current page');
        toggleEraserAndSaveSettings(eraserState, res.data);
      });
    });
  });

  resetButton.addEventListener('click', function (e) {
    e.preventDefault();
    resetPage();
    changeViewBasedOnEraserState(false, onOffButton, resetButton, message);
  });
});

function toggleEraserAndSaveSettings(eraserState, currentDomain) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { data: eraserState }, function (res) {
      console.log(res.data);
    });
  });

  if (currentDomain) {
    var key = currentDomain;
    var dataObj = {};
    dataObj[key] = eraserState;

    console.log('data object to be saved');
    console.log(dataObj);

    chrome.storage.sync.set(_defineProperty({}, key, dataObj[key]), function () {
      console.log('current domain url <' + currentDomain + '>\n           eraser status <' + eraserState + '> saved.');
    });
  }
};

function checkStorageForEraserState(url) {
  return new Promise(function (resolve, reject) {
    var eraserState = false;
    var domainName = url;
    chrome.storage.sync.get(null, function (urlData) {
      if (urlData[domainName]) {
        eraserState = urlData[domainName];
      }
      resolve(eraserState);
    });
  });
};

function resetPage() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { data: 'reset page' }, function (res) {
      var url = res.data;
      chrome.storage.sync.remove([url], function () {});
    });
  });
};

function changeViewBasedOnEraserState(eraserState, onOffButton, resetButton, message) {

  eraserState ? onOffButton.innerHTML = 'Stop Erasing' : onOffButton.innerHTML = 'Start Erasing';
  eraserState ? document.body.className = 'red' : document.body.className = 'green';
  eraserState ? message.innerHTML = 'Press "Stop Erasing" to stop erasing page elements on mouse clicks.' : message.innerHTML = 'Press "Start Erasing" to start erasing page elements on mouse clicks.';
};

/***/ })
/******/ ]);
//# sourceMappingURL=popupCompiled.js.map