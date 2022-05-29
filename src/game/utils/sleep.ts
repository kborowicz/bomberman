const sleep = async (millis: number) => {
    return await new Promise<void>((resolve) => {
        setTimeout(() => resolve(), millis);
    });
};

export default sleep;