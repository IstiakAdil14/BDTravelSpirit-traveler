const items: string[] = ["What We Do", "Why Choose Us", "Our Vision"];

export default function Extra() {
  return (
    <section className="bg-gray-100 mt-14 py-10 px-4">
      <div className="max-w-[1100px] mx-auto grid gap-6 md:grid-cols-3">
        {items.map((title) => (
          <div key={title} className="bg-white p-6 rounded-2xl border">
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-gray-600">
              High-quality curated adventure experiences worldwide.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
