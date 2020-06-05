import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {userPublicProfile} from '../../actions/user';
import {API, DOMAIN, APP_NAME, FB_APP_ID} from '../../config';
// import moment from 'moment'; //time

const UserProfile = ({user, query}) => {
  return (
    <React.Fragment>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <h5>{user.name}</h5>
                  <p>....</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </React.Fragment>
  );
};

UserProfile.getInitialProps = ({query}) => {
  //console.log(query);
  return userPublicProfile(query.username).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      //console.log(data);
      return {user: data.user, query};
    }
  });
};

export default UserProfile;
