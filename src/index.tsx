import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Function to create the full-width enroll button
function createFullWidthEnrollButton() {
  // Check if this is a course detail page by checking the URL
  const path = window.location.pathname;
  
  // Only show on course detail URLs (looking for URLs with /courses/ or /course/ followed by an ID)
  const isCourseDetailPage = /\/courses?\/[^\/]+/.test(path);
  if (!isCourseDetailPage) {
    // Not a course detail page, don't add the button
    return;
  }
  
  // Create or get style element
  let styleEl = document.getElementById('global-full-width-button-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'global-full-width-button-style';
    document.head.appendChild(styleEl);
  }
  
  // Define CSS
  styleEl.innerHTML = `
    #global-enroll-button {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 65px;
      background: linear-gradient(90deg, #3B82F6, #4F46E5);
      color: white;
      font-size: 18px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 1px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      border: none;
      cursor: pointer;
      box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
      animation: gradientBg 3s infinite linear;
      background-size: 200% auto;
    }
    
    #global-enroll-button span {
      margin-right: 12px;
    }
    
    @keyframes gradientBg {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    body {
      padding-bottom: 70px !important;
    }
  `;
  
  // Create button element
  const buttonEl = document.createElement('button');
  buttonEl.id = 'global-enroll-button';
  buttonEl.innerHTML = `
    <span>ENROLL NOW</span>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  `;
  
  // Handle clicks on the button
  buttonEl.addEventListener('click', () => {
    // Find any registration form toggle function or element to click
    const enrollButtons = document.querySelectorAll('button');
    
    // Try to find a button with "Enroll" text
    Array.from(enrollButtons).forEach(btn => {
      if (btn.textContent && btn.textContent.toLowerCase().includes('enroll') && btn.id !== 'global-enroll-button') {
        btn.click();
      }
    });
  });
  
  // Add to DOM
  document.body.appendChild(buttonEl);
}

// Function to handle route changes (for single page applications)
function handleRouteChange() {
  // Remove any existing button
  const existingButton = document.getElementById('global-enroll-button');
  if (existingButton) {
    existingButton.remove();
  }
  
  // Reset body padding
  document.body.style.paddingBottom = '';
  
  // Create button if on a course detail page
  createFullWidthEnrollButton();
}

// Listen for URL changes in single page applications
window.addEventListener('popstate', handleRouteChange);

// Initial setup when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFullWidthEnrollButton);
} else {
  createFullWidthEnrollButton();
}

// Add an additional function to force scroll restoration on navigation
function resetScrollOnNavigation() {
  // Listen for clicks on anchor tags
  document.addEventListener('click', (e) => {
    // Check if the clicked element is an HTMLElement
    if (e.target && e.target instanceof HTMLElement) {
      // Use the closest method to find the nearest anchor parent
      const anchor = e.target.closest('a');
      if (anchor) {
        // Get the href attribute
        const href = anchor.getAttribute('href');
        
        // If it's an internal link (starts with / but not //)
        if (href && href.startsWith('/') && !href.startsWith('//')) {
          // Force scroll to top
          window.scrollTo(0, 0);
        }
      }
    }
  });
}

// Listen for single page app navigation
window.addEventListener('popstate', () => {
  window.scrollTo(0, 0);
});

// Initialize scroll reset
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', resetScrollOnNavigation);
} else {
  resetScrollOnNavigation();
}
