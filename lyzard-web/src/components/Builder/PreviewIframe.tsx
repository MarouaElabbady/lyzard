import React, { useEffect, useRef } from 'react';

interface PreviewIframeProps {
  code: string;
  device?: 'mobile' | 'tablet' | 'desktop';
}

export function PreviewIframe({ code, device = 'desktop' }: PreviewIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const deviceWidths = {
    mobile: '375px',
    tablet: '768px',
    desktop: '100%',
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    doc.open();
    doc.write(code || '<div class="flex items-center justify-center h-full text-neutral-500 font-sans">Your landing page will appear here...</div>');
    doc.close();
  }, [code]);

  return (
    <div className="flex-1 bg-neutral-900 overflow-hidden flex flex-col items-center justify-center p-4">
      <div 
        className="bg-white shadow-2xl rounded-lg overflow-hidden transition-all duration-500 ease-in-out border border-neutral-800"
        style={{ 
          width: deviceWidths[device], 
          height: '100%',
          maxWidth: '100%'
        }}
      >
        <iframe
          ref={iframeRef}
          title="Lyzard Preview"
          className="w-full h-full border-none"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}
