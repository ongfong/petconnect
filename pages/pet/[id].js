import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { getProfilePet, update} from '../../actions/pet';
import { getCookie } from '../../actions/auth';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const ProfilePetUpdate = ({ pet, router }) => {

    const [values, setValues] = useState({
        name: '',
        age: '',
        breed: '',
        blood: '',
        weight:'',
        error: false,
        success: false,
        loading: false,
        photo: '',
        petData: '',
        role: '',
        gender: ''
    });

    const token = getCookie('token');
    const { name, age, breed, blood, weight, error, success, loading, photo, petData, role, gender } = values;

    const init = () => {
        getProfilePet(pet.id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                console.table(data);
                setValues({
                    ...values,
                    name: data.name,
                    age: data.age,
                    breed: data.breed,
                    blood: data.blood,
                    weight: data.weight,
                    role: data.role,
                    gender: data.gender
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        let petFormData = new FormData();
        petFormData.set(name, value);
        setValues({ ...values, [name]: value, petData: petFormData, error: false, success: false });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true });
        update(petData, token, router.query.id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false, loading: false });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    age: data.age,
                    bleed: data.bleed,
                    blood: data.blood,
                    weight: data.weight,
                    role: data.role,
                    gender: data.gender,
                    success: true,
                    loading: false
                });
            }
        });
    };

    const profilePetUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-info">
                    Profile photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Age</label>
                <input onChange={handleChange('age')} type="text" value={age} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Gender</label>
                <br />
                <select value={gender} onChange={handleChange('gender')}>
                        <option value="Not specified">Not specified</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">Breed</label>
                <input onChange={handleChange('breed')} type="text" value={breed} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Blood</label>
                <input onChange={handleChange('blood')} type="text" value={blood} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Weight</label>
                <input onChange={handleChange('weight')} type="text" value={weight} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Privacy</label>
                <br />
                <select value={role} onChange={handleChange('role')}>
                        <option value="1">public</option>
                        <option value="0">private</option>
                </select>
            </div>
            <div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
        </form>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            Profile updated
        </div>
    );

    const showLoading = () => (
        <div className="alert alert-info" style={{ display: loading ? '' : 'none' }}>
            Loading...
        </div>
    );
    
    return (
        <React.Fragment>
        <Layout>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <img
                         src={`${API}/pets/photo/${pet.id}`}
                        className="img img-fluid img-thumbnail mb-3"
                        style={{ maxHeight: 'auto', maxWidth: '100%' }}
                        alt="user profile"
                    />
                </div>
                <div className="col-md-8 mb-5">
                    {showSuccess()}
                    {showError()}
                    {showLoading()}
                    {profilePetUpdateForm()}
                </div>
            </div>
        </div>
        </Layout>
    </React.Fragment>

    );
};

ProfilePetUpdate.getInitialProps = ({ query }) => {
    return getProfilePet(query.id).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { pet: data };
        }
    });
};

export default withRouter(ProfilePetUpdate);