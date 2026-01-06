interface ListBlock {
  title: string;
  items: string[];
}

const lists: ListBlock[] = [
  {
    title: "Top Destinations",
    items: [
      "Africa","Asia","Australia","Europe","Japan","Thailand","India"
    ],
  },
  {
    title: "Top Operators",
    items: ["Contiki","Intrepid","G Adventures","Topdeck"],
  },
  {
    title: "Top Adventure Styles",
    items: ["Hiking","Safari","Cultural","Rail","Cruise"],
  },
];

export default function Lists() {
  return (
    <section className="max-w-[1100px] mx-auto mt-14 px-4">
      <div className="grid gap-6 md:grid-cols-3">
        {lists.map((list) => (
          <div
            key={list.title}
            className="border rounded-2xl p-6 bg-white"
          >
            <h3 className="text-lg font-semibold mb-4">
              {list.title}
            </h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {list.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
