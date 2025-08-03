const workers = [
    { name: "سامح محمد عبد ربه", id: "28010250109876", job: "عامل صيانة", status: "مسموح بالدخول", exclusionReason: "" },
    { name: "أحمد محمد السيد", id: "29505200105678", job: "مهندس معماري", status: "مستبعد", exclusionReason: "عدم الالتزام بسياسات الأمن" },
    { name: "أحمد كمال", id: "28811180102233", job: "فني كهرباء", status: "مسموح بالدخول", exclusionReason: "" },
    { name: "محمد حسن", id: "29207070104455", job: "عامل نظافة", status: "مسموح بالدخول", exclusionReason: "" },
    { name: "أحمد علي", id: "29901010109988", job: "مشرف عمال", status: "مسموح بالدخول", exclusionReason: "" },
    { name: "محمد المحمدي", id: "28703050106677", job: "فني تكييفات", status: "مستبعد", exclusionReason: "انتهاء تصريح العمل" },
    { name: "حسام عزت", id: "29309200107788", job: "عامل نظافة", status: "مسموح بالدخول", exclusionReason: "" },
    { name: "محمود البنا", id: "27508010101122", job: "مدير الموقع", status: "مسموح بالدخول", exclusionReason: "" },
    { name: "السيد صبري", id: "28504100103344", job: "عامل حدائق", status: "مسموح بالدخول", exclusionReason: "" },
    { name: "أحمد نبيل", id: "29011200105566", job: "فني تبريد", status: "مسموح بالدخول", exclusionReason: "" },
    { name: "محمود رمضان", id: "29406080107788", job: "عامل بناء", status: "مسموح بالدخول", exclusionReason: "" },
    { name: "محمود عبد الكريم", id: "29702220109988", job: "فني دهانات", status: "مستبعد", exclusionReason: "عدم وجود تصريح دخول" },
    { name: "إسماعيل", id: "28905150101122", job: "أخصائي عزل", status: "مستبعد", exclusionReason: "انتهاء عقد العمل" }
];

function searchWorker() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    const resultBox = document.getElementById('result');
    resultBox.innerHTML = '';
    resultBox.className = 'result-box';

    if (searchTerm === '') {
        resultBox.innerHTML = '<p>برجاء إدخال اسم أو رقم قومي للبحث.</p>';
        return;
    }

    const searchWords = searchTerm.split(' ');

    let filteredWorkers = [];

    // البحث بالرقم القومي (له الأولوية)
    if (searchTerm.length === 14 && !isNaN(searchTerm)) {
        filteredWorkers = workers.filter(worker => worker.id === searchTerm);
    }
    // البحث بالاسم
    else {
        if (searchWords.length >= 3) {
            // بحث دقيق بالاسم الثلاثي أو أكثر
            filteredWorkers = workers.filter(worker => worker.name === searchTerm);
        } else {
            // بحث جزئي بالاسم الأول أو الثنائي
            const regex = new RegExp(`^${searchTerm}`, 'i');
            filteredWorkers = workers.filter(worker => regex.test(worker.name));
        }
    }

    if (filteredWorkers.length > 0) {
        let resultHTML = '';
        filteredWorkers.forEach(worker => {
            const statusClass = worker.status === 'مستبعد' ? 'status-forbidden' : 'status-allowed';
            const exclusionLine = worker.exclusionReason ? `<p><strong>سبب الاستبعاد:</strong> ${worker.exclusionReason}</p>` : '';
            const jobLine = `<p><strong>الوظيفة:</strong> ${worker.job}</p>`;

            resultHTML += `
                <div class="worker-card">
                    <p><strong>الاسم:</strong> ${worker.name}</p>
                    ${jobLine}
                    <p><strong>الحالة:</strong> <span class="${statusClass}">${worker.status}</span></p>
                    ${exclusionLine}
                </div>
                <hr>
            `;
        });
        resultBox.innerHTML = resultHTML;
    } else {
        resultBox.innerHTML = '<p class="status-forbidden">لا توجد بيانات لهذا العامل.</p>';
    }
}
