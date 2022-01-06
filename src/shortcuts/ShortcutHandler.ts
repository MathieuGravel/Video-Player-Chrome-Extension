export default class ShortcutHandler {

    private readonly shortcuts: { [key: string]: Function };

    constructor() {
        this.shortcuts = {};
        const event = (e: KeyboardEvent) => this.onKeyCallback(e);
        document.addEventListener("keyup", event);
        document.addEventListener("keydown", event);
    }

    addShortcut(shortcutString: string, action: Function) {
        shortcutString = shortcutString
            .replace(/ /g, "")
            .toLocaleLowerCase();
        this.shortcuts[shortcutString] = action;
    }

    private onKeyCallback(event: KeyboardEvent) {
        const { code, ctrlKey, shiftKey, altKey, repeat, type } = event;
        const shortcutString = ShortcutHandler.createShortcutString(code, ctrlKey, shiftKey, altKey, type, repeat);
        const action = this.shortcuts[shortcutString];
        if (action) {
            event.preventDefault();
            action();
        }
        event.stopPropagation();
    }

    private static createShortcutString(key: string,
        hasCtrlKey: boolean,
        hasShiftKey: boolean,
        hasAltKey: boolean,
        type: string,
        repeat: boolean) {
        if (key.startsWith("Key")) {
            key = key.substring(3);
        }
        const ctrl = hasCtrlKey ? "ctrl+" : "";
        const shift = hasShiftKey ? "shift+" : "";
        const alt = hasAltKey ? "alt+" : "";
        const r = repeat ? "-r" : "";
        return `${ctrl}${shift}${alt}${key.toLocaleLowerCase()}+${type.toLocaleLowerCase()}${r}`;
    }
}