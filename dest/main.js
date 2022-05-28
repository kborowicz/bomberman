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

/***/ "./src/game/Game.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _actors_BatEnemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/actors/BatEnemy.ts");
/* harmony import */ var _assets_levels_level2_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/assets/levels/level2.json");
/* harmony import */ var _GameContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/game/GameContext.ts");
/* harmony import */ var _loader_LevelLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/game/loader/LevelLoader.ts");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/game/Resources.ts");






class Game {
    constructor() {
        Object.defineProperty(this, "_context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.run();
    }
    get context() {
        return this._context;
    }
    async run() {
        await _Resources__WEBPACK_IMPORTED_MODULE_5__["default"].initialize();
        this.createContext();
        const { app, board, player } = this.context;
        player.setPosition(board.getCellAt(2, 2));
        const bat1 = new _actors_BatEnemy__WEBPACK_IMPORTED_MODULE_1__["default"](this.context);
        bat1.speed = 5;
        bat1.setPosition(board.getCellAt(17, 2));
        const bat2 = new _actors_BatEnemy__WEBPACK_IMPORTED_MODULE_1__["default"](this.context);
        bat2.setPosition(board.getCellAt(17, 17));
        app.stage.addChild(board.renderable);
        app.stage.addChild(player.renderable);
        app.stage.addChild(bat1.renderable);
        app.stage.addChild(bat2.renderable);
        setTimeout(() => {
            const cells = board.cellsTree.getNonWallCells();
            const cell = cells[Math.floor(Math.random() * cells.length - 1)];
            cell.setAsWood();
            bat1.goTo(cell);
            bat2.goTo(cell);
        }, 1000);
        document.getElementById('root').append(app.view);
        app.screen.width = board.renderable.width;
        app.screen.height = board.renderable.height;
        app.view.width = board.renderable.width;
        app.view.height = board.renderable.height;
    }
    createContext() {
        const app = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Application();
        const board = _loader_LevelLoader__WEBPACK_IMPORTED_MODULE_4__["default"].load(_assets_levels_level2_json__WEBPACK_IMPORTED_MODULE_2__);
        this._context = new _GameContext__WEBPACK_IMPORTED_MODULE_3__["default"](app, board);
    }
}


/***/ }),

/***/ "./src/game/GameContext.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameContext)
/* harmony export */ });
/* harmony import */ var _actors_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/actors/Player.ts");

class GameContext {
    constructor(app, board) {
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
        Object.defineProperty(this, "actors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "player", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.app = app;
        this.board = board;
        this.player = new _actors_Player__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    }
    get ticker() {
        return this.app.ticker;
    }
    get cellSize() {
        return this.board.cellSize;
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

/***/ "./src/game/actors/Actor.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Actor)
/* harmony export */ });
/* harmony import */ var _collision_BoundingBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/collision/BoundingBox.ts");

class Actor {
    constructor(context) {
        // TODO eventy:
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_speed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2
        });
        Object.defineProperty(this, "_healh", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 100
        });
        this.context = context;
    }
    get renderable() {
        return this.sprite;
    }
    get bbox() {
        const { x, y, width, height } = this.sprite;
        return _collision_BoundingBox__WEBPACK_IMPORTED_MODULE_0__["default"].fromDims(x, y, width, height);
    }
    get nearestCell() {
        const board = this.context.board;
        const cellSize = board.cellSize;
        return board.getCellAt(Math.round(this.sprite.x / cellSize), Math.round(this.sprite.y / cellSize));
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
    }
    move(dx, dy) {
        const board = this.context.board;
        const bbox = this.bbox;
        let newX = this.sprite.x;
        let newY = this.sprite.y;
        if (dx != 0) {
            const shiftedBbox = bbox.shiftX(dx);
            if (!board.testCollision(shiftedBbox)) {
                newX = shiftedBbox.x0;
            }
            else {
                // const dirx = Math.sign(dx);
                // if (dirx > 0) {
                //     const row = Math.round(this.sprite.x / board.cellSize);
                // } else {
                //     const row = Math.round(this.sprite.x / board.cellSize);
                // }
            }
        }
        if (dy != 0) {
            const shiftedBbox = bbox.shiftY(dy);
            if (!board.testCollision(shiftedBbox)) {
                newY = shiftedBbox.y0;
            }
            else {
                // const diry = Math.sign(dy);
            }
        }
        this.sprite.x = newX;
        this.sprite.y = newY;
    }
    setPosition(cell) {
        if (!cell.isWall) {
            cell.alignObject(this.sprite);
        }
    }
}


