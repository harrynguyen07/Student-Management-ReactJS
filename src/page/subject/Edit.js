import React, { useEffect, useState } from 'react';

import { Helmet } from "react-helmet";
import EditSubjectForm from '../../component/EditSubjectForm';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../component/Loading';
import { axiosAuthInstance } from '../../helper/ultil';


export function Edit() {
    const navigate = useNavigate();
    // Trạng thái để biết dữ liệu đã đổ về chưa
    const [isLoaded, setIsLoaded] = useState(false);


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
            setIsLoaded(true);

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        getSubject();
        // eslint-disable-next-line
    }, [])

    const handleUpdate = async (values) => {
        // cập nhật subject
        try {
            const response = await axiosAuthInstance().put(`/subjects/${id}`, JSON.stringify(values));
            toast.success(`Đã cập nhật môn học ${response.data.name} vào thành công`)
            // điều hướng về trang danh sách môn học
            navigate('/subject')
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setIsLoaded(true);
        }
    }


    return (
        <>
            <Helmet>
                <title> Chỉnh sửa môn học | {process.env.REACT_APP_NAME} </title>
            </Helmet>


            <div>
                <h1>Chỉnh sửa môn học</h1>
                {
                    isLoaded ? <EditSubjectForm subject={subject} handleUpdate={handleUpdate} /> : <Loading />
                }

            </div>

        </>
    );
}
