const smoothScrollTo = (id: string, duration = 700) => {
    const targetEl = document.getElementById(id);
    if (!targetEl) return;

    const startY = window.pageYOffset;
    const targetY = targetEl.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    let startTime: number | null = null;

    // TH: ฟังก์ชัน easing สำหรับทำให้การเลื่อนดูนุ่มนวลขึ้น
    // EN: Easing function used to create smooth acceleration/deceleration.
    const easeInOut = (t: number) =>
        t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    // TH: ฟังก์ชันที่ทำงานในแต่ละเฟรมของ animation จนเลื่อนเสร็จ
    // EN: Frame-by-frame animation step until scrolling is complete.
    const step = (timestamp: number) => {
        if (startTime === null) startTime = timestamp;
        const progress = Math.min(1, (timestamp - startTime) / duration);
        window.scrollTo(0, startY + distance * easeInOut(progress));
        if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
};

export default smoothScrollTo;