/***/ }),

/***/ "./src/game/actors/ActorAI.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ActorAI)
/* harmony export */ });
/* harmony import */ var _Actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/actors/Actor.ts");
/* harmony import */ var _Movement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/actors/Movement.ts");


class ActorAI extends _Actor__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "currentMovement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    goTo(arg1, arg2) {
        if (this.currentMovement) {
            this.currentMovement.cancel();
        }
        let newMovement;
        if (typeof arg1 === 'number') {
            newMovement = new _Movement__WEBPACK_IMPORTED_MODULE_1__["default"](this, this.context.board.getCellAt(arg1, arg2));
        }
        else {
            newMovement = new _Movement__WEBPACK_IMPORTED_MODULE_1__["default"](this, arg1);
        }
        this.currentMovement = newMovement;
        return newMovement;
    }
}


/***/ }),

/***/ "./src/game/actors/BatEnemy.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BatEnemy)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/Resources.ts");
/* harmony import */ var _ActorAI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/actors/ActorAI.ts");



class BatEnemy extends _ActorAI__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "_sprite", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(_Resources__WEBPACK_IMPORTED_MODULE_1__["default"].WOOD_TEXTURE)
        });
    }
    get sprite() {
        return this._sprite;
    }
}


/***/ }),

/***/ "./src/game/actors/Movement.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Movement)
/* harmony export */ });
class Movement {
    constructor(actor, dest, autostart = true) {
        Object.defineProperty(this, "actor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dest", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tickerCallback", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_isRunning", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "_isPaused", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.actor = actor;
        this.dest = dest;
        if (autostart) {
            this.start();
        }
    }
    start() {
        if (this._isRunning) {
            return;
        }
        const { board, ticker } = this.actor.context;
        const shortestPath = board.getShortestPath(this.actor.nearestCell, this.dest);
        const pathPoints = [...shortestPath.points];
        if (!pathPoints.length) {
            return null;
        }
        let movement = this.getMovementData(this.actor.nearestCell.bbox, pathPoints.shift().bbox);
        this.tickerCallback = (dt) => {
            if (this._isPaused) {
                return;
            }
            const { cx, cy } = this.actor.bbox;
            const { x1, y1, dirx, diry, cosa, sina } = movement;
            let dx;
            let dy;
            if (this.equals(cx, x1)) {
                dx = 0;
            }
            else {
                dx = dt * this.actor.speed * cosa;
                if (cx * dirx + dx * dirx >= x1 * dirx) {
                    dx = x1 - cx;
                }
            }
            if (this.equals(cy, y1)) {
                dy = 0;
            }
            else {
                dy = dt * this.actor.speed * sina;
                if (cy * diry + dy * diry >= y1 * diry) {
                    dy = y1 - cy;
                }
            }
            if (this.equals(dx, 0) && this.equals(dy, 0)) {
                const nextCell = pathPoints.shift();
                if (nextCell) {
                    movement = this.getMovementData(this.actor.nearestCell.bbox, nextCell.bbox);
                }
                else {
                    this.cancel();
                }
            }
            else {
                this.actor.move(dx, dy);
            }
        };
        ticker.add(this.tickerCallback);
        this._isRunning = true;
    }
    pause() {
        this._isPaused = true;
    }
    resume() {
        this._isPaused = false;
    }
    cancel() {
        this.actor.context.ticker.remove(this.tickerCallback);
    }
    getMovementData(src, dst) {
        const dx = dst.cx - src.cx;
        const dy = dst.cy - src.cy;
        const a = Math.atan2(dy, dx);
        return {
            dx, dy, a,
            x0: src.cx,
            y0: src.cy,
            x1: dst.cx,
            y1: dst.cy,
            cosa: Math.cos(a),
            sina: Math.sin(a),
            dirx: Math.sign(dx),
            diry: Math.sign(dy)
        };
    }
    equals(a, b, eps = 0.001) {
        return Math.abs(a - b) <= eps;
    }
}


/***/ }),

