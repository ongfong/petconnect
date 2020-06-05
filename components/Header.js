import {useState} from 'react';
import Link from 'next/link';
import Router from 'next/router';
import {APP_NAME} from '../config';
import {signout, isAuth} from '../actions/auth';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar color="light" light expand="md" fixed="top">
        <Link href="/">
          <NavLink style={fontName}>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink style={NavStyleRight1}>Sign In</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink style={NavStyleRight1}>Sign Up</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                {/* <Link href = {`/user/${isAuth()._id}`}>
                    <NavLink style={NavStyleRight1}>{`${isAuth().name}`}</NavLink>
                 </Link> */}

                <UncontrolledDropdown>
                  <DropdownToggle
                    tag="a"
                    className="nav-link"
                    caret
                    style={NavStyleRight1}
                  >
                    {`${isAuth().name}`}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      tag="a"
                      href={`/user/${isAuth()._id}`}
                      style={NavStyleRight3}
                    >
                      My Profile
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      href="/user/crud/pet"
                      style={NavStyleRight3}
                    >
                      Create Pet
                    </DropdownItem>
                    <DropdownItem
                      tag="a"
                      href="/user/update"
                      style={NavStyleRight3}
                    >
                      Update Profile
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
            )}

            {/* {isAuth() && isAuth().role === 0 && (
              <NavItem>
                 <Link href = "/user/crud/pet">
                    <NavLink style={NavStyleRight1}>Create Pet</NavLink>
                 </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                 <Link href = "/user/update">
                    <NavLink style={NavStyleRight1}>Update Profile</NavLink>
                 </Link>
              </NavItem>
            )} */}

            {isAuth() && isAuth().role === 1 && (
              <NavItem>
                <Link href="/admin">
                  <NavLink style={NavStyleRight1}>{`${isAuth().name}`}</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && isAuth().role === 0 && (
              <NavItem>
                <Link href="/tag/requiretag">
                  <NavLink style={NavStyleRight1}>Request Tag</NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink
                  style={NavStyleRight2}
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
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

const fontName = {
  cursor: 'pointer',
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontWeight: 'bold',
  fontSize: '18px',
  paddingLeft: '125px',
  color: 'orange',
};

const NavStyleRight1 = {
  cursor: 'pointer',
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontWeight: 'bold',
  fontSize: '18px',
  paddingRight: '50px',
  color: 'orange',
};

const NavStyleRight2 = {
  cursor: 'pointer',
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontWeight: 'bold',
  fontSize: '18px',
  paddingRight: '170px',
  color: 'orange',
};

const NavStyleRight3 = {
  cursor: 'pointer',
  fontFamily: 'Kanit',
  src: '../../fonts/Kanit-Regular.ttf',
  fontSize: '18px',
  textAlign: 'left',
  backgroundColor: '#f8f9fa',
};

export default Header;
