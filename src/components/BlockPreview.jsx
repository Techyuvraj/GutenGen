import React, { useMemo } from 'react';

const BlockPreview = ({ code }) => {
  const htmlContent = useMemo(() => {
    if (!code) return '';

    // Strip comments
    let html = code.replace(/<!--\s*wp:[\s\S]*?-->/g, '')
      .replace(/<!--\s*\/wp:[\s\S]*?-->/g, '');

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const images = doc.querySelectorAll('img');

    images.forEach((img, index) => {
      const existingSrc = img.getAttribute('src');
      const isAbsoluteUrl = existingSrc && (existingSrc.startsWith('http') || existingSrc.startsWith('data:'));
      const isPlaceholder = existingSrc && (existingSrc.includes('placeholder') || existingSrc.includes('demo') || existingSrc.includes('image-url'));

      if (!existingSrc || !isAbsoluteUrl || isPlaceholder) {
        let width = img.getAttribute('width') || 600;
        let height = img.getAttribute('height') || 400;
        const text = `Image ${index + 1}`;
        img.setAttribute('src', `https://placehold.co/${width}x${height}/2563eb/FFF?text=${text}`);
      }

      img.style.display = 'block';
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.borderRadius = '8px';
      img.style.backgroundColor = '#e2e8f0';
    });

    return doc.body.innerHTML;
  }, [code]);

  const containerRef = React.useRef(null);
  const shadowRootRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    // Initialize shadow root once
    if (!shadowRootRef.current) {
      shadowRootRef.current = containerRef.current.attachShadow({ mode: 'open' });
    }

    // Construct the Shadow DOM content
    // We inject the external sheets and our custom styles INSIDE the shadow root
    // This strictly isolates them from the rest of the app
    shadowRootRef.current.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@wordpress/block-library@8.14.0/build-style/style.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gutenberg-css@0.7.0/dist/gutenberg.min.css" />
      <style>
        /* Astra Theme Simulation & Reset */
        :host {
          display: block;
          height: 100%;
          overflow-y: auto;
          background-color: #fff;
        }

        .block-preview-viewport {
          /* Astra Default Font Stack */
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
          color: #3a3a3a; /* Astra default text color */
          line-height: 1.6;
          font-size: 16px;
          background-color: #fff;
        }

        .block-preview-viewport * {
          box-sizing: border-box;
        }

        /* Astra Headings */
        .block-preview-viewport h1, 
        .block-preview-viewport h2, 
        .block-preview-viewport h3, 
        .block-preview-viewport h4, 
        .block-preview-viewport h5, 
        .block-preview-viewport h6 {
          font-weight: 600;
          color: #3a3a3a;
          margin-bottom: 0.6em;
          line-height: 1.2;
        }
        
        .block-preview-viewport h1 { font-size: 2.5rem; }
        .block-preview-viewport h2 { font-size: 2rem; }
        .block-preview-viewport h3 { font-size: 1.75rem; }
        .block-preview-viewport h4 { font-size: 1.5rem; }

        .block-preview-viewport p {
          margin-bottom: 1.5em;
        }

        .block-preview-viewport a {
          color: #0274be; /* Astra Link Color */
          text-decoration: none;
        }
        
        .block-preview-viewport a:hover {
          color: #3a3a3a;
        }

        /* Container Width (Astra standard content width) */
        .block-preview-viewport > div {
          padding: 3rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Fix map or generated content sizing if needed */
        .wp-block-image img {
          height: auto;
          max-width: 100%;
        }

        /* Ensure columns behave responsibly */
        @media (max-width: 780px) {
           .wp-block-columns {
             flex-direction: column !important;
           }
           
           .wp-block-column {
             flex-basis: 100% !important;
             margin-left: 0 !important;
             margin-right: 0 !important;
           }
        }
      </style>
      <div class="block-preview-viewport">
         <div class="gutenberg-content">${htmlContent}</div>
      </div>
    `;
  }, [htmlContent]);

  return (
    <div
      ref={containerRef}
      style={{ height: '100%', width: '100%', background: 'white' }}
      title="Live Preview"
    />
  );
};

export default BlockPreview;
