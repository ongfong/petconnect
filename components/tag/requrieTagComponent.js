import {useState, useEffect} from 'react';
import {requiretag} from '../../actions/tag';
import Router from 'next/router';

const RequireTagComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    houseNumber: '',
    village: '',
    road: '',
    alley: '',
    district: '',
    zone: '',
    province: '',
    postalCode: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const {
    name,
    email,
    phone,
    houseNumber,
    village,
    road,
    alley,
    district,
    zone,
    province,
    postalCode,
    error,
    loading,
    message,
    showForm,
  } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({...values, loading: true, error: false});
    const tag = {
      name,
      email,
      phone,
      houseNumber,
      village,
      road,
      alley,
      district,
      zone,
      province,
      postalCode,
    };

    requiretag(tag).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error, loading: false});
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          phone: '',
          houseNumber: '',
          village: '',
          road: '',
          alley: '',
          district: '',
          zone: '',
          province: '',
          postalCode: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({...values, error: false, [name]: e.target.value});
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : '';
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';
  const showMessage = () =>
    message ? (
      <div
        className="alert alert-info"
        style={{marginLeft: '20px', marginTop: '80px'}}
      >
        {message}
      </div>
    ) : (
      ''
    );

  const RequireTagForm = () => {
    return (
      <div style={containerRequestTag} onSubmit={handleSubmit}>
        <form className="col-md-5 offset-md-0">
          <span className="request-form-title" style={requestTagName}>
            Request Tag
          </span>

          {showError()}
          {showLoading()}

          <p style={pStyle}>
            <strong>ข้อมูลการจัดส่ง / Delivery information</strong>
          </p>
          <p style={pStyle}>
            <strong>ผู้รับสินค้า / Consignee</strong>
          </p>

          <div className="form-group">
            <input
              value={name}
              onChange={handleChange('name')}
              type="text"
              className="form-control"
              placeholder="ชื่อ / name"
              style={inputRequest}
            />
          </div>

          <div className="form-group">
            <input
              value={email}
              onChange={handleChange('email')}
              type="email"
              className="form-control"
              placeholder="อีเมล / e-mail"
              style={inputRequest}
            />
          </div>

          <div className="form-group">
            <input
              value={phone}
              onChange={handleChange('phone')}
              type="text"
              className="form-control"
              placeholder="เบอร์โทรศัพท์ / phone"
              style={inputRequest}
            />
          </div>

          <div>
            <p style={pStyle}>
              <strong>ที่อยู่การจัดส่ง / Delivery address</strong>
            </p>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <input
                    value={houseNumber}
                    onChange={handleChange('houseNumber')}
                    type="text"
                    className="form-control"
                    placeholder="บ้านเลขที่ / house number"
                    style={inputRequest}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <input
                    value={village}
                    onChange={handleChange('village')}
                    type="text"
                    className="form-control"
                    placeholder="ซอย / village"
                    style={inputRequest}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <input
                value={road}
                onChange={handleChange('road')}
                type="text"
                className="form-control"
                placeholder="ถนน / road"
                style={inputRequest}
              />
            </div>
            <div className="form-group">
              <input
                value={district}
                onChange={handleChange('district')}
                type="text"
                className="form-control"
                placeholder="แขวง / district"
                style={inputRequest}
              />
            </div>
            <div className="form-group">
              <input
                value={zone}
                onChange={handleChange('zone')}
                type="text"
                className="form-control"
                placeholder="เขต / zone"
                style={inputRequest}
              />
            </div>
            <div className="form-group">
              <input
                value={province}
                onChange={handleChange('province')}
                type="text"
                className="form-control"
                placeholder="จังหวัด / province"
                style={inputRequest}
              />
            </div>
            <div className="form-group">
              <input
                value={postalCode}
                onChange={handleChange('postalCode')}
                type="text"
                className="form-control"
                placeholder="รหัสไปรษณีย์ / postalcode"
                style={inputRequest}
              />
            </div>

            <div className="container">
              <p style={pStyle}>
                <strong>รูปแบบของแท็ก / Style of tag</strong>
              </p>
              <div className="row" style={{justifyContent: 'center'}}>
                <div className="col-md-6">
                  <label style={pStyle}>
                    <input type="radio" name="styleTag" style={tagStyle} />{' '}
                    Style 1
                  </label>
                  <br />
                  <label style={pStyle2}> มีแค่ QRCode</label>
                  <img
                    src="https://sv1.picz.in.th/images/2020/05/28/qc7Pxu.jpg"
                    alt="Style1"
                    border="0"
                    style={{
                      maxWidth: '130px',
                      maxHeight: '130px',
                      display: 'flex',
                      margin: '0 auto',
                      marginBottom: '10px',
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <label style={pStyle}>
                    <input type="radio" name="styleTag" style={tagStyle} />{' '}
                    Style 2
                  </label>
                  <br />
                  <label style={pStyle2}> มีเบอร์โทรเจ้าของ</label>
                  <img
                    src="https://sv1.picz.in.th/images/2020/05/28/qc7oaR.jpg"
                    alt="Style2"
                    border="0"
                    style={{
                      maxWidth: '160px',
                      maxHeight: '160px',
                      display: 'flex',
                      margin: '0 auto',
                      marginBottom: '10px',
                    }}
                  />
                </div>
                {/* <div className="col-md-4">
                    <label style={pStyle}><input type="radio" name="styleTag" style={tagStyle}/> Style 3</label>
                    <label style={pStyle2}> มีชื่อ และ เบอร์โทรเจ้าของ</label>
                      <img 
                        src="https://sv1.picz.in.th/images/2020/05/28/qc7CWI.jpg" 
                        alt="Style3" 
                        border="0"
                        style={{maxWidth: '185px', maxHeight: '185px', display: 'flex', margin: '0 auto'}} 
                      />
                   </div> */}
              </div>
            </div>
          </div>

          <div className="container-request-form-btn">
            <button className="btn btn-primary" style={buttonStyle}>
              Request Tag
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div>
        {showMessage()}
        {showForm && RequireTagForm()}
      </div>
    </React.Fragment>
  );
};
const containerRequestTag = {
  width: '105%',
  minHeight: '100vh',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f2f2f2',
  // background: '#e6e6e6',
  marginTop: '50px',
  top: '0',
  left: '0',
};

const requestTagName = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333333',
  lineHeight: '1.2',
  textAlign: 'center',
  textTransform: 'uppercase',
  width: '100%',
  display: 'block',
  paddingBottom: '50px',
  marginTop: '50px',
};

const pStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  cursor: 'pointer',
  fontSize: '16px',
};

const pStyle2 = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '16px',
  marginLeft: '70px',
};

const tagStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  cursor: 'pointer',
  marginLeft: '50px',
};

const inputRequest = {
  // fontFamily: 'Kanit',
  // fontSize: '15px',
  // lineHeight: '1.5',
  // color: '#666666',
  // display: 'block',
  // width: '100%',
  // background: 'rgba(109,124,144,.1)',
  // // background: 'white',
  // height: '50px',
  // borderRadius: '25px',
  // padding: '0 30px 0 68px',
  // marginTop: '18px',
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

const buttonStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  width: '40%',
  display: 'block',
  backgroundColor: 'green',
  margin: '0 auto',
  marginTop: '20px',
  marginBottom: '20px',
  border: 'none',
  borderRadius: '25px',
  height: '50px',
};
export default RequireTagComponent;
