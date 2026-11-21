const BPC_PHONE = "917302614061";
const BPC_EMAIL = "bharatconnect7731@gmail.com";
// After deploying Google Apps Script, paste its Web App URL below.
const ENQUIRY_API_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
document.addEventListener("DOMContentLoaded",()=>{
 const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".navlinks");
 if(toggle&&nav) toggle.addEventListener("click",()=>nav.classList.toggle("open"));
 document.querySelectorAll("[data-phone]").forEach(el=>el.textContent="7302614061");
 document.querySelectorAll("[data-email]").forEach(el=>el.textContent=BPC_EMAIL);
 document.querySelectorAll(".enquiry-form").forEach(form=>{
   form.addEventListener("submit",async e=>{
    e.preventDefault();
    const status=form.querySelector(".form-status");
    const data=Object.fromEntries(new FormData(form).entries());
    data.page=location.pathname;
    if(!data.name||!data.phone||!data.service){status.textContent="Please complete your name, phone number and service.";return;}
    if(ENQUIRY_API_URL.startsWith("PASTE_")){
      status.textContent="The enquiry form is ready. The owner must connect the Google Sheets backend before live submissions can be stored.";
      return;
    }
    const btn=form.querySelector('button[type="submit"]'); if(btn){btn.disabled=true;btn.textContent="Sending...";}
    try{
      await fetch(ENQUIRY_API_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:new URLSearchParams(data).toString()});
      status.textContent="Thank you! Your enquiry has been submitted. Our team will contact you.";
      form.reset();
    }catch(err){status.textContent="Unable to submit right now. Please contact us on WhatsApp or email.";}
    finally{if(btn){btn.disabled=false;btn.textContent="Submit Enquiry";}}
   });
 });
});
