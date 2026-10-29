// ==========================================
// 1. إدارة التنقل بين الأقسام (Tabs Navigation)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // إزالة حالة النشاط من جميع الأزرار والأقسام
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // تفعيل الزر والقسم المختار
            button.classList.add('active');
            const targetId = button.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // تحميل التعليقات عند فتح الصفحة لأول مرة
    loadComments();
});

// ==========================================
// 2. إعدادات وقواعد اتصال Supabase
// ==========================================
// استبدل القيم أدناه ببيانات مشروعك الحقيقية من Supabase
const SUPABASE_URL = 'ضع_رابط_مشروعك_هنا';      // مثال: 'https://xxxx.supabase.co'
const SUPABASE_KEY = 'ضع_مفتاح_anon_key_هنا';  // المفتاح العام anon key

// تهيئة عميل Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const currentPostId = 'article-1'; // معرف المقال الحالي

// دالة لتنقية النصوص لحماية الموقع من الثغرات (XSS)
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================
// 3. دالة جلب وعرض التعليقات من Supabase
// ==========================================
async function loadComments() {
    const commentsList = document.getElementById('commentsList');
    if (!commentsList) return;

    // جلب التعليقات الخاصة بهذا المقال مرتبة من الأحدث إلى الأقدم
    const { data, error } = await supabaseClient
        .from('comments')
        .select('*')
        .eq('post_id', currentPostId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('خطأ أثناء جلب التعليقات:', error);
        commentsList.innerHTML = '<p style="color: #ff6b6b;">تعذر تحميل التعليقات حالياً.</p>';
        return;
    }

    if (!data || data.length === 0) {
        commentsList.innerHTML = '<p style="color: #aaa;">لا توجد تعليقات بعد. كن أول من يعلق!</p>';
        return;
    }

    // بناء قائمة التعليقات
    let html = '';
    data.forEach(item => {
        const dateFormatted = new Date(item.created_at).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        html += `
            <div class="comment-card">
                <div>
                    <span class="comment-author">${escapeHtml(item.name)}</span>
                    <span class="comment-date">(${dateFormatted})</span>
                </div>
                <p class="comment-body">${escapeHtml(item.comment)}</p>
            </div>
        `;
    });

    commentsList.innerHTML = html;
}

// ==========================================
// 4. دالة التحقق من المدخلات وإرسال التعليق
// ==========================================
const commentForm = document.getElementById('commentForm');
if (commentForm) {
    commentForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const name = document.getElementById('userName').value.trim();
        const contactValue = document.getElementById('userContact').value.trim();
        const comment = document.getElementById('userComment').value.trim();
        const welcomeMsg = document.getElementById('welcomeMessage');

        // إخفاء تنبيهات الخطأ القديمة ورسالة الترحيب
        const nameError = document.getElementById('nameError');
        const contactError = document.getElementById('contactError');
        
        if (nameError) nameError.style.display = 'none';
        if (contactError) contactError.style.display = 'none';
        if (welcomeMsg) welcomeMsg.style.display = 'none';

        // الشرط الأول: الاسم 4 أحرف على الأقل
        if (name.length < 4) {
            if (nameError) nameError.style.display = 'block';
            return;
        }

        // الشرط الثاني: التحقق من أن حقل التواصل ليس فارغاً
        if (contactValue === "") {
            if (contactError) contactError.style.display = 'block';
            return;
        }

        // التمييز تلقائياً: إذا احتوى النص على @ يُعتبر بريداً إلكترونياً، وإلا فهو رقم هاتف
        const isEmail = contactValue.includes('@');

        // إرسال البيانات إلى Supabase (باستخدام العمود Email بحرف E كبير)
        const { error } = await supabaseClient
            .from('comments')
            .insert([
                { 
                    name: name, 
                    Email: isEmail ? contactValue : null,
                    phone: !isEmail ? contactValue : null, 
                    comment: comment, 
                    post_id: currentPostId 
                }
            ]);

        if (error) {
            alert('حدث خطأ أثناء إرسال التعليق، يرجى التأكد من البيانات والإعدادات.');
            console.error('Supabase Insert Error:', error);
        } else {
            // إظهار رسالة ترحيب شخصية لطيفة للمستخدم
            if (welcomeMsg) {
                welcomeMsg.innerHTML = `مرحباً بك يا ${escapeHtml(name)}! تم نشر تعليقك بنجاح وشكراً لتفاعلك.`;
                welcomeMsg.style.display = 'block';
            }
            
            commentForm.reset();
            loadComments(); // إعادة تحميل التعليقات لتظهر مباشرة في القائمة
        }
    });
}
