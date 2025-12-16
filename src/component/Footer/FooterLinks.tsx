/**
 * Footer links data
 */

interface QuickLink {
    name: string,
    url: string
};

interface Socials {
    name: string,
    url: string,
    icon: string
};

export const quickLinksData:QuickLink[] = [
    {
        name: "Home",
        url: "/",
    },

    {
        name: "About",
        url: "/about",
    },

    {
        name: "Track",
        url: "/track",
    },

    {
        name: "Services",
        url: "/service",
    },
];

export const socialsData: Socials[] = [
    {
        name: "Facebook",
        url: "facebook.com/",
        icon: "fa-brands fa-square-facebook"
    },

    {
        name: "X",
        url: "x.com/",
        icon: "fa-brands fa-square-twitter"
    },

    {
        name: "Instagram",
        url: "fa-brands fa-instagram",
        icon: "fa-brands fa-linkedin"
    }
];
