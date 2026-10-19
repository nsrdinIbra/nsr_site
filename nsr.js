document.addEventListener("DOMContentLoaded", function () {
    console.log("تم تحميل ملف الجافا سكريبت بنجاح!");

    // تحديد كل الأزرار وكل الأقسام
    const buttons = document.querySelectorAll('.nav-btn');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // 1. إزالة الكلاس active من كل الأزرار
            buttons.forEach(btn => btn.classList.remove('active'));
            // إضافة الكلاس active للزر الذي ضغطت عليه
            this.classList.add('active');

            // 2. إخفاء كل الأقسام
            contents.forEach(content => content.classList.remove('active'));

            // 3. معرفة القسم المستهدف من خاصية data-target
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            // إظهار القسم المستهدف إذا كان موجوداً
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // تأثير تكبير الصورة الشخصية عند مرور الماوس
    const profileImg = document.querySelector("main img");
    if (profileImg) {
        profileImg.style.transition = "transform 0.3s ease";
        profileImg.addEventListener("mouseenter", () => profileImg.style.transform = "scale(1.05)");
        profileImg.addEventListener("mouseleave", () => profileImg.style.transform = "scale(1)");
    }
});