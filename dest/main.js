/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game/assets/explosion/explosion.png":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "explosion.png");

/***/ }),

/***/ "./src/game/assets/grass.png":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "grass.png");

/***/ }),

/***/ "./src/game/assets/player.png":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "player.png");

/***/ }),

/***/ "./src/game/assets/wall.png":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "wall.png");

/***/ }),

/***/ "./src/index.scss":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// extracted by mini-css-extract-plugin
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});

/***/ }),

/***/ "./src/game/AStart.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AStar)
/* harmony export */ });
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/heap/index.js");
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(heap__WEBPACK_IMPORTED_MODULE_0__);

class AStar {
    static run(c0, c1) {
        const heap = new (heap__WEBPACK_IMPORTED_MODULE_0___default())((a, b) => a.fscore - b.fscore);
        const nodes = new Map();
        const startNode = new Node(c0);
        startNode.gscore = 0;
        startNode.fscore = 0;
        startNode.opened = true;
        heap.push(startNode);
        // nodes.set(startNode.cell.hash);
        while (!heap.empty()) {
            const currentNode = heap.pop();
            currentNode.closed = true;
            if (currentNode.cell == c1) {
                return currentNode.backtrace().map(node => node.cell);
            }
            currentNode.cell.neighbors.forEach(neighborCell => {
                var _a;
                const neighborNode = (_a = nodes.get(neighborCell.hash)) !== null && _a !== void 0 ? _a : new Node(neighborCell);
                if (!nodes.has(neighborCell.hash)) {
                    nodes.set(neighborCell.hash, neighborNode);
                }
                if (neighborNode.closed || neighborCell.isWall) {
                    return;
                }
                const x1 = currentNode.cell.col;
                const y1 = currentNode.cell.row;
                const x2 = neighborCell.col;
                const y2 = neighborCell.row;
                // get the distance between current node and the neighbor
                // and calculate the next g score
                const cost = (x2 - x1 === 0 || y2 - y1 === 0) ? 1 : Math.SQRT2;
                const ngscore = currentNode.gscore + cost;
                if (!neighborNode.opened || ngscore < neighborNode.gscore) {
                    neighborNode.gscore = ngscore;
                    neighborNode.fscore = ngscore + this.heuristic(neighborCell, c1);
                    neighborNode.parent = currentNode;
                    if (!neighborNode.opened) {
                        heap.push(neighborNode);
                        neighborNode.opened = true;
                    }
                    else {
                        heap.updateItem(neighborNode);
                    }
                }
            });
        }
        console.log('error');
    }
    static heuristic(c0, c1) {
        // Manhattan distance
        const d1 = Math.abs(c1.col - c0.col);
        const d2 = Math.abs(c1.row - c0.row);
        return (d1 + d2);
        return (c1.col - c0.col) ** 2 + (c1.row - c0.row) ** 2;
    }
}
class Node {
    constructor(cell) {
        Object.defineProperty(this, "cell", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "parent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "opened", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "closed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "gscore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fscore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cell = cell;
    }
    backtrace() {
        const backtrace = [this];
        let currentNode = this.parent;
        while (currentNode) {
            backtrace.push(currentNode);
            currentNode = currentNode.parent;
        }
        return backtrace;
    }
}


/***/ }),

/***/ "./src/game/Bresenham.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BresenhamCircle)
/* harmony export */ });
class BresenhamCircle {
    static getOutline(cx, cy, r) {
        let x = 0;
        let y = r;
        let d = 3 - 2 * r;
        const points = [];
        while (x <= y) {
            if (d < 0) {
                d += 4 * x + 2;
            }
            else {
                y -= 1;
                d += 4 * (x - y) + 2;
            }
            points.push([cx + x, cy + y]);
            points.push([cx - x, cy + y]);
            points.push([cx + x, cy - y]);
            points.push([cx - x, cy - y]);
            points.push([cx + y, cy + x]);
            points.push([cx - y, cy + x]);
            points.push([cx + y, cy - x]);
            points.push([cx - y, cy - x]);
            x += 1;
        }
        return points;
    }
}


/***/ }),

/***/ "./src/game/Game.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _assets_levels_level2_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/assets/levels/level2.json");
/* harmony import */ var _AStart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/AStart.ts");
/* harmony import */ var _loader_LevelLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/game/loader/LevelLoader.ts");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/game/Player.ts");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/game/Resources.ts");






