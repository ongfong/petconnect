import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import { getCookie } from '../../actions/auth';
import Private from '../../components/auth/Private';
import { listPets, removePet, lost, find } from '../../actions/pet';
import { API } from '../../config';
import Link from 'next/link';

const ListPets = ({ pets }) => {

    const [message, setMessage] = useState('');
    const token = getCookie('token');

    const deletePet = id => {
        removePet(id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                window.location.reload();
            }
        });
    };

    const lostPet = id => {
        lost(id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
            }
        });
    };

    const findPet = id => {
        find(id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
            }
        });
    };

    const deleteConfirm = id => {
        let answer = window.confirm('Are you sure you want to delete your pet?');
        if (answer) {
            deletePet(id);
        }
    };

    const lostConfirm = id => {
        let answer = window.confirm('Are you sure your pet lost? if sure when someone found your pet it will inform at email');
        if (answer) {
            lostPet(id);
        }
    };

    const findConfirm = id => {
        let answer = window.confirm('Are you sure your pet find?');
        if (answer) {
            findPet(id);
        }
    };

    const showAllPets = () => {
        return pets.map((pet, i) => {
            return (                
                    <div className="col-lg-4" key={i} style={{marginTop: '80px'}}>
                        <div className="card fixed-width" style={{width: '18rem'}}>
                            <img
                                className="img img-fluid"
                                style={{ height: '300px', width: '100%'}}
                                src={`${API}/pets/photo/${pet.id}`}
                                alt={pet.name}/>
                            <div className="card-body">
                                <div className="pb-3" style={nameStyle}>ID: <strong>{pet.id}</strong></div>
                                <div className="pb-3" style={nameStyle}>Name: <strong>{pet.name}</strong></div>  
                                <Link href={`/pet/${pet.id}`}>
                                    <button type="submit" className="btn btn-primary pt-2" style={buttonUpdateStyle}>
                                        Update profile
                                    </button>
                                </Link>
                                <br />
                                <button className="btn btn-warning btn-md" style={buttonLostStyle} onClick={() => lostConfirm(pet.id)} > 
                                        Lost
                                </button>
                                <button className="btn btn-success btn-md" style={buttonFindStyle} onClick={() => findConfirm(pet.id)}>
                                        Find
                                </button>
                                <br></br>
                                <button className="btn btn-danger btn-md" style={buttonDeleteStyle} onClick={() => deleteConfirm(pet.id)}>
                                        Delete
                                </button>
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
            </Private>
            <div className="container">
                <div className="row">
                        {message && <div className="alert alert-warning">{message}</div>}
                        {showAllPets()}
                </div>
            </div>
        </Layout>
        </React.Fragment>
    );
};


ListPets.getInitialProps = ({ query }) => {
    return listPets(query.user).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { pets: data.pets, query };
        }
    });
};
const nameStyle = {
    fontSize: '18px',
};

const buttonUpdateStyle = {
    backgroundColor: '#0384BD',
    marginBottom: '5px',
    border: 'none',
};

const buttonLostStyle = {
    backgroundColor: '#FEC748',
    marginBottom: '5px',
    marginRight: '5px',
    border: 'none',
};

const buttonFindStyle = {
    backgroundColor: '#AEC33A',
    color: '#262626',
    marginBottom: '5px',
    marginRight: '5px',
    border: 'none',
};

const buttonDeleteStyle = {
    backgroundColor: '#D92139',
    marginBottom: '5px',
    border: 'none',
};

export default withRouter(ListPets);