import { axiosAuthInstance } from '../../helper/ultil';
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
export function Detail() {

    const { slug } = useParams();
    const parts = slug.split('.');
    const partOne = parts[0];
    const smallParts = partOne.split('-');
    const id = smallParts[smallParts.length - 1];


    const [register, setRegister] = useState(null)
    // call api để lấy dữ liệu đổ vào biến register

    const getRegister = async () => {
        // cập nhật register
        try {

            const response = await axiosAuthInstance().get(`/registers/${id}`);

            setRegister(response.data);

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }
    useEffect(() => {
        getRegister();
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <Helmet>
                <title> Thông tin đăng ký môn học {register?.name || ''} | {process.env.REACT_APP_NAME} </title>
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Mã Sinh viên:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {/* {/ kiểm tra xem có register hok?. Nếu có thì lấy cái thuộc tính id ra /} */}
                            {register?.student_id}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Mã môn học:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {/* {/ kiểm tra xem có register hok?. Nếu có thì lấy cái thuộc tính id ra /} */}
                            {register?.subject_id}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Tên sinh viên:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {/* {/ kiểm tra xem có register hok?. Nếu có thì lấy cái thuộc tính id ra /} */}
                            {register?.student_name}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Tên môn học:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {/* {/ kiểm tra xem có register hok?. Nếu có thì lấy cái thuộc tính id ra /} */}
                            {register?.subject_name}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Điểm thi:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {/* {/ kiểm tra xem có register hok?. Nếu có thì lấy cái thuộc tính id ra /} */}
                            {register?.score}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
