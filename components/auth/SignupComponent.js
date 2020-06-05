import {useState, useEffect} from 'react';
import {preSignup, signup, isAuth} from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const {name, email, password, error, loading, message, showForm} = values;

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({...values, loading: true, error: false});
    const user = {name, email, password};

    preSignup(user).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error, loading: false});
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };
  const handleChange = (name) => (e) => {
    setValues({...values, error: false, [name]: e.target.value});
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : '';
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : '';
  const showMessage = () =>
    message ? (
      <div
        className="alert alert-info"
        style={{marginTop: '80px', display: 'flex'}}
      >
        {message}
      </div>
    ) : (
      ''
    );

  const signupForm = () => {
    return (
      <div className="container-signup" style={containerSignup}>
        <form className="col-md-5 offset-md-0" onSubmit={handleSubmit}>
          <span className="signup-form-title" style={signupName}>
            Sign Up
          </span>
          {showError()}
          {showLoading()}
          <div style={signupTitle}>
            <input
              value={name}
              onChange={handleChange('name')}
              type="text"
              className="form-control"
              placeholder="Type your name"
              style={inputSignUp}
            />
            <input
              value={email}
              onChange={handleChange('email')}
              type="email"
              className="form-control"
              placeholder="Type your email"
              style={inputSignUp}
            />
            <input
              value={password}
              onChange={handleChange('password')}
              type="password"
              className="form-control"
              placeholder="Type your password"
              style={inputSignUp}
            />
            <div className="container-signup-form-btn">
              <button className="btn btn-primary btn-block" style={buttonStyle}>
                Sign up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <React.Fragment>
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

const containerSignup = {
  width: '102%',
  minHeight: '105vh',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage:
    'url(https://image.freepik.com/free-photo/pomeranian-dog-with-yellow-background_63176-592.jpg)',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
};

const signupTitle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '36px',
  color: '#333333',
  lineHeight: '1.2',
  textAlign: 'center',
  width: '100%',
  display: 'block',
  paddingBottom: '54px',
};

const signupName = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '30px',
  fontWeight: 'bold',
  color: '#333333',
  lineHeight: '1.2',
  textAlign: 'center',
  textTransform: 'uppercase',
  width: '100%',
  display: 'block',
  paddingBottom: '50px',
};

const inputSignUp = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '17px',
  lineHeight: '1.5',
  color: '#666666',
  display: 'block',
  width: '100%',
  background: '#e6e6e6',
  height: '50px',
  borderRadius: '25px',
  padding: '0 30px 0 68px',
  marginTop: '20px',
  outline: 'none',
  border: 'none',
};

const buttonStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  width: '35%',
  backgroundColor: 'green',
  margin: '0 auto',
  marginTop: '20px',
  border: 'none',
  borderRadius: '25px',
  height: '50px',
};

const forgotStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  textAlign: 'center',
  marginTop: '20px',
};

export default SignupComponent;
