import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,

} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar style={{backgroundColor: '#FCA639' ,color: 'white'}} light expand="md">
        <Link href="/">
          <NavLink style={{ cursor: 'pointer'}} className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink style={{ cursor: 'pointer', color: 'white'} } >Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink style={{ cursor: 'pointer', color: 'white' }} >Signup</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

              {isAuth() && isAuth().role === 0 && (
              <NavItem >
                <Link href = "/tag/requiretag">
                  <NavLink style={{ cursor: 'pointer', color: 'white'}} >Request for tag</NavLink>
                </Link>
              </NavItem>
            )}    

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href = {`/user/${isAuth()._id}`}>
                  <NavLink style={{ cursor: 'pointer', color: 'white' }} >{`${isAuth().name}`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href = "/admin">
                  <NavLink style={{ cursor: 'pointer', color: 'white' }} >{`${isAuth().name}`}</NavLink>
                </Link>
              </NavItem>
            )}
            {isAuth() && (
              <NavItem>
                <NavLink style={{ cursor: 'pointer', color: 'white' }} onClick={() => signout(() => Router.replace(`/signin`))}>
                  Signout
                </NavLink>
              </NavItem>
            )}  

         </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};


export default Header;