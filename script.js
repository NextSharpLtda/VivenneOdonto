(function(){
  const hamburger=document.querySelector('.hamburger');
  const mobile=document.querySelector('#mobile-menu');
  hamburger.addEventListener('click',()=>{
    const open=hamburger.getAttribute('aria-expanded')!=='true';
    hamburger.setAttribute('aria-expanded',String(open));
    hamburger.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
    mobile.setAttribute('aria-hidden',String(!open));
  });
  mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    hamburger.setAttribute('aria-expanded','false');
    hamburger.setAttribute('aria-label','Abrir menu');
    mobile.setAttribute('aria-hidden','true');
  }));
  const dlg=document.querySelector('#photo-dialog');
  document.querySelectorAll('.gallery-item').forEach(el=>el.addEventListener('click',()=>{
    document.querySelector('#dialog-image').src=el.dataset.photo;
    document.querySelector('#dialog-image').alt=el.dataset.caption||'Foto ampliada';
    dlg.showModal();
  }));
  document.querySelector('#close-photo').addEventListener('click',()=>dlg.close());
  dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
  document.querySelector('#contact-form').addEventListener('submit',async e=>{
    e.preventDefault();
    const name=document.querySelector('#contact-name').value.trim();
    const message=`Olá! Meu nome é ${name}. Gostaria de saber mais sobre uma avaliação na Vivienne Odontologia Especializada.`;
    let ok=false;
    try {await navigator.clipboard.writeText(message);ok=true;}catch(_){
      const a=document.createElement('textarea'); a.value=message;
      a.style.position='fixed';a.style.top='-999px';document.body.appendChild(a);a.focus();a.select();
      try{ok=document.execCommand('copy')}catch(_){} a.remove();
    }
    const status=document.querySelector('#copy-status');
    status.textContent=ok?'Mensagem copiada! Agora você pode enviá-la pelo canal oficial da clínica.':`Copie esta mensagem para enviar à clínica: “${message}”`;
  });
})();
