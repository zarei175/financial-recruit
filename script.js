// ---------- Database Mock ----------
const database = [
  { personnelId: '10123', fullname: 'علی احمدی' },
  { personnelId: '10124', fullname: 'زهرا محمدی' },
  { personnelId: '10125', fullname: 'رضا رحیمی' }
];

// ---------- DOM ----------
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const loginForm = document.getElementById('loginForm');
const applyForm = document.getElementById('applyForm');
const userNameSpan = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');
const loginMsg = document.getElementById('loginMsg');
const formMsg = document.getElementById('formMsg');
const qrImg = document.getElementById('qrImg');

// ---------- Login ----------
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const id = document.getElementById('personnelId').value.trim();
  const user = database.find(u => u.personnelId === id);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    showDashboard(user);
  } else {
    loginMsg.textContent = 'شماره پرسنلی یافت نشد.';
    loginMsg.className = 'msg error';
    loginMsg.classList.remove('hidden');
  }
});

// ---------- Show Dashboard ----------
function showDashboard(user) {
  loginSection.classList.add('hidden');
  dashboardSection.classList.remove('hidden');
  userNameSpan.textContent = user.fullname;
  document.querySelector('[name="personnelId"]').value = user.personnelId;
  document.querySelector('[name="fullname"]').value = user.fullname;
  document.querySelector('[name="personnelIdDisplay"]').value = user.personnelId;
}

// ---------- Logout ----------
logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('currentUser');
  location.reload();
});

// ---------- Auto Login ----------
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('currentUser');
  if (saved) showDashboard(JSON.parse(saved));
});

// ---------- Form Submit ----------
applyForm.addEventListener('submit', e => {
  e.preventDefault();
  const file = applyForm.resume.files[0];
  if (!file || file.type !== 'application/pdf' || file.size > 2 * 1024 * 1024) {
    formMsg.textContent = 'لطفاً فایل PDF تا ۲ مگابایت آپلود کنید.';
    formMsg.className = 'msg error';
    return;
  }

  // Save locally (demo)
  const data = Object.fromEntries(new FormData(applyForm));
  data.resumeName = file.name;
  data.date = new Date().toLocaleString('fa-IR');
  localStorage.setItem(`request-${Date.now()}`, JSON.stringify(data));

  formMsg.textContent = 'درخواست شما با موفقیت ثبت شد. بعد از بررسی با شما تماس خواهیم گرفت.';
  formMsg.className = 'msg success';
  applyForm.reset();
});

// ---------- QR Code ----------
qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(location.href)}`;