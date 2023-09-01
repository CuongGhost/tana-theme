// Function to calculate the scroll progress
function getScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  return window.scrollY / scrollableHeight;
}

// Function to create a link for the table of contents
function createLink(element) {
  const link = document.createElement('a');
  link.className = 'sm-toc-link';
  link.href = `#${element.id}`;
  link.textContent = element.textContent;
  return link;
}

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Main function to create a table of contents
export default function toc() {
  const postContainer = document.querySelector('.post');
  const tocContainer = document.querySelector('.sm-post-toc');
  const tocContentContainer = document.querySelector('.sm-post-toc-contents');
  const headings = postContainer?.querySelectorAll(':where(h2)[id]');
  const btn = document.querySelector('.sm-post-toc-btn');

  // If the necessary elements don't exist, hide the table of contents
  if (!tocContainer || !postContainer || !headings || headings.length < 3) {
    if (tocContainer) {
      tocContainer.style.display = 'none';
    }
    return;
  }

  // Create a document fragment to hold the links
  const linkFragment = document.createDocumentFragment();
  const linkMap = new Map();
  headings.forEach((heading) => {
    const link = createLink(heading);
    linkFragment.appendChild(link);
    linkMap.set(heading.id, link);
  });
  tocContentContainer.appendChild(linkFragment);

  // Add a class to the table of contents container
  tocContainer.classList.add('toc-enabled');

  // Create an Intersection Observer to watch the headings
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      if (!id) return;
      const activeLink = linkMap.get(id);
      if (entry.isIntersecting) {
        activeLink.classList.add('sm-toc-active');
        Array.from(tocContainer.querySelectorAll('a')).forEach((link) => {
          if (link !== activeLink) link.classList.remove('sm-toc-active');
        });
      }
    });
  }, observerOptions);

  // Add a click event listener to the button
  btn.addEventListener('click', () => {
    tocContentContainer.classList.toggle('toc-show');
    if (tocContentContainer.classList.contains('toc-show')) {
      headings.forEach((heading) => observer.observe(heading));
    } else {
      headings.forEach((heading) => observer.unobserve(heading));
    }
  });

  // Add a scroll event listener to the document
  document.addEventListener('scroll', debounce(() => {
    const scrollPos = getScrollProgress();
    btn.style.setProperty(
      '--conic-gradient',
      `var(--ghost-accent-color) 0deg 0%, var(--ghost-accent-color) 0deg ${
        scrollPos * 100
      }%, #ebf8ff 0deg ${
        1 - scrollPos * 100
      }%, #ebf8ff 0deg 360deg`
    );
  }, 200)); // Adjust the debounce wait time as needed
}
