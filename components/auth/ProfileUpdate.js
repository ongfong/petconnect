import Link from 'next/link';
import {useState, useEffect} from 'react';
import Router from 'next/router';
import {getCookie, isAuth} from '../../actions/auth';
import {getProfile, update} from '../../actions/user';
import {API} from '../../config';

const ProfileUpdate = () => {
  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    about: '',
    password: '',
    phone: '',
    error: false,
    success: false,
    loading: false,
    photo: '',
    userData: '',
  });

  const token = getCookie('token');
  const {
    username,
    name,
    email,
    about,
    password,
    phone,
    error,
    success,
    loading,
    photo,
    userData,
  } = values;

  const init = () => {
    getProfile(token).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({
          ...values,
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          phone: data.phone,
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
    let userFormData = new FormData();
    userFormData.set(name, value);
    setValues({
      ...values,
      [name]: value,
      userData: userFormData,
      error: false,
      success: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({...values, loading: true});
    update(token, userData).then((data) => {
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
          username: data.username,
          name: data.name,
          email: data.email,
          about: data.about,
          phone: data.phone,
          password: '',
          success: true,
          loading: false,
        });
      }
    });
  };

  const profileUpdateForm = () => (
    <div className="container-profile">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/* <label className="btn btn-outline-info" style={profileProtoStyle}>
                    Profile photo
                    <input onChange={handleChange('photo')} type="file" accept="image/*" hidden /> 
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
            <label style={nameStyle}>ชื่อผู้ใช้ / Username</label>
            <input
              onChange={handleChange('username')}
              type="text"
              value={username}
              className="form-control"
              style={inputDisable}
            />
          </div>
        </fieldset>
        <div className="form-group">
          <label style={nameStyle}>ชื่อเจ้าของสัตว์เลี้ยง / Name</label>
          <input
            onChange={handleChange('name')}
            type="text"
            value={name}
            className="form-control"
            style={inputUpdate}
          />
        </div>
        <fieldset disabled>
          <div className="form-group">
            <label style={nameStyle}>อีเมล / E-mail</label>
            <input
              onChange={handleChange('email')}
              type="text"
              value={email}
              className="form-control"
              style={inputDisable}
            />
          </div>
        </fieldset>
        <div className="form-group">
          <label style={nameStyle}>เบอร์โทรศัพท์ / Phone</label>
          <input
            onChange={handleChange('phone')}
            type="text"
            value={phone}
            className="form-control"
            style={inputUpdate}
          />
        </div>
        <div className="form-group">
          <label style={nameStyle}>รหัสผ่าน / Password</label>
          <input
            onChange={handleChange('password')}
            type="password"
            value={password}
            className="form-control"
            style={inputUpdate}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary" style={buttonStyle}>
            Update Profile
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
      <div className="container" style={{paddingTop: '80px'}}>
        <div className="row">
          <div className="col-md-4">
            <img
              src={`${API}/user/photo/${username}`}
              className="img img-fluid img-thumbnail mb-3"
              style={{maxHeight: 'auto', maxWidth: '100%', marginTop: '23px'}}
              alt="user profile"
            />
          </div>
          <div className="col-md-8 mb-5">
            <br />
            {showSuccess()}
            {showError()}
            {showLoading()}
            {profileUpdateForm()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const profileProtoStyle = {
  cursor: 'pointer',
};

const nameStyle = {
  fontFamily: 'Kanit',
  fontSize: '16px',
  fontWeight: 'bold',
  textAlign: 'left',
};

const inputUpdate = {
  // fontSize: '15px',
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

const buttonStyle = {
  fontFamily: 'Kanit',
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

const btnStyle = {
  width: '100%',
  display: '-webkit-box',
  display: '-webkit-flex',
  display: '-moz-box',
  display: '-ms-flexbox',
  display: 'flex',
  flexWrap: 'wrap',
};

export default ProfileUpdate;
