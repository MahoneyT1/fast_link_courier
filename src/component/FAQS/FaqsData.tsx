
interface FaqsType {
    question: string,
    answer: String
};

export const data: FaqsType[]= [
    {
        question: "How does it work?",
        answer: "Click on the create shipment button and fill out the form with the delivery details."
      },
      {
        question: "How fast does it deliver?",
        answer: "Delivery times vary by destination but usually take between 1-3 business days."
      },
      {
        question: "Can I track my shipment?",
        answer: "Yes, once your shipment is created, you will receive a tracking ID to monitor its progress."
      },
      {
        question: "What items are restricted?",
        answer: "Items like flammable liquids, weapons, and perishable goods are not allowed."
      },
      {
        question: "Do you offer international shipping?",
        answer: "Yes, we ship to over 150 countries worldwide. Shipping times may vary."
      },
      {
        question: "What if my package is lost or damaged?",
        answer: "We offer insurance and a refund policy. Please contact support for assistance."
      },
      {
        question: "How do I cancel a shipment?",
        answer: "You can cancel a shipment from your dashboard within 30 minutes of creation."
      },
      {
        question: "Do you provide packaging materials?",
        answer: "Yes, you can request packaging supplies during the shipment creation process."
      }
];