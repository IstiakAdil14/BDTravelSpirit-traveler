interface ValueItem {
  icon: string;
  title: string;
  text: string;
}

const values: ValueItem[] = [
  { icon: "⭐", title: "Customer comes first", text: "Travel changes lives." },
  { icon: "🧠", title: "Growth mindset", text: "Challenges are learning opportunities." },
  { icon: "🔍", title: "Transparency", text: "We grow together openly." },
  { icon: "🌍", title: "Keep traveling", text: "Adventure builds a better world." },
  { icon: "🚀", title: "#LDTS", text: "Let’s Do This Shit." },
];

export default function Values() {
  return (
    <section className="max-w-[1100px] mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold mb-6">Our Values</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((v, i) => (
          <div
            key={i}
            className="border rounded-2xl p-6 bg-white hover:-translate-y-1 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-3 text-teal-600">{v.icon}</div>
            <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
            <p className="text-sm text-gray-600">{v.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
