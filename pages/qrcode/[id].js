import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import Router from 'next/router';
import Layout from '../../components/Layout';
import { getProfileQrcodePet } from '../../actions/pet';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const SinglePet = ({ pet, router }) => {
      
    const [values, setValues] = useState({
        namePet: '',
        name: '',
        gender: '',
        email: ''
    });

    const { namePet, name, gender, email } = values;

    const init = () => {
        getProfileQrcodePet(pet.id).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    namePet: data.name,
                    name: data.postedBy.name,
                    gender: data.gender,
                    email: data.postedBy.email,
                });
            }
        });
    };

    useEffect(() => {
        init();
        if(pet.role === 0){
            Router.push(`/qrcode/private`);
        }
    }, []);

    const profilePetQrForm = () => (
        <form >
            <fieldset disabled>
                <div className="form-group">
                    <label className="text-muted">ชื่อสัตว์เลี้ยง/Pet name</label>
                    <input type="text" value={namePet} className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">เพศสัตว์เลี้ยง/Pet gender</label>
                    <input type="text" value={gender} className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">ชื่อเจ้าของสัตว์เลี้ยง/Pet owner's name</label>
                    <input type="text" value={name} className="form-control" />
                </div>
                <div className="form-group">
                    <label className="text-muted">อีเมล์เจ้าของสัตว์เลี้ยง/Pet owner's email</label>
                    <input type="text" value={email} className="form-control" />
                </div>
            </fieldset>
        </form>
    );
    
    return (
        <React.Fragment>
        <Layout>
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <img
                         src={`${API}/pets/photo/${pet.id}`}
                        className="img img-fluid img-thumbnail mb-3"
                        style={{ maxHeight: 'auto', maxWidth: '100%' }}
                        alt="user profile"
                    />
                </div>
                <div className="col-md-8 mb-5">
                    {profilePetQrForm()}
                </div>
            </div>
        </div>
        </Layout>
    </React.Fragment>
    );
};

SinglePet.getInitialProps = ({ query }) => {
    return getProfileQrcodePet(query.id).then(data => {
        if (data.error) {
            console.log(data.error);
        }else {
            return { pet: data };
        }
    });
};

export default SinglePet;