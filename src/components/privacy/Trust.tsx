export default function Trust() {
  return (
    <section className="bg-gray-100 mt-16 py-10 px-4 text-center">
      <h3 className="text-xl font-semibold">Excellent</h3>

      <div className="text-green-500 text-xl tracking-widest">
        ★★★★★
      </div>

      <p className="text-sm text-gray-600 mt-2">
        9,609 reviews on{" "}
        <span className="text-green-600 font-semibold">
          Trustpilot
        </span>
      </p>

      <div className="flex justify-center gap-6 mt-6 flex-wrap opacity-80">
        <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/8/89/WYSE_Travel_Confederation_logo.png" />
        <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/3/3b/ASTA_logo.png" />
        <img className="h-8" src="https://upload.wikimedia.org/wikipedia/commons/5/59/TICO_logo.png" />
      </div>
    </section>
  );
}
