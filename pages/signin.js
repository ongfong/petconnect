import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = () => {
    return (
        <Layout>
            <div className="row">
                <div className="col-md-12 offset-md-0">
                    <SigninComponent />
                </div>
            </div>
        </Layout>
    );
};

export default Signin;