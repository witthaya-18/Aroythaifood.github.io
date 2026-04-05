// import React from "react";

// TH: ฟังก์ชันคอมโพเนนต์การ์ดสถิติสำหรับแสดงตัวเลขสรุปใน Dashboard
// EN: Dashboard metric card component function for summary numbers.
function Card() {
  return (
    <div className="grid grid-cols-1 gap-4  sm:grid-cols-2 md:gap-6 md:px-10 ">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-300 bg-white p-5   md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {/* <GroupIcon className="text-gray-800 size-6 dark:text-white/90" /> */}
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-md text-gray-500 ">Customers</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm ">
              3,782
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-300 bg-white p-5  md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          {/* <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" /> */}
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-md text-gray-500 ">Orders</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm ">
              5,359
            </h4>
          </div>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}

export default Card;
