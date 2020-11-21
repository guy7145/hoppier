export function lessTimeToMilliseconds(lessTime: string) {
    if (lessTime.endsWith('ms')) {
        return Number(lessTime.slice(0, lessTime.length - 2));          // milliseconds
    }
    else {
        return Number(lessTime.slice(0, lessTime.length - 1)) * 1000;   // seconds
    }
}
