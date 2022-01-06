import React from "react";

import "./setting.scss";

import { Shortcut, shortcuts } from "../../shortcuts/shortcuts";


export const Setting: React.FC = () => {
    return <div className="setting-component">
        <section className="shortcut-section">
            <h1>Shortcuts</h1>
            <div className="shortcut-list">
                {shortcuts.map(createShortcutElement)}
            </div>
        </section>
    </div>;
};

function createShortcutElement(shortcut: Shortcut, index: number): JSX.Element {
    const { description, shortcutString } = shortcut;
    return <div key={index} className="shortcut-list__element">
        <p className="shortcut-description">{description}</p>
        <span className="shortcut-string">{shortcutString}</span>
    </div>;
}