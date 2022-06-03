import { Spritesheet, Texture } from 'pixi.js';

import explosionAtlasData from './assets/explosion/explosion.json';
import explosionAtlas from './assets/explosion/explosion.png';

import character1AtlasData from './assets/character/1/1.json';
import character1Atlas from './assets/character/1/1.png';

import character2AtlasData from './assets/character/2/2.json';
import character2Atlas from './assets/character/2/2.png';

import character3AtlasData from './assets/character/3/3.json';
import character3Atlas from './assets/character/3/3.png';

import grassImg from './assets/grass.png';
import wallImg from './assets/wall.png';
import woodImg from './assets/player.png';
import stoneImg from './assets/stone.png';
import brickImg from './assets/bricks.png';
import dynamiteImg from './assets/dynamite.png';
import timebombImg from './assets/timebomb.png';
import bombImg from './assets/bomb.png';
import tombstoneImg from './assets/tombstone.png';
import { loadSpritesheet, loadTexture } from './loader/AssetsLoader';

export default class Resources {

    public static GRASS_TEXTURE: Texture;
    public static WALL_TEXTURE: Texture;
    public static WOOD_TEXTURE: Texture;
    public static STONE_TEXTURE: Texture;
    public static BRICK_TEXTURE: Texture;
    public static DYNAMITE_TEXTURE: Texture;
    public static TIMEBOMB_TEXTURE: Texture;
    public static BOMB_TEXTURE: Texture;
    public static TOMBSTONE_TEXTURE: Texture;

    public static EXPLOSION_SPRITESHEET: Spritesheet;
    public static CHARACTER_1: Spritesheet;
    public static CHARACTER_2: Spritesheet;
    public static CHARACTER_3: Spritesheet;

    public static async initialize() {
        this.GRASS_TEXTURE = loadTexture(grassImg);
        this.WALL_TEXTURE = loadTexture(wallImg);
        this.WOOD_TEXTURE = loadTexture(woodImg);
        this.STONE_TEXTURE = loadTexture(stoneImg);
        this.BRICK_TEXTURE = loadTexture(brickImg);
        this.DYNAMITE_TEXTURE = loadTexture(dynamiteImg);
        this.TIMEBOMB_TEXTURE = loadTexture(timebombImg);
        this.BOMB_TEXTURE = loadTexture(bombImg);
        this.TOMBSTONE_TEXTURE = loadTexture(tombstoneImg);

        this.EXPLOSION_SPRITESHEET = await loadSpritesheet(explosionAtlas, explosionAtlasData);
        this.CHARACTER_1 = await loadSpritesheet(character1Atlas, character1AtlasData);
        this.CHARACTER_2 = await loadSpritesheet(character2Atlas, character2AtlasData);
        this.CHARACTER_3 = await loadSpritesheet(character3Atlas, character3AtlasData);
    }

}