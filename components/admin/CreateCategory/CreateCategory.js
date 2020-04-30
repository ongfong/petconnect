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
            // if (data.error) {
            //     setValues({ ...values, error: data.error, success: false });
            // } else {
            //     setValues({ ...values, error: false, success: true, name: '' });
            // }
            setValues({ ...values, error: false, success: true, name: '' });
        });
    };

    const handleChange = e => {
        setValues({ ...values, name: e.target.value, error: false, success: false, removed: '' });
    };

    const newCategoryFom = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Pet Category</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required />
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </div>
        </form>
    );

    return <React.Fragment>{newCategoryFom()}</React.Fragment>;
};

export default createCategory;