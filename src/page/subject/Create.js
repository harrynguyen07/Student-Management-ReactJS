import React from 'react';
import { Helmet } from "react-helmet";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosAuthInstance } from '../../helper/ultil';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export function Create() {
    const navigate = useNavigate();
    const formik = useFormik({
        // Khởi tạo giá trị
        initialValues: {
            // dựa vào name của thẻ input
            name: '',
            number_of_credit: ''


        },

        // kiểm tra dữ liệu
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Vui lòng nhập tên môn học'),
            number_of_credit: Yup.string()
                .required('Vui lòng nhập số tín chỉ'),

        }),

        // khi dữ kiệu hợp lệ sẽ chạy code của onSubmit
        onSubmit: async values => {
            try {
                const response = await axiosAuthInstance().post('/subjects', JSON.stringify(values));
                const name = response.data.name;
                toast.success(`Đã thêm môn học ${name} thành công`);
                // window.location.href = '/'; //điều hướng về trang chủ DSSV // tải lại toàn bộ trang
                // điều hướng k tải toàn bộ trang
                navigate('/subject');
            } catch (error) {
                toast.error(error.message);
            }



        }
    });


    return (
        <>
            <div>
                <Helmet>
                    <title> Thêm môn học | {process.env.REACT_APP_NAME} </title>
                </Helmet>
                <h1>Thêm môn học</h1>
                <form action="list.html" method="POST" onSubmit={formik.handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input type="text" className="form-control" placeholder="Tên môn học" name="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.name && formik.errors.name ?
                                            <div className="text-danger"> {formik.errors.name} </div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label>Số tín chỉ</label>
                                    <input type="number" className="form-control" placeholder="Số tín chỉ" name="number_of_credit" onChange={formik.handleChange} value={formik.values.number_of_credit} onBlur={formik.handleBlur} />
                                    {
                                        formik.touched.number_of_credit && formik.errors.number_of_credit ?
                                            <div className="text-danger"> {formik.errors.number_of_credit} </div> : null
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