class Game {
    constructor() {
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "board", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "player", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.app = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Application();
        document.getElementById('root').append(this.app.view);
        this.initialize();
        // this.init();
        // Add a ticker callback to move the sprite back and forth
        // let elapsed = 0.0;
        // this.app.ticker.add((delta) => {
        //     elapsed += delta;
        //     sprite.x = 100.0 + Math.cos(elapsed / 50.0) * 100.0;
        // });
    }
    async initialize() {
        await _Resources__WEBPACK_IMPORTED_MODULE_5__["default"].initialize();
        this.board = _loader_LevelLoader__WEBPACK_IMPORTED_MODULE_3__["default"].load(_assets_levels_level2_json__WEBPACK_IMPORTED_MODULE_1__);
        this.player = new _Player__WEBPACK_IMPORTED_MODULE_4__["default"](this);
        // const path = BreadFirstSearch.run(
        //     this.board,
        //     this.board.getCellAt(1, 1),
        //     this.board.getCellAt(7, 1)
        // );
        const path = _AStart__WEBPACK_IMPORTED_MODULE_2__["default"].run(this.board.getCellAt(1, 1), this.board.getCellAt(7, 1));
        path.forEach(c => c.setAsWood());
        this.app.stage.addChild(this.board.renderable);
        this.app.stage.addChild(this.player.renderable);
        this.app.screen.width = this.board.renderable.width;
        this.app.screen.height = this.board.renderable.height;
        this.app.view.width = this.board.renderable.width;
        this.app.view.height = this.board.renderable.height;
    }
}


/***/ }),

/***/ "./src/game/Player.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _assets_player_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/assets/player.png");
/* harmony import */ var _collision_colliders_BoxCollider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/collision/colliders/BoxCollider.ts");
/* harmony import */ var _collision_shapes_Rectangle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/game/collision/shapes/Rectangle.ts");
/* harmony import */ var _weapons_Dynamite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/game/weapons/Dynamite.ts");
/* harmony import */ var _weapons_MortarBomb__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/game/weapons/MortarBomb.ts");
/* harmony import */ var _weapons_RingBomb__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/game/weapons/RingBomb.ts");







class Player {
    constructor(game) {
        Object.defineProperty(this, "sprite", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "game", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isDownW", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "isDownS", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "isDownA", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "isDownD", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.game = game;
        const board = this.game.board;
        const app = this.game.app;
        this.sprite = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(_assets_player_png__WEBPACK_IMPORTED_MODULE_1__["default"]));
        this.sprite.width = board.cellSize;
        this.sprite.height = board.cellSize;
        this.sprite.x = 64;
        this.sprite.y = 64;
        this.addKeyObserver('w', isDown => this.isDownW = isDown);
        this.addKeyObserver('s', isDown => this.isDownS = isDown);
        this.addKeyObserver('a', isDown => this.isDownA = isDown);
        this.addKeyObserver('d', isDown => this.isDownD = isDown);
        document.addEventListener('keypress', e => {
            if (e.key == ' ') {
                const dynamite = new _weapons_Dynamite__WEBPACK_IMPORTED_MODULE_4__["default"](game);
                const ringBomb = new _weapons_RingBomb__WEBPACK_IMPORTED_MODULE_6__["default"](game);
                const mortar = new _weapons_MortarBomb__WEBPACK_IMPORTED_MODULE_5__["default"](game);
                mortar.spawnAt(this.nearestBoardCell);
            }
        });
        app.ticker.add(timeDelta => {
            const speed = 3.5;
            const movementDelta = timeDelta * speed;
            let dx = (+this.isDownA * (-1) + +this.isDownD * (+1)) * movementDelta;
            let dy = (+this.isDownW * (-1) + +this.isDownS * (+1)) * movementDelta;
            if (dx != 0 && dy != 0) {
                dx = Math.sign(dx) * movementDelta / Math.sqrt(2);
                dy = Math.sign(dy) * movementDelta / Math.sqrt(2);
            }
            if (dx != 0) {
                const newCollider = new _collision_colliders_BoxCollider__WEBPACK_IMPORTED_MODULE_2__["default"](this.collider.box.shiftX(dx));
                if (!board.collider.testCollision(newCollider)) {
                    this.sprite.x = newCollider.box.x0;
                }
                else {
                    this.sprite.x = Math.round(this.sprite.x / board.cellSize) * board.cellSize;
                }
            }
            if (dy != 0) {
                const newCollider = new _collision_colliders_BoxCollider__WEBPACK_IMPORTED_MODULE_2__["default"](this.collider.box.shiftY(dy));
                if (!board.collider.testCollision(newCollider)) {
                    this.sprite.y = newCollider.box.y0;
                }
                else {
                    this.sprite.y = Math.round(this.sprite.y / board.cellSize) * board.cellSize;
                }
            }
        });
    }
    get renderable() {
        return this.sprite;
    }
    get collider() {
        const x0 = this.sprite.x;
        const y0 = this.sprite.y;
        const x1 = x0 + this.sprite.width;
        const y1 = y0 + this.sprite.height;
        return new _collision_colliders_BoxCollider__WEBPACK_IMPORTED_MODULE_2__["default"](_collision_shapes_Rectangle__WEBPACK_IMPORTED_MODULE_3__["default"].fromCoords(x0, y0, x1, y1));
    }
    get nearestBoardCell() {
        return this.game.board.getCellAt(Math.round(this.sprite.x / this.game.board.cellSize), Math.round(this.sprite.y / this.game.board.cellSize));
    }
    addKeyObserver(key, listener) {
        document.addEventListener('keydown', e => {
            if (e.key === key) {
                listener(true);
            }
        });
        document.addEventListener('keyup', e => {
            if (e.key === key) {
                listener(false);
            }
        });
    }
}


