// Custom Swagger UI JavaScript Enhancements

document.addEventListener('DOMContentLoaded', function() {
  // Custom initialization
  initializeCustomSwaggerUI();
});

function initializeCustomSwaggerUI() {
  // Add custom header with logo and title
  addCustomHeader();
  
  // Enhance API section styling
  enhanceAPISections();
  
  // Add custom animations
  addCustomAnimations();
  
  // Enhance mobile responsiveness
  enhanceMobileResponsiveness();
  
  // Add custom tooltips
  addCustomTooltips();
  
  // Enhance search functionality
  enhanceSearchFunctionality();
}

function addCustomHeader() {
  const topbar = document.querySelector('.swagger-ui .topbar');
  if (topbar) {
    // Create custom header content
    const headerContent = `
      <div class="custom-header">
        <div class="header-left">
          <div class="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L20.472 10.944L30 12.472L22.5 19.528L24.944 29L16 24.472L7.056 29L9.5 19.528L2 12.472L11.528 10.944L16 2Z" fill="white"/>
            </svg>
          </div>
          <div class="header-text">
            <h1>Movie Ticketing API</h1>
            <p>Interactive API Documentation</p>
          </div>
        </div>
        <div class="header-right">
          <div class="version-badge">v1.0.0</div>
        </div>
      </div>
    `;
    
    topbar.innerHTML = headerContent;
  }
}

function enhanceAPISections() {
  // Add custom styling to API sections
  const apiSections = document.querySelectorAll('.opblock-tag-section');
  
  apiSections.forEach(section => {
    const header = section.querySelector('h3');
    if (header) {
      // Add expand/collapse functionality
      header.addEventListener('click', function() {
        const isOpen = section.classList.contains('is-open');
        if (isOpen) {
          section.classList.remove('is-open');
        } else {
          section.classList.add('is-open');
        }
      });
      
      // Add custom arrow indicator
      const arrow = document.createElement('span');
      arrow.className = 'section-arrow';
      arrow.innerHTML = '▼';
      header.appendChild(arrow);
    }
  });
}

function addCustomAnimations() {
  // Add smooth animations for expanding/collapsing
  const style = document.createElement('style');
  style.textContent = `
    .opblock-tag-section {
      transition: all 0.3s ease;
    }
    
    .opblock-tag-section.is-open {
      transform: translateY(0);
      opacity: 1;
    }
    
    .opblock-tag-section:not(.is-open) .opblock {
      display: none;
    }
    
    .section-arrow {
      transition: transform 0.3s ease;
    }
    
    .opblock-tag-section.is-open .section-arrow {
      transform: rotate(180deg);
    }
  `;
  document.head.appendChild(style);
}

function enhanceMobileResponsiveness() {
  // Add mobile-specific enhancements
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .custom-header {
        flex-direction: column;
        text-align: center;
      }
      
      .header-left {
        margin-bottom: 10px;
      }
      
      .opblock-summary {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .opblock-summary-method {
        margin-bottom: 10px;
      }
      
      .opblock-summary-path {
        word-break: break-all;
      }
    }
  `;
  document.head.appendChild(style);
}

function addCustomTooltips() {
  // Add custom tooltips for better UX
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      const tooltip = document.createElement('div');
      tooltip.className = 'custom-tooltip';
      tooltip.textContent = this.getAttribute('data-tooltip');
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = rect.left + 'px';
      tooltip.style.top = (rect.top - 30) + 'px';
    });
    
    element.addEventListener('mouseleave', function() {
      const tooltip = document.querySelector('.custom-tooltip');
      if (tooltip) {
        tooltip.remove();
      }
    });
  });
}

function enhanceSearchFunctionality() {
  // Enhance the search functionality
  const searchInput = document.querySelector('.swagger-ui input[type="text"]');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const apiEndpoints = document.querySelectorAll('.opblock');
      
      apiEndpoints.forEach(endpoint => {
        const path = endpoint.querySelector('.opblock-summary-path');
        const description = endpoint.querySelector('.opblock-summary-description');
        
        if (path && description) {
          const pathText = path.textContent.toLowerCase();
          const descText = description.textContent.toLowerCase();
          
          if (pathText.includes(searchTerm) || descText.includes(searchTerm)) {
            endpoint.style.display = 'block';
            endpoint.style.opacity = '1';
          } else {
            endpoint.style.display = 'none';
            endpoint.style.opacity = '0';
          }
        }
      });
    });
  }
}

// Add custom CSS for enhanced styling
function addCustomStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .custom-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }
    
    .header-left {
      display: flex;
      align-items: center;
    }
    
    .logo {
      margin-right: 15px;
    }
    
    .header-text h1 {
      color: white;
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    
    .header-text p {
      color: rgba(255, 255, 255, 0.8);
      margin: 0;
      font-size: 14px;
    }
    
    .version-badge {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }
    
    .custom-tooltip {
      position: absolute;
      background: #333;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 1000;
      pointer-events: none;
      white-space: nowrap;
    }
    
    .custom-tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border: 4px solid transparent;
      border-top-color: #333;
    }
    
    .section-arrow {
      margin-left: auto;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.8);
    }
    
    /* Enhanced button styling */
    .swagger-ui .btn {
      border-radius: 6px;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    
    .swagger-ui .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    /* Enhanced input styling */
    .swagger-ui input,
    .swagger-ui textarea,
    .swagger-ui select {
      border-radius: 6px;
      border: 2px solid #e0e0e0;
      transition: border-color 0.3s ease;
    }
    
    .swagger-ui input:focus,
    .swagger-ui textarea:focus,
    .swagger-ui select:focus {
      border-color: #667eea;
      outline: none;
    }
    
    /* Loading animation */
    .swagger-ui .loading {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Success/Error message styling */
    .swagger-ui .response-col_status.response-200 {
      background: #e8f5e8;
      color: #2e7d32;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
    }
    
    .swagger-ui .response-col_status.response-400,
    .swagger-ui .response-col_status.response-401,
    .swagger-ui .response-col_status.response-404,
    .swagger-ui .response-col_status.response-500 {
      background: #ffebee;
      color: #d32f2f;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: 600;
    }
  `;
  document.head.appendChild(style);
}

// Initialize custom styles
addCustomStyles();

// Export functions for external use
window.SwaggerUICustom = {
  initializeCustomSwaggerUI,
  addCustomHeader,
  enhanceAPISections,
  addCustomAnimations,
  enhanceMobileResponsiveness,
  addCustomTooltips,
  enhanceSearchFunctionality
};
