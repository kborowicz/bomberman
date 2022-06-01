async function sleep(millis: number): Promise<void>;
async function sleep(fromMillis: number, toMillis: number): Promise<void>;
async function sleep(arg1: number, arg2?: number): Promise<void> {
    let sleepTime: number;

    if (arg2) {
        sleepTime = Math.random() * (arg2 - arg1) + arg1;
    } else {
        sleepTime = arg1;
    }

    return await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), sleepTime);
    });
}

export default sleep;