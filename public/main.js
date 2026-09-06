/* Studio Aurora — interakcje (vanilla) */
(function () {
  "use strict";
  var yr = document.getElementById("yr"); if (yr) yr.textContent = new Date().getFullYear();

  var nav = document.querySelector(".nav");
  var onScroll = function () { if (nav) nav.classList.toggle("scrolled", window.scrollY > 20); };
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  var burger = document.querySelector(".burger"), mnav = document.getElementById("mnav"), close = document.querySelector(".mnav__close");
  function setMenu(o){ if(!mnav) return; mnav.classList.toggle("open",o); mnav.setAttribute("aria-hidden",o?"false":"true"); if(burger) burger.setAttribute("aria-expanded",o?"true":"false"); document.body.style.overflow=o?"hidden":""; }
  if(burger) burger.addEventListener("click",function(){ setMenu(!mnav.classList.contains("open")); });
  if(close) close.addEventListener("click",function(){ setMenu(false); });
  if(mnav) mnav.querySelectorAll("a").forEach(function(a){ a.addEventListener("click",function(){ setMenu(false); }); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape") setMenu(false); });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) { els.forEach(function(e){ e.classList.add("in"); }); }
  else { var io = new IntersectionObserver(function(en){ en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add("in"); io.unobserve(x.target);} }); }, { threshold:.1, rootMargin:"0px 0px -8% 0px" }); els.forEach(function(e){ io.observe(e); }); }

  // Accordion zabiegów
  function setAcc(item, open){
    item.classList.toggle("open", open);
    var head = item.querySelector(".acc__head"); if(head) head.setAttribute("aria-expanded", open ? "true":"false");
    var body = item.querySelector(".acc__body");
    if(body) body.style.maxHeight = open ? (body.scrollHeight + "px") : "0px";
  }
  var accItems = document.querySelectorAll(".acc__item");
  accItems.forEach(function(item){
    var head = item.querySelector(".acc__head");
    // init: otwarty pierwszy
    setAcc(item, item.classList.contains("open"));
    head.addEventListener("click", function(){
      var isOpen = item.classList.contains("open");
      accItems.forEach(function(o){ setAcc(o, false); });
      setAcc(item, !isOpen);
    });
  });
  // przelicz wysokość po zmianie rozmiaru okna
  window.addEventListener("resize", function(){
    accItems.forEach(function(item){ if(item.classList.contains("open")){ var b=item.querySelector(".acc__body"); if(b) b.style.maxHeight = b.scrollHeight + "px"; } });
  });

  var canHover = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
  var fabCall = document.getElementById("fab-call");
  if (canHover && fabCall) { fabCall.setAttribute("href","#rezerwacja"); fabCall.setAttribute("aria-label","Przejdź do rezerwacji"); }

  document.querySelectorAll("form.contact-form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var gotcha = form.querySelector('[name="_gotcha"]'); if (gotcha && gotcha.value) return;
      var key = (form.querySelector('[name="access_key"]') || {}).value || "";
      if (key.indexOf("WSTAW") !== -1) { if (status) status.textContent = "Demo: przy wdrożeniu podłączymy formularz pod skrzynkę studia (Web3Forms)."; form.reset(); return; }
      var btn = form.querySelector('button[type="submit"]'); if (btn) btn.disabled = true;
      if (status) status.textContent = "Wysyłanie…";
      fetch(form.action, { method:"POST", headers:{Accept:"application/json"}, body:new FormData(form) })
        .then(function(r){return r.json();})
        .then(function(d){ if(status) status.textContent = d.success ? "Dziękujemy! Oddzwonimy, by potwierdzić wizytę." : "Nie udało się. Zadzwoń: 660 000 000."; form.reset(); })
        .catch(function(){ if(status) status.textContent = "Błąd połączenia. Zadzwoń: 660 000 000."; })
        .then(function(){ if(btn) btn.disabled = false; });
    });
  });
})();
