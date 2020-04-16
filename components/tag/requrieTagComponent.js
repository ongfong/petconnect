import { useState, useEffect } from 'react';
import { requiretag } from '../../actions/tag';
import Router from 'next/router';

const RequireTagComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        houseNumber: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, email, houseNumber, error, loading, message, showForm } = values;

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const tag = { name, email, houseNumber };

        requiretag(tag).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    houseNumber: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const RequireTagForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={name}
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        placeholder="Type your name"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        placeholder="Type your email"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={houseNumber}
                        onChange={handleChange('houseNumber')}
                        type="text"
                        className="form-control"
                        placeholder="Type your House number"
                    />
                </div>

                <div>
                    <button className="btn btn-primary">Request Tag</button>
                </div>
            </form>
        );
    };

    return (
        <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && RequireTagForm()}
        </React.Fragment>
    );
};

export default RequireTagComponent;