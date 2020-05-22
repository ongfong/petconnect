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
    const { name, age, breed, blood, weight, error, success, loading, photo, petData, role, gender} = values;

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
       <div className="container-profilepet" >
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-info" style={profileProtoStyle}>
                    Profile photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                </label>
            </div>
            <div className="form-group">
                <label style={nameStyle}>ชื่อสัตว์เลี้ยง / Name</label>
                <input 
                    onChange={handleChange('name')} 
                    type="text" 
                    value={name} 
                    className="form-control" 
                    style={inputUpdate}
                />
            </div>
            <div className="form-group">
                <label style={nameStyle}>อายุ / Age</label>
                <input 
                    onChange={handleChange('age')} 
                    type="text" 
                    value={age} 
                    className="form-control" 
                    style={inputUpdate}
                />
            </div>
            <div className="form-group">
                <label style={nameStyle}>เพศ / Gender</label>
                <br />
                <select value={gender} onChange={handleChange('gender')} style={roleStyle}>
                        <option value="ไม่ระบุ / Not specified">ไม่ระบุ / Not specified</option>
                        <option value="ชาย / Male">ชาย / Male</option>
                        <option value="หญิง / Female">หญิง / Female</option>
                </select>
            </div>
            <div className="form-group">
                <label style={nameStyle}>สายพันธุ์ / Breed</label>
                <input 
                    onChange={handleChange('breed')} 
                    type="text" 
                    value={breed} 
                    className="form-control" 
                    style={inputUpdate}
                />
            </div>
            <div className="form-group">
                <label style={nameStyle}>กรุ๊ปเลือด / Blood</label>
                <input 
                    onChange={handleChange('blood')} 
                    type="text" 
                    value={blood} 
                    className="form-control" 
                    style={inputUpdate}
                />
            </div>
            <div className="form-group">
                <label style={nameStyle}>น้ำหนัก / Weight</label>
                <input 
                    onChange={handleChange('weight')} 
                    type="text" 
                    value={weight} 
                    className="form-control" 
                    style={inputUpdate}
                />
            </div>
            <div className="form-group">
                <label style={nameStyle}>ความเป็นส่วนตัวของข้อมูลเมื่อพบสัตว์เลี้ยง / Role</label><br/>
                <label style={nameStyle2}>Public : เมื่อมีผู้พบสแกน QR Code ที่แท็ก จะแสดงข้อมูลสัตว์เลี้ยง คือ รูป ชื่อสัตว์เลี้ยง ชื่อเจ้าของและอีเมล์.</label><br/>
                <label style={nameStyle2}>Private : เมื่อมีผู้พบสแกน QR Code ที่แท็ก, แสดงข้อความให้นำสัตว์เลี้ยงไปส่งที่สถานีตำรวจ.</label>
                <br />
                <select value={role} onChange={handleChange('role')} style={roleStyle}>
                    <option value="0">private</option>
                    <option value="1">public</option>
                </select>
            </div>
            <div>
                <button type="submit" className="btn btn-primary" style={buttonStyle}>
                    Update profile
                </button>
            </div>
        </form>
       </div>
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
        <div className="container-fluid" style={containerUpdate}>
         <div className="container">
            <div className="row">
                <div className="col-md-4" style={{marginTop: '80px'}}>
                    <img
                        src={`${API}/pets/photo/${pet.id}`}
                        className="img img-fluid img-thumbnail mb-3"
                        style={{ maxHeight: 'auto', maxWidth: '80%' }}
                        alt="user profile"
                    />
                </div>
                <div className="col-md-8 mb-5" style={{marginTop: '60px'}}>
                    <br />
                    {showSuccess()}
                    {showError()}
                    {showLoading()}
                    {profilePetUpdateForm()}
                </div>
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

const profileProtoStyle = {
    cursor: 'pointer',
};

const nameStyle = {
    src: 'url(../../../fonts/BANGNA-NEW.TTF)',
    fontWeight: 'bold',
    fontSize: '15px',
    textAlign: 'left'
};

const nameStyle2 = {
    src: 'url(../../../../fonts/BANGNA-NEW.TTF)',
    fontSize: '16px',
    marginLeft: '20px'
};

const inputUpdate = {
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

const roleStyle = {
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

const buttonStyle = {
    width: '40%',
    display: 'block',
    backgroundColor: 'green',
    margin: '0 auto',
    marginTop: '30px',
    border: 'none',
    borderRadius: '25px',
    height: '50px',
    backgroundColor: '#0384BD',
};

const containerUpdate = {
    width: '100%',
    minHeight: '100vh',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    top: '0',
    left: '0'
};
export default withRouter(ProfilePetUpdate);