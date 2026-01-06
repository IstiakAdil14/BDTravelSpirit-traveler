import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-[1100px] mx-auto mt-5 px-4">
      <div className="relative overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="Contact us"
          width={1100}
          height={260}
          className="h-[260px] w-full object-cover"
        />
        <h1 className="absolute bottom-5 left-5 bg-black/50 text-white text-3xl px-5 py-2 rounded-xl">
          Contact Us
        </h1>
      </div>
    </section>
  );
}
