import React, { useEffect, useState } from 'react';
import { axiosAuthInstance } from '../../helper/ultil';
import { Helmet } from "react-helmet";
import EditStudentForm from '../../component/EditStudentForm';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../component/Loading';


export default function Edit() {
    const navigate = useNavigate();
    // Trạng thái để biết dữ liệu đã đổ về chưa
    const [isLoaded, setIsLoaded] = useState(false);


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
            setIsLoaded(true);

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        getStudent();
        // eslint-disable-next-line
    }, [])

    const handleUpdate = async (values) => {
        // cập nhật student
        try {
            const response = await axiosAuthInstance().put(`/students/${id}`, JSON.stringify(values));
            toast.success(`Đã cập nhật sinh viên ${response.data.name} vào thành công`)
            // điều hướng về trang danh sách sinh viên
            navigate('/')
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setIsLoaded(true);
        }
    }


    return (
        <>
            <Helmet>
                <title> Chỉnh sửa sinh viên | {process.env.REACT_APP_NAME} </title>
            </Helmet>


            <div>
                <h1>Chỉnh sửa sinh viên</h1>
                {
                    isLoaded ? <EditStudentForm student={student} handleUpdate={handleUpdate} /> : <Loading />
                }

            </div>

        </>
    );
}
