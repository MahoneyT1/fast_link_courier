// data for small card statistics UI

export interface SmallCard {
    icon: string,
    title: string,
    body: string,
    currency?: string,
    character?: string 
};

export const smallData: SmallCard[] = [
    {
        icon: "fa-solid fa-users text-3xl bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text",
        title: "50 text-primary",
        body: "Happy Customers",
        character: "K+"
    },

    {
        icon: "fa-solid fa-cube text-3xl bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text",
        title: "1",
        body: "Deliveries Made",
        character: "M+"
    },

    {
        icon: "fa-solid fa-medal text-3xl bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text",
        title: "99",
        body: "Success  Rate",
        character: "%"
    },

    {
        icon: "fa-solid fa-clock text-3xl bg-gradient-to-b from-primary to-green-500 text-transparent bg-clip-text ",
        title: "24/7",
        body: "Support",
        character: "/7"
    },
];
