
//Count form pages, then show success on final submission page load
var frameLoadCount = 0;
var FORM_PAGE_COUNT = 4; //limit

function handleFrameLoad() {
  frameLoadCount++;
  if (frameLoadCount <= FORM_PAGE_COUNT) return;
  //this load is the submission confirmation page
  var frame = document.getElementById('surveyFrame');
  var success = document.getElementById('surveySuccess');
  if (frame && success) {
    frame.style.display = 'none';
    success.style.display = 'block';
    window.scrollTo({ top: success.offsetTop - 80, behavior: 'smooth' });
  }
}

// Check if neccessary, or just add active tag to pages manually
(function setActiveNav() {
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    link.classList.remove('active');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
})();

// Show success message if Formspree redirected back after contact form submission
if (new URLSearchParams(window.location.search).get('success') === 'true') {
  var contactSuccess = document.getElementById('contact-success');
  var contactForm = document.getElementById('contact-form');
  if (contactSuccess && contactForm) {
    contactSuccess.style.display = 'block';
    contactForm.style.display = 'none';
  }
}

// Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
