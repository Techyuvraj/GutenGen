import React, { useState, useRef } from 'react';

const ImageUpload = ({ onImageSelect, compact, currentImage }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleFile = (file) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                onImageSelect(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file.');
        }
    };

    return (
        <div
            className={`upload-zone ${isDragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            style={{
                padding: compact ? '2rem 1rem' : '3rem 1.5rem',
                textAlign: 'center',
                cursor: 'pointer',
                background: isDragging ? '#F5F3FF' : '#F8FAFC',
                border: '2px dashed ' + (isDragging ? '#7C3AED' : '#CBD5E1'),
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileSelect}
            />

            {currentImage ? (
                <div style={{ position: 'relative' }}>
                    <img
                        src={currentImage}
                        alt="Uploaded Design"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '300px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    <div style={{
                        marginTop: '1rem',
                        color: '#64748B',
                        fontSize: '0.875rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        <span>Click to replace</span>
                    </div>
                </div>
            ) : (
                <div style={{ pointerEvents: 'none' }}>
                    <div style={{
                        marginBottom: '1rem',
                        color: '#7C3AED',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                    </div>

                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#1E293B', fontSize: '1rem', fontWeight: 600 }}>
                        Drag & drop your design
                    </h3>
                    <p style={{ margin: '0 0 1rem 0', color: '#64748B', fontSize: '0.875rem' }}>
                        or click to browse
                    </p>

                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {['PNG', 'JPG', 'WebP'].map(tag => (
                            <span key={tag} style={{
                                fontSize: '0.75rem',
                                background: '#E2E8F0',
                                color: '#475569',
                                padding: '4px 8px',
                                borderRadius: '6px',
                                fontWeight: 500
                            }}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
