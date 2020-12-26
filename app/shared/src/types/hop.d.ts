export type BeerStyle = string;

export interface HopData {
    totalOil: Number,
    myrceneOil: Number,
    coHumuloneOil: Number,
    humuleneOil: Number,
    caryophylleneOil: Number,
    farneseneOil: Number,
    alphaAcid: Number,
    betaAcid: Number,
}

export interface Hop extends HopData {
    normalized: HopData,
    title: string,
    description: string,
    country: string,
    substitutes: Array<Hop>,
    styles: Array<BeerStyle>,
}

export type HopJson = {
    substitutes: Array<string>
} & Hop;
