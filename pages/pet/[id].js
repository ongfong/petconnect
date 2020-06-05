import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from 'next/router';
import Layout from '../../components/Layout';
import {useState, useEffect} from 'react';
import {getProfilePet, update} from '../../actions/pet';
import {getCookie} from '../../actions/auth';
import {API} from '../../config';

const ProfilePetUpdate = ({pet, router}) => {
  const [values, setValues] = useState({
    name: '',
    age: '',
    breed: '',
    blood: '',
    weight: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    petData: '',
    role: '',
    gender: '',
  });

  const token = getCookie('token');
  const {
    name,
    age,
    breed,
    blood,
    weight,
    error,
    success,
    loading,
    photo,
    petData,
    role,
    gender,
  } = values;

  const init = () => {
    getProfilePet(pet.id).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error});
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
          gender: data.gender,
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    let petFormData = new FormData();
    petFormData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      petData: petFormData,
      error: false,
      success: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({...values, loading: true});
    update(petData, token, router.query.id).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          success: false,
          loading: false,
        });
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
          loading: false,
        });
      }
    });
    window.location.reload();
  };

  const profilePetUpdateForm = () => (
    <div className="container-profilepet">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* <label className="btn btn-outline-info" style={profileProtoStyle}>
            Profile photo
            <input
              onChange={handleChange('photo')}
              type="file"
              accept="image/*"
              hidden
            />
          </label> */}
          <input
            onChange={handleChange('photo')}
            type="file"
            id="imageFile"
            capture="camera, user"
            accept="image/*"
            // hidden
          />
        </div>
        <fieldset disabled>
          <div className="form-group">
            <label style={nameStyle}>ชื่อสัตว์เลี้ยง / Name</label>
            <input
              onChange={handleChange('name')}
              type="text"
              value={name}
              className="form-control"
              style={inputDisable}
            />
          </div>
        </fieldset>
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
        <fieldset disabled>
          <div className="form-group">
            <label style={nameStyle}>เพศ / Gender</label>
            <br />
            <select
              value={gender}
              onChange={handleChange('gender')}
              style={roleStyle}
            >
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
              style={inputDisable}
            />
          </div>
        </fieldset>
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
          <label style={nameStyle2}>
            Public : เมื่อมีผู้พบสแกน QR Code ที่แท็ก จะแสดงข้อมูลสัตว์เลี้ยง
            คือ รูป ชื่อสัตว์เลี้ยง ชื่อเจ้าของ เบอร์โทร
            และระบบส่งอีเมลแจ้งสถานที่ล่าสุดที่พบสัตว์เลี้ยงมาให้ผ่านทางอีเมล์เจ้าของสัตว์เลี้ยง.
            <label
              style={{color: 'red', fontWeight: 'bold', paddingLeft: '15px'}}
            >
              {' '}
              แนะนำให้ใช้สถานะนี้เมื่อสัตว์เลี้ยงหาย
            </label>
          </label>
          <br />
          <label style={nameStyle2}>
            Private : เมื่อมีผู้พบสแกน QR Code ที่แท็ก
            จะแสดงข้อความให้นำสัตว์เลี้ยงไปส่งที่สถานีตำรวจ
            และระบบส่งอีเมลแจ้งสถานที่ล่าสุดที่พบสัตว์เลี้ยงมาให้ผ่านทางอีเมล์เจ้าของสัตว์เลี้ยง.
          </label>
          <br />
          <select
            value={role}
            onChange={handleChange('role')}
            style={roleStyle}
          >
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
    <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{display: success ? '' : 'none'}}
    >
      Profile updated
    </div>
  );

  const showLoading = () => (
    <div className="alert alert-info" style={{display: loading ? '' : 'none'}}>
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
                  style={{maxHeight: 'auto', maxWidth: '80%'}}
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

ProfilePetUpdate.getInitialProps = ({query}) => {
  return getProfilePet(query.id).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {pet: data};
    }
  });
};

const profileProtoStyle = {
  cursor: 'pointer',
};

const nameStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontWeight: 'bold',
  fontSize: '16px',
  textAlign: 'left',
};

const nameStyle2 = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '16px',
  marginLeft: '20px',
};

const inputUpdate = {
  // fontFamily: 'Kanit',
  // fontSize: '17px',
  // lineHeight: '1.5',
  // color: '#666666',
  // display: 'block',
  // width: '100%',
  // background: '#e6e6e6',
  // height: '50px',
  // borderRadius: '25px',
  // padding: '0 30px 0 68px',
  // marginTop: '10px',
  // outline: 'none',
  // border: 'none'

  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '16px',
  color: '#43383e',
  lineHeight: '1.5',
  position: 'relative',
  display: 'block',
  width: '100%',
  height: '55px',
  background: '#fff',
  borderRadius: '31px',
  padding: '0 35px 0 35px',
  outline: 'none',
  border: 'none',
  margin: '0',
};

const inputDisable = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '16px',
  color: '#43383e',
  lineHeight: '1.5',
  position: 'relative',
  display: 'block',
  width: '100%',
  height: '55px',
  background: '#e6e6e6',
  borderRadius: '31px',
  padding: '0 35px 0 35px',
  outline: 'none',
  border: 'none',
  margin: '0',
};

const roleStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '18px',
  borderRadius: '25px',
  border: 'none',
  fontSize: '18px',
  marginTop: '10px',
  height: '40px',
  width: '100%',
  padding: '0 30px 0 30px',
  background: '#e6e6e6',
  color: '#666666',
};

const roleDisableStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '18px',
  borderRadius: '25px',
  border: 'none',
  fontSize: '18px',
  marginTop: '10px',
  height: '55px',
  width: '100%',
  padding: '0 30px 0 68px',
  background: '#e6e6e6',
  color: '#666666',
};

const buttonStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
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
  left: '0',
};
export default withRouter(ProfilePetUpdate);
