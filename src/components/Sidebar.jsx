import React from 'react';
import ImageUpload from './ImageUpload';
import { TEMPLATES } from '../data/templates';
import HistoryGrid from './HistoryGrid';

const Sidebar = ({
    framework,
    setFramework,
    onImageSelect,
    currentImage,
    currentType,
    onTemplateSelect,
    onHistorySelect,
    sidebarView
}) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon">GD</div>
                <span className="logo-text">GutenDraft</span>
            </div>

            {/* Scrollable Tool Wrapper */}
            <div style={{
                flex: 1,
                overflowY: 'auto',
                paddingRight: '0.5rem',
                marginRight: '-0.5rem',
                marginBottom: '1rem'
            }}>
                {sidebarView === 'default' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Upload Section */}
                        <div className="card">
                            {/* ... existing upload content ... */}
                            <div className="card-header">
                                <span>Upload Design</span>
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                                        Target Framework
                                    </label>
                                    <select
                                        value={framework}
                                        onChange={(e) => setFramework(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.75rem',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border-color)',
                                            backgroundColor: 'var(--bg-input)',
                                            color: 'var(--text-primary)',
                                            fontSize: '0.95rem',
                                            outline: 'none'
                                        }}
                                    >
                                        <option value="gutenberg">Gutenberg Core (Default)</option>
                                        <option value="astra">Astra Theme Optimized</option>
                                        <option value="spectra">Spectra Blocks (UAGB)</option>
                                        <option value="nexter">Nexter Blocks (The Plus Addons)</option>
                                    </select>
                                </div>

                                <ImageUpload
                                    onImageSelect={onImageSelect}
                                    currentImage={currentImage}
                                    currentType={currentType}
                                    compact={!!currentImage}
                                />
                            </div>
                        </div>

                        {/* Quick Start Templates */}
                        <div className="card">
                            <div className="card-header">
                                <span>Quick Start Templates</span>
                            </div>
                            <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                                {TEMPLATES.map(template => (
                                    <button
                                        key={template.id}
                                        onClick={() => onTemplateSelect(template.id)}
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            padding: '1rem',
                                            background: 'var(--bg-body)',
                                            border: '1px solid var(--border-color)',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            textAlign: 'center'
                                        }}
                                        className="template-btn"
                                    >
                                        <span style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{template.name}</span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{template.description}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <HistoryGrid onSelect={onHistorySelect} />
                )}
            </div>


            <div style={{ marginTop: 'auto', padding: '1rem', background: 'var(--bg-card-hover)', borderRadius: '12px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>Pro Plan</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Unlimited Generations</div>
            </div>
        </aside>
    );
};

export default Sidebar;
