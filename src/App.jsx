import React, { useState } from 'react';
import Template from './components/BlockPreview';
import ChatInterface from './components/ChatInterface';
import { generateGutenbergBlocks, refineGutenbergBlocks } from './services/openai';
import { parseGutenbergToJSON } from './utils/blockParser';
import { getTemplateCode } from './data/templates';

import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const [image, setImage] = useState(null);
  const [inputType, setInputType] = useState('image'); // 'image' | 'url'
  const [xdUrl, setXdUrl] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('preview');
  const [theme, setTheme] = useState('light');
  const [chatMessages, setChatMessages] = useState([]);
  const [isRefining, setIsRefining] = useState(false);
  const [framework, setFramework] = useState('gutenberg');
  const [copySuccess, setCopySuccess] = useState('');
  const { logout, user } = useAuth();

  // Initialize theme
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);


  const handleReset = () => {
    setImage(null);
    setXdUrl('');
    setInputType('image');
    setGeneratedCode('');
    setChatMessages([]);
    setError(null);
    setIsLoading(false);
    setActiveTab('preview');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(''), 2000);
  };

  const handleImageSelect = async (inputData) => {
    // Handle both legacy string (image only) and new object format
    const type = inputData.type || 'image';
    const content = inputData.content || inputData;
    const context = inputData.context || ''; // Get description if available

    setInputType(type);
    if (type === 'image') {
      setImage(content);
      setXdUrl('');
    } else {
      setXdUrl(content);
      setImage(null);
    }

    setIsLoading(true);
    setError(null);
    setGeneratedCode('');
    setChatMessages([]); // Reset chat on new upload

    try {
      const code = await generateGutenbergBlocks(content, framework, type, context);
      setGeneratedCode(code);
      setChatMessages([{ role: 'ai', content: type === 'url' ? 'I analyzed the design from using the URL and your description. How can I refine it?' : 'I rendered the initial blocks based on your design. How can I refine it?' }]);
    } catch (err) {
      // Check for 401 or Unauthorized
      if (err.message.includes('401') || err.message.toLowerCase().includes('unauthorized')) {
        setError('Your session has expired. Please login again.');
        logout();
      } else {
        setError(err.message || 'Failed to generate blocks. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleTemplateSelect = (templateId) => {
    setIsLoading(true);
    setGeneratedCode('');
    setError(null);
    setChatMessages([]);
    setImage(null); // Clear image if a template is selected
    setXdUrl('');

    // Simulate a brief loading for UX
    setTimeout(() => {
      const code = getTemplateCode(templateId, framework);
      setGeneratedCode(code);
      setChatMessages([{ role: 'ai', content: `I've generated a ${templateId} template for ${framework}. You can now customize it or export it.` }]);
      setIsLoading(false);
    }, 600);
  };

  const handleChatRefinement = async (userPrompt) => {
    // Add user message immediately
    const newHistory = [...chatMessages, { role: 'user', content: userPrompt }];
    setChatMessages(newHistory);
    setIsRefining(true);

    try {
      const updatedCode = await refineGutenbergBlocks(generatedCode, userPrompt);
      setGeneratedCode(updatedCode);
      setChatMessages([...newHistory, { role: 'ai', content: 'Code updated successfully!' }]);
    } catch (err) {
      setChatMessages([...newHistory, { role: 'ai', content: 'Sorry, I failed to update the code. Please try again.' }]);
    } finally {
      setIsRefining(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        framework={framework}
        setFramework={setFramework}
        onImageSelect={handleImageSelect}
        currentImage={image || xdUrl}
        currentType={inputType}
        onTemplateSelect={handleTemplateSelect}
        onHistorySelect={(code, prompt) => {
          setGeneratedCode(code);
          setChatMessages([{ role: 'ai', content: `Loaded generation: "${prompt}"` }]);
          setImage(null);
          setXdUrl('');
          setIsLoading(false);
        }}
        sidebarView={sidebarView}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <DashboardHeader
          theme={theme}
          toggleTheme={toggleTheme}
          onReset={handleReset}
          sidebarView={sidebarView}
          setSidebarView={setSidebarView}
        />

        <main className="dashboard-container">
          {/* Main Area: Results */}

          {/* Right Column: Results */}
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
            <div className="card-header" style={{ justifyContent: 'space-between' }}>
              <span>Generated Code</span>
              {generatedCode && (
                <span style={{
                  fontSize: '0.75rem',
                  background: 'var(--accent-light)',
                  color: 'var(--accent-primary)',
                  padding: '4px 8px',
                  borderRadius: '6px'
                }}>
                  Version 1.0
                </span>
              )}
            </div>

            {(!image && !xdUrl && !generatedCode) ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                <div style={{
                  width: 64, height: 64, background: 'var(--bg-body)', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <p>Upload a design to start generating code</p>
              </div>
            ) : (
              <>
                {isLoading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Analyzing design structure...</p>
                  </div>
                ) : generatedCode ? (
                  <>
                    <div className="tabs">
                      <button
                        className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('preview')}
                      >
                        Live Preview
                      </button>
                      <button
                        className={`tab ${activeTab === 'code' ? 'active' : ''}`}
                        onClick={() => setActiveTab('code')}
                      >
                        Block Markup
                      </button>
                      <button
                        className={`tab ${activeTab === 'json' ? 'active' : ''}`}
                        onClick={() => setActiveTab('json')}
                      >
                        Block JSON
                      </button>
                      <button
                        className={`tab ${activeTab === 'chat' ? 'active' : ''}`}
                        onClick={() => setActiveTab('chat')}
                      >
                        AI Assistant
                      </button>
                    </div>

                    <div style={{ padding: '0 0.5rem 0.5rem', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                      {activeTab === 'code' && (
                        <div className="code-viewer-container" style={{ margin: '0.5rem' }}>
                          <textarea
                            className="code-textarea"
                            value={generatedCode}
                            readOnly
                          />
                          <div style={{ position: 'absolute', top: '10px', right: '25px', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            {copySuccess === 'code' && (
                              <span style={{ fontSize: '0.75rem', color: '#4ade80', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>Copied!</span>
                            )}
                            <button
                              className="btn-icon"
                              onClick={() => handleCopy(generatedCode, 'code')}
                              title="Copy Code"
                              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {activeTab === 'preview' && (
                        <div className="code-viewer-container" style={{ background: 'white', border: 'none', borderRadius: '0', margin: '0.5rem' }}>
                          <div style={{ height: '100%', overflowY: 'auto' }}>
                            <Template code={generatedCode} />
                          </div>
                        </div>
                      )}

                      {activeTab === 'json' && (
                        <div className="code-viewer-container" style={{ margin: '0.5rem' }}>
                          <textarea
                            className="code-textarea"
                            value={JSON.stringify(parseGutenbergToJSON(generatedCode), null, 2)}
                            readOnly
                          />
                          <div style={{ position: 'absolute', top: '10px', right: '25px', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            {copySuccess === 'json' && (
                              <span style={{ fontSize: '0.75rem', color: '#4ade80', background: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px' }}>Copied!</span>
                            )}
                            <button
                              className="btn-icon"
                              onClick={() => handleCopy(JSON.stringify(parseGutenbergToJSON(generatedCode), null, 2), 'json')}
                              title="Copy JSON"
                              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}
                            >
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                            </button>
                          </div>
                        </div>
                      )}

                      {activeTab === 'chat' && (
                        <div className="code-viewer-container" style={{ margin: '0.5rem', background: 'var(--bg-card)' }}>
                          <ChatInterface
                            messages={chatMessages}
                            onSendMessage={handleChatRefinement}
                            isLoading={isRefining}
                          />
                        </div>
                      )}
                    </div>
                  </>
                ) : error ? (
                  <div style={{ padding: '2rem', color: '#ef4444', textAlign: 'center' }}>
                    {error}
                    <button onClick={() => setImage(null)} className="btn-primary" style={{ display: 'block', margin: '1rem auto' }}>Try Again</button>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppContent />
      </ProtectedRoute>
    </AuthProvider>
  );
}
