import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
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

    const showAllPets = () => {
        return pets.map((pet, i) => {
            return (
                <article key={i}>
                    <div className="lead pb-4">
                        <section>
                            <p className="mark ml-1 pt-2 pb-2">
                                The owner is {pet.postedBy.name} | Published {moment(pet.updatedAt).fromNow()}
                            </p>
                        </section>

                        <div className="row">
                            <div className="col-md-4">
                                <section>
                                    <img
                                        className="img img-fluid"
                                        style={{ maxHeight: '150px', width: 'auto' }}
                                        src={`${API}/pets/photo/${pet.id}`}
                                        alt={pet.name}/>
                                </section>
                            </div>
                            <div className="col-md-8">
                                <section>
                                    <div className="pb-3">ID: {pet.id}</div>
                                    <div className="pb-3">Name: {pet.name}</div>
                                    <Link href={`/pet/${pet.id}`}>
                                        <a className="btn btn-primary pt-2">Update profile</a>
                                    </Link>
                                </section>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteConfirm(pet.id)}>
                                        Delete
                                </button>
                                <br></br>
                                <button className="btn btn-warning btn-sm" onClick={() => lostConfirm(pet.id)}>
                                        Lost
                                </button>
                                <button className="btn btn-success btn-sm" onClick={() => findConfirm(pet.id)}>
                                        Find
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                </article>
            );
        });
    };


    return (
        <React.Fragment>
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <ul class="list-group">
                                <li className="list-group-item">
                                    <a href="/user/crud/pet">Create Pets </a>
                                </li>

                                <li className="list-group-item">
                                    <a href="/user/update">Update profile</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Private>
            <div className="container-fluid">
                    <div className="row">
                    <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    {showAllPets()}
                </div>
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

export default withRouter(ListPets);