// QR Code generator (simple client-side)
const qrImg = document.getElementById('qrImg');
const url = location.href;
qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;

// Form submit handler
document.getElementById('applyForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;
  const fd = new FormData(form);

  // Validate PDF size
  const file = fd.get('resume');
  if (file.size > 2 * 1024 * 1024) {
    showMsg('حجم فایل بیش از ۲ مگابایت است!', 'error');
    return;
  }

  // Save to localStorage (temporary)
  const record = {
    fullname: fd.get('fullname'),
    nationalId: fd.get('nationalId'),
    mobile: fd.get('mobile'),
    note: fd.get('note'),
    resumeName: file.name,
    date: new Date().toLocaleString('fa-IR')
  };
  const key = `app-${Date.now()}`;
  localStorage.setItem(key, JSON.stringify(record));

  showMsg('درخواست شما با موفقیت ثبت شد. بعد از بررسی با شما تماس خواهیم گرفت.', 'success');
  form.reset();
});

function showMsg(text, type) {
  const msg = document.getElementById('msg');
  msg.textContent = text;
  msg.className = type; // success / error
  msg.classList.remove('hidden');
  setTimeout(() => msg.classList.add('hidden'), 6000);
}