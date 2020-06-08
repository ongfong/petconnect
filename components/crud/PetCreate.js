import {useState, useEffect} from 'react';
import {withRouter} from 'next/router';
import {getCookie} from '../../actions/auth';
import {getCategories} from '../../actions/category';
import {createPet} from '../../actions/pet';

const PetCreate = ({router}) => {
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]); // categories
  const [values, setValues] = useState({
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    id: '',
    pin: '',
    name: '',
    gender: '',
    breed: '',
    hidePublishButton: false,
  });

  const {error, success, formData, name, gender, id, pin, breed} = values;
  const token = getCookie('token');

  useEffect(() => {
    setValues({...values, formData: new FormData()});
    initCategories();
  }, [router]);

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({...values, error: data.error});
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const publishPet = (e) => {
    e.preventDefault();
    createPet(formData, token).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({
          ...values,
          title: '',
          error: '',
          success: `A new pet id "${data.id}" is created`,
        });
        setCategories([]);
      }
    });
  };

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value, formData, error: ''});
  };

  const handleToggle = (c) => () => {
    setValues({...values, error: ''});
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
          <input onChange={handleToggle(c._id)} type="radio" className="mr-2" />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

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
      {success}
    </div>
  );

  const createPetForm = () => {
    return (
      <div className="col-md-12 offset-md-0">
        <form onSubmit={publishPet}>
          <div className="form-group">
            <label style={nameStyle}>รหัสแท็ก / ID *</label>
            <input
              value={id}
              onChange={handleChange('id')}
              type="text"
              className="form-control"
              style={inputCreate}
            />
          </div>
          <div className="form-group">
            <label style={nameStyle}>Pinแท็ก / Pin *</label>
            <input
              value={pin}
              onChange={handleChange('pin')}
              type="text"
              className="form-control"
              style={inputCreate}
            />
          </div>
          <div className="form-group">
            <label style={nameStyle}>ชื่อสัตว์เลี้ยง / Name *</label>
            <input
              value={name}
              onChange={handleChange('name')}
              type="text"
              className="form-control"
              style={inputCreate}
            />
          </div>
          <div className="form-group">
            <label style={nameStyle}>พันธ์ุสัตว์เลี้ยง / Breed *</label>
            <input
              value={breed}
              onChange={handleChange('breed')}
              type="text"
              className="form-control"
              style={inputCreate}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={buttonStyle}>
            Create
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="container-fluid" style={containerStyle}>
      <div className="row">
        <span className="create-form-title" style={createName}>
          Create a new pet
        </span>
        <div className="col-md-6 offset-md-1">
          {showError()}
          {showSuccess()}
          {createPetForm()}
        </div>

        <div className="col-md-4">
          <div>
            <div className="form-group pb-2">
              <span style={nameStyle}>
                รูปภาพของสัตว์เลี้ยง / Featured image
              </span>
              <hr />
              <small className="text-muted" style={{marginLeft: '20px'}}>
                Max size: 1mb
              </small>
              <br />
              <label
                className="btn btn-outline-info"
                style={{marginTop: '8px', marginLeft: '20px'}}
              >
                Profile photo
                <input
                  onChange={handleChange('photo')}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <span style={nameStyle}>ประเภทสัตว์เลี้ยง / Categories *</span>
            <hr />
            <ul style={radioStyle}>{showCategories()}</ul>
          </div>
          <div>
            <span style={nameStyle}>เพศ / Gender *</span>
            <select
              value={gender}
              onChange={handleChange('gender')}
              style={genderStyle}
            >
              <option value="ชาย / Male">ชาย / Male</option>
              <option value="หญิง / Female">หญิง / Female</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

const radioStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '18px',
  maxHeight: '200px',
  overflowY: 'scroll',
  color: 'black',
};

const containerStyle = {
  width: '102%',
  minHeight: '100vh',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f2f2f2',
  top: '0',
  left: '0',
};

const createName = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333333',
  lineHeight: '1.2',
  textAlign: 'center',
  width: '100%',
  display: 'block',
  paddingBottom: '54px',
  marginTop: '100px',
  textTransform: 'uppercase',
};

const nameStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontWeight: 'bold',
  fontSize: '16px',
  textAlign: 'left',
  marginBottom: '15px',
};

const buttonStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  backgroundColor: 'green',
  border: 'none',
  borderRadius: '25px',
  height: '50px',
  width: '30%',
  display: 'block',
  margin: '0 auto',
  marginTop: '30px',
  marginBottom: '20px',
};

const inputCreate = {
  // fontSize: '15px',
  // lineHeight: '1.5',
  // color: '#666666',
  // display: 'block',
  // width: '100%',
  // background: '#e6e6e6',
  // height: '50px',
  // borderRadius: '25px',
  // padding: '0 30px 0 68px',
  // outline: 'none',
  // border: 'none',
  // marginBottom: '25px'

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

const genderStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '16px',
  borderRadius: '25px',
  border: 'none',
  height: '40px',
  width: '100%',
  padding: '0 30px 0 48px',
  background: '#e6e6e6',
  color: '#666666',
  marginBottom: '20px',
  marginTop: '10px',
};

export default withRouter(PetCreate);
