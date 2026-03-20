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

function selectScale(btn, fieldName, value) {
  const group = btn.closest('.scale-group');
  if (group) {
    group.querySelectorAll('.scale-btn').forEach(function (b) {
      b.classList.remove('selected');
    });
  }
  btn.classList.add('selected');


  const hiddenInput = document.getElementById('scaleValue_' + fieldName);
  if (hiddenInput) {
    hiddenInput.value = value;
  }
}

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
