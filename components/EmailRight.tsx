export default function EmailRight() {
  return (
    <div className="fixed right-0 bottom-0 flex flex-col items-center pr-6 z-50">
      {/* Container with fixed size */}
      <div className="relative w-24 flex justify-center items-center">
        <a
          href="mailto:sirazul263@gmail.com"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-90 text-gray-600 hover:text-pink-600 text-sm tracking-widest hover:scale-110 transition duration-300 whitespace-nowrap"
        >
          sirazul263@gmail.com
        </a>
      </div>
      <div className="mt-20"></div>
      {/* Vertical line below with margin to push it down */}
      <div className="w-px h-24 bg-gray-600 mt-10"></div>
    </div>
  );
}
