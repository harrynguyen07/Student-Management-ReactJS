import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // rule useSelector((state) => state); bước subscriber
    // render lại khi state (được sinh ra từ reducer trong store)
    const isLogin = useSelector((state) => state.isLogin);
    const loggedUser = useSelector((state) => state.loggedUser);
    const handleLogout = () => {
        const action = { type: 'LOGOUT' };
        dispatch(action);
        navigate('/auth/login');
    }
    console.log(isLogin);
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand" href="/">Hệ Thống quản lý sinh viên</a>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                        <li className="nav-item ">
                            {isLogin ?
                                <Link className="nav-link" to="/user/profile">{loggedUser.name} </Link>
                                :
                                <Link className="nav-link" to="/auth/login">Login </Link>
                            }

                        </li>
                        <li className="nav-item">
                            {isLogin ?
                                <button className="btn btn-primary" onClick={() => handleLogout()}>Logout</button>
                                :
                                <Link className="nav-link" to="/auth/register">Register</Link>
                            }

                        </li>

                    </ul>

                </div>
            </nav>
            {isLogin ?
                <div>
                    <NavLink to="/" className=" btn btn-info mr-3" > Students </NavLink>
                    <NavLink to="/subject" className=" btn btn-info mr-3" > Subject </NavLink>
                    <NavLink to="/register" className=" btn btn-info mr-3" > Register </NavLink>

                </div>
                : null}

            <ToastContainer />

        </>
    );
}
