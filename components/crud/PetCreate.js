import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { getCategories } from '../../actions/category';
import { createPet } from '../../actions/pet';

const PetCreate = ({ router }) => {

    // const petFromLS = () => {
    //     if (typeof window === 'undefined') {
    //         return false;
    //     }

    //     if (localStorage.getItem('pet')) {
    //         return JSON.parse(localStorage.getItem('pet'));
    //     } else {
    //         return false;
    //     }
    // };

    const [categories, setCategories] = useState([]);

    const [checked, setChecked] = useState([]); // categories

    // [body, setBody] = useState(petFromLS());

    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        id: '',
        pin:'',
        name: '',
        gender: 'Male',
        hidePublishButton: false
    });

    const { error, success, formData, name, gender, id, pin } = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values, formData: new FormData() });
        initCategories();
    }, [router]);

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const publishPet = e => {
        e.preventDefault();
        createPet(formData, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', error: '', success: `A new pet id "${data.id}" is created` });
                setCategories([]);
             }
        });
       
    };

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value, formData, error: '' });
      
    };

    const handleToggle = c => () => {
        setValues({ ...values, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );

    const createPetForm = () => {
        return(
            <form onSubmit={publishPet}>
                <div className="form-group">
                    <label className="text-muted">ID</label>
                    <input type="text" className="form-control" value={id} onChange={handleChange('id')} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Pin</label>
                    <input type="text" className="form-control" value={pin} onChange={handleChange('pin')} />
                </div>
                <div className="form-group">
                    <label className="text-muted">Name</label>
                    <input type="text" className="form-control" value={name} onChange={handleChange('name')} />
                </div>
                <div className="form-group">
                <select value={gender} onChange={handleChange('gender')}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                </select>
            </div>
                <div>
                    <button type="submit" className="btn btn-primary">
                        Create 
                    </button>
                </div>
            </form>
        );
    };

   return (
    <div className="container-fluid">
    <div className="row">
        <div className="col-md-8">
            {createPetForm()}
            <div className="pt-3">
                {showError()}
                {showSuccess()}
            </div>
        </div>

        <div className="col-md-4">
            <div>
                <div className="form-group pb-2">
                    <h5>Featured image</h5>
                    <hr />

                    <small className="text-muted">Max size: 1mb</small>
                    <label className="btn btn-outline-info">
                        Upload featured image
                        <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                    </label>
                </div>
            </div>
            <div>
                <h5>Categories</h5>
                <hr />

                <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
            </div>
        </div>
    </div>
</div>
);
};

export default withRouter(PetCreate);