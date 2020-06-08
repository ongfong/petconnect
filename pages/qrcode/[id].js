import {useState, useEffect} from 'react';
import Router from 'next/router';
import Layout from '../../components/Layout';
import {getProfileQrcodePet} from '../../actions/pet';
import {API} from '../../config';

import Contact from '../../components/Map/contact';

const SinglePet = ({pet, router}) => {
  const [values, setValues] = useState({
    namePet: '',
    name: '',
    email: '',
    phone: '',
  });

  const {namePet, name, email, phone} = values;

  const init = () => {
    getProfileQrcodePet(pet.id, pet.postedBy.email).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({
          ...values,
          namePet: data.name,
          name: data.postedBy.name,
          email: data.postedBy.email,
          phone: data.postedBy.phone,
        });
      }
    });
  };

  useEffect(() => {
    init();
    if (pet.role === 0) {
      Router.push(`/qrcode/private/${pet.id}`);
    }
  }, []);

  const profilePetQrForm = () => (
    <form style={fontStyle}>
      <fieldset disabled>
        <div className="form-group">
          <label>ชื่อสัตว์เลี้ยง / Pet name</label>
          <input
            type="text"
            value={namePet}
            className="form-control"
            style={inputFound}
          />
        </div>
        <div className="form-group">
          <label>ชื่อเจ้าของสัตว์เลี้ยง / Pet owner's name</label>
          <input
            type="text"
            value={name}
            className="form-control"
            style={inputFound}
          />
        </div>
      </fieldset>

      <div className="form-group">
        <label>อีเมลเจ้าของสัตว์เลี้ยง / Pet owner's e-mail</label>
        <div className="row">
          <div className="col">
            <input
              id="emailInput"
              type="text"
              value={email}
              className="form-control"
              style={inputFound}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>เบอร์โทรศัพท์เจ้าของสัตว์เลี้ยง / Pet owner's phone</label>
        <input
          type="text"
          value={phone}
          className="form-control"
          style={inputFound}
        />
      </div>
    </form>
  );

  return (
    <React.Fragment>
      <Layout>
        <div className="container-fluid" style={containerFound}>
          <div className="row">
            <div className="col-md-4">
              <img
                src={`${API}/pets/photo/${pet.id}`}
                className="img img-fluid img-thumbnail mb-3"
                style={{maxHeight: 'auto', maxWidth: '100%'}}
                alt="user profile"
              />
            </div>
            <div className="col-md-8 mb-5">{profilePetQrForm()}</div>
          </div>
        </div>
        <div
          style={{
            textAlign: 'center',
            background: '#f2f2f2',
            minHeight: '20vh',
          }}
        >
          <Contact email={email} />
        </div>
      </Layout>
    </React.Fragment>
  );
};

SinglePet.getInitialProps = ({query}) => {
  return getProfileQrcodePet(query.id).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {pet: data};
    }
  });
};

const containerFound = {
  width: '100%',
  minHeight: '80vh',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f2f2f2',
  marginTop: '50px',
};

const fontStyle = {
  fontFamily: 'Kanit',
  fontSize: '15px',
};

const inputFound = {
  fontFamily: 'Kanit',
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
  border: 'none',
};

export default SinglePet;
