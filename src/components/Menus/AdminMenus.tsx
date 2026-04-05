import { useState } from "react";
import menuData from "@/data/menu.json";
import AdminMenuEditModal from "./AdminMenuEditModal";
import type { EditableMenuItem, MenuFormValues, MenuSection } from "./menuTypes";

// TH: Type สำหรับเก็บ index ของเมนูที่เลือก
// EN: Type to store the selected menu indices
type SelectedMenu = {
  sectionIndex: number; // TH: ตำแหน่ง section ของเมนู
  itemIndex: number; // TH: ตำแหน่ง item ภายใน section
};

// TH: คอมโพเนนต์รายการเมนูสำหรับหน้าฝั่งแอดมิน พร้อม modal แก้ไขข้อมูลแต่ละเมนู
// EN: Admin menu list component with edit modal support for each menu item.
export default function AdminMenus() {
  // TH: State เก็บข้อมูล sections และ items ของเมนU
  // EN: State for menu sections data
  const [sections, setSections] = useState<MenuSection[]>(menuData);

  // TH: State เก็บข้อมูล section และ item ที่ผู้ใช้คลิกเลือก
  // EN: State for currently selected menu item
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu | null>(null);

  // TH: ตรวจสอบว่ามีมากกว่า 1 section เพื่อตัดสินใจว่าจะแสดงชื่อ section หรือไม่
  // EN: Check if there are multiple sections to display section labels
  // const hasMultipleSections = sections.length > 1;

  // TH: สร้าง object เมนูที่เลือก พร้อมข้อมูล section จากการเลือก
  // EN: Create selected item object with section information
  const selectedItem: EditableMenuItem | null =
    selectedMenu === null
      ? null
      : {
        ...sections[selectedMenu.sectionIndex].items[selectedMenu.itemIndex],
        section: sections[selectedMenu.sectionIndex].section,
      };

  // TH: ฟังก์ชันเปิด Modal - เก็บ index ของเมนูที่เลือก
  // EN: Open modal - store the selected menu indices
  const handleOpenModal = (sectionIndex: number, itemIndex: number) => {
    setSelectedMenu({ sectionIndex, itemIndex });
  };

  // TH: ฟังก์ชันปิด Modal - ล้างการเลือก
  // EN: Close modal - clear selection
  const handleCloseModal = () => {
    setSelectedMenu(null);
  };

  // TH: ฟังก์ชันบันทึกข้อมูลเมนู - สามารถแก้ไข หรือย้ายไปยัง section ใหม่
  // EN: Save menu item - handles editing and moving between sections
  const handleSaveMenu = (values: MenuFormValues) => {
    if (selectedMenu === null) {
      return;
    }

    // TH: แปลงราคาจาก string เป็น number
    // EN: Convert price from string to number
    const parsedPrice = Number(values.price);

    setSections((currentSections) => {
      // TH: คัดลอก sections เพื่อหลีกเลี่ยงการแก้ไข state โดยตรง
      // EN: Create a new copy of sections to avoid direct state mutation
      const nextSections = currentSections.map((section) => ({
        ...section,
        items: [...section.items],
      }));

      // TH: ดึงข้อมูล item ปัจจุบันที่กำลังแก้ไข
      // EN: Get the current item being edited
      const currentItem =
        nextSections[selectedMenu.sectionIndex].items[selectedMenu.itemIndex];

      // TH: ดึง section ปัจจุบัน
      // EN: Get the current section
      const sourceSection = nextSections[selectedMenu.sectionIndex];

      // TH: ทำให้ section name เป็นแบบ normalize (trim whitespace) หรือใช้ชื่อเดิมถ้าว่าง
      // EN: Normalize section name or use original if empty
      const normalizedSection = values.section.trim() || sourceSection.section;

      // TH: ทำให้ชื่อเมนู normalize หรือใช้ชื่อเดิมถ้าว่าง
      // EN: Normalize menu name or use original if empty
      const normalizedName = values.name.trim() || currentItem.name;

      // TH: หาตำแหน่ง index ของ section เป้าหมาย
      // EN: Find index of target section
      const targetSectionIndex = nextSections.findIndex(
        (section) => section.section === normalizedSection,
      );

      // TH: สร้าง object ข้อมูลเมนูใหม่ที่อัปเดตแล้ว
      // EN: Create updated item object with new values
      const updatedItem = {
        ...currentItem,
        name: normalizedName,
        desc: values.desc.trim(),
        price: Number.isNaN(parsedPrice) ? currentItem.price : parsedPrice,
        img: values.img,
      };

      // TH: ถ้าจุดหมายคือ section เดียวกัน ให้อัปเดตข้อมูลที่ตำแหน่งเดียวกัน
      // EN: If target section is the same, just update the item
      if (targetSectionIndex === selectedMenu.sectionIndex) {
        sourceSection.items[selectedMenu.itemIndex] = updatedItem;
        return nextSections;
      }

      // TH: ลบเมนูออกจาก section เดิม
      // EN: Remove item from source section
      sourceSection.items.splice(selectedMenu.itemIndex, 1);

      // TH: ถ้า section เป้าหมายมีอยู่แล้ว ให้ push เมนูไปยัง section นั้น
      // EN: If target section exists, add item to it
      if (targetSectionIndex >= 0) {
        nextSections[targetSectionIndex].items.push(updatedItem);
        // TH: ลบ section ที่ว่างเปล่า (ไม่มี items)
        // EN: Remove empty sections
        return nextSections.filter((section) => section.items.length > 0);
      }

      // TH: ถ้า section เป้าหมายไม่มี ให้สร้าง section ใหม่
      // EN: If target section doesn't exist, create a new section
      return [
        ...nextSections.filter((section) => section.items.length > 0),
        {
          section: normalizedSection,
          items: [updatedItem],
        },
      ];
    });

    handleCloseModal();
  };

  // TH: ฟังก์ชันลบเมนู - ลบ item และส่วน section ถ้าว่างเปล่า
  // EN: Delete menu item - removes item and empty sections
  const handleDeleteMenu = () => {
    if (selectedMenu === null) {
      return;
    }

    setSections((currentSections) =>
      currentSections
        // TH: ลบ item ตามตำแหน่ง itemIndex ออกจาก section ที่เลือก
        // EN: Remove the item from its section
        .map((section, sectionIndex) => {
          if (sectionIndex !== selectedMenu.sectionIndex) {
            return section;
          }

          return {
            ...section,
            items: section.items.filter(
              (_, itemIndex) => itemIndex !== selectedMenu.itemIndex,
            ),
          };
        })
        // TH: ลบ section ที่ไม่มี items (ว่างเปล่า)
        // EN: Remove empty sections
        .filter((section) => section.items.length > 0),
    );

    handleCloseModal();
  };

  return (
    <>
      {/* TH: Container แสดงผลรายการเมนู */}
      {/* EN: Menu list container */}
      <div className="space-y-8">
        {/* TH: Loop sections - แสดงแต่ละ section */}
        {/* EN: Map through sections to display each one */}
        {sections.map((section, sectionIndex) => (
          <section key={section.section} className="space-y-4">
            {/* TH: แสดงชื่อ section เมื่อมี multiple sections */}
            {/* EN: Show section label only if multiple sections exist */}
            {/* {hasMultipleSections && (
              <div className="inline-flex rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-stone-600">
                {section.section}
              </div>
            )} */}

            {/* TH: Grid แสดงรายการเมนู items ในแบบ responsive */}
            {/* EN: Responsive grid for menu items */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
              {/* TH: Loop items - แสดงแต่ละรายการเมนู */}
              {/* EN: Map through items to display each menu item */}
              {section.items.map((item, itemIndex) => (
                <button
                  key={`${section.section}-${item.name}`}
                  type="button"
                  onClick={() => handleOpenModal(sectionIndex, itemIndex)}
                  className="block h-full text-left"
                >
                  {/* TH: Card แสดงข้อมูลเมนู */}
                  {/* EN: Menu item card displaying info */}
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-colors duration-200 hover:border-stone-300">
                    {/* TH: รูปภาพเมนู */}
                    {/* EN: Menu item image */}
                    <div className="h-40 w-full overflow-hidden bg-stone-100">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* TH: ส่วนข้อมูล - ชื่อ, คำอธิบาย, ราคา */}
                    {/* EN: Item details - name, description, price */}
                    <div className="flex flex-1 flex-col p-4">
                      {/* TH: ชื่อเมนู (จำกัด 2 บรรทัด) */}
                      {/* EN: Menu name (limited to 2 lines) */}
                      <div className="font-medium leading-7 text-gray-900 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                        {item.name}
                      </div>

                      {/* TH: คำอธิบาย (ถ้ามี) จำกัด 2 บรรทัด */}
                      {/* EN: Description (if exists) limited to 2 lines */}
                      {item.desc && (
                        <p className="mb-3 overflow-hidden text-[14px] leading-5 text-gray-500 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                          {item.desc}
                        </p>
                      )}

                      {/* TH: ราคาเมนู */}
                      {/* EN: Menu price */}
                      <div className="text-sm font-medium text-sky-700">
                        ${item.price}
                      </div>

                      {/* TH: ข้อความบอกให้คลิกเพื่อแก้ไข */}
                      {/* EN: Click to edit hint text */}
                      <div className="mt-auto border-t border-stone-200 pt-3 text-xs text-gray-500">
                        Click to edit
                      </div>
                    </div>
                  </article>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* TH: Modal สำหรับแก้ไขเมนู */}
      {/* EN: Modal dialog for editing menu items */}
      <AdminMenuEditModal
        isOpen={selectedItem !== null}
        item={selectedItem}
        onClose={handleCloseModal}
        onDelete={handleDeleteMenu}
        onSave={handleSaveMenu}
      />
    </>
  );
}
