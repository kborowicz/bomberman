export default class BresenhamCircle {

    public static getOutline(cx: number, cy: number, r: number) {
        let x = 0;
        let y = r;
        let d = 3 - 2 * r;

        const points: [number, number][] = [];

        while (x <= y) {
            if (d < 0) {
                d += 4 * x + 2;
            } else {
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