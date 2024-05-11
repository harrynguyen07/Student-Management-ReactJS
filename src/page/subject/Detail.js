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


    const [subject, setSubject] = useState(null)
    // call api để lấy dữ liệu đổ vào biến subject

    const getSubject = async () => {
        // cập nhật subject
        try {

            const response = await axiosAuthInstance().get(`/subjects/${id}`);

            setSubject(response.data);

        } catch (error) {
            console.log(error);
            toast.error(error.message)

        }
    }
    useEffect(() => {
        getSubject();
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <Helmet>
                <title> Thông tin môn học {subject?.name || ''} | {process.env.REACT_APP_NAME} </title>
            </Helmet>
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            {/* Kiểm tra xem có subject k, nếu có thì lấy thuộc tính name ra */}
                            Mã môn học:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {subject?.id}
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
                            {subject?.name}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5">
                        <div className="form-group">
                            Số tín chỉ:
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="form-group">
                            {subject?.number_of_credit}
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}
