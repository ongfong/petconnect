import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';

import QRCode from 'qrcode.react'
import Admin from '../../components/auth/Admin';
import { listPetsRequestTags } from '../../actions/admin'
import CreateCategory from '../../components/admin/CreateCategory/CreateCategory'
import { DOMAIN } from '../../config';

const AdminIndex = () => {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        loadTags();
    }, []);

    const loadTags = () => {
        listPetsRequestTags().then(data => {
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
                    <h5>{tag.id}</h5>
                        <QRCode value={`${DOMAIN}/qrcode/${tag.id}`} />
                    </div>
                );
            });
        };
    return (
        <Layout>
             <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Admin Dashboard</h2>
                        </div>
                        <div className="col-md-4">
                            <ul class="list-group">
                                <li className="list-group-item">
                                    <CreateCategory/>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>QR code From Request tags</h3>
                            <div className="col-md-8">
                                {showAllRequestTags()}
                            </div>
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;