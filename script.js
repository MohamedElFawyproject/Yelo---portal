function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark);
}
window.onload = function() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
}
function showDetails(sub) {
  const container = document.getElementById('details');
  container.innerHTML = `
    <h2>${sub}</h2>
    <div class='grid'>
      <div class='card' onclick="showSteps('ممثل الدعم')">ممثل الدعم</div>
      <div class='card' onclick="showSteps('إداري القسم')">إداري القسم</div>
    </div>`;
}
function showSteps(role) {
  const container = document.getElementById('details');
  container.innerHTML += `
    <h3>${role}</h3>
    <div class='grid'>
      <div class='card'>بداية الطلب</div>
      <div class='card'>متابعة الطلب</div>
      <div class='card'>الإغلاق</div>
    </div>`;
}