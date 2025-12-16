/**
 * data for our mission
 */

import { Target, Package } from "lucide-react";
import React from "react";


// create type for missionData props
interface MissionType {
    icon: any,
    title: string,
    body: string
};

export const missionData: MissionType[] = [
    {
        icon: "fa-solid fa-bullseye bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text",
        title: "Our Mission",
        body: "To provide exceptional courier services that\
                connect communities, empower businesses, and deliver\
                peace of mind through reliability and innovation.",
    },

    {
        icon: "fa-solid fa-cube bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text",
        title: "Our Vision",
        body: "To become the most trusted name in courier services, \
                setting new standards for reliability, transparency,\
                and customer satisfaction."
    }
];
