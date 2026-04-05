import { useState, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { X } from 'lucide-react';
import type { EditableMenuItem, MenuFormValues } from './menuTypes';

// TH: Props สำหรับ Modal Dialog เพื่อแก้ไขข้อมูลเมนู
// EN: Props interface for modal dialog to edit menu items
interface AdminMenuEditModalProps {
  isOpen: boolean; // TH: ควบคุมการแสดง/ซ่อน Modal
  item: EditableMenuItem | null; // TH: ข้อมูลเมนูที่เลือก
  onClose: () => void; // TH: ฟังก์ชันปิด Modal
  onSave: (values: MenuFormValues) => void; // TH: ฟังก์ชันบันทึกข้อมูล
  onDelete: () => void; // TH: ฟังก์ชันลบเมนู
}

// TH: คอมโพเนนต์ Modal สำหรับแก้ไขรายการเมนู โดยใช้ Headless UI Dialog
// EN: Admin menu edit modal component using Headless UI Dialog
export default function AdminMenuEditModal({
  isOpen,
  item,
  onClose,
  onSave,
  onDelete,
}: AdminMenuEditModalProps) {
  // TH: State สำหรับเก็บค่าของฟอร์ม (ชื่อ, คำอธิบาย, ราคา, หมวด, รูป)
  // EN: Form state to store menu item values
  const [formValues, setFormValues] = useState<MenuFormValues>({
    name: '',
    desc: '',
    price: '',
    section: '',
    img: '',
  });

  // TH: เมื่อเมนูที่เลือกเปลี่ยนแปลง ให้อัปเดตค่าฟอร์มให้สอดคล้องกับข้อมูลเมนู
  // EN: Update form values when selected menu item changes
  useEffect(() => {
    if (item) {
      setFormValues({
        name: item.name,
        desc: item.desc,
        price: String(item.price),
        section: item.section,
        img: item.img,
      });
    }
  }, [item, isOpen]);

  // TH: จัดการการเปลี่ยนแปลงค่าใน input fields
  // EN: Handle input field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // TH: จัดการการส่งบันทึก ป้องกันการรีโหลดหน้า และเรียก onSave
  // EN: Handle form submission - prevent reload and call onSave callback
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    onSave(formValues);
  };

  return (
    // TH: Transition wrapper - จัดการ animation เมื่อเปิด/ปิด Modal
    // EN: Transition wrapper for smooth open/close animations
    <Transition show={isOpen} as="div">
      {/* TH: Dialog component จาก Headless UI - ส่วนหลักของ Modal */}
      {/* EN: Main dialog component from Headless UI */}
      <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-50">
        {/* TH: Backdrop (พื้นหลัง) - ตรวจสอบการคลิกเพื่อปิด Modal */}
        {/* EN: Backdrop overlay with blur effect and click to close */}
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        {/* TH: ตัวถังของ Dialog - เก็บเนื้อหา Modal ไว้ และจัดการ scrolling */}
        {/* EN: Dialog container - holds all modal content with scroll handling */}
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            {/* TH: Panel หลักของ Modal - ส่วนที่มีสีขาว และมี animation */}
            {/* EN: Main modal panel with animations and styling */}
            <TransitionChild
              as={DialogPanel}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              className="w-full max-w-2xl transform bg-white rounded-lg shadow-xl transition-all"
            >
              {/* TH: ส่วนหัวของ Modal - ชื่อและปุ่มปิด */}
              {/* EN: Modal header - title and close button */}
              <div className="flex items-center justify-between border-b border-stone-200 p-5">
                <DialogTitle className="text-xl font-semibold text-gray-900">
                  Edit Menu Item
                </DialogTitle>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* TH: ส่วนเนื้อหาของ Modal - ฟอร์มแก้ไขข้อมูลเมนู */}
              {/* EN: Modal body - form to edit menu item details */}
              <div className="p-6 ">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* TH: แสดงตัวอย่างรูปและชื่อเมนูในแนวนอน เมื่อมีรูป */}
                  {/* EN: Show image preview and menu name side by side when image exists */}
                  {formValues.img && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <img
                          src={formValues.img}
                          alt="Preview"
                          className="w-full h-auto max-h-64 rounded-lg object-cover"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Menu Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formValues.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                        />
                        <div className='mt-1'>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Price
                          </label>
                          <input
                            type="number"
                            name="price"
                            value={formValues.price}
                            onChange={handleChange}
                            step="0.01"
                            required
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          />
                        </div>
                        <div className='mt-1'>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Section
                          </label>
                          <input
                            type="text"
                            name="section"
                            value={formValues.section}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TH: แสดงชื่อเมนูเต็มความกว้าง เมื่อไม่มีรูป */}
                  {/* EN: Show full-width menu name input when no image exists */}
                  {!formValues.img && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Menu Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  {/* TH: ฟิลด์คำอธิบายเมนู */}
                  {/* EN: Menu description textarea */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="desc"
                      value={formValues.desc}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                    />
                  </div>
                </form>
              </div>

              {/* TH: ส่วนท้าย Modal - ปุ่มบันทึก ยกเลิก ลบ */}
              {/* EN: Modal footer - action buttons (Delete, Cancel, Save) */}
              <div className="flex items-center justify-end gap-3 border-t border-stone-200 p-4 rounded-b-[12px]">
                {/* TH: ปุ่มลบ - ลบรายการเมนูเลือก */}
                {/* EN: Delete button - removes the menu item */}
                <button
                  onClick={onDelete}
                  className="px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium"
                >
                  Delete
                </button>

                {/* TH: ปุ่มยกเลิก - ปิด Modal โดยไม่บันทึกการเปลี่ยนแปลง */}
                {/* EN: Cancel button - closes modal without saving changes */}
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-200 text-gray-700 rounded-lg hover:bg-stone-300 transition-colors font-medium"
                >
                  Cancel
                </button>

                {/* TH: ปุ่มบันทึก - บันทึกข้อมูลเมนูที่แก้ไข */}
                {/* EN: Save button - saves all edited menu item data */}
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
