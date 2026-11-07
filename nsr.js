// ==========================================
// 1. إعدادات Disqus لموقعك الشخصي
// ==========================================
const DISQUS_SHORTNAME = 'balola';

// متغير عام لتخزين المقالات بعد جلبها من الملف
let siteArticles = [];

// ==========================================
// 2. جلب المقالات من ملف article.json عند تحميل الصفحة
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // جلب ملف article.json (تأكد من وجود الملف في نفس مسار الموقع)
    fetch('article.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('فشل في تحميل ملف المقالات');
            }
            return response.json();
        })
        .then(data => {
            // تخزين البيانات داخل المصفوفة وتحويل الـ id ليكون نصياً (لتوافق مع نظام المعرفات)
            siteArticles = data.map(article => ({
                id: String(article.id),
                title: article.title,
                date: article.date,
                category: article.category,
                content: article.content
            }));

            // تحميل قائمة المقالات واعرضها في الصفحة
            loadArticlesList();
        })
        .catch(error => {
            console.error('حدث خطأ أثناء جلب المقالات:', error);
            const listContainer = document.getElementById('articles-list');
            if (listContainer) {
                listContainer.innerHTML = '<p style="color: #ff6b6b; text-align: center;">عذراً، تعذر تحميل المقالات حالياً.</p>';
            }
        });

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
});

// ==========================================
// 3. دالّات إدارة عرض المقالات والتعليقات
// ==========================================
function loadArticlesList() {
    const listContainer = document.getElementById('articles-list');
    if (!listContainer) return;

    listContainer.innerHTML = '';
    
    if (siteArticles.length === 0) {
        listContainer.innerHTML = '<p style="color: #aaa; text-align: center;">لا توجد مقالات مضافة حالياً.</p>';
        return;
    }

    siteArticles.forEach(art => {
        const card = document.createElement('div');
        card.style.cssText = 'background: rgba(255,255,255,0.03); padding: 18px; margin-bottom: 15px; border-radius: 8px; border-right: 5px solid rgb(213, 219, 55); cursor: pointer; text-align: right;';
        card.onclick = () => openSingleArticle(art.id);
        
        // عرض التصنيف والتاريخ ومقدمة المحتوى
        card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h3 style="margin: 0; color: rgb(213, 219, 55);">${art.title}</h3>
                <span style="font-size: 11px; background: rgba(213, 219, 55, 0.1); color: rgb(213, 219, 55); padding: 2px 8px; border-radius: 4px;">${art.category || 'مقال'}</span>
            </div>
            <div style="font-size: 13px; color: #aaa; margin-bottom: 8px;">📅 ${art.date}</div>
            <p style="margin: 0 0 10px 0; color: #ddd; line-height: 1.6; white-space: pre-line;">${art.content.substring(0, 110)}...</p>
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
