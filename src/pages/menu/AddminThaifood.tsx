import AdminMenus from "@/components/Menus/AdminMenus";

// TH: ฟังก์ชันหน้าจัดการเมนูอาหารของฝั่งแอดมิน
// EN: Admin page function for managing Thai food menu content.
function AddminThaifood() {
    return (
        <div className="px-4 py-6">
            <div className="mb-6">
                <h1 className="m-0 text-[25px] font-medium text-gray-900">
                    Thai food menu
                </h1>
            </div>
            <AdminMenus />
        </div>
    );
}

export default AddminThaifood;
