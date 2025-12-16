interface ServiceCardProps {
    icon: string,
    title: string,
    body: string
};

export const serviceCardData: ServiceCardProps[] = [
    {
        icon: "fa-solid fa-plane-departure text-blue-200 rounded-full text-3xl w-16",
        title: "Air Freight ",
        body: "Rapid delivery for urgent cargo with real-time tracking and secure handling. We deliver anywhere, fast."
    },

    {
        icon: "fa-solid fa-ship bg-blue-700/30 text-blue-200 rounded-full text-3xl w-16",
        title: "Sea Freight",
        body: "Cost-effective shipping for large consignments, handled with care across the world's busiest sea routes."
    },

    {
        icon: "fa-solid fa-truck-front bg-blue-700/30 text-blue-200 rounded-full text-3xl w-16",
        title: "Ground Delivery",
        body: "Last-mile solutions with reliable networks—door-to-door, on time, every time."
    }
]