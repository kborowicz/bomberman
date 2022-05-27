import { Spritesheet, Texture } from 'pixi.js';
import explosionAtlasData from './assets/explosion/explosion.json';
import explosionAtlas from './assets/explosion/explosion.png';
import grassImg from './assets/grass.png';
import wallImg from './assets/wall.png';
import woodImg from './assets/player.png';
import { loadSpritesheet, loadTexture } from './loader/AssetsLoader';

export default class Resources {

    public static GRASS_TEXTURE: Texture;
    public static WALL_TEXTURE: Texture;
    public static WOOD_TEXTURE: Texture;
    public static EXPLOSION_SPRITESHEET: Spritesheet;

    public static async initialize() {
        this.GRASS_TEXTURE = loadTexture(grassImg);
        this.WALL_TEXTURE = loadTexture(wallImg);
        this.WOOD_TEXTURE = loadTexture(woodImg);
        this.EXPLOSION_SPRITESHEET = await loadSpritesheet(explosionAtlas, explosionAtlasData);
    }

}