/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game/assets/bricks.png":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "bricks.png");

/***/ }),

/***/ "./src/game/assets/dynamite.png":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "dynamite.png");

/***/ }),

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

/***/ "./src/game/assets/stone.png":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "stone.png");

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
/* harmony import */ var _assets_levels_level2_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/assets/levels/level2.json");
/* harmony import */ var _entity_actors_enemies_BatEnemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/entity/actors/enemies/BatEnemy.ts");
/* harmony import */ var _GameContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/GameContext.ts");
/* harmony import */ var _loader_LevelLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/game/loader/LevelLoader.ts");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/game/Resources.ts");





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
        await _Resources__WEBPACK_IMPORTED_MODULE_4__["default"].initialize();
        this._context = new _GameContext__WEBPACK_IMPORTED_MODULE_2__["default"]();
        _loader_LevelLoader__WEBPACK_IMPORTED_MODULE_3__["default"].load(_assets_levels_level2_json__WEBPACK_IMPORTED_MODULE_0__, this._context);
        const { app, board } = this._context;
        document.getElementById('root').append(app.view);
        app.screen.width = board.renderable.width;
        app.screen.height = board.renderable.height;
        app.view.width = app.screen.width;
        app.view.height = app.screen.height;
        // const ringBomb = new RingBomb(this.context);
        // ringBomb.spawnAt(board.getCellAt(7, 7));
        const p = new _entity_actors_enemies_BatEnemy__WEBPACK_IMPORTED_MODULE_1__["default"](this.context);
        p.setPosition(13, 13);
        p.goTo(1, 1);
        setTimeout(() => {
            p.goTo(13, 1);
        }, 2221);
        this.context.addObject(p);
    }
}


/***/ }),

/***/ "./src/game/GameContext.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameContext)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _board_Board__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/board/Board.ts");
/* harmony import */ var _entity_actors_Player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/entity/actors/Player.ts");



