import React from "react";
import styles from './axis.less';
import Slider from '@material-ui/core/Slider';


export default function Axis({allHops, setHop, selectedHopIndex}) {
    function getHopName(value) {
        return allHops[value].title;
    }

    function setSelected(ev, value) {
        setHop(allHops[value]);
    }
    return <div className={styles.axis}>
        <div style={{width: '600px'}}>
            <Slider
                defaultValue={selectedHopIndex}
                getAriaValueText={getHopName}
                step={1}
                marks
                min={1}
                max={30}
                valueLabelDisplay="auto"
                track={false}
                onChangeCommitted={setSelected}
            />
        </div>
    </div>
}