/***/ "./src/game/actors/Player.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/Resources.ts");
/* harmony import */ var _Actor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/actors/Actor.ts");



class Player extends _Actor__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor(context) {
        super(context);
        Object.defineProperty(this, "_sprite", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._sprite = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(_Resources__WEBPACK_IMPORTED_MODULE_1__["default"].WOOD_TEXTURE);
        this._sprite.width = context.cellSize;
        this._sprite.height = context.cellSize;
    }
    get speed() {
        return 4;
    }
    get sprite() {
        return this._sprite;
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
/* harmony import */ var _PathFinder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/game/board/PathFinder.ts");




class Board {
    constructor(props = null) {
        Object.defineProperty(this, "cellsContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pathFinder", {
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
        this.pathFinder = new _PathFinder__WEBPACK_IMPORTED_MODULE_3__["default"]();
        this.cellsContainer = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container();
        this.cellsTree = new _BoardCellsTree__WEBPACK_IMPORTED_MODULE_2__["default"](cell => this.cellsContainer.addChild(cell.renderable), cell => this.cellsContainer.removeChild(cell.renderable));
    }
    get renderable() {
        return this.cellsContainer;
    }
    testCollision(bbox) {
        return this.cellsTree.testCollision(bbox);
    }
    getCellAt(col, row) {
        return this.cellsTree.getCellAt(col, row);
    }
    addCell(col, row) {
        const cell = new _BoardCell__WEBPACK_IMPORTED_MODULE_1__.BoardCell(col, row, this.cellSize, this);
        this.cellsTree.addCell(cell);
        return cell;
    }
    getShortestPath(c0, c1) {
        return this.pathFinder.find(c0, c1);
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
/* harmony import */ var _collision_BoundingBox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/collision/BoundingBox.ts");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/Resources.ts");



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
        Object.defineProperty(this, "bbox", {
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
        this.sprite = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite(_Resources__WEBPACK_IMPORTED_MODULE_2__["default"].GRASS_TEXTURE);
        this.bbox = _collision_BoundingBox__WEBPACK_IMPORTED_MODULE_1__["default"].fromCoords(x0, y0, x1, y1);
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
    setAsWall(isDestroyable = false) {
        this._isWall = true;
        this.sprite.texture = _Resources__WEBPACK_IMPORTED_MODULE_2__["default"].WALL_TEXTURE;
    }
    setAsGrass() {
        this.sprite.texture = _Resources__WEBPACK_IMPORTED_MODULE_2__["default"].GRASS_TEXTURE;
    }
    setAsWood() {
        this.sprite.texture = _Resources__WEBPACK_IMPORTED_MODULE_2__["default"].WOOD_TEXTURE;
    }
    alignObject(sprite) {
        const cellSize = this.board.cellSize;
        const x0 = this.col * cellSize;
        const y0 = this.row * cellSize;
        const w = sprite.width;
        const h = sprite.height;
        sprite.x = x0 + (cellSize - w) / 2;
        sprite.y = y0 + (cellSize - h) / 2;
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
    testCollision(bbox) {
        return !!this.findIntersection(bbox).find(cell => {
            if (cell.isWall) {
                const f1 = bbox.intersectionFactorX(cell.bbox);
                const f2 = bbox.intersectionFactorY(cell.bbox);
                return (f1 > 0.01 && f2 > 0.01);
            }
            else {
                return false;
            }
        });
    }
    findIntersection(bbox) {
        const { x0, y0, x1, y1 } = bbox;
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
        const { x0, y0, x1, y1 } = cell.bbox;
        return { minX: x0, minY: y0, maxX: x1, maxY: y1 };
    }
    compareMinX(a, b) {
        return a.bbox.p1.x - b.bbox.p1.x;
    }
    compareMinY(a, b) {
        return a.bbox.p2.x - b.bbox.p2.x;
    }
}


/***/ }),

/***/ "./src/game/board/PathFinder.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BoardPath": () => (/* binding */ BoardPath),
/* harmony export */   "default": () => (/* binding */ PathFinder)
/* harmony export */ });
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/heap/index.js");
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(heap__WEBPACK_IMPORTED_MODULE_0__);

class PathFinder {
    find(c0, c1) {
        const heap = new (heap__WEBPACK_IMPORTED_MODULE_0___default())((a, b) => a.fscore - b.fscore);
        const nodes = new Map();
        const startNode = new Node(c0);
        startNode.gscore = 0;
        startNode.fscore = 0;
        startNode.opened = true;
        heap.push(startNode);
        nodes.set(startNode.cell.hash, startNode);
        while (!heap.empty()) {
            const currentNode = heap.pop();
            currentNode.closed = true;
            if (currentNode.cell == c1) {
                const backtrace = currentNode.backtrace();
                return new BoardPath(backtrace.map(node => node.cell));
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
    heuristic(c0, c1) {
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
        return backtrace.reverse();
    }
}
class BoardPath {
    constructor(cells) {
        Object.defineProperty(this, "cells", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "points", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cells = cells;
        this.points = this.getPoints(cells);
    }
    getPoints(cells) {
        const cellsCopy = [...cells];
        const points = [cellsCopy[0]];
        for (let i = 1; i < cellsCopy.length - 1; i++) {
            const prevCell = cellsCopy[i - 1];
            const currCell = cellsCopy[i + 0];
            const nextCell = cellsCopy[i + 1];
            // Find corners
            const dc1 = Math.abs(currCell.col - prevCell.col) == 1;
            const dr1 = Math.abs(currCell.row - prevCell.row) == 1;
            const dc2 = Math.abs(nextCell.col - currCell.col) == 1;
            const dr2 = Math.abs(nextCell.row - currCell.row) == 1;
            if (dc1 && dr2 || dc2 && dr1) {
                points.push(currCell);
            }
        }
        points.push(cellsCopy.pop());
        return points;
    }
}


/***/ }),

/***/ "./src/game/collision/BoundingBox.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BoundingBox)
/* harmony export */ });
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/collision/Point.ts");

class BoundingBox {
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
    get cx() {
        return (this.x0 + this.x1) / 2;
    }
    get cy() {
        return (this.y0 + this.y1) / 2;
    }
    shift(dx, dy) {
        const { x0, y0, x1, y1 } = this;
        return BoundingBox.fromCoords(x0 + dx, y0 + dy, x1 + dx, y1 + dy);
    }
    shiftX(dx) {
        const { x0, y0, x1, y1 } = this;
        return BoundingBox.fromCoords(x0 + dx, y0, x1 + dx, y1);
    }
    shiftY(dy) {
        const { x0, y0, x1, y1 } = this;
        return BoundingBox.fromCoords(x0, y0 + dy, x1, y1 + dy);
    }
    testCollision(bbox) {
        // If one rectangle is on left side of other
        if (this.p1.x > bbox.p2.x || bbox.p1.x > this.p2.x) {
            return false;
        }
        // If one rectangle is above other
        if (this.p2.y > bbox.p1.y || bbox.p2.y > this.p1.y) {
            return false;
        }
        return true;
    }
    intersectionFactorX(bbox) {
        return Math.min(Math.abs(bbox.p2.x - this.p1.x), Math.abs(this.p2.x - bbox.p1.x));
    }
    intersectionFactorY(bbox) {
        return Math.min(Math.abs(bbox.p2.y - this.p1.y), Math.abs(this.p2.y - bbox.p1.y));
    }
    static fromCoords(x0, y0, x1, y1) {
        return new BoundingBox(new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](x0, y0), new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](x1, y1));
    }
    static fromDims(x0, y0, w, h) {
        return new BoundingBox(new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](x0, y0), new _Point__WEBPACK_IMPORTED_MODULE_0__["default"](x0 + w, y0 + h));
    }
}


/***/ }),

/***/ "./src/game/collision/Point.ts":
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

module.exports = JSON.parse('{"blocks":[{"coords":"1,1:20,19","type":"wall"},{"coords":"2,2:19,18","type":"grass"},{"coords":"7,2:7,7","type":"wall"},{"coords":"1,4:3,4","type":"wall"},{"coords":"4,6:6,6","type":"wall"}]}');

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
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_heap_index_js-node_modules_pixi_js_dist_esm_pixi_js-node_modules_rbush_r-331d17"], () => (__webpack_require__("./src/index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.js.map