/***/ }),

/***/ "./src/game/Resources.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Resources)
/* harmony export */ });
/* harmony import */ var _assets_explosion_explosion_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/assets/explosion/explosion.json");
/* harmony import */ var _assets_explosion_explosion_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/assets/explosion/explosion.png");
/* harmony import */ var _assets_grass_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/assets/grass.png");
/* harmony import */ var _assets_wall_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/game/assets/wall.png");
/* harmony import */ var _assets_player_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/game/assets/player.png");
/* harmony import */ var _loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/game/loader/AssetsLoader.ts");






class Resources {
    static async initialize() {
        this.GRASS_TEXTURE = (0,_loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_5__.loadTexture)(_assets_grass_png__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.WALL_TEXTURE = (0,_loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_5__.loadTexture)(_assets_wall_png__WEBPACK_IMPORTED_MODULE_3__["default"]);
        this.WOOD_TEXTURE = (0,_loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_5__.loadTexture)(_assets_player_png__WEBPACK_IMPORTED_MODULE_4__["default"]);
        this.EXPLOSION_SPRITESHEET = await (0,_loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_5__.loadSpritesheet)(_assets_explosion_explosion_png__WEBPACK_IMPORTED_MODULE_1__["default"], _assets_explosion_explosion_json__WEBPACK_IMPORTED_MODULE_0__);
    }
}


/***/ }),

/***/ "./src/game/board/Board.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Board)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _BoardCell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/board/BoardCell.ts");
/* harmony import */ var _BoardCellsTree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/board/BoardCellsTree.ts");



class Board {
    constructor(props = null) {
        Object.defineProperty(this, "cellsContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cellsTree", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "cellSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { cellSize = 40 } = props !== null && props !== void 0 ? props : {};
        this.cellSize = cellSize;
        this.cellsContainer = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();
        this.cellsTree = new _BoardCellsTree__WEBPACK_IMPORTED_MODULE_2__["default"](cell => this.cellsContainer.addChild(cell.renderable), cell => this.cellsContainer.removeChild(cell.renderable));
    }
    get renderable() {
        return this.cellsContainer;
    }
    get collider() {
        return this.cellsTree;
    }
    getCellAt(col, row) {
        return this.cellsTree.getCellAt(col, row);
    }
    addCell(col, row) {
        const cell = new _BoardCell__WEBPACK_IMPORTED_MODULE_1__.BoardCell(col, row, this.cellSize, this);
        this.cellsTree.addCell(cell);
        return cell;
    }
    alignWithCell(col, row, object) {
        const x0 = col * this.cellSize;
        const y0 = row * this.cellSize;
        const w = object.width;
        const h = object.height;
        object.x = x0 + (this.cellSize - w) / 2;
        object.y = y0 + (this.cellSize - h) / 2;
    }
}


/***/ }),

/***/ "./src/game/board/BoardCell.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoardCell": () => (/* binding */ BoardCell)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _collision_colliders_BoxCollider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/collision/colliders/BoxCollider.ts");
/* harmony import */ var _collision_shapes_Rectangle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/collision/shapes/Rectangle.ts");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/game/Resources.ts");