class GameContext {
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
        this.app = new pixi_js__WEBPACK_IMPORTED_MODULE_0__.Application({
            backgroundColor: 0x3d3d3d
        });
        this.board = new _board_Board__WEBPACK_IMPORTED_MODULE_1__["default"](this);
        this.player = new _entity_actors_Player__WEBPACK_IMPORTED_MODULE_2__["default"](this);
        this.actors.push(this.player);
        this.addObject(this.board);
        this.addObject(this.player);
    }
    get ticker() {
        return this.app.ticker;
    }
    get cellSize() {
        return this.board.cellSize;
    }
    get stage() {
        return this.app.stage;
    }
    addObject(object) {
        if (object.renderable) {
            this.app.stage.addChild(object.renderable);
        }
        else {
            this.app.stage.addChild(object);
        }
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
/* harmony import */ var _assets_dynamite_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("./src/game/assets/dynamite.png");
/* harmony import */ var _assets_stone_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("./src/game/assets/stone.png");
/* harmony import */ var _assets_bricks_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("./src/game/assets/bricks.png");
/* harmony import */ var _loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("./src/game/loader/AssetsLoader.ts");








class Resources {
    static async initialize() {
        this.GRASS_TEXTURE = (0,_loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_7__.loadTexture)(_assets_grass_png__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.WALL_TEXTURE = (0,_loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_7__.loadTexture)(_assets_wall_png__WEBPACK_IMPORTED_MODULE_3__["default"]);
        this.WOOD_TEXTURE = (0,_loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_7__.loadTexture)(_assets_dynamite_png__WEBPACK_IMPORTED_MODULE_4__["default"]);
        this.STONE_TEXTURE = (0,_loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_7__.loadTexture)(_assets_stone_png__WEBPACK_IMPORTED_MODULE_5__["default"]);
        this.BRICK_TEXTURE = (0,_loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_7__.loadTexture)(_assets_bricks_png__WEBPACK_IMPORTED_MODULE_6__["default"]);
        this.EXPLOSION_SPRITESHEET = await (0,_loader_AssetsLoader__WEBPACK_IMPORTED_MODULE_7__.loadSpritesheet)(_assets_explosion_explosion_png__WEBPACK_IMPORTED_MODULE_1__["default"], _assets_explosion_explosion_json__WEBPACK_IMPORTED_MODULE_0__);
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
    constructor(context) {
        Object.defineProperty(this, "cellsContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "context", {
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
            value: 40
        });
        this.context = context;
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
    addCell(col, row, block) {
        const cell = new _BoardCell__WEBPACK_IMPORTED_MODULE_1__.BoardCell(col, row, block, this);
        cell.block.renderable.x = col * this.cellSize;
        cell.block.renderable.y = row * this.cellSize;
        cell.block.renderable.width = this.cellSize;
        cell.block.renderable.height = this.cellSize;
        this.cellsContainer.addChild(cell.block.renderable);
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
/* harmony import */ var _entity_blocks_Grass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/entity/blocks/Grass.ts");

class BoardCell {
    constructor(col, row, block, board) {
        Object.defineProperty(this, "board", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
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
        Object.defineProperty(this, "_block", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.board = board;
        this.col = col;
        this.row = row;
        this._block = block;
    }
    get neighbors() {
        return [
            this.board.getCellAt(this.col - 0, this.row - 1),
            // this.board.getCellAt(this.col - 1, this.row - 1),
            this.board.getCellAt(this.col - 1, this.row - 0),
            // this.board.getCellAt(this.col - 1, this.row + 1),
            this.board.getCellAt(this.col - 0, this.row + 1),
            // this.board.getCellAt(this.col + 1, this.row + 1),
            this.board.getCellAt(this.col + 1, this.row - 0),
            // this.board.getCellAt(this.col + 1, this.row - 1),
        ].filter(cell => !!cell);
    }
    get renderable() {
        return this._block.renderable;
    }
    get bbox() {
        return this._block.bbox;
    }
    get hash() {
        return this.col + '#' + this.row;
    }
    get isWall() {
        return this._block.isWall;
    }
    get isDestroyable() {
        return this._block.isDestroyable;
    }
    get block() {
        return this._block;
    }
    set block(value) {
        if (value === this._block) {
            return;
        }
        if (this._block) {
            this._block.renderable.destroy();
        }
        if (!value) {
            value = new _entity_blocks_Grass__WEBPACK_IMPORTED_MODULE_0__["default"](this.board.context);
        }
        value.renderable.x = this.col * this.board.cellSize;
        value.renderable.y = this.row * this.board.cellSize;
        value.renderable.width = this.board.cellSize;
        value.renderable.height = this.board.cellSize;
        this._block = value;
        this.board.context.addObject(this._block);
    }
    setAsDefault() {
        this.block = null;
    }
    alignObject(object) {
        const cellSize = this.board.cellSize;
        const x0 = this.col * cellSize;
        const y0 = this.row * cellSize;
        const w = object.width;
        const h = object.height;
        object.x = x0 + (cellSize - w) / 2;
        object.y = y0 + (cellSize - h) / 2;
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
                console.log(f1, f2);
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
/* harmony export */   "Path": () => (/* binding */ Path),
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
                return new Path(backtrace.map(node => node.cell));
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
class Path {
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
        const r1x1 = this.p1.x;
        const r1x2 = this.p2.x;
        const r2x1 = bbox.p1.x;
        const r2x2 = bbox.p2.x;
        if (r2x1 >= r1x2 || r1x1 >= r2x2) {
            return 0;
        }
        else {
            if (r2x1 > r1x2) {
                return r2x1 - r1x2;
            }
            else {
                return r1x1 - r2x2;
            }
        }
    }
    intersectionFactorY(bbox) {
        const r1y1 = this.p1.y;
        const r1y2 = this.p2.y;
        const r2y1 = bbox.p1.y;
        const r2y2 = bbox.p2.y;
        if (r2y1 >= r1y2 || r1y1 >= r2y2) {
            return 0;
        }
        else {
            if (r2y1 > r1y2) {
                return r2y1 - r1y2;
            }
            else {
                return r1y1 - r2y2;
            }
        }
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

/***/ "./src/game/entity/Entity.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Entity)
/* harmony export */ });
/* harmony import */ var _collision_BoundingBox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/collision/BoundingBox.ts");

class Entity {
    constructor(context) {
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.context = context;
    }
    get bbox() {
        const { x, y, width, height } = this.renderable;
        return _collision_BoundingBox__WEBPACK_IMPORTED_MODULE_0__["default"].fromDims(x, y, width, height);
    }
}


/***/ }),

/***/ "./src/game/entity/actors/Actor.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Actor)
/* harmony export */ });
/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/entity/Entity.ts");

class Actor extends _Entity__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        // TODO eventy:
        super(...arguments);
        Object.defineProperty(this, "prevCell", {
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
        Object.defineProperty(this, "_health", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 100
        });
    }
    get speed() {
        return this._speed;
    }
    set speed(value) {
        this._speed = value;
    }
    get nearestCell() {
        const board = this.context.board;
        const cellSize = board.cellSize;
        const { cx, cy } = this.bbox; //TODO jak to ogarnac zeby dzialalo poruszanie
        return board.getCellAt(Math.floor(cx / cellSize), Math.floor(cy / cellSize));
    }
    setPosition(arg1, arg2) {
        let cell;
        if (typeof arg1 === 'number') {
            cell = this.context.board.getCellAt(arg1, arg2);
        }
        else {
            cell = arg1;
        }
        if (!cell.isWall) {
            cell.alignObject(this.renderable);
        }
    }
    move(dx, dy) {
        const board = this.context.board;
        const bbox = this.bbox;
        let newX = this.renderable.x;
        let newY = this.renderable.y;
        if (this.nearestCell != this.prevCell) {
            console.log(this.nearestCell);
            this.prevCell = this.nearestCell;
        }
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
        this.renderable.x = newX;
        this.renderable.y = newY;
    }
}


/***/ }),

/***/ "./src/game/entity/actors/Player.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/Resources.ts");
/* harmony import */ var _Actor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/entity/actors/Actor.ts");



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
        this._sprite.width = this.context.cellSize;
        this._sprite.height = this.context.cellSize;
    }
    get speed() {
        return 4;
    }
    get renderable() {
        return this._sprite;
    }
}


