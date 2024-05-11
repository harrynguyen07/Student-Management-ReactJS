import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { axiosAuthInstance } from '../../helper/ultil';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



export function Create() {
    const navigate = useNavigate();
    const [studentOptions, setStudentOptions] = useState([])
    const [subjectOptions, setSubjectOptions] = useState([])

    useEffect(() => {
        getAllStudents();
        getAllSubjects();
    }, []);


    const getAllStudents = async () => {
        try {
            const response = await axiosAuthInstance().get(`/students?list=all`)
            setStudentOptions(response.data.items);
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getAllSubjects = async () => {
        try {
            const response = await axiosAuthInstance().get(`/subjects?list=all`)
            setSubjectOptions(response.data.items);
        } catch (error) {
            toast.error(error.message);
        }
    }



    const formik = useFormik({
        // Khởi tạo giá trị
        initialValues: {
            // dựa vào name của thẻ input
            student_id: '',
            subject_id: '',


        },

        // kiểm tra dữ liệu
        validationSchema: Yup.object({
            student_id: Yup.string()
                .required('Vui lòng chọn sinh viên'),
            subject_id: Yup.string()
                .required('Vui lòng chọn môn học'),

        }),

        // khi dữ kiệu hợp lệ sẽ chạy code của onSubmit
        onSubmit: async values => {
            try {
                const response = await axiosAuthInstance().post('/registers', JSON.stringify(values));
                const student_name = response.data.student_name;
                const subject_name = response.data.subject_name;
                toast.success(`Sinh viên ${student_name} đã đăng ký học môn ${subject_name} thành công`);
                // window.location.href = '/'; //điều hướng về trang chủ DSSV // tải lại toàn bộ trang
                // điều hướng k tải toàn bộ trang
                navigate('/register');
            } catch (error) {
                toast.error(error.message);
            }



        }
    });


    return (
        <>
            <div>
                <Helmet>
                    <title> Thêm đăng ký đăng ký môn học | {process.env.REACT_APP_NAME} </title>
                </Helmet>
                <h1>Thêm đăng ký môn học</h1>
                <form action="#" method="POST" onSubmit={formik.handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-5">
                                <div className="form-group">
                                    <label htmlFor="student_id">Tên sinh viên</label>
                                    <select className="form-control" name="student_id" id="student_id" onChange={formik.handleChange} value={formik.values.student_id} onBlur={formik.handleBlur}>
                                        <option value="">Vui lòng chọn sinh viên</option>
                                        {
                                            studentOptions.map((option, index) =>
                                                <option key={index} value={option.id}>{option.id}-{option.name}</option>
                                            )
                                        }
                                    </select>
                                    {
                                        formik.touched.student_id && formik.errors.student_id ?
                                            <div className="text-danger"> {formik.errors.student_id} </div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject_id">Tên môn học</label>
                                    <span id="load" className="text-primary" />
                                    <select className="form-control" name="subject_id" id="subject_id" onChange={formik.handleChange} value={formik.values.subject_id} onBlur={formik.handleBlur}>
                                        <option value="">Vui lòng chọn môn học</option>
                                        {
                                            subjectOptions.map((option, index) =>
                                                <option key={index} value={option.id}>{option.id}-{option.name}</option>
                                            )
                                        }
                                    </select>
                                    {
                                        formik.touched.subject_id && formik.errors.subject_id ?
                                            <div className="text-danger"> {formik.errors.subject_id} </div> : null
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
