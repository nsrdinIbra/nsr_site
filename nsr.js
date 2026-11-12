// ==========================================
// 1. إعدادات Disqus لموقعك الشخصي
// ==========================================
const DISQUS_SHORTNAME = 'balola';

// ==========================================
// 2. قائمة المقالات والقصائد (مرتبة من الأحدث إلى الأقدم)
// ==========================================
let siteArticles = [
  {
    "id": 1,
    "title": "لاعبي الهلال السوداني للموسم 2026 - 2027",
    "author": "نصرالدين ابراهيم",
    "date": "2026-09-21",
    "category": "قوائم اللاعبين",
    "content": "قائمة لاعبي نادي الهلال السوداني للموسم 2026 - 2027 مع أرقام الفانلات:\n\n1 - فريد ويدراغو\n2 - ياسر عوض جوباك\n3 - مامادو قمرديني\n4 - الطيب عبدالرازق\n5 - مازن بشير سيمبو\n6 - محمد احمد ارنق\n7 - انسومانا سامورا\n8 - عبدالرؤوف عبدالرازق\n9 - ياسر مزمل\n10 - محمد عبدالحمن الغربال\n11 - اداما كوليبالي\n12 - ارنست لوزولو\n13 - عمر تامبا\n14 - ابريسيوس بيتروس\n15 - صلاح عادل\n16 - محمد مدني\n17 - اكيري تايو\n18 - الحاج ماديكي\n19 - مصطفي كرشوم\n20 - سليمان سانوغو\n21 - والي الدين خضر\n22 - هامان مانجان\n23 - احمد سالم\n24 - استيفن ابويلا\n25 - يوسف كابوري\n26 - محمد راوا\n27 - موسي كانتي\n28 - احمد عصمت\n29 - بابي ديارا\n30 - سليم ادامز\n31 - صنداي ايديتونجي\n33 - محمد المصطفي\n34 - ايمانويل فلومو\n36 - امجد قلق\n38 - ايفان نانا\n39 - احمد احمد المختار\n41 - قودوين فريمبونق"
  },
  {
    "id": 2,
    "title": "الطاقة الشمسية والمزارع",
    "author": "نصرالدين ابراهيم",
    "date": "2026-07-13",
    "category": "مقالات",
    "content": "الفكرة دي منتشرة الآن بقوة: تشغيل أنظمة الري بالطاقة الشمسية DC مباشرة بدون إنفرتر (محول DC إلى AC)، عندها مميزات كبيرة، لكن برضو عندها سلبيات.\n\n### المميزات\n* تقليل الفاقد الكهربائي لأن الطاقة تذهب مباشرة للمضخة بدون تحويل.\n* كفاءة أعلى خاصة في المشاريع الصغيرة والمتوسطة."
  },
  {
    "id": 3,
    "title": "اذا كان المصريون اشقائنا فمن اعدائنا",
    "author": "إبراهيم البدوي",
    "date": "2026-05-10",
    "category": "مقالات",
    "content": "حين قام الحاكم التركي على مصر، محمد علي باشا، بغزو السودان واستعماره في عام 1821م..."
  },
  {
    "id": 4,
    "title": "منطقة قضيضيم ام روابة",
    "author": "الزين كندوة",
    "date": "2026-04-11",
    "category": "مقالات",
    "content": "منطقة قضيضيم بريفي وسط ام روابة ... ما بين الماضي والحاضر والمستقبل..."
  }
];

// ==========================================
// 3. تشغيل الكود بمجرد تحميل الصفحة بالكامل
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // إدارة التنقل بين أزرار الترويسة والأقسام (Tabs Navigation)
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

    // تحميل قائمة المقالات فوراً عند تشغيل الصفحة
    loadArticlesList();
});

// ==========================================
// 4. دالّات إدارة عرض المقالات والتعليقات
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
    const article = siteArticles.find(a => String(a.id) === String(articleId));
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
                this.page.identifier = String(articleId);
                this.page.url = articleUrl;
                this.page.title = articleTitle;
            }
        });
    } else {
        window.disqus_config = function () {
            this.page.identifier = String(articleId);
            this.page.url = articleUrl;
            this.page.title = articleTitle;
        };
        const d = document, s = d.createElement('script');
        s.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    }
}
