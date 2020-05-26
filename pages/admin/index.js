import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';

import QRCode from 'qrcode.react';
import Admin from '../../components/auth/Admin';
import { listPetsRequestTags } from '../../actions/admin';
import CreateCategory from '../../components/admin/CreateCategory/CreateCategory';
import { DOMAIN } from '../../config';

const AdminIndex = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = () => {
    listPetsRequestTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTags(data);
      }
    });
  };

  const showAllRequestTags = () => {
    return tags.map((tag, i) => {
      return (
        <div key={i} className="pb-5">
          <h5 style={colStyle}>{tag.id}</h5>
          <QRCode value={`${DOMAIN}/qrcode/${tag.id}`} />
        </div>
      );
    });
  };
  return (
    <Layout>
      <Admin>
        <div className="container-fluid" style={containerStyle}>
          <div className="row">
            <div className="col-md-12 pt-5 pb-5">
              <h2 style={adminStyle}>Admin Dashboard</h2>
            </div>
            <div className="col-md-6">
              <ul class="list-group">
                <li className="list-group-item">
                  <CreateCategory />
                </li>
              </ul>
            </div>
            <div className="col-md-6" style={colStyle}>
              <h3 style={qrCodeStyle}>QR code From Request tags</h3>
              <div className="col-md-6">{showAllRequestTags()}</div>
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

const containerStyle = {
  width: '100%',
  minHeight: '100vh',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#e4b660',
  background: '-webkit-linear-gradient(-135deg, #ffd954, #f2ab39)',
  background: 'linear-gradient(-135deg, #ffd954, #f2ab39)',
  top: '0',
  left: '0',
};

const adminStyle = {
  fontWeight: 'bold',
  fontSize: '36px',
  textAlign: 'center',
};

const colStyle = {
  fontWeight: 'bold',
  fontSize: '24px',
};

const qrCodeStyle = {
  fontWeight: 'bold',
  fontSize: '24px',
};

export default AdminIndex;
