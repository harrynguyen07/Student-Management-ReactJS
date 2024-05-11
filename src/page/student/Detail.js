import { axiosAuthInstance } from '../../helper/ultil';
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Detail() {

    const { slug } = useParams();
    const parts = slug.split('.');
    const partOne = parts[0];
    const smallParts = partOne.split('-');
    const id = smallParts[smallParts.length - 1];


    const [student, setStudent] = useState(null)
    // call api để lấy dữ liệu đổ vào biến student

    const getStudent = async () => {
        // cập nhật student
        try {

            const response = await axiosAuthInstance().get(`/students/${id}`);

            setStudent(response.data);

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }
    useEffect(() => {
        getStudent();
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <Helmet>
                <title> Thông tin sinh viên {student?.name || ''} | {process.env.REACT_APP_NAME} </title>
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            {/* Kiểm tra xem có student k, nếu có thì lấy thuộc tính name ra */}
                            Mã SV:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {student?.id}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Tên:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {student?.name}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Ngày sinh:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {student?.birthday}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Giới tính:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {student?.gender}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