/***/ }),

/***/ "./src/game/entity/actors/enemies/BatEnemy.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BatEnemy)
/* harmony export */ });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _Resources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/Resources.ts");
/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/entity/actors/enemies/Enemy.ts");



class BatEnemy extends _Enemy__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor(context) {
        super(context);
        Object.defineProperty(this, "_sprite", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._sprite = pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite.from(_Resources__WEBPACK_IMPORTED_MODULE_1__["default"].WOOD_TEXTURE);
        this._sprite.width = this.context.cellSize;
        this._sprite.height = this.context.cellSize;
    }
    get renderable() {
        return this._sprite;
    }
}


/***/ }),

/***/ "./src/game/entity/actors/enemies/Enemy.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Enemy)
/* harmony export */ });
/* harmony import */ var _Actor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/entity/actors/Actor.ts");
/* harmony import */ var _Movement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/entity/actors/enemies/Movement.ts");


class Enemy extends _Actor__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
            //TODO gładka zmiana ruchów
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

/***/ "./src/game/entity/actors/enemies/Movement.ts":
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
            dx = dt * this.actor.speed * cosa;
            dy = dt * this.actor.speed * sina;
            if (Math.abs(dx) > Math.abs(x1 - cx)) {
                dx = Math.abs(x1 - cx) * dirx;
            }
            if (Math.abs(dy) > Math.abs(y1 - cy)) {
                dy = Math.abs(y1 - cy) * diry;
            }
            if (Math.abs(dx) <= Movement.epsilon) {
                dx = 0;
            }
            if (Math.abs(dy) <= Movement.epsilon) {
                dy = 0;
            }
            if (dx == 0 && dy == 0) {
                this.actor.nearestCell.alignObject(this.actor.renderable);
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
            cosa: Math.round(Math.cos(a)),
            sina: Math.round(Math.sin(a)),
            dirx: Math.sign(dx),
            diry: Math.sign(dy)
        };
    }
}
Object.defineProperty(Movement, "epsilon", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 0.001
});


/***/ }),

/***/ "./src/game/entity/blocks/Block.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Block)
/* harmony export */ });
/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/entity/Entity.ts");

class Block extends _Entity__WEBPACK_IMPORTED_MODULE_0__["default"] {
}


/***/ }),

/***/ "./src/game/entity/blocks/BlockFactory.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ BlockFactory)
/* harmony export */ });
/* harmony import */ var _Bricks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/entity/blocks/Bricks.ts");
/* harmony import */ var _Grass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/game/entity/blocks/Grass.ts");
/* harmony import */ var _Wall__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/entity/blocks/Wall.ts");