class BoardCell {
    constructor(col, row, size, board) {
        Object.defineProperty(this, "sprite", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "board", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_isWall", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "col", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "row", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "collider", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.board = board;
        this.col = col;
        this.row = row;
        const x0 = col * size;
        const y0 = row * size;
        const x1 = x0 + size;
        const y1 = y0 + size;
        this.sprite = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite(_Resources__WEBPACK_IMPORTED_MODULE_3__["default"].GRASS_TEXTURE);
        this.collider = new _collision_colliders_BoxCollider__WEBPACK_IMPORTED_MODULE_1__["default"](_collision_shapes_Rectangle__WEBPACK_IMPORTED_MODULE_2__["default"].fromCoords(x0, y0, x1, y1));
        this.sprite.width = size;
        this.sprite.height = size;
        this.sprite.x = x0;
        this.sprite.y = y0;
    }
    get neighbors() {
        return [
            this.board.getCellAt(this.col - 0, this.row - 1),
            this.board.getCellAt(this.col - 1, this.row - 1),
            this.board.getCellAt(this.col - 1, this.row - 0),
            this.board.getCellAt(this.col - 1, this.row + 1),
            this.board.getCellAt(this.col - 0, this.row + 1),
            this.board.getCellAt(this.col + 1, this.row + 1),
            this.board.getCellAt(this.col + 1, this.row - 0),
            this.board.getCellAt(this.col + 1, this.row - 1),
        ].filter(cell => !!cell);
    }
    get hash() {
        return this.col + '#' + this.row;
    }
    get renderable() {
        return this.sprite;
    }
    get isWall() {
        return this._isWall;
    }
    get wCell() {
        return this.board.getCellAt(this.col - 1, this.row);
    }
    get wMove() {
        var _a;
        return ((_a = this.eCell) === null || _a === void 0 ? void 0 : _a.isWall) === false;
    }
    get sCell() {
        return this.board.getCellAt(this.col, this.row - 1);
    }
    get sMove() {
        var _a;
        return ((_a = this.eCell) === null || _a === void 0 ? void 0 : _a.isWall) === false;
    }
    get eCell() {
        return this.board.getCellAt(this.col + 1, this.row);
    }
    get eMove() {
        var _a;
        return ((_a = this.eCell) === null || _a === void 0 ? void 0 : _a.isWall) === false;
    }
    get nCell() {
        return this.board.getCellAt(this.col, this.row + 1);
    }
    get nMove() {
        var _a;
        return ((_a = this.nCell) === null || _a === void 0 ? void 0 : _a.isWall) === false;
    }
    get nwCell() {
        return this.board.getCellAt(this.col - 1, this.row - 1);
    }
    get nwMove() {
        var _a, _b, _c;
        return (((_a = this.nwCell) === null || _a === void 0 ? void 0 : _a.isWall) === false &&
            ((_b = this.nCell) === null || _b === void 0 ? void 0 : _b.isWall) === false &&
            ((_c = this.wCell) === null || _c === void 0 ? void 0 : _c.isWall) === false);
    }
    get swCell() {
        return this.board.getCellAt(this.col - 1, this.row + 1);
    }
    get swMove() {
        var _a, _b, _c;
        return (((_a = this.swCell) === null || _a === void 0 ? void 0 : _a.isWall) === false &&
            ((_b = this.sCell) === null || _b === void 0 ? void 0 : _b.isWall) === false &&
            ((_c = this.wCell) === null || _c === void 0 ? void 0 : _c.isWall) === false);
    }
    get seCell() {
        return this.board.getCellAt(this.col + 1, this.row + 1);
    }
    get seMove() {
        var _a, _b, _c;
        return (((_a = this.seCell) === null || _a === void 0 ? void 0 : _a.isWall) === false &&
            ((_b = this.sCell) === null || _b === void 0 ? void 0 : _b.isWall) === false &&
            ((_c = this.eCell) === null || _c === void 0 ? void 0 : _c.isWall) === false);
    }
    get neCell() {
        return this.board.getCellAt(this.col + 1, this.row - 1);
    }
    get neMove() {
        var _a, _b, _c;
        return (((_a = this.neCell) === null || _a === void 0 ? void 0 : _a.isWall) === false &&
            ((_b = this.nCell) === null || _b === void 0 ? void 0 : _b.isWall) === false &&
            ((_c = this.eCell) === null || _c === void 0 ? void 0 : _c.isWall) === false);
    }
    setAsWall(isDestroyable = false) {
        this._isWall = true;
        this.sprite.texture = _Resources__WEBPACK_IMPORTED_MODULE_3__["default"].WALL_TEXTURE;
    }
    setAsGrass() {
        this.sprite.texture = _Resources__WEBPACK_IMPORTED_MODULE_3__["default"].GRASS_TEXTURE;
    }
    setAsWood() {
        this.sprite.texture = _Resources__WEBPACK_IMPORTED_MODULE_3__["default"].WOOD_TEXTURE;
    }
}


/***/ }),

