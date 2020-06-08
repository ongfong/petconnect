import {useState, useEffect} from 'react';

import Layout from '../../../components/Layout';
import {getProfileQrcodePet} from '../../../actions/pet';
import Contact from '../../../components/Map/contact';

const Private = ({pet}) => {
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
  }, []);

  return (
    <Layout>
      <div style={h2Style}>
        <h2>ช่วยนำสัตว์ไปส่งที่สถานีตำรวจ ขอบคุณค่ะ/ครับ</h2>
        <div style={containner}>
          <Contact email={email} />
        </div>
      </div>
    </Layout>
  );
};

Private.getInitialProps = ({query}) => {
  return getProfileQrcodePet(query.id).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {pet: data};
    }
  });
};

const h2Style = {
  fontFamily: 'Kanit',
  fontWeight: 'bold',
  fontSize: '40px',
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f2f2f2',
};

const containner = {
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
};

export default Private;
