import Layout from '../../components/Layout';
import {useState, useEffect} from 'react';
import {withRouter} from 'next/router';
import {getCookie} from '../../actions/auth';
import Private from '../../components/auth/Private';
import {listPets, removePet, lost, find} from '../../actions/pet';
import {API} from '../../config';
import Link from 'next/link';

const ListPets = ({pets, query}) => {
  const [pet, setPets] = useState([]);
  const [message, setMessage] = useState('');
  const token = getCookie('token');

  // const loadPets = () => {
  //     listPets(query.user).then(data => {
  //         if (data.error) {
  //             console.log(data.error);
  //         } else {
  //             setPets(data);
  //         }
  //     });
  // };

  // useEffect(() => {
  //     loadPets();
  // }, []);

  const deletePet = (id) => {
    removePet(id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
        window.location.reload();
      }
    });
  };

  const lostPet = (id) => {
    lost(id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
      }
    });
  };

  const findPet = (id) => {
    find(id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setMessage(data.message);
      }
    });
  };

  const deleteConfirm = (id) => {
    let answer = window.confirm('Are you sure you want to delete your pet?');
    if (answer) {
      deletePet(id);
    }
  };

  const lostConfirm = (id) => {
    let answer = window.confirm(
      'Are you sure your pet lost? if sure when someone found your pet it will inform at email',
    );
    if (answer) {
      lostPet(id);
    }
  };

  const findConfirm = (id) => {
    let answer = window.confirm('Are you sure your pet find?');
    if (answer) {
      findPet(id);
    }
  };

  const showAllPets = () => {
    return pets.map((pet, i) => {
      return (
        <div className="container-fluid" style={fluidStyle}>
          <div className="mb-3 card">
            <div className="no-gutters row">
              <div className="col-md-6">
                <section>
                  <img
                    className="img img-fluid"
                    style={imgStyle}
                    src={`${API}/pets/photo/${pet.id}`}
                    alt={pet.name}
                  />
                </section>
              </div>
              <div className="col-md-6">
                <div className="pb-3" style={nameStyle}>
                  ID: <strong>{pet.id}</strong>
                </div>
                <div className="pb-3" style={nameStyle2}>
                  Name: <strong>{pet.name}</strong>
                </div>
                <div className="pb-3" style={nameStyle2}>
                  Status: <strong style={{color: 'red'}}>{pet.lost}</strong>
                </div>

                <Link href={`/pet/${pet.id}`}>
                  <button
                    type="submit"
                    className="btn btn-primary pt-2"
                    style={buttonUpdateStyle}
                  >
                    Update profile
                  </button>
                </Link>
                <button
                  className="btn btn-warning btn-md"
                  style={buttonLostStyle}
                  onClick={() => lostConfirm(pet.id)}
                >
                  Lost
                </button>
                <button
                  className="btn btn-success btn-md"
                  style={buttonFindStyle}
                  onClick={() => findConfirm(pet.id)}
                >
                  Found
                </button>
                <button
                  className="btn btn-danger btn-md"
                  style={buttonDeleteStyle}
                  onClick={() => deleteConfirm(pet.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <Layout>
        <Private>
          <div className="app-inner-bar" style={barStyle}>
            <div className="inner-bar-center">
              <ul className="nav">
                <li className="nav-item">
                  <a
                    role="tab"
                    data-toggle="tab"
                    className="nav-link active"
                    href="#tab-content-0"
                    aria-selected="true"
                  >
                    <span>Dog</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    role="tab"
                    data-toggle="tab"
                    className="nav-link"
                    href="#tab-content-1"
                    aria-selected="false"
                  >
                    <span>Cat</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    role="tab"
                    data-toggle="tab"
                    className="nav-link"
                    href="#tab-content-2"
                    aria-selected="false"
                  >
                    <span>Etc.</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="container-fluid" style={containerStyle}>
            <div className="row">
              <div className="col-md-12">
                {message && (
                  <div className="alert alert-warning">{message}</div>
                )}
                {showAllPets()}
              </div>
            </div>
          </div>
        </Private>
      </Layout>
    </React.Fragment>
  );
};

ListPets.getInitialProps = ({query}) => {
  return listPets(query.user).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {pets: data.pets, query};
    }
  });
};

const barStyle = {
  fontFamily: 'Kanit',
  background: '#fff',
  border: '#dee2e6 solid 1px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '.35rem',
  padding: '.5rem 0',
  marginTop: '80px',
  marginBottom: '30px',
  marginLeft: '30px',
  marginRight: '30px',
  justifyContent: 'center',
};

const fluidStyle = {
  width: '100%',
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
};

const imgStyle = {
  // height: '220px',
  height: 'auto',
  width: '200px',
  display: 'flex',
  margin: '0 auto',
  marginTop: '12px',
  marginBottom: '12px',
  justifyContent: 'center',
};

const nameStyle = {
  fontFamily: 'Kanit',
  fontSize: '22px',
  marginTop: '30px',
  marginLeft: '15px',
};

const nameStyle2 = {
  fontFamily: 'Kanit',
  fontSize: '22px',
  marginLeft: '15px',
};

const buttonUpdateStyle = {
  fontFamily: 'Kanit',
  backgroundColor: '#0384BD',
  border: 'none',
  marginLeft: '10px',
  marginBottom: '15px',
};

const buttonLostStyle = {
  fontFamily: 'Kanit',
  backgroundColor: '#FEC748',
  marginLeft: '10px',
  border: 'none',
  marginBottom: '15px',
};

const buttonFindStyle = {
  fontFamily: 'Kanit',
  backgroundColor: '#AEC33A',
  color: '#262626',
  marginLeft: '10px',
  border: 'none',
  marginBottom: '15px',
};

const buttonDeleteStyle = {
  fontFamily: 'Kanit',
  backgroundColor: '#D92139',
  border: 'none',
  marginBottom: '15px',
  marginLeft: '10px',
};

const containerStyle = {
  width: '100%',
  minHeight: '100vh',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  top: '0',
  left: '0',
};

export default withRouter(ListPets);