/***/ "./src/game/board/BoardCellsTree.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BoardCellsTree)
/* harmony export */ });
/* harmony import */ var rbush__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/rbush/rbush.min.js");
/* harmony import */ var rbush__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rbush__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _collision_colliders_BoxCollider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/collision/colliders/BoxCollider.ts");


class BoardCellsTree {
    constructor(onAddListener, onRemoveListener) {
        Object.defineProperty(this, "cellsTree", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Tree()
        });
        Object.defineProperty(this, "cellsMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "onCellAddListener", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onCellRemoveListener", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.onCellAddListener = onAddListener;
        this.onCellRemoveListener = onRemoveListener;
    }
    testCollision(other) {
        if (other instanceof _collision_colliders_BoxCollider__WEBPACK_IMPORTED_MODULE_1__["default"]) {
            return !!this.findIntersection(other.box).find(cell => {
                if (cell.isWall) {
                    const f1 = other.box.intersectionFactorX(cell.collider.box);
                    const f2 = other.box.intersectionFactorY(cell.collider.box);
                    console.log(f1, f2);
                    return (f1 > 0.01 && f2 > 0.01);
                }
                else {
                    return false;
                }
                return cell.isWall;
            });
        }
        return false;
    }
    findIntersection(queryRect) {
        const { x0, y0, x1, y1 } = queryRect;
        return this.cellsTree.search({
            minX: x0, minY: y0,
            maxX: x1, maxY: y1
        });
    }
    getCellAt(col, row) {
        return this.cellsMap.get(this.getMapKey(col, row));
    }
    addCell(cell) {
        const { row, col } = cell;
        const key = this.getMapKey(col, row);
        if (this.cellsMap.has(key)) {
            const oldCell = this.cellsMap.get(key);
            this.cellsTree.remove(oldCell);
            this.onCellRemoveListener(oldCell);
        }
        this.cellsMap.set(key, cell);
        this.cellsTree.insert(cell);
        this.onCellAddListener(cell);
    }
    getNonWallCells() {
        return [...this.cellsMap.values()].filter(cell => !cell.isWall);
    }
    getMapKey(col, row) {
        return col + '#' + row;
    }
}
class Tree extends (rbush__WEBPACK_IMPORTED_MODULE_0___default()) {
    toBBox(cell) {
        const { x0, y0, x1, y1 } = cell.collider.box;
        return { minX: x0, minY: y0, maxX: x1, maxY: y1 };
    }
    compareMinX(a, b) {
        return a.collider.box.p1.x - b.collider.box.p1.x;
    }
    compareMinY(a, b) {
        return a.collider.box.p2.x - b.collider.box.p2.x;
    }
}


/***/ }),

/***/ "./src/game/collision/AbstractCollider.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbstractCollider": () => (/* binding */ AbstractCollider)
/* harmony export */ });
class AbstractCollider {
    testCollision(other) {
        var _a, _b;
        return (_b = (_a = this.getCollisionTest(other)) === null || _a === void 0 ? void 0 : _a.testCollision()) !== null && _b !== void 0 ? _b : false;
    }
}


/***/ }),

/***/ "./src/game/collision/colliders/BoxCollider.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BoxCollider)
/* harmony export */ });
/* harmony import */ var _tests_BoxBoxCollisionTest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/collision/tests/BoxBoxCollisionTest.ts");
/* harmony import */ var _AbstractCollider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/collision/AbstractCollider.ts");


class BoxCollider extends _AbstractCollider__WEBPACK_IMPORTED_MODULE_1__.AbstractCollider {
    constructor(box) {
        super();
        Object.defineProperty(this, "box", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.box = box;
    }
    getCollisionTest(other) {
        if (other instanceof BoxCollider) {
            return new _tests_BoxBoxCollisionTest__WEBPACK_IMPORTED_MODULE_0__["default"](this, other);
        }
    }
}


/***/ }),

/***/ "./src/game/collision/shapes/Point.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Point)
/* harmony export */ });
class Point {
    constructor(x, y) {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.x = x;
        this.y = y;
    }
}


/***/ }),

/***/ "./src/game/collision/shapes/Rectangle.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Rectangle)
/* harmony export */ });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/collision/shapes/Point.ts");

