import { axiosNonAuthInstance } from '../../helper/ultil';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        // Khởi tạo giá trị
        initialValues: {
            // dựa vào name của thẻ input
            email: '',
            password: '',


        },

        // kiểm tra dữ liệu
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Vui lòng nhập email'),
            password: Yup.string()
                .required('Vui lòng nhập mật khẩu'),

        }),

        // khi dữ kiệu hợp lệ sẽ chạy code của onSubmit
        onSubmit: async values => {
            try {
                const response = await axiosNonAuthInstance().post('/login', JSON.stringify(values));
                const action = {
                    type: 'LOGIN_SUCCESS', //thuộc tính type phải có (quy định trong redux)

                    // dữ liệu truyền đi ngta hay dùng payload
                    payload: {
                        access_token: response.data.access_token,
                        loggedUser: response.data.user
                    }
                }
                dispatch(action);
                navigate('/')

            } catch (error) {
                toast.error('Sai email hoặc mật khẩu');
            }



        }
    });


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group" >
                    <label htmlFor="exampleInputEmail1">Email đăng nhập</label>
                    <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nhập email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                    {
                        formik.touched.email && formik.errors.email ?
                            <div className="text-danger"> {formik.errors.email} </div> : null
                    }

                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Mật khẩu đăng nhập</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Nhập mật khẩu" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                    {
                        formik.touched.password && formik.errors.password ?
                            <div className="text-danger"> {formik.errors.password} </div> : null
                    }
                </div>

                <button type="submit" className="btn btn-primary">Đăng nhập</button>
            </form>

        </>
    );
}
