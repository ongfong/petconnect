import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <SigninComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signin;
