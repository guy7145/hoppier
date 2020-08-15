import React from "react";
import {Hop} from "@shared/types/hop";
import Description from "./Description/Description";
import styles from './hop-info.less';
import Country from "./Country/Country";
import ListProperty from "./ListProperty/ListProperty";
import HopLink from "../../../../HopLink/HopLink";

export default function HopInfo({hop, setHop, addHop}: {hop: Hop, setHop: (Hop) => void, addHop: (Hop) => void}) {
    return <div className={styles.hopInfo}>
        <Country hop={hop}/>
        <ListProperty
            name={'substitutes'}
            values={hop.substitutes.filter(x => x).map(v => <HopLink
                hop={v}
                onChoose={() => setHop(v)}
                onAdd={() => addHop(v)}
            />)}
        />
        <ListProperty name={'styles'} values={hop.styles.map(v => <div>{v}</div>)}/>
        <Description hop={hop}/>
    </div>;
}
