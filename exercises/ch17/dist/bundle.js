/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ex05/renderGrid.js":
/*!****************************!*\
  !*** ./ex05/renderGrid.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderGrid: () => (/* binding */ renderGrid)
/* harmony export */ });
// grid を canvas に描画する
function renderGrid(grid,rowSize,colSize,ctx,RESOLUTION) {
    for (let row = 0; row < rowSize; row++) {
      for (let col = 0; col < colSize; col++) {
        const cell = grid[row][col];
        ctx.beginPath();
        ctx.rect(col * RESOLUTION, row * RESOLUTION, RESOLUTION, RESOLUTION);
        ctx.fillStyle = cell ? "black" : "white";
        ctx.fill();
        ctx.stroke();
      }
    }
  }

/***/ }),

/***/ "./ex05/updateGrid.js":
/*!****************************!*\
  !*** ./ex05/updateGrid.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateGrid: () => (/* binding */ updateGrid)
/* harmony export */ });
// Life Game のルールに従ってセルを更新する
function updateGrid(grid,rowSize,colSize) {
    // 新しいグリッドを作成
    const nextGrid = grid.map((arr) => [...arr]);
  
    for (let row = 0; row < rowSize; row++) {
      for (let col = 0; col < colSize; col++) {
        let liveNeighbors = 0;
  
        // 周囲8セルの生存数を数える
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = (row + i + rowSize) % rowSize;
            const newCol = (col + j + colSize) % colSize;
            liveNeighbors += grid[newRow][newCol] ? 1 : 0;
          }
        }
  
        // ライフゲームのルールを適用
        if (grid[row][col]) {
          // 生きているセル
          nextGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3;
        } else {
          // 死んでいるセル
          nextGrid[row][col] = liveNeighbors === 3;
        }
      }
    }
    return nextGrid;
}

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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./ex05/index.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _updateGrid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateGrid.js */ "./ex05/updateGrid.js");
/* harmony import */ var _renderGrid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderGrid.js */ "./ex05/renderGrid.js");


const ROWS = 50;
const COLS = 50;

// 1セルのサイズ
const RESOLUTION = 10;

const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");

canvas.width = ROWS * RESOLUTION;
canvas.height = COLS * RESOLUTION;

// https://developer.mozilla.org/ja/docs/Web/API/Window/requestAnimationFrame が返す ID
let animationId = null;

// NOTE: download from https://soundeffect-lab.info/sound/button/mp3/decision1.mp3
const sound = new Audio("/ch15.04-10/ex10/decision1.mp3");


// ライフゲームのセル (true or false) をランダムに初期化する
let grid = new Array(ROWS)
  .fill(null)
  .map(() =>
    new Array(COLS).fill(null).map(() => !!Math.floor(Math.random() * 2))
  );

  // canvas がクリックされたときの処理 (セルの値を反転する)
canvas.addEventListener("click", function (evt) {
    const rect = canvas.getBoundingClientRect();
    const pos = { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    const row = Math.floor(pos.y / RESOLUTION);
    const col = Math.floor(pos.x / RESOLUTION);
    grid[row][col] = !grid[row][col];
    sound.cloneNode().play();
    (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid,ROWS,COLS,ctx,RESOLUTION);
  });

  // requestAnimationFrame によって一定間隔で更新・描画を行う
function update() {
    grid = (0,_updateGrid_js__WEBPACK_IMPORTED_MODULE_0__.updateGrid)(grid,ROWS,COLS);
    (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid,ROWS,COLS,ctx,RESOLUTION);
    animationId = requestAnimationFrame(update);
  }
  
  startButton.addEventListener("click", () => {
    // 既にアニメーションが動いている場合は何もしない
    if (animationId) {
      return;
    }
    update();
  });
  
  pauseButton.addEventListener("click", () => {
    // アニメーションが停止している場合は何もしない
    if (!animationId) {
      return;
    }
    cancelAnimationFrame(animationId);
    animationId = null;
  });
  
  (0,_renderGrid_js__WEBPACK_IMPORTED_MODULE_1__.renderGrid)(grid,ROWS,COLS,ctx,RESOLUTION);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map