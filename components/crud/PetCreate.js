import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { getCookie } from '../../actions/auth';
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
                console.log(data.error);
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
                    <input onChange={handleToggle(c._id)} type="radio" className="mr-2"/>
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
            <div className="col-md-12 offset-md-0">
            <form onSubmit={publishPet}>
                <div className="form-group">
                    <label style={nameStyle}>รหัสแท็ก / ID</label>
                    <input
                        value={id} 
                        onChange={handleChange('id')}
                        type="text"
                        className="form-control"
                        style={inputCreate}
                    />
                </div>
                <div className="form-group">
                    <label style={nameStyle}>Pinแท็ก / Pin</label>
                    <input 
                        value={pin}
                        onChange={handleChange('pin')} 
                        type="text" 
                        className="form-control" 
                        style={inputCreate}
                    />
                </div>
                <div className="form-group">
                    <label style={nameStyle}>ชื่อสัตว์เลี้ยง / Name</label>
                    <input 
                        value={name} 
                        onChange={handleChange('name')} 
                        type="text" 
                        className="form-control" 
                        style={inputCreate}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                        Create 
                </button>
            </form>
            </div>
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
            <small className="text-muted">Max size: 1mb</small>
                    <label className="btn btn-outline-info">
                        Upload featured image
                        <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                    </label>
                    </div>
            </div>
            <div></div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
            </div>
            </div>
    </div>
);
};

const radioStyle= {
    maxHeight: '200px', 
    overflowY: 'scroll',
    color: 'black'
};

const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    top: '0',
    left: '0'
};

const createName = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333333',
    lineHeight: '1.2',
    textAlign: 'center',
    width: '100%',
    display: 'block',
    paddingBottom: '54px',
    marginTop: '80px'
};

const nameStyle = {
    src: 'url(../../../fonts/BANGNA-NEW.TTF)',
    fontWeight: 'bold',
    fontSize: '15px',
    textAlign: 'left',
    marginBottom: '15px'
};

const nameStyle2 = {
    src: 'url(../../../fonts/BANGNA-NEW.TTF)',
    fontWeight: 'bold',
    fontSize: '15px',
    textAlign: 'left',
};

const buttonStyle = {
    backgroundColor: 'green',
    border: 'none',
    borderRadius: '25px',
    height: '50px',
    width: '20%',
    margin: '0 auto',
    marginTop: '40px'
};

const btnStyle = {
    width: '100%',
    display: '-webkit-box',
    display: '-webkit-flex',
    display: '-moz-box',
    display: '-ms-flexbox',
    display: 'flex',
    flexWrap: 'wrap'
};

const inputCreate = {
    fontSize: '15px',
    lineHeight: '1.5',
    color: '#666666',

    display: 'block',
    width: '100%',
    background: '#e6e6e6',
    height: '50px',
    borderRadius: '25px',
    padding: '0 30px 0 68px',
    outline: 'none',
    border: 'none',
    marginBottom: '25px'
};

const genderStyle = {
    fontSize: '18px',
    borderRadius: '25px',
    border: 'none',
    fontSize: '18px',
    marginTop: '10px',
    height: '35px',
    width: '100%',
    padding: '0 30px 0 68px',
    background: '#e6e6e6',
    color: '#666666',
};

export default withRouter(PetCreate);

