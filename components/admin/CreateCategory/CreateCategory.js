import { useState, useEffect } from 'react';
import { isAuth, getCookie } from '../../../actions/auth';
import { addCategory } from '../../../actions/category';

const createCategory = () => {
    const [values, setValues] = useState({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false
    });

    const { name, error, success, categories, removed } = values;
    const token = getCookie('token');

    const clickSubmit = e => {
        e.preventDefault();
        addCategory({ name }, token).then(data => {
            setValues({ ...values, error: false, success: true, name: '' });
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    };

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label style={petCatStyle}>Pet Category</label>
                <input style={inputCat} 
                    type="text" 
                    className="form-control" 
                    onChange={handleChange} 
                    value={name} 
                    required />
            </div>
            <div>
                <button type="submit" className="btn btn-primary" style={buttonStyle}>
                    Add
                </button>
            </div>
        </form>
    );

    return <React.Fragment>{newCategoryFom()}</React.Fragment>;
};

const petCatStyle = {
    fontSize: '16px',
    fontWeight: 'bold'
};

const inputCat = {
    fontSize: '15px',
    lineHeight: '1.5',
    color: '#666666',
    display: 'block',
    width: '100%',
    background: '#e6e6e6',
    height: '50px',
    borderRadius: '25px',
    padding: '0 30px 0 68px',
    marginTop: '10px',
    outline: 'none',
    border: 'none'
};

const buttonStyle = {
    backgroundColor: 'green',
    margin: '0 auto',
    display: 'block',
    marginTop: '10px',
    border: 'none',
    borderRadius: '25px',
    height: '45px',
    width: '25%'
};

export default createCategory;