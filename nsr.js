// ==========================================
// 1. إعدادات Disqus لموقعك الشخصي
// ==========================================
const DISQUS_SHORTNAME = 'balola';

// ==========================================
// 2. قائمة مقالاتك الشخصية والتقنية
// ==========================================
const siteArticles = [
    {
        id: "post_1",
        title: "أهمية التقنية وتطوير الويب في عصرنا الحديث",
        date: "1 نوفمبر 2026",
        content: "هذا هو المقال الأول في مدونتي الشخصية. نتناول فيه أحدث تقنيات الويب، وكيفية بناء واجهات تفاعلية نظيفة باستخدام HTML5 و CSS3 و JavaScript الخالص لضمان سرعة فائقة وتجربة مستخدم متميزة."
    },
    {
        id: "post_2",
        title: "مهارات مهندس البرمجيات والدعم التقني الناجح",
        date: "25 أكتوبر 2026",
        content: "العمل كمهندس برمجيات وفني حاسوب يتطلب مزيجاً من الفهم العميق لخوارزميات البرمجة وقدرة عالية على حل المشكلات التقنية وصيانة الأنظمة بكفاءة عالية..."
    }
];

// ==========================================
// 3. تشغيل الكود بمجرد تحميل الصفحة بالكامل
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // إدارة التنقل بين الأقسام (Tabs Navigation)
    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            // إزالة الكلاس active من جميع الأزرار والأقسام
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // إضافة الكلاس active للزر والهدف المحدد
            button.classList.add('active');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // تحميل قائمة المقالات
    loadArticlesList();
});

// ==========================================
// 4. دالّات إدارة عرض المقالات والتعليقات
// ==========================================
function loadArticlesList() {
    const listContainer = document.getElementById('articles-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    siteArticles.forEach(art => {
        const card = document.createElement('div');
        card.style.cssText = 'background: rgba(255,255,255,0.03); padding: 18px; margin-bottom: 15px; border-radius: 8px; border-right: 5px solid rgb(213, 219, 55); cursor: pointer; text-align: right;';
        card.onclick = () => openSingleArticle(art.id);
        
        card.innerHTML = `
            <h3 style="margin: 0 0 8px 0; color: rgb(213, 219, 55);">${art.title}</h3>
            <div style="font-size: 13px; color: #aaa; margin-bottom: 8px;">📅 ${art.date}</div>
            <p style="margin: 0 0 10px 0; color: #ddd; line-height: 1.6;">${art.content.substring(0, 110)}...</p>
            <span style="color: rgb(213, 219, 55); font-weight: bold; font-size: 14px;">اقرأ المقال وعلق عليه 💬</span>
        `;
        listContainer.appendChild(card);
    });
}

function openSingleArticle(articleId) {
    const article = siteArticles.find(a => a.id === articleId);
    if (!article) return;

    document.getElementById('articles-container').style.display = 'none';
    document.getElementById('single-article-view').style.display = 'block';

    document.getElementById('single-article-title').textContent = article.title;
    document.getElementById('single-article-date').textContent = `📅 ${article.date}`;
    document.getElementById('single-article-content').textContent = article.content;

    loadDisqusForArticle(article.id, article.title);
}

function backToArticlesList() {
    document.getElementById('single-article-view').style.display = 'none';
    document.getElementById('articles-container').style.display = 'block';
}

function loadDisqusForArticle(articleId, articleTitle) {
    const articleUrl = window.location.href.split('#')[0] + '#!' + articleId;

    if (window.DISQUS) {
        DISQUS.reset({
            reload: true,
            config: function () {
                this.page.identifier = articleId;
                this.page.url = articleUrl;
                this.page.title = articleTitle;
            }
        });
    } else {
        window.disqus_config = function () {
            this.page.identifier = articleId;
            this.page.url = articleUrl;
            this.page.title = articleTitle;
        };
        const d = document, s = d.createElement('script');
        s.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    }
}
