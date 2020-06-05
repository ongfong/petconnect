import {useState} from 'react';
import Layout from '../../../components/Layout';
import {forgotPassword} from '../../../actions/auth';

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    error: '',
    showForm: true,
  });

  const {email, message, error, showForm} = values;

  const handleChange = (name) => (e) => {
    setValues({...values, message: '', error: '', [name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({...values, message: '', error: ''});
    forgotPassword({email}).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error});
      } else {
        setValues({
          ...values,
          message: data.message,
          email: '',
          showForm: false,
        });
      }
    });
  };

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';
  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : '';

  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group pt-5">
        <input
          type="email"
          onChange={handleChange('email')}
          className="form-control"
          value={email}
          placeholder="Enter your email address"
          required
          style={inputForgot}
        />
      </div>
      <div>
        <button className="btn btn-primary" style={buttonForgot}>
          Send password reset link
        </button>
      </div>
    </form>
  );

  return (
    <Layout>
      <div className="container-fluid" style={containerForgot}>
        <h2 style={forgotStyle}>Forgot password</h2>
        {/* <hr /> */}
        {showError()}
        {showMessage()}
        {showForm && passwordForgotForm()}
      </div>
    </Layout>
  );
};

const containerForgot = {
  width: '100%',
  minHeight: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#e4b660',
  background: '#f2f2f2',
  paddingTop: '80px',
  top: '0',
  left: '0',
};

const forgotStyle = {
  fontFamily: 'Kanit',
  src: '../../../../fonts/Kanit-Regular.ttf',
  fontWeight: 'bold',
  textAlign: 'center',
  paddingTop: '50px',
  paddingBottom: '30px',
};

const inputForgot = {
  fontFamily: 'Kanit',
  src: '../../../../fonts/Kanit-Regular.ttf',
  fontSize: '15px',
  lineHeight: '1.5',
  color: '#666666',
  display: 'block',
  width: '60%',
  background: '#e6e6e6',
  height: '50px',
  borderRadius: '25px',
  padding: '15px',
  outline: 'none',
  border: 'none',
  margin: '0 auto',
};

const buttonForgot = {
  fontFamily: 'Kanit',
  src: '../../../../fonts/Kanit-Regular.ttf',
  height: '50px',
  backgroundColor: 'blue',
  border: 'none',
  borderRadius: '25px',
  margin: '0 auto',
  display: 'block',
  backgroundColor: '#0384BD',
};

export default ForgotPassword;
