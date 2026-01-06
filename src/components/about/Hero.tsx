import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-[1100px] mx-auto mt-5 rounded-2xl overflow-hidden relative">
      <Image
        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
        alt="Adventure"
        width={1100}
        height={260}
        className="w-full h-[260px] object-cover"
        priority
      />
      <h1 className="absolute bottom-5 left-5 bg-black/40 text-white text-3xl md:text-4xl px-4 py-2 rounded-xl">
        About Us
      </h1>
    </section>
  );
}
