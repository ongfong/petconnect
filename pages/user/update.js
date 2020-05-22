import Layout from '../../components/Layout';
import Private from '../../components/auth/Private';
import ProfileUpdate from '../../components/auth/ProfileUpdate'
import Link from 'next/link';

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid" style={containerUpdate}>
                    <div className="row" >
                        <ProfileUpdate></ProfileUpdate>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

const containerUpdate = {
    width: '100%',
    minHeight: '100vh',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6E0AE',
    top: '0',
    left: '0'
};

export default UserIndex;