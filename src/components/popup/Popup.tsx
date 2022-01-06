import React from "react";

import "./popup.scss";


export type PopupProps = {
    closed: boolean
}

export const Popup: React.FC<PopupProps> = ({ closed, children }) => {
    return <div className={`popup-component ${closed ? "closed" : ""}`}>
        {children}
    </div>;
};