import React from 'react';
import { Helmet } from "react-helmet";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosAuthInstance } from '../../helper/ultil';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export default function Create() {
    const navigate = useNavigate();
    const formik = useFormik({
        // Khởi tạo giá trị
        initialValues: {
            // dựa vào name của thẻ input
            name: '',
            birthday: '',
            gender: ''

        },

        // kiểm tra dữ liệu
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Vui lòng nhập họ và tên'),
            birthday: Yup.string()
                .required('Vui lòng nhập ngày sinh'),
            gender: Yup.string()
                .required('Vui lòng chọn giới tính')
        }),

        // khi dữ kiệu hợp lệ sẽ chạy code của onSubmit
        onSubmit: async values => {
            try {
                const response = await axiosAuthInstance().post('/students', JSON.stringify(values));
                const name = response.data.name;
                toast.success(`Đã thêm sinh viên ${name} thành công`);
                // window.location.href = '/'; //điều hướng về trang chủ DSSV // tải lại toàn bộ trang
                // điều hướng k tải toàn bộ trang
                navigate('/');
            } catch (error) {
                toast.error(error.message);
            }



        }
    });


    return (
        <>
            <div>
                <Helmet>
                    <title> Thêm sinh viên | {process.env.REACT_APP_NAME} </title>
                </Helmet>
                <h1>Thêm sinh viên</h1>
                <form action="list.html" method="POST" onSubmit={formik.handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input type="text" className="form-control" placeholder="Tên của bạn" name="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.name && formik.errors.name ?
                                            <div className="text-danger"> {formik.errors.name} </div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Birthday</label>
                                    <input type="date" className="form-control" placeholder="Ngày sinh của bạn" name="birthday" onChange={formik.handleChange} value={formik.values.birthday} onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.birthday && formik.errors.birthday ?
                                            <div className="text-danger"> {formik.errors.birthday} </div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Chọn Giới tính</label>
                                    <select className="form-control" id="gender" name="gender" onChange={formik.handleChange} value={formik.values.gender} onBlur={formik.handleBlur}>
                                        <option value=""></option>
                                        <option value="nam">Nam</option>
                                        <option value="nữ">Nữ</option>
                                        <option value="khác">Khác</option>
                                    </select>
                                    {
                                        formik.touched.gender && formik.errors.gender ?
                                            <div className="text-danger"> {formik.errors.gender} </div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-success" type="submit">Lưu</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        </>
    );
}
