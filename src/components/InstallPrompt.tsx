import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    
    if (result.outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('huihui-install-dismissed', 'true');
  };

  if (!showPrompt || localStorage.getItem('huihui-install-dismissed')) {
    return null;
  }

  return (
    <div className="install-prompt">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 surface rounded-full flex items-center justify-center">
            <Download className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="heading-3">Install HuiHui</h3>
            <p className="caption">Add to your home screen for the best experience</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleInstall}
            className="btn-primary px-4 py-2"
          >
            Install
          </button>
          <button
            onClick={handleDismiss}
            className="btn-ghost p-2 min-h-8 min-w-8"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};