class Rectangle {
    constructor(p1, p2) {
        Object.defineProperty(this, "p1", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "p2", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.p1 = p1;
        this.p2 = p2;
    }
    get x0() {
        return this.p1.x;
    }
    get y0() {
        return this.p1.y;
    }
    get x1() {
        return this.p2.x;
    }
    get y1() {
        return this.p2.y;
    }
    shift(dx, dy) {
        const { x0, y0, x1, y1 } = this;
        return Rectangle.fromCoords(x0 + dx, y0 + dy, x1 + dx, y1 + dy);
    }
    shiftX(dx) {
        const { x0, y0, x1, y1 } = this;
        return Rectangle.fromCoords(x0 + dx, y0, x1 + dx, y1);
    }
    shiftY(dy) {
        const { x0, y0, x1, y1 } = this;
        return Rectangle.fromCoords(x0, y0 + dy, x1, y1 + dy);
    }
    intersectsRect(rect) {
        // If one rectangle is on left side of other
        if (this.p1.x > rect.p2.x || rect.p1.x > this.p2.x) {
            return false;
        }
        // If one rectangle is above other
        if (this.p2.y > rect.p1.y || rect.p2.y > this.p1.y) {
            return false;
        }
        return true;
    }
    intersectionFactorX(rect) {
        return Math.min(Math.abs(rect.p2.x - this.p1.x), Math.abs(this.p2.x - rect.p1.x));
    }
    intersectionFactorY(rect) {
        return Math.min(Math.abs(rect.p2.y - this.p1.y), Math.abs(this.p2.y - rect.p1.y));
    }
    static fromCoords(x0, y0, x1, y1) {
        return new Rectangle(new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](x0, y0), new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](x1, y1));
    }
    static fromSize(x0, y0, size) {
        return new Rectangle(new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](x0, y0), new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](x0 + size, y0 + size));
    }
}


/***/ }),

/***/ "./src/game/collision/tests/BoxBoxCollisionTest.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BoxBoxCollisionTest)
/* harmony export */ });
class BoxBoxCollisionTest {
    constructor(b1, b2) {
        Object.defineProperty(this, "b1", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "b2", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.b1 = b1;
        this.b2 = b2;
    }
    testCollision() {
        return this.b1.box.intersectsRect(this.b2.box);
    }
}


/***/ }),

/***/ "./src/game/loader/AssetsLoader.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadSpritesheet": () => (/* binding */ loadSpritesheet),
/* harmony export */   "loadTexture": () => (/* binding */ loadTexture)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");

const loadTexture = (url) => {
    return pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(url, {
        scaleMode: pixi_js__WEBPACK_IMPORTED_MODULE_0__.SCALE_MODES.NEAREST
    });
};
const loadSpritesheet = async (atlasFilepath, sheetData) => {
    const sheet = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Spritesheet(pixi_js__WEBPACK_IMPORTED_MODULE_0__.Texture.from(atlasFilepath, {
        scaleMode: pixi_js__WEBPACK_IMPORTED_MODULE_0__.SCALE_MODES.NEAREST
    }), sheetData);
    return await new Promise(resolve => {
        sheet.parse(() => resolve(sheet));
    });
};


/***/ }),

/***/ "./src/game/loader/LevelLoader.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LevelLoader)
/* harmony export */ });
/* harmony import */ var _board_Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/board/Board.ts");

class LevelLoader {
    static load(level) {
        const blocks = level.blocks.map(b => this.parseBlock(b));
        const board = new _board_Board__WEBPACK_IMPORTED_MODULE_0__["default"]();
        blocks.forEach(block => {
            for (let col = block.x0; col <= block.x1; col++) {
                for (let row = block.y0; row <= block.y1; row++) {
                    const cell = board.addCell(col, row);
                    switch (block.type) {
                        case 'grass': {
                            cell.setAsGrass();
                            break;
                        }
                        case 'wall': {
                            cell.setAsWall();
                            break;
                        }
                    }
                }
            }
        });
        return board;
    }
    static parseBlock(blockDef) {
        const coordsSplit = blockDef.coords.split(':');
        const c0 = coordsSplit[0].split(',');
        const x0 = Math.max(Math.round(+c0[0]), 1) - 1;
        const y0 = Math.max(Math.round(+c0[1]), 1) - 1;
        let x1 = x0;
        let y1 = y0;
        if (coordsSplit.length > 1) {
            const c1 = coordsSplit[1].split(',');
            x1 = Math.max(Math.round(+c1[0]), 1) - 1;
            y1 = Math.max(Math.round(+c1[1]), 1) - 1;
        }
        return { x0, y0, x1, y1, type: blockDef.type };
    }
}


