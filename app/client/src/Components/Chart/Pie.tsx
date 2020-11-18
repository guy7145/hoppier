import React from "react";
import {Hop} from "@shared/types/hop";
import {ResponsivePie} from "@nivo/pie";
import {hopValues} from "./utils";
import {hopCompounds} from "../../../../shared/src/KnowledgeBase/HopComposition";
import _ from 'lodash';

import styles from './chart.less';
const GREY_COLOR = {colors: styles.textColorDisabled};


export default function Pie({hop, colorful=true}: {hop: Hop, colorful?: boolean}) {
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
        {...(colorful ? {} : GREY_COLOR)}
    />;
}
