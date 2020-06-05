import {useState} from 'react';
import Layout from '../../../../components/Layout';
import {withRouter} from 'next/router';
import {resetPassword} from '../../../../actions/auth';

const ResetPassword = ({router}) => {
  const [values, setValues] = useState({
    name: '',
    newPassword: '',
    error: '',
    message: '',
    showForm: true,
  });

  const {showForm, name, newPassword, error, message} = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword({
      newPassword,
      resetPasswordLink: router.query.id,
    }).then((data) => {
      if (data.error) {
        setValues({
          ...values,
          error: data.error,
          showForm: false,
          newPassword: '',
        });
      } else {
        setValues({
          ...values,
          message: data.message,
          showForm: false,
          newPassword: '',
          error: false,
        });
      }
    });
  };

  const passwordResetForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group pt-5">
        <input
          type="password"
          onChange={(e) => setValues({...values, newPassword: e.target.value})}
          className="form-control"
          value={newPassword}
          placeholder="Type new password"
          required
          style={inputStyle}
        />
      </div>
      <div>
        <button className="btn btn-primary" style={buttonStyle}>
          Change password
        </button>
      </div>
    </form>
  );

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';
  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : '';

  return (
    <Layout>
      <div className="container" style={{paddingTop: '80px'}}>
        <h2 style={{paddingTop: '80px', textAlign: 'center'}}>
          Reset password
        </h2>
        {showError()}
        {showMessage()}
        {passwordResetForm()}
      </div>
    </Layout>
  );
};

const inputStyle = {
  fontFamily: 'Kanit',
  src: '../../../../fonts/Kanit-Regular.ttf',
  fontSize: '15px',
  lineHeight: '1.5',
  color: '#666666',
  display: 'block',
  width: '70%',
  background: '#e6e6e6',
  height: '50px',
  borderRadius: '25px',
  padding: '0 30px 0 68px',
  outline: 'none',
  border: 'none',
  margin: '0 auto',
};

const buttonStyle = {
  width: '30%',
  height: '50px',
  backgroundColor: 'blue',
  border: 'none',
  borderRadius: '25px',
  margin: '0 auto',
  display: 'block',
  backgroundColor: '#0384BD',
};

export default withRouter(ResetPassword);