/***/ }),

/***/ "./src/game/weapons/Dynamite.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dynamite)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/Resources.ts");
/* harmony import */ var _Weapon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/weapons/Weapon.ts");



class Dynamite extends _Weapon__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "baseRange", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 4
        });
    }
    spawnAt(cell) {
        setTimeout(() => {
            const explosionsDelayMs = 60;
            const c0 = cell.col;
            const r0 = cell.row;
            let l = 1;
            let b = 1;
            let r = 1;
            let t = 1;
            const sprites = [];
            this.game.app.stage.addChild(this.getExplosionSprite(c0, r0, this.game.board.cellSize));
            for (let i = 0; i < this.baseRange; i++) {
                setTimeout(() => {
                    var _a, _b, _c, _d;
                    // top
                    if (((_a = this.game.board.getCellAt(c0, r0 + t)) === null || _a === void 0 ? void 0 : _a.isWall) === false) {
                        this.game.app.stage.addChild(this.getExplosionSprite(c0, r0 + t, this.game.board.cellSize));
                        t++;
                    }
                    // right
                    if (((_b = this.game.board.getCellAt(c0 + r, r0)) === null || _b === void 0 ? void 0 : _b.isWall) === false) {
                        this.game.app.stage.addChild(this.getExplosionSprite(c0 + r, r0, this.game.board.cellSize));
                        r++;
                    }
                    // bottom
                    if (((_c = this.game.board.getCellAt(c0, r0 - b)) === null || _c === void 0 ? void 0 : _c.isWall) === false) {
                        this.game.app.stage.addChild(this.getExplosionSprite(c0, r0 - b, this.game.board.cellSize));
                        b++;
                    }
                    // left
                    if (((_d = this.game.board.getCellAt(c0 - l, r0)) === null || _d === void 0 ? void 0 : _d.isWall) === false) {
                        this.game.app.stage.addChild(this.getExplosionSprite(c0 - l, r0, this.game.board.cellSize));
                        l++;
                    }
                }, i * explosionsDelayMs);
            }
        }, 1000);
    }
    getExplosionSprite(col, row, cellSize) {
        const sprite = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.AnimatedSprite(_Resources__WEBPACK_IMPORTED_MODULE_1__["default"].EXPLOSION_SPRITESHEET.animations.explosion);
        sprite.width = cellSize;
        sprite.height = cellSize;
        sprite.x = col * cellSize;
        sprite.y = row * cellSize;
        sprite.animationSpeed = 0.3;
        sprite.loop = false;
        sprite.play();
        return sprite;
    }
}


/***/ }),

/***/ "./src/game/weapons/MortarBomb.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MortarBomb)
/* harmony export */ });
/* harmony import */ var _pixi_filter_shockwave__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@pixi/filter-shockwave/dist/filter-shockwave.esm.js");
/* harmony import */ var _Dynamite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/weapons/Dynamite.ts");
/* harmony import */ var _RingBomb__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/weapons/RingBomb.ts");
/* harmony import */ var _Weapon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/game/weapons/Weapon.ts");




class MortarBomb extends _Weapon__WEBPACK_IMPORTED_MODULE_3__["default"] {
    spawnAt(cell) {
        const mainBomb = new _RingBomb__WEBPACK_IMPORTED_MODULE_2__["default"](this.game, { radius: 8, propagationDelay: 200 });
        const wave = new _pixi_filter_shockwave__WEBPACK_IMPORTED_MODULE_0__.ShockwaveFilter([cell.col * 32, cell.row * 32], {
            radius: 400,
            amplitude: 15,
            brightness: 1.5
        });
        this.game.app.stage.filters = [wave];
        this.game.app.ticker.add(delta => {
            wave.time += 0.01;
        });
        mainBomb.spawnAt(cell);
        const nonWallCells = this.game.board.cellsTree.getNonWallCells();
        const maxLength = nonWallCells.length - 1;
        setTimeout(() => {
            for (let i = 0; i < 4; i++) {
                const index = Math.min(Math.round(Math.random() * maxLength), maxLength);
                const cell = nonWallCells[index];
                console.log(index);
                new _Dynamite__WEBPACK_IMPORTED_MODULE_1__["default"](this.game).spawnAt(cell);
                // new RingBomb(this.game, { radius: 2, delay: 0 }).spawnAt(cell);
            }
        }, 1000);
    }
}


/***/ }),

/***/ "./src/game/weapons/RingBomb.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RingBomb)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _Bresenham__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/Bresenham.ts");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/Resources.ts");
/* harmony import */ var _Weapon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/game/weapons/Weapon.ts");




