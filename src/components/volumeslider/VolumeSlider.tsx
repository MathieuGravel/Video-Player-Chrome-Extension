import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@mui/material/Slider";

import { RootState } from "../../recucers/rootReducer";
import { setVolume } from "../../actions/videoPlayerActions";


export const VolumeSlider: React.FC = () => {
    const STEP = 100;

    const volume = useSelector<RootState, number>(reduxState => reduxState.videoPlayer.volume);
    const dispatch = useDispatch();

    return <div className="volume-slider-component">
        <Slider
            aria-label="Volume"
            value={volume * STEP}
            min={0}
            max={STEP}
            onChange={e => {
                const target = (e.target as HTMLInputElement);
                if (target) {
                    dispatch(setVolume(parseInt(target.value) / STEP));
                }
            }}
            valueLabelFormat={Math.floor(volume * STEP).toString()}
            valueLabelDisplay="auto"
            sx={{
                color: "var(--primary-font-color)",
                zIndex: 500,
                "& .MuiSlider-track": {
                    border: "none",
                    height: "2px"
                },
                "& .MuiSlider-rail": {
                    height: "2px"
                },
                "& .MuiSlider-thumb": {
                    width: "10px",
                    height: "10px",
                    backgroundColor: "var(--primary-font-color)",
                    "&:hover, &.Mui-focusVisible, &.Mui-active": {
                        boxShadow: "none"
                    }
                },
                "& .MuiSlider-valueLabel": {
                    backgroundColor: "var(--bg-color)"
                }
            }}
        />
    </div>;
};