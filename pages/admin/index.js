import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode.react'
import Admin from '../../components/auth/Admin';
import { listPetsRequestTags } from '../../actions/admin'
import { DOMAIN } from '../../config';
import Link from 'next/link';

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
                    <h3>{tag.id}</h3>
                    <QRCode value={`${DOMAIN}/qrcode/${tag.id}`} />,
                    </div>
                );
            });
        };
    return (
        <Layout>
            <Admin>
                <div className="row">
                    <div className="col-md-12">
                        {showAllRequestTags()}
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default AdminIndex;

 {/* <section>
    <img
        className="img img-fluid"
        style={{ maxHeight: '150px', width: 'auto' }}
        src={`${API}/tag/photo/${tag.id}`}
        alt={tag.id}/>
    </section> */}