class RingBomb extends _Weapon__WEBPACK_IMPORTED_MODULE_3__["default"] {
    constructor(game, props) {
        var _a, _b, _c;
        super(game);
        Object.defineProperty(this, "radius", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "delay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "propagationDelay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.radius = (_a = props === null || props === void 0 ? void 0 : props.radius) !== null && _a !== void 0 ? _a : 5;
        this.delay = (_b = props === null || props === void 0 ? void 0 : props.delay) !== null && _b !== void 0 ? _b : 1000;
        this.propagationDelay = (_c = props === null || props === void 0 ? void 0 : props.propagationDelay) !== null && _c !== void 0 ? _c : 300;
    }
    spawnAt(cell) {
        setTimeout(() => {
            for (let i = 0; i < this.radius; i++) {
                setTimeout(() => {
                    const ring = _Bresenham__WEBPACK_IMPORTED_MODULE_1__["default"].getOutline(cell.col, cell.row, i + 1);
                    ring.forEach(([col, row]) => {
                        const sprite = this.getExplosionSprite(col, row, this.game.board.cellSize);
                        this.game.app.stage.addChild(sprite);
                    });
                }, i * this.propagationDelay);
            }
        }, this.delay);
    }
    getExplosionSprite(col, row, cellSize) {
        const sprite = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.AnimatedSprite(_Resources__WEBPACK_IMPORTED_MODULE_2__["default"].EXPLOSION_SPRITESHEET.animations.explosion);
        sprite.width = cellSize;
        sprite.height = cellSize;
        sprite.x = col * cellSize;
        sprite.y = row * cellSize;
        sprite.animationSpeed = 0.3;
        sprite.loop = false;
        sprite.play();
        return sprite;
    }
}


/***/ }),

/***/ "./src/game/weapons/Weapon.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Weapon)
/* harmony export */ });
class Weapon {
    constructor(game) {
        Object.defineProperty(this, "game", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.game = game;
    }
}


/***/ }),

/***/ "./src/index.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/Game.ts");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/index.scss");


const game = new _game_Game__WEBPACK_IMPORTED_MODULE_0__["default"]();


/***/ }),

/***/ "./src/game/assets/explosion/explosion.json":
/***/ ((module) => {

module.exports = JSON.parse('{"frames":{"explosion_02.png":{"frame":{"x":0,"y":0,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"explosion_03.png":{"frame":{"x":32,"y":0,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"explosion_04.png":{"frame":{"x":64,"y":0,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"explosion_05.png":{"frame":{"x":96,"y":0,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"explosion_06.png":{"frame":{"x":128,"y":0,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"explosion_07.png":{"frame":{"x":160,"y":0,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"explosion_08.png":{"frame":{"x":192,"y":0,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"explosion_09.png":{"frame":{"x":224,"y":0,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"explosion_10.png":{"frame":{"x":256,"y":0,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}},"explosion_11.png":{"frame":{"x":288,"y":0,"w":32,"h":32},"rotated":false,"trimmed":false,"spriteSourceSize":{"x":0,"y":0,"w":32,"h":32},"sourceSize":{"w":32,"h":32}}},"animations":{"explosion":["explosion_02.png","explosion_03.png","explosion_04.png","explosion_05.png","explosion_06.png","explosion_07.png","explosion_08.png","explosion_09.png","explosion_10.png","explosion_11.png"]},"meta":{"app":"https://www.codeandweb.com/texturepacker","version":"1.0","image":"explosion.png","format":"RGBA8888","size":{"w":320,"h":32},"scale":"1","smartupdate":"$TexturePacker:SmartUpdate:72cb6e8ee97d5c9b0045ad0ed16ce3d8:2dc2dff98fa0ea951445309b4aedcd20:900e1fb3093a9a6ecb2b2b49071c44f7$"}}');

/***/ }),

/***/ "./src/game/assets/levels/level2.json":
/***/ ((module) => {

module.exports = JSON.parse('{"blocks":[{"coords":"1,1:10,9","type":"wall"},{"coords":"2,2:9,8","type":"grass"},{"coords":"7,2:7,7","type":"wall"},{"coords":"1,4:3,4","type":"wall"},{"coords":"4,6:6,6","type":"wall"}]}');

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
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
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
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "./";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkbomberman"] = globalThis["webpackChunkbomberman"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_pixi_filter-shockwave_dist_filter-shockwave_esm_js-node_modules_heap_ind-bba7ca"], () => (__webpack_require__("./src/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map