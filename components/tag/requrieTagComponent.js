import {useState, useEffect} from 'react';
import {requiretag} from '../../actions/tag';
import Router from 'next/router';

const RequireTagComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
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

          <p>
            <strong>ข้อมูลการจัดส่ง / Delivery information</strong>
          </p>
          <p>
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
              placeholder="อีเมล์ / email"
              style={inputRequest}
            />
          </div>

          <div>
            <p>
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

            <div className="col-md-4">
              <p>
                <strong>รูปแบบของแท็ก / Style of tag</strong>
              </p>
              <label style={{marginLeft: '50px'}}>
                <input type="radio" value="style1" name="styleTag" />
                Style 1
              </label>
              <br />
              <label style={{marginLeft: '50px'}}>
                <input type="radio" value="style2" name="styleTag" />
                Style 2
              </label>
              <br />
              <label style={{marginLeft: '50px'}}>
                <input type="radio" value="style3" name="styleTag" />
                Style 3
              </label>
            </div>

            <div
              className="row"
              style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '0 auto',
              }}
            >
              <div className="col-md-3">
                <p style={{margin: '20px 80px'}}>"Style1"</p>
                <img
                  src="https://sv1.picz.in.th/images/2020/05/28/qc7oaR.jpg"
                  alt="Style1"
                  border="0"
                  style={{
                    maxWidth: '160px',
                    maxHeight: '160px',
                    marginTop: '10px',
                    marginLeft: '35px',
                  }}
                />
              </div>
              <div className="col-md-3">
                <p style={{margin: '20px 80px'}}>"Style2"</p>
                <img
                  src="https://sv1.picz.in.th/images/2020/05/28/qc7Pxu.jpg"
                  alt="Style2"
                  border="0"
                  style={{
                    maxWidth: '150px',
                    maxHeight: '150px',
                    marginTop: '10px',
                    marginLeft: '35px',
                  }}
                />
              </div>
              <div className="col-md-3">
                <p style={{margin: '20px 80px'}}>"Style3"</p>
                <img
                  src="https://sv1.picz.in.th/images/2020/05/28/qc7CWI.jpg"
                  alt="Style3"
                  border="0"
                  style={{
                    maxWidth: '160px',
                    maxHeight: '160px',
                    marginTop: '10px',
                    marginLeft: '35px',
                  }}
                />
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
  marginTop: '50px',
  top: '0',
  left: '0',
};

const requestTagName = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333333',
  lineHeight: '1.2',
  textAlign: 'center',
  textTransform: 'uppercase',
  width: '100%',
  display: 'block',
  paddingBottom: '54px',
  marginTop: '50px',
};

const inputRequest = {
  fontSize: '15px',
  lineHeight: '1.5',
  color: '#666666',
  display: 'block',
  width: '100%',
  background: '#e6e6e6',
  height: '50px',
  borderRadius: '25px',
  padding: '0 30px 0 68px',
  marginTop: '20px',
  outline: 'none',
  border: 'none',
};
const buttonStyle = {
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
