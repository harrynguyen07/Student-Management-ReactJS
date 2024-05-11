import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../component/Layout';
// student
import Index from '../page/student/Index';
import Create from '../page/student/Create';
import Detail from '../page/student/Detail';
import Edit from '../page/student/Edit';
// subject
import { Index as IndexSubject } from '../page/subject/Index';
import { Create as CreateSubject } from '../page/subject/Create';
import { Detail as DetailSubject } from '../page/subject/Detail';
import { Edit as EditSubject } from '../page/subject/Edit';
// register
import { Index as IndexRegister } from '../page/register/Index';
import { Create as CreateRegister } from '../page/register/Create';
import { Detail as DetailRegister } from '../page/register/Detail';
import { Edit as EditRegister } from '../page/register/Edit';
// auth
import Login from '../page/auth/Login';
import ProtectedRouter from './ProtectedRouter';
import LoginRouter from './LoginRouter';

export default function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />} >
                    {/* student */}

                    <Route path="" element={<ProtectedRouter><Index /></ProtectedRouter>} />
                    <Route path="/create" element={<ProtectedRouter><Create /></ProtectedRouter>} />
                    <Route path="/student/:slug" element={<ProtectedRouter><Detail /></ProtectedRouter>} />
                    <Route path="/student/edit/:slug" element={<ProtectedRouter><Edit /></ProtectedRouter>} />

                    {/* subject */}
                    <Route path="/subject" element={<ProtectedRouter><IndexSubject /></ProtectedRouter>} />
                    <Route path="/subject/create" element={<ProtectedRouter><CreateSubject /></ProtectedRouter>} />
                    <Route path="/subject/:slug" element={<ProtectedRouter><DetailSubject /></ProtectedRouter>} />
                    <Route path="/subject/edit/:slug" element={<ProtectedRouter><EditSubject /></ProtectedRouter>} />

                    {/* subject */}
                    <Route path="/register" element={<ProtectedRouter><IndexRegister /></ProtectedRouter>} />
                    <Route path="/register/create" element={<ProtectedRouter><CreateRegister /></ProtectedRouter>} />
                    <Route path="/register/edit/:slug" element={<ProtectedRouter><EditRegister /></ProtectedRouter>} />
                    <Route path="/register/:slug" element={<ProtectedRouter><DetailRegister /></ProtectedRouter>} />

                    {/* auth */}

                    <Route path="/auth/login" element={<LoginRouter><Login /></LoginRouter>} />
                </Route>
            </Routes>
        </>
    );
}
