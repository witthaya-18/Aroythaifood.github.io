import menuData from "@/data/menu.json";
import heroImg from "@/assets/menu/pad_khapao.png";

// TH: ฟังก์ชันหน้าเมนูอาหารสำหรับแสดงภาพโปรโมตและรายการเมนูจากข้อมูล JSON
// EN: Menu page function that renders hero section and menu items from JSON data.
export default function Thaifood() {
  return (
    <>
      <div
        className="relative h-64 bg-cover bg-center flex items-center justify-center md:w-full md:h-[320px] lg:h-[420px]"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        {/* เบลอๆ รูปภาพ*/}
        <div className="absolute inset-0 bg-black/50" aria-hidden />
        <div className="relative z-10 flex flex-col items-center text-center gap-3 px-4 text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.65)]">
          <h1 className="font-black text-3xl leading-tight md:text-5xl lg:text-6xl">
            Order authentic Thai cuisine anytime.
          </h1>
          <p className="text-base md:text-lg lg:text-3xl text-white/90">
            Fresh, flavorful, delivered to your door.
          </p>
        </div>
      </div>
      <div className=" max-w-7xl mt-3 mx-auto w-full px-4 md:py-8">
        <div className="flex-1">
          {menuData.map((section) => (
            <section key={section.section} className="mb-10">
              <h3 className="text-xl lg:text-2xl font-semibold mb-4 border-l-4 border-blue-900 pl-3">
                {section.section}
              </h3>
              <div className="grid grid-cols-1   md:grid-cols-2 gap-x-8 gap-y-8 mb-4 lg:grid-cols-3">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-[#f4f4f475] rounded-3xl shadow-md overflow-hidden flex flex-col h-full transition delay-100 duration-350 ease-in-out hover:-translate-y-1 hover:scale-[1.02]"
                  >
                    <div className="relative">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-56 md:h-60 object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-yellow-400 text-black font-semibold rounded-full px-3 py-[1px] md:text-xl md:text-base ">
                        {item.price} $
                      </div>
                    </div>
                    <div className="px-4 pb-5 pt-4 flex flex-col gap-2">
                      <div className="text-lg md:text-xl font-extrabold text-gray-900">
                        {item.name}
                      </div>
                      {item.desc && (
                        <div className="text-sm md:text-base text-gray-600 leading-snug">
                          {item.desc}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
