import Card from "@/components/Dashboard/charts/Card";

// TH: ฟังก์ชันหน้า Dashboard หลัก แสดงการ์ดสรุปข้อมูล
// EN: Main dashboard page function that shows summary cards.
export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-12">
          <Card />
        </div>
        <div className="col-span-12">{/* <StatisticsChart /> */}</div>
      </div>
    </>
  );
}
