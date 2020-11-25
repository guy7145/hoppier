import React from "react";
import {Hop} from "@shared/types/hop";
import {ResponsivePie} from "@nivo/pie";
import {hopValues} from "./utils";
import {hopCompounds} from "../../../../shared/src/KnowledgeBase/HopComposition";
import _ from 'lodash/array';

import styles from './chart.less';


function getColor(color, colorful) {
    if (!colorful) {
        return {colors: styles.textColorDisabled};
    } else if (color) {
        return {colors: color};
    }
    return {};
}


export default function Pie({hop, color=null, colorful=true}: {hop: Hop, color?: string | null, colorful?: boolean}) {
    const data = _.zipWith(hopCompounds, hopValues(hop, hopCompounds)).map(([comp, val]) => ({
        id: comp,
        value: val,
    }));
    return <ResponsivePie
        data={data}
        enableRadialLabels={false}
        enableSliceLabels={false}
        borderWidth={0}
        innerRadius={0.7}
        padAngle={5}
        cornerRadius={5}
        sortByValue={false}
        isInteractive={false}
        {...getColor(color, colorful)}
    />;
}
