const workersData = [
    { name: "محمود البنا", name_en: "Mahmoud El-Banna", id: "28011230100789", status: "allowed", job_title: "مدير أمن", company: "Middle East" },
    { name: "محمد محمود عبد اللطيف أبو صالح", name_en: "Mohamed Mahmoud Abdel-Latif Abo Saleh", id: "29005080100234", status: "allowed", job_title: "مهندس إنشاءات", company: "إنشاءات" },
    { name: "أحمد محمد سيد الأقرع", name_en: "Ahmed Mohamed Sayed El-Aaraa", id: "29501250100567", status: "forbidden", reason: "مخالفة قواعد السلامة", job_title: "عامل صيانة", company: "صيانة" },
    { name: "السيد صبري السيد صادق", name_en: "El-Sayed Sabry El-Sayed Sadeq", id: "28509150100890", status: "allowed", job_title: "ساكن", company: "غير محدد" },
    { name: "محمد حسن صادق", name_en: "Mohamed Hassan Sadeq", id: "28811200100111", status: "forbidden", reason: "انتهاء صلاحية التصريح", job_title: "فني تشطيبات", company: "تشطيبات" },
    { name: "سامح محمد عبد ربه", name_en: "Sameh Mohamed Abdel-Rabbo", id: "30010100100222", status: "allowed", job_title: "زائر", company: "غير محدد" },
    { name: "أحمد كمال", name_en: "Ahmed Kamal", id: "29911150100333", status: "allowed", job_title: "مشرف نظافة", company: "نظافة" },
    { name: "أحمد علي", name_en: "Ahmed Ali", id: "29107200100444", status: "forbidden", reason: "عدم وجود بطاقة هوية", job_title: "زائر", company: "غير محدد" },
    { name: "محمد محمدي", name_en: "Mohamed Mohamedy", id: "29206100100555", status: "forbidden", reason: "عدم الحصول على إذن دخول", job_title: "عامل إنشاءات", company: "إنشاءات" },
    { name: "محمود رمضان", name_en: "Mahmoud Ramadan", id: "29302250100666", status: "allowed", job_title: "ساكن", company: "غير محدد" },
    { name: "أحمد نبيل", name_en: "Ahmed Nabil", id: "29408090100777", status: "allowed", job_title: "فني صيانة", company: "صيانة" },
    { name: "وليد هواري", name_en: "Waleed Hawary", id: "29603170100888", status: "forbidden", reason: "عدم وجود تصريح دخول", job_title: "زائر", company: "غير محدد" },
    { name: "حسام عزت", name_en: "Hossam Ezzat", id: "29705220100999", status: "allowed", job_title: "ساكن", company: "غير محدد" },
    { name: "إسماعيل حمدي", name_en: "Ismail Hamdy", id: "29804010100000", status: "allowed", job_title: "عامل تشطيبات", company: "تشطيبات" }
];

function filterWorkers(searchTerm) {
    searchTerm = searchTerm.trim().toLowerCase();

    if (!isNaN(searchTerm) && searchTerm.length >= 5) {
        return workersData.filter(worker => worker.id.includes(searchTerm));
    } else {
        const searchWords = searchTerm.split(' ');
        if (searchWords.length > 0) {
            return workersData.filter(worker => {
                const workerName = worker.name.toLowerCase();
                const workerEnName = worker.name_en.toLowerCase();
                const workerWords = workerName.split(' ');
                const workerEnWords = workerEnName.split(' ');

                const matchesArabic = searchWords.every((word, index) => workerWords[index] && workerWords[index] === word);
                const matchesEnglish = searchWords.every((word, index) => workerEnWords[index] && workerEnWords[index] === word);

                return matchesArabic || matchesEnglish;
            });
        }
    }
    return [];
}

function displayResults(results) {
    const resultBox = document.getElementById('result');
    resultBox.innerHTML = '';

    if (results.length > 0) {
        results.forEach((worker, index) => {
            const statusClass = worker.status === "allowed" ? "status-allowed" : "status-forbidden";
            const statusText = worker.status === "allowed" ? "مسموح بالدخول" : "مستبعد";
            const statusIcon = worker.status === "allowed" ? "✅" : "❌";
            const reasonText = worker.status === "forbidden" && worker.reason ? `<p class="card-reason">السبب: ${worker.reason}</p>` : '';

            const cardHtml = `
                <div class="worker-card ${statusClass}" style="animation-delay: ${index * 0.1}s;">
                    <p class="card-title">
                        <span class="status-icon ${worker.status}">${statusIcon}</span>
                        ${worker.name}
                    </p>
                    <p class="card-status">الحالة: <span>${statusText}</span></p>
                    ${reasonText}
                </div>
            `;
            resultBox.innerHTML += cardHtml;
        });
    } else {
        resultBox.innerHTML = '<p class="no-results">لا يوجد نتائج مطابقة.</p>';
    }
}

document.getElementById('searchInput').addEventListener('input', (event) => {
    const searchTerm = event.target.value;
    if (searchTerm.length > 1) {
        const results = filterWorkers(searchTerm);
        displayResults(results);
    } else {
        document.getElementById('result').innerHTML = '';
    }
});

// Update footer with dynamic date and shift
function updateFooter() {
    const footerInfo = document.getElementById('footer-info');
    const now = new Date();
    const hour = now.getHours();

    let shiftText;
    if (hour >= 7 && hour < 19) {
        shiftText = "الصباحية";
    } else {
        shiftText = "الليلية";
    }

    const formattedDate = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

    footerInfo.textContent = `الوردية: ${shiftText} | التاريخ: ${formattedDate} | شركة الأمن المسؤولة: Middle East`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateFooter();
    setInterval(updateFooter, 60000);
});
