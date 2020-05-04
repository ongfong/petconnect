import Layout from '../../components/Layout';
import { useState } from 'react';
import { withRouter } from 'next/router';
import { getCookie } from '../../actions/auth';
import Private from '../../components/auth/Private';
import { listPets, removePet, lost, find } from '../../actions/pet';
import moment from 'moment';
import { API } from '../../config';
import Link from 'next/link';

const ListPets = ({ pets, query }) => {

    const [pet, setPets] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');

    const [buttonLost, setButtonLost] = useState(false);
    const [buttonFind, setButtonFind] = useState(true);

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
        setButtonLost(true);
        setButtonFind(false);
    };

    const findPet = id => {
        find(id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
            }
        });
        setButtonLost(false);
        setButtonFind(true);
    };

    const deleteConfirm = id => {
        let answer = window.confirm('Are you sure you want to delete your pet?');
        if (answer) {
            deletePet(id);
        }
    };

    const lostConfirm = id => {
        let answer = window.confirm('Are you sure your pet lost?');
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
    const style = {
        padding: '16px',
        border: '1px solid #eee',
        boxShadow: '0 2px 3px #ccc',
        margin: '10px',
        boxSizing: 'border-box',
        backgroundColor: '#E6EAEC'
    }

    const showAllPets = () => {
        return pets.map((pet, i) => {
            return (
                <div style={style}>
                    <article key={i}>
                    <div className="lead pb-4">
                        <section>
                            <p>The owner is {pet.postedBy.name} | Published {moment(pet.updatedAt).fromNow()}</p>
                        </section>
                        <div className="row">
                            <div className="col-md-4">
                                <section>
                                    <img
                                        className="img img-fluid"
                                        style={{ maxHeight: '200px', width: 'auto' }}
                                        src={`${API}/pets/photo/${pet.id}`}
                                        alt={pet.name}/>
                                </section>
                            </div>
                            <div className="col-md-8">
                                <section>
                                    <div className="pb-3">ID: <strong>{pet.id}</strong></div>
                                    <div className="pb-3">Name: <strong>{pet.name}</strong></div>
                                    <Link href={`/pet/${pet.id}`}>
                                        <a className="btn btn-primary pt-2">Update profile</a>
                                    </Link>
                                </section>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteConfirm(pet.id)}>
                                        Delete
                                </button>
                                <br></br>
                                <button disabled={buttonLost} className="btn btn-warning btn-sm" onClick={() => lostConfirm(pet.id)}>
                                        Lost
                                </button>
                                <button disabled={buttonFind}className="btn btn-success btn-sm" onClick={() => findConfirm(pet.id)}>
                                        Find
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
                </div>
            );
        });
    };

    const sideDrawer = {
        position: 'fixed',
        width: '280px',
        maxWidth: '70%',
        height: '100%',
        zIndex: '200',
        backgroundColor: 'white',
        padding: '32px 16px',
        boxSizing: 'border-box',
        border: '1px solid #eee'
    }

    return (
        <React.Fragment>
        <Layout>
        <Private>
            <div className="row">
                <div className="col-md-3">
                    <div style={sideDrawer}>
                        <ul>
                            <li><a href="/user/crud/pet">Create Pets </a></li>
                            <li><a href="/user/update">Update profile</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-8">
                    {showAllPets()}
                </div>
            </div>
            </Private>
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

export default withRouter(ListPets);