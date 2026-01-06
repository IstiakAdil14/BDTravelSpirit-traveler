const cards = [
  {
    icon: "📅",
    title: "Questions about existing booking or inquiry?",
    text:
      "We recommend using the booking conversation page to contact the operator directly.",
    link: "Check my bookings",
  },
  {
    icon: "💬",
    title: "Let's chat",
    text:
      "Chat with our virtual assistant Scout, or get connected with a human. Available 24/7.",
    link: "Start chat",
  },
  {
    icon: "❓",
    title: "Help Center",
    text:
      "Find answers to frequently asked questions for travelers, operators, and partners.",
    link: "See all questions",
  },
];

export default function ContactCards() {
  return (
    <section className="max-w-[1100px] mx-auto mt-10 px-4 space-y-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="border rounded-2xl p-6 bg-white"
        >
          <div className="text-3xl mb-2">{card.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{card.text}</p>
          <a href="#" className="text-teal-600 font-semibold">
            {card.link}
          </a>
        </div>
      ))}
    </section>
  );
}
