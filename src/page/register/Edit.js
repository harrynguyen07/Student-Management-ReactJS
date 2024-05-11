import React, { useEffect, useState } from 'react';
import { axiosAuthInstance } from '../../helper/ultil';
import { Helmet } from "react-helmet";
import EditRegisterForm from '../../component/EditRegisterForm';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../../component/Loading';


export function Edit() {
    const navigate = useNavigate();
    // Trạng thái để biết dữ liệu đã đổ về chưa
    const [isLoaded, setIsLoaded] = useState(false);


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
            setIsLoaded(true);

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setIsLoaded(true);
        }
    }
    useEffect(() => {
        getRegister();
        // eslint-disable-next-line
    }, [])

    const handleUpdate = async (values) => {
        // cập nhật register
        try {
            const response = await axiosAuthInstance().put(`/registers/${id}`, JSON.stringify(values));
            const student_name = response.data.student_name;
            const subject_name = response.data.subject_name;
            const score = response.data.score;
            toast.success(`Sinh viên ${student_name} thi môn ${subject_name} được ${score} điểm`);
            // điều hướng về trang danh sách đăng ký môn học
            navigate('/register')
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            setIsLoaded(true);
        }
    }


    return (
        <>
            <Helmet>
                <title> Chỉnh sửa đăng ký môn học | {process.env.REACT_APP_NAME} </title>
            </Helmet>


            <div>
                <h1>Chỉnh sửa đăng ký môn học</h1>
                {
                    isLoaded ? <EditRegisterForm register={register} handleUpdate={handleUpdate} /> : <Loading />
                }

            </div>

        </>
    );
}
