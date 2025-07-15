function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
}

window.onload = function () {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
};

function showDetails(sub) {
  const container = document.getElementById('details');
  container.innerHTML = `
    <h2>${sub}</h2>
    <div class='grid'>
      <div class='card' onclick="showSteps('${sub}', 'ممثل الدعم')">ممثل الدعم</div>
      <div class='card' onclick="showSteps('${sub}', 'إداري القسم')">إداري القسم</div>
    </div>`;
}

function showSteps(sub, role) {
  const data = {
    "اعتراض على مبلغ حادث": {
      "ممثل الدعم": {
        "بداية": "يتم استقبال الطلب وتوثيقه في النظام.",
        "متابعة": "يتم متابعة الحادث مع فريق التقدير.",
        "إغلاق": "يتم إشعار العميل بقرار الخصم أو الإعفاء."
      },
      "إداري القسم": {
        "بداية": "مراجعة بيانات الحادث والتحقق من الملف.",
        "متابعة": "تنسيق مع الجهات ذات العلاقة لاستكمال المستندات.",
        "إغلاق": "اتخاذ القرار النهائي وتحديث النظام."
      }
    },
    "اعتراض على مبلغ مخالفة مرورية": {
      "ممثل الدعم": {
        "بداية": "يتم استلام اعتراض العميل.",
        "متابعة": "رفع الطلب للإدارة المختصة.",
        "إغلاق": "إبلاغ العميل بالنتيجة."
      },
      "إداري القسم": {
        "بداية": "التحقق من بيانات المخالفة.",
        "متابعة": "مخاطبة الجهات المعنية بالمخالفة.",
        "إغلاق": "إغلاق الطلب وتوثيق الرد."
      }
    }
  };

  const steps = data[sub]?.[role];
  if (!steps) return;

  const container = document.getElementById('details');
  container.innerHTML += `
    <h3>${role}</h3>
    <div class='grid'>
      <div class='card'>بداية الطلب: ${steps["بداية"]}</div>
      <div class='card'>متابعة الطلب: ${steps["متابعة"]}</div>
      <div class='card'>الإغلاق: ${steps["إغلاق"]}</div>
    </div>`;
}