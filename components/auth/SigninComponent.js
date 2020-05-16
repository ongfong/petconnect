import { useState, useEffect } from 'react';
import { signin, authenticate, isAuth } from '../../actions/auth';
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
        showForm: true
    });

    const { email, password, error, loading, message, showForm } = values;

    useEffect(() => {
        isAuth() && Router.push(`/`);
    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        signin(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                // save user token to cookie
                // save user info to localstorage
                // authenticate user
                authenticate(data, () => {
                    if(isAuth() && isAuth().role === 1){
                        Router.push(`/admin`);
                    }
                    else{
                        Router.push(`/user/${isAuth()._id}`);
                    }
                });
            }
        });
    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');

    const signinForm = () => {
        return (
            // <form onSubmit={handleSubmit}>
                // <div className="form-group">Email
                //     <input
                //         value={email}
                //         onChange={handleChange('email')}
                //         type="email"
                //         className="form-control"
                //     />
                // </div>

            //     <div className="form-group">Password
            //         <input
            //             value={password}
            //             onChange={handleChange('password')}
            //             type="password"
            //             className="form-control"
            //         />
            //     </div>

            //     <div>
            //         <button className="btn btn-primary btn-block">Signin</button>
            //     </div>
            // </form>



        //     <div className="container-login100" style={container100}>
		// 	        <div className="wrap-login100" style={wrap}>
		// 		        <div className="login100-form-title" style={login100}>
		// 			        <span className="login100-form-title-1" style={login11}>
		// 				         Sign In
		// 			        </span>
		// 		        </div>

		// 		<form style={login100Form} onSubmit={handleSubmit}>
		// 			<div className="wrap-input100 validate-input m-b-26" data-validate="Username is required" style={wrapInput100}>
		// 				<span style={label100}>Email</span>
        //                     <input
        //                         value={email}
        //                         onChange={handleChange('email')}
        //                         type="email"
        //                         // className="form-control"
        //                         placeholder="Type your email" 
        //                         style={input100}>
        //                     </input>         
                                
						// <span className="focus-input100" style={focusInput100}></span>
		// 			</div>

                    

		// 			<div className="wrap-input100 validate-input m-b-18" data-validate = "Password is required" style={wrapInput100}>
						// <span style={label100}>Password</span>
                        //     <input 
                        //         value={password}
                        //         onChange={handleChange('password')}
                        //         type="password"  
                        //         placeholder="Type your password" 
                        //         // className="form-control"
                        //         style={input100}>
                        //     </input>
		// 				<span className="focus-input100" style={focusInput100}></span>
		// 			</div>
            
        //             <Link href="/auth/password/forgot">
        //                 <a className="btn btn-outline-danger btn-sm" style={forgotStyle}>Forgot Password?</a>
        //             </Link>
		// 			{/* </div> */}
                    
		// 			<div className="container-login100-form-btn" style={btnStyle}>
        //                 <button className="btn btn-primary btn-block" style={buttonStyle}>Sign in</button>
		// 			</div>
		// 		</form>
		// 	</div>
        // </div>

		<div className="container-login" style={containerLogin} onSubmit={handleSubmit}> 
				<form className="col-md-5 offset-md-0" >
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
                            style={inputSignIn}>
                        </input> 
                
                        <input 
                            value={password}
                            onChange={handleChange('password')}
                            type="password"  
                            placeholder="Type your password" 
                            className="form-control"
                            style={inputSignIn}>
                        </input>
					
                        <div className="container-login-form-btn" >
                            <button className="btn btn-primary" style={buttonStyle}>Sign in</button>
		 			    </div>

                        <Link href="/auth/password/forgot">
                            <a className="btn btn-outline-danger btn-sm" style={forgotStyle}>Forgot Password?</a>
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
    minHeight: '100vh',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: "url(https://image.freepik.com/free-photo/pomeranian-dog-with-yellow-background_63176-591.jpg)",
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
   
};

const loginName = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333333',
    lineHeight: '1.2',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
    display: 'block',
    paddingBottom: '54px'
};

const inputSignIn = {
    src: 'url(../../../fonts/BANGNA-NEW.TTF)',
    fontSize: '15px',
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
    border: 'none'
};

const buttonStyle = {
    backgroundColor: 'green',
    marginTop: '20px',
    border: 'none',
    borderRadius: '25px',
    height: '45px',
    width: '30%'
};

const forgotStyle = {
    marginTop: '20px',
    alignItems: 'right'
};

export default SigninComponent;