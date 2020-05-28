import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';
import Link from 'next/link';

const Signup = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <SignupComponent />
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
