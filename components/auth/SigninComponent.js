import {useState, useEffect} from 'react';
import {signin, authenticate, isAuth} from '../../actions/auth';
import Router from 'next/router';
import Link from 'next/link';
import LoginGoogle from './LoginGoogle';

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const {email, password, error, loading, message, showForm} = values;

  useEffect(() => {
    isAuth() && Router.push(`/`);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({...values, loading: true, error: false});
    const user = {email, password};

    signin(user).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error, loading: false});
      } else {
        // save user token to cookie
        // save user info to localstorage
        // authenticate user
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push(`/admin`);
          } else {
            Router.push(`/user/${isAuth()._id}`);
          }
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
    message ? <div className="alert alert-info">{message}</div> : '';

  const signinForm = () => {
    return (
      <div
        className="container-login"
        onSubmit={handleSubmit}
        style={containerLogin}
      >
        <form className="col-md-5 offset-md-0">
          <span className="login-form-title" style={loginName}>
            Sign In
          </span>

          <div style={loginTitle}>
            <LoginGoogle></LoginGoogle>
          </div>

          {showError()}
          {showLoading()}
          {showMessage()}

          <div style={loginTitle}>
            <input
              value={email}
              onChange={handleChange('email')}
              type="email"
              className="form-control"
              placeholder="Type your email"
              style={inputSignIn}
            ></input>

            <input
              value={password}
              onChange={handleChange('password')}
              type="password"
              placeholder="Type your password"
              className="form-control"
              style={inputSignIn}
            ></input>

            <div className="container-login-form-btn">
              <button className="btn btn-primary" style={buttonStyle}>
                Sign in
              </button>
            </div>

            <Link href="/auth/password/forgot">
              <a className="btn btn-outline-danger btn-sm" style={forgotStyle}>
                Forgot Password?
              </a>
            </Link>
          </div>
        </form>
      </div>
    );
  };

  return (
    <React.Fragment>
      {showForm && signinForm()}
      <br />
    </React.Fragment>
  );
};

const loginTitle = {
  fontSize: '24px',
  color: '#333333',
  lineHeight: '1.2',
  textAlign: 'center',
  width: '100%',
  display: 'block',
  paddingBottom: '15px',
};

const containerLogin = {
  width: '100%',
  minHeight: '105vh',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage:
    'url(https://image.freepik.com/free-photo/pomeranian-dog-with-yellow-background_63176-591.jpg)',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  overflow: 'none',
};

const loginName = {
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
  paddingBottom: '54px',
};

const inputSignIn = {
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
  backgroundColor: 'green',
  marginTop: '20px',
  border: 'none',
  borderRadius: '25px',
  height: '45px',
  width: '30%',
};

const forgotStyle = {
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  marginTop: '20px',
  alignItems: 'right',
};

export default SigninComponent;
