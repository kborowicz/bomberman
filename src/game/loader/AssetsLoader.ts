import { ISpritesheetData, SCALE_MODES, Spritesheet, Texture } from 'pixi.js';

export const loadTexture = (url: string) => {
    return Texture.from(url, {
        scaleMode: SCALE_MODES.NEAREST
    });
};

export const loadSpritesheet = async (atlasFilepath: string, sheetData: ISpritesheetData) => {
    const sheet = new Spritesheet(Texture.from(atlasFilepath, {
        scaleMode: SCALE_MODES.NEAREST
    }), sheetData);

    return await new Promise<Spritesheet>(resolve => {
        sheet.parse(() => resolve(sheet));
    });
};