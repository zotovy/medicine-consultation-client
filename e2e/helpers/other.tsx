import { ClientFunction } from "testcafe";


export const getUrl = async (): Promise<string> => {
    return await ClientFunction(() => window.location.href)();
}

export const getScreenshot = async (page: string, browser: TestController): Promise<void> => {
    // Phones
    await browser.resizeWindow(375, 812).takeScreenshot(`${page}-mobile.png`);

    // Tablets
    await browser.resizeWindow(768, 1024).takeScreenshot(`${page}-tablets.png`);

    // Small screens
    await browser.resizeWindow(1280, 720).takeScreenshot(`${page}-small.png`);

    // Medium screens
    await browser.resizeWindow(1336, 768).takeScreenshot(`${page}-medium.png`);

    // Big screens
    await browser.resizeWindow(1920, 1080).takeScreenshot(`${page}-big.png`);

    // Large screens
    await browser.resizeWindow(2560, 1440).takeScreenshot(`${page}-large.png`);

    // 21:9 4к
    await browser.resizeWindow(3440, 1440).takeScreenshot(`${page}-large.png`);
}