import React from "react";

import CloseIcon from "../../../images/close.svg";
import "./popup-window.scss";


type PopupWindowProps = {
    visible: boolean
    onCloseWindow: () => void
}

export const PopupWindow: React.FC<PopupWindowProps> = ({ visible, onCloseWindow, children }) => {

    return <div className={`popup-window-component ${visible ? "visible" : ""}`}
                onClick={e => {
                    onCloseWindow();
                    e.stopPropagation();
                }}>
        <div className="popup" onClick={e => e.stopPropagation()}>
            <button className="close-button"
                    onClick={e => {
                        onCloseWindow();
                        e.stopPropagation();
                    }}>
                <CloseIcon/>
            </button>
            <div className="content">
                {children}
            </div>
        </div>
    </div>;
};