class BlockFactory {
    static getBlock(type, context) {
        switch (type) {
            case 'grass': return new _Grass__WEBPACK_IMPORTED_MODULE_1__["default"](context);
            case 'wall': return new _Wall__WEBPACK_IMPORTED_MODULE_2__["default"](context);
            case 'bricks': return new _Bricks__WEBPACK_IMPORTED_MODULE_0__["default"](context);
        }
    }
}


/***/ }),

/***/ "./src/game/entity/blocks/Bricks.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Bricks)
/* harmony export */ });
/* harmony import */ var _game_Resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/Resources.ts");
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/entity/blocks/Block.ts");



class Bricks extends _Block__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "sprite", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite.from(_game_Resources__WEBPACK_IMPORTED_MODULE_0__["default"].BRICK_TEXTURE)
        });
    }
    get isWall() {
        return true;
    }
    get isDestroyable() {
        return true;
    }
    get renderable() {
        return this.sprite;
    }
}


/***/ }),

/***/ "./src/game/entity/blocks/Grass.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Grass)
/* harmony export */ });
/* harmony import */ var _game_Resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/Resources.ts");
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/entity/blocks/Block.ts");



class Grass extends _Block__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "sprite", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite.from(_game_Resources__WEBPACK_IMPORTED_MODULE_0__["default"].GRASS_TEXTURE)
        });
    }
    get isWall() {
        return false;
    }
    get isDestroyable() {
        return false;
    }
    get renderable() {
        return this.sprite;
    }
}


/***/ }),

/***/ "./src/game/entity/blocks/Wall.ts":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Wall)
/* harmony export */ });
/* harmony import */ var _game_Resources__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/Resources.ts");
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/pixi.js/dist/esm/pixi.js");
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/game/entity/blocks/Block.ts");



class Wall extends _Block__WEBPACK_IMPORTED_MODULE_2__["default"] {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "sprite", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: pixi_js__WEBPACK_IMPORTED_MODULE_1__.Sprite.from(_game_Resources__WEBPACK_IMPORTED_MODULE_0__["default"].WALL_TEXTURE)
        });
    }
    get isWall() {
        return true;
    }
    get isDestroyable() {
        return false;
    }
    get renderable() {
        return this.sprite;
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
/* harmony import */ var _entity_blocks_BlockFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/game/entity/blocks/BlockFactory.ts");

class LevelLoader {
    static load(level, context) {
        const board = context.board;
        const blocksMap = new Map();
        level.blocks.forEach(b => {
            const block = this.parseBlock(b);
            for (let col = block.x0; col <= block.x1; col++) {
                for (let row = block.y0; row <= block.y1; row++) {
                    const key = col + '#' + row;
                    blocksMap.set(key, block.type);
                }
            }
        });
        [...blocksMap.entries()].forEach(([key, type]) => {
            const keySplit = key.split('#');
            const col = +keySplit[0];
            const row = +keySplit[1];
            const blockType = _entity_blocks_BlockFactory__WEBPACK_IMPORTED_MODULE_0__["default"].getBlock(type, context);
            board.addCell(col, row, blockType);
        });
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

module.exports = JSON.parse('{"blocks":[{"coords":"1,1:15,15","type":"wall"},{"coords":"2,2:14,14","type":"grass"},{"coords":"3,4:13,4","type":"wall"},{"coords":"3,12:13,12","type":"wall"},{"coords":"4,3:4,13","type":"wall"},{"coords":"12,3:12,13","type":"wall"},{"coords":"7,4:9,4","type":"grass"},{"coords":"4,7:4,9","type":"grass"},{"coords":"7,12:9,12","type":"grass"},{"coords":"12,7:12,9","type":"grass"},{"coords":"2,8","type":"wall"},{"coords":"8,2","type":"wall"},{"coords":"14,8","type":"wall"},{"coords":"8,14","type":"wall"},{"coords":"6,6:10,10","type":"wall"},{"coords":"6,8:10,8","type":"bricks"},{"coords":"8,6:8,10","type":"bricks"},{"coords":"6,6","type":"grass"},{"coords":"10,10","type":"grass"},{"coords":"6,10","type":"grass"},{"coords":"10,6","type":"grass"}]}');

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