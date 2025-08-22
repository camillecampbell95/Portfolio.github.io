// Persist the uploaded avatar across pages using localStorage
const avatarImg = document.querySelector('[data-avatar]');
const fileInput = document.querySelector('#avatarInput');

function loadAvatar(){
  try{
    const dataURL = localStorage.getItem('camille_avatar');
    if (dataURL && avatarImg) avatarImg.src = dataURL;
  }catch(e){}
}

function handleUpload(file){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = e=>{
    const dataURL = e.target.result;
    localStorage.setItem('camille_avatar', dataURL);
    if (avatarImg) avatarImg.src = dataURL;
  };
  reader.readAsDataURL(file);
}

if(fileInput){
  fileInput.addEventListener('change', e=> handleUpload(e.target.files?.[0]));
}

// Highlight current page in nav
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a=>{
    const href = a.getAttribute('href');
    if((path === '' && href === 'index.html') || href === path) {
      a.classList.add('active');
    }
  });
})();

loadAvatar();
