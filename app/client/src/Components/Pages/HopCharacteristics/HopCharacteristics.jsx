import React, {useState} from "react";
import HopContentArea from "./ContentArea/HopContentArea";
import Axis from "./Axis/Axis";
import styles from './style.css';

const cascade = {"title": "Cascade (Australia)", "description": "Differing from other Cascades in its oil balance, Australian Cascade is predominantly produced in Tasmania. Descended from Fuggle, Serebrianka and wild Native American hops, when grown in Australia, it features all the characteristic citrusy, spicy, floral notes of American Cascade but with an additional delicate essence of grapefruit.A versatile hop, it can be used in any ale and is used in many Australian lagers. Cascades are extremely popular throughout the world and most widely used in American Pale Ales.", "also known as": "", "characteristics": "same as cascade (us) but with notes of grapefruit", "purpose": "aroma", "alpha acid": [5.0, 7.0], "beta acid": [5.0, 7.0], "co-humulone": [33.0, 40.0], "country": "australia", "cone size": "", "cone density": "", "seasonal maturity": "", "yield amount": "", "growth rate": "", "resistant to": "", "susceptible to": "", "storability": "", "ease of harvest": "", "total oil": [0.8, 1.3], "myrcene oil": [40.0, 60.0], "humulene oil": [40.0, 60.0], "caryophyllene oil": [3.0, 9.0], "farnesene oil": [5.0, 9.0], "substitutes": "hallertau, east kent golding", "style guide": "barley wine, american pale ale, australian lager"};
const amarillo = {"title": "Amarillo\u2122 VGXP01", "description": "Amarillo VGXP01 hops are used worldwide where its ultra-high myrcene content creates a delicious orange citrus flavor. A varietal of Virgil Gamache Farms, Inc. Amarillo VGXP01 is highly acidic, making it a perfect choice for for ESBs and Pale Ales.", "also known as": "", "characteristics": "orange citrus flavor", "purpose": "aroma", "alpha acid": [8.0, 11.0], "beta acid": [6.0, 7.0], "co-humulone": [21.0, 24.0], "country": "us", "cone size": "small", "cone density": "compact", "seasonal maturity": "mid", "yield amount": "1200-1600 kghectare (1075-1420 lbsacre)", "growth rate": "moderate to high", "resistant to": "", "susceptible to": "", "storability": "retains 96% alpha acid after 6 months storage at 20c (68f)", "ease of harvest": "moderate", "total oil": [1.5, 1.9], "myrcene oil": [68.0, 70.0], "humulene oil": [9.0, 11.0], "caryophyllene oil": [2.0, 4.0], "farnesene oil": [2.0, 4.0], "substitutes": "cascade (us), centennial, ahtanum, chinook, summer", "style guide": "american pale ale, india pale ale, american wheat, bitter, wheat beer, red ale, esb"};

export default function HopCharacteristics() {
    const [hop, setHop] = useState(amarillo);
    return <div className={styles.hopCharacteristics}>
        <div className={styles.contentArea}>
            <HopContentArea hop={hop}>change hop</HopContentArea>
        </div>
        <div className={styles.axisArea}>
            <Axis setHop={setHop} allHops={[amarillo, cascade]}/>
        </div>
    </div>;
}
