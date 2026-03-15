/* ============================================================
   main.js  —  CyberSafe Website
   ============================================================ */

/* ----------------------------------------------------------
   Accordion toggle
   ---------------------------------------------------------- */
function toggleAccordion(btn) {
  const item = btn.closest('.accordion-item');
  const body = item.querySelector('.accordion-body');
  const isOpen = item.classList.contains('open');

  // Close all other open items
  document.querySelectorAll('.accordion-item.open').forEach(function (openItem) {
    if (openItem !== item) {
      openItem.classList.remove('open');
      openItem.querySelector('.accordion-body').style.maxHeight = null;
    }
  });

  if (isOpen) {
    item.classList.remove('open');
    body.style.maxHeight = null;
  } else {
    item.classList.add('open');
    body.style.maxHeight = body.scrollHeight + 'px';
  }
}

/* ----------------------------------------------------------
   Rating scale buttons (survey page)
   ---------------------------------------------------------- */
function selectScale(btn, fieldName, value) {
  // Deselect siblings in the same scale group
  const group = btn.closest('.scale-group');
  if (group) {
    group.querySelectorAll('.scale-btn').forEach(function (b) {
      b.classList.remove('selected');
    });
  }
  btn.classList.add('selected');

  // Write value into the hidden input for Google Forms
  const hiddenInput = document.getElementById('scaleValue_' + fieldName);
  if (hiddenInput) {
    hiddenInput.value = value;
  }
}

/* ----------------------------------------------------------
   Google Forms embedded iframe — detect submission via load count
   Each page navigation (Next) fires one load; submission fires the
   final load after all pages have been visited.
   Set FORM_PAGE_COUNT to the number of pages in your Google Form.
   ---------------------------------------------------------- */
var frameLoadCount = 0;
var FORM_PAGE_COUNT = 4; // adjust to match the number of pages in the form

function handleFrameLoad() {
  frameLoadCount++;
  // skip loads for the initial render + each "Next" page navigation
  if (frameLoadCount <= FORM_PAGE_COUNT) return;
  // this load is the submission confirmation page
  var frame = document.getElementById('surveyFrame');
  var success = document.getElementById('surveySuccess');
  if (frame && success) {
    frame.style.display = 'none';
    success.style.display = 'block';
    window.scrollTo({ top: success.offsetTop - 80, behavior: 'smooth' });
  }
}

/* ----------------------------------------------------------
   Highlight active nav link based on current page
   ---------------------------------------------------------- */
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

/* ----------------------------------------------------------
   Smooth scroll for anchor links
   ---------------------------------------------------------- */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
