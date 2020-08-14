import React from "react";
import {Hop} from "@shared/KnowledgeBase/types";

export default function Country({hop}: {hop: Hop}) {
    return <div>country: {hop.country}</div>
}
