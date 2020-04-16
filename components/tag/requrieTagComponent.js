import { useState, useEffect } from 'react';
import { requiretag } from '../../actions/tag';
import Router from 'next/router';

const RequireTagComponent = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        houseNumber: '',
        village: '',
        road: '',
        alley: '',
        district: '',
        zone: '',
        province: '',
        postalCode:'',
        error: '',
        loading: false,
        message: '',
        showForm: true
    });

    const { name, email, houseNumber, village, road, alley, district, zone, 
        province, postalCode, error, loading, message, showForm } = values;

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const tag = { name, email, houseNumber, village, road, alley, district, zone, 
            province, postalCode };

        requiretag(tag).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    houseNumber: '',
                    village: '',
                    road: '',
                    alley: '',
                    district: '',
                    zone: '',
                    province: '',
                    postalCode:'',
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

                <div className="form-group">
                    <input
                        value={village}
                        onChange={handleChange('village')}
                        type="text"
                        className="form-control"
                        placeholder="Type your village"
                    />
                </div>

                <div className="form-group">
                    <input
                        value={road}
                        onChange={handleChange('road')}
                        type="text"
                        className="form-control"
                        placeholder="Type your road"
                    />
                </div>
                <div className="form-group">
                    <input
                        value={district}
                        onChange={handleChange('district')}
                        type="text"
                        className="form-control"
                        placeholder="Type your district"
                    />
                </div>
                <div className="form-group">
                    <input
                        value={zone}
                        onChange={handleChange('zone')}
                        type="text"
                        className="form-control"
                        placeholder="Type your zone"
                    />
                </div>
                <div className="form-group">
                    <input
                        value={province}
                        onChange={handleChange('province')}
                        type="text"
                        className="form-control"
                        placeholder="Type your province"
                    />
                </div>
                <div className="form-group">
                    <input
                        value={postalCode}
                        onChange={handleChange('postalCode')}
                        type="text"
                        className="form-control"
                        placeholder="Type your postalCode"
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