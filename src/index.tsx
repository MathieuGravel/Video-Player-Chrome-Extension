import ReactDom from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import favicon from "./favicon.png";
import "./styles.scss";

import { App } from "./App.ts";
import ShortcutHandler from "./shortcuts/ShortcutHandler";
import { shortcuts } from "./shortcuts/shortcuts";
import rootReducer from "./recucers/rootReducer";


export function main() {
    document.body.innerHTML = `<div id="react-root"></div>`;

    const faviconLink = document.createElement("link");
    faviconLink.rel = "icon";
    faviconLink.type = "image/png";
    faviconLink.href = favicon;
    setTimeout(() => document.head.append(faviconLink), 500);

    const rootStore = createStore(rootReducer);

    const shortcutHandler = new ShortcutHandler();
    for (const shortcut of shortcuts) {
        shortcutHandler.addShortcut(shortcut.shortcutString, () => shortcut.action(rootStore));
    }

    ReactDom.render(<Provider store={rootStore}>
        <App/>
    </Provider>, document.getElementById("react-root"));
}