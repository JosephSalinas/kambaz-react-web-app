import React, { useState } from 'react';

interface AccessCodeModalProps {
    onSubmit: (code: string) => void;
    onCancel: () => void;
}

const AccessCodeModal: React.FC<AccessCodeModalProps> = ({ onSubmit, onCancel }) => {
    const [accessCode, setAccessCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!accessCode.trim()) {
            setError('Please enter an access code');
            return;
        }
        onSubmit(accessCode);
    };

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Enter Access Code</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Access Code</label>
                                <input
                                    type="text"
                                    className={`form-control ${error ? 'is-invalid' : ''}`}
                                    value={accessCode}
                                    onChange={(e) => {
                                        setAccessCode(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Enter the quiz access code"
                                    autoFocus
                                />
                                {error && <div className="invalid-feedback">{error}</div>}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AccessCodeModal; 