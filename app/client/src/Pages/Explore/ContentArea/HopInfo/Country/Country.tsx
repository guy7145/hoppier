import React from "react";
import {Hop} from "@shared/types/hop";

export default function Country({hop}: {hop: Hop}) {
    return <div>country: {hop.country}</div>
}
