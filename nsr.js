document.addEventListener("DOMContentLoaded", function () {
    console.log("تم تحميل ملف الجافا سكريبت بنجاح!");

    // 1. إدارة التنقل بين الأقسام (Tabs)
    const buttons = document.querySelectorAll('.nav-btn');
    const contents = document.querySelectorAll('.tab-content');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // إزالة الكلاس active من كل الأزرار
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // إخفاء كل الأقسام
            contents.forEach(content => content.classList.remove('active'));

            // إظهار القسم المستهدف
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 2. تأثير تكبير الصورة الشخصية عند مرور الماوس
    const profileImg = document.querySelector("main img");
    if (profileImg) {
        profileImg.style.transition = "transform 0.3s ease";
        profileImg.addEventListener("mouseenter", () => profileImg.style.transform = "scale(1.05)");
        profileImg.addEventListener("mouseleave", () => profileImg.style.transform = "scale(1)");
    }

    // ==========================================
    // 3. إدارة قسم التعليقات عبر Supabase
    // ==========================================
    
    // استبدل القيم ببيانات مشروعك من Supabase
    const SUPABASE_URL = 'ضع_رابط_مشروعك_هنا';
    const SUPABASE_KEY = 'ضع_مفتاح_anon_key_هنا';
    
    // التأكد من وجود مكتبة Supabase قبل التشغيل
    if (typeof supabase !== 'undefined') {
        const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        const postIdElem = document.getElementById('postId');

        if (postIdElem) {
            const currentPostId = postIdElem.value;

            // دالة جلب وعرض التعليقات
            async function loadComments() {
                const commentsList = document.getElementById('commentsList');
                if (!commentsList) return;

                const { data, error } = await supabaseClient
                    .from('comments')
                    .select('name, comment, created_at')
                    .eq('post_id', currentPostId)
                    .order('created_at', { ascending: false });

                if (error) {
                    commentsList.innerHTML = '<p style="color: #ff6b6b;">حدث خطأ في تحميل التعليقات.</p>';
                    return;
                }

                if (data.length === 0) {
                    commentsList.innerHTML = '<p style="color: #aaa;">لا توجد تعليقات بعد. كن أول من يعلق!</p>';
                    return;
                }

                commentsList.innerHTML = '';
                data.forEach(c => {
                    const date = new Date(c.created_at).toLocaleDateString('ar-EG');
                    commentsList.innerHTML += `
                        <div style="background: rgba(255,255,255,0.04); padding: 12px; margin-bottom: 10px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); text-align: right;">
                            <div style="font-weight: bold; color: rgb(213, 219, 55);">${escapeHtml(c.name)} <span style="font-size: 12px; color: #aaa; font-weight: normal; margin-right: 10px;">• ${date}</span></div>
                            <p style="margin: 8px 0 0 0; color: #eee; font-size: 15px;">${escapeHtml(c.comment)}</p>
                        </div>
                    `;
                });
            }

            // دالة التحقق من المدخلات وإرسال التعليق
            const commentForm = document.getElementById('commentForm');
            if (commentForm) {
                commentForm.addEventListener('submit', async function(e) {
                    e.preventDefault();

                    const name = document.getElementById('userName').value.trim();
                    const email = document.getElementById('userEmail').value.trim();
                    const phone = document.getElementById('userPhone').value.trim();
                    const comment = document.getElementById('userComment').value.trim();

                    // إخفاء تنبيهات الخطأ القديمة
                    document.getElementById('nameError').style.display = 'none';
                    document.getElementById('contactError').style.display = 'none';

                    // الشرط الأول: الاسم 4 أحرف على الأقل
                    if (name.length < 4) {
                        document.getElementById('nameError').style.display = 'block';
                        return;
                    }

                    // الشرط الثاني: إدخال إما البريد أو الهاتف وليس الاثنين
                    const hasEmail = email !== "";
                    const hasPhone = phone !== "";

                    if ((hasEmail && hasPhone) || (!hasEmail && !hasPhone)) {
                        document.getElementById('contactError').style.display = 'block';
                        return;
                    }

                    // إرسال البيانات إلى Supabase
                    const { error } = await supabaseClient
                        .from('comments')
                        .insert([
                            { 
                                name: name, 
                                email: hasEmail ? email : null, 
                                phone: hasPhone ? phone : null, 
                                comment: comment, 
                                post_id: currentPostId 
                            }
                        ]);

                    if (error) {
                        alert('حدث خطأ أثناء إرسال التعليق، حاول مرة أخرى.');
                        console.error(error);
                    } else {
                        alert('تم نشر تعليقك بنجاح!');
                        commentForm.reset();
                        loadComments(); // تحديث القائمة مباشرة
                    }
                });
            }

            // حماية بسيطة لمنع ثغرات XSS
            function escapeHtml(text) {
                return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }

            // تحميل التعليقات فور فتح الصفحة
            loadComments();
        }
    }
});
