/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ex05/index.js":
/*!***********************!*\
  !*** ./ex05/index.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateGrid.js */ \"./ex05/updateGrid.js\");\n/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderGrid.js */ \"./ex05/renderGrid.js\");\n\r\n\r\nconst ROWS = 50;\r\nconst COLS = 50;\r\n\r\n// 1セルのサイズ\r\nconst RESOLUTION = 10;\r\n\r\nconst canvas = document.querySelector(\"#screen\");\r\nconst ctx = canvas.getContext(\"2d\");\r\nconst startButton = document.querySelector(\"#start\");\r\nconst pauseButton = document.querySelector(\"#pause\");\r\n\r\ncanvas.width = ROWS * RESOLUTION;\r\ncanvas.height = COLS * RESOLUTION;\r\n\r\n// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID\r\nlet animationId = null;\r\n\r\n// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3\r\nconst sound = new Audio(\"/ch15.04-10/ex10/decision1.mp3\");\r\n\r\n\r\n// ライフゲームのセル (true or false) をランダムに初期化する\r\nlet grid = new Array(ROWS)\r\n  .fill(null)\r\n  .map(() =>\r\n    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))\r\n  );\r\n\r\n  // canvas がクリックされたときの処理 (セルの値を反転する)\r\ncanvas.addEventListener(\"click\", function (evt) {\r\n    const rect = canvas.getBoundingClientRect();\r\n    const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };\r\n    const row = Math.floor(pos.y / RESOLUTION);\r\n    const col = Math.floor(pos.x / RESOLUTION);\r\n    grid[row][col] = !grid[row][col];\r\n    sound.cloneNode().play();\r\n    (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid,ROWS,COLS,ctx,RESOLUTION);\r\n  });\r\n\r\n  // requestAnimationFrame によって一定間隔で更新・描画を行う\r\nfunction update() {\r\n    grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.updateGrid)(grid,ROWS,COLS);\r\n    (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid,ROWS,COLS,ctx,RESOLUTION);\r\n    animationId = requestAnimationFrame(update);\r\n  }\r\n  \r\n  startButton.addEventListener(\"click\", () => {\r\n    // 既にアニメーションが動いている場合は何もしない\r\n    if (animationId) {\r\n      return;\r\n    }\r\n    update();\r\n  });\r\n  \r\n  pauseButton.addEventListener(\"click\", () => {\r\n    // アニメーションが停止している場合は何もしない\r\n    if (!animationId) {\r\n      return;\r\n    }\r\n    cancelAnimationFrame(animationId);\r\n    animationId = null;\r\n  });\r\n  \r\n  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid,ROWS,COLS,ctx,RESOLUTION);\n\n//# sourceURL=webpack://preset-ts/./ex05/index.js?");

/***/ }),

/***/ "./ex05/renderGrid.js":
/*!****************************!*\
  !*** ./ex05/renderGrid.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderGrid: () => (/* binding */ renderGrid)\n/* harmony export */ });\n// grid を canvas に描画する\r\nfunction renderGrid(grid,rowSize,colSize,ctx,RESOLUTION) {\r\n    for (let row = 0; row < rowSize; row++) {\r\n      for (let col = 0; col < colSize; col++) {\r\n        const cell = grid[row][col];\r\n        ctx.beginPath();\r\n        ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);\r\n        ctx.fillStyle = cell ? \"black\" : \"white\";\r\n        ctx.fill();\r\n        ctx.stroke();\r\n      }\r\n    }\r\n  }\n\n//# sourceURL=webpack://preset-ts/./ex05/renderGrid.js?");

/***/ }),

/***/ "./ex05/updateGrid.js":
/*!****************************!*\
  !*** ./ex05/updateGrid.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   updateGrid: () => (/* binding */ updateGrid)\n/* harmony export */ });\n// Life Game のルールに従ってセルを更新する\r\nfunction updateGrid(grid,rowSize,colSize) {\r\n    // 新しいグリッドを作成\r\n    const nextGrid = grid.map((arr) => [...arr]);\r\n  \r\n    for (let row = 0; row < rowSize; row++) {\r\n      for (let col = 0; col < colSize; col++) {\r\n        let liveNeighbors = 0;\r\n  \r\n        // 周囲8セルの生存数を数える\r\n        for (let i = -1; i <= 1; i++) {\r\n          for (let j = -1; j <= 1; j++) {\r\n            if (i === 0 && j === 0) continue;\r\n            const newRow = (row + i + rowSize) % rowSize;\r\n            const newCol = (col + j + colSize) % colSize;\r\n            liveNeighbors += grid[newRow][newCol] ? 1 : 0;\r\n          }\r\n        }\r\n  \r\n        // ライフゲームのルールを適用\r\n        if (grid[row][col]) {\r\n          // 生きているセル\r\n          nextGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3;\r\n        } else {\r\n          // 死んでいるセル\r\n          nextGrid[row][col] = liveNeighbors === 3;\r\n        }\r\n      }\r\n    }\r\n    return nextGrid;\r\n}\n\n//# sourceURL=webpack://preset-ts/./ex05/updateGrid.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./ex05/index.js");
/******/ 	
/******/ })()
;