declare module '*.less' {
    const classes: {
        [className: string]: string;
    };
    export default classes;
}

declare module '*.module.less' {
    const classes: { [className: string]: string };
    export default classes;
}

declare module '*.css' {
    const classes: {
        [className: string]: string;
    };
    export default classes;
}

declare module '*.module.css' {
    const classes: {
        [className: string]: string;
    };
    export default classes;
}
