const faqs = [
  {
    q: "How to ask for more tour details?",
    a: "Use the Contact Operator button on the tour detail page.",
  },
  {
    q: "How to book?",
    a: "Select a tour, choose a date, click Book Now, and complete payment.",
  },
  {
    q: "How to modify your existing booking?",
    a: "Go to Tours in your account and open the booking conversation.",
  },
  {
    q: "How to cancel?",
    a: "Open your booking conversation and choose cancel or modify.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-gray-100 mt-14 py-10 px-4">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-3xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="bg-white border rounded-2xl p-6 mb-4"
          >
            <h4 className="font-semibold mb-2">{faq.q}</h4>
            <p className="text-sm text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
