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
    // display: '-webkit-box',
    // display: '-webkit-flex',
    // display: '-moz-box',
    // display: '-ms-flexbox',
    // display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: '25px',
    backgroundColor: '#F6E0AE',
    // background: '#e4b660',
    // background: '-webkit-linear-gradient(-135deg, #ffd954, #f2ab39)',
    // // background: '-o-linear-gradient(-135deg, #c850c0, #4158d0)',
    // // background: '-moz-linear-gradient(-135deg, #c850c0, #4158d0)',
    // background: 'linear-gradient(-135deg, #ffd954, #f2ab39)',
    top: '0',
    left: '0'

    // background: 'orange' // change color later
};

export default UserIndex;