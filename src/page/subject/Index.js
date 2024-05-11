import React, { useEffect, useState } from 'react';
import { axiosAuthInstance } from '../../helper/ultil';
import SubjectList from '../../component/SubjectList';
import Loading from '../../component/Loading';
import { toast } from 'react-toastify';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Helmet } from "react-helmet";
import Pagination from '../../component/Pagination';
import Search from '../../component/Search';
import { updateParam } from '../../helper/ultil';




export function Index() {
    // Trạng thái lưu dữ liệu danh sachs môn học từ api gửi về
    const [items, setItems] = useState([]);

    // Trạng thái để biết dữ liệu đã đổ về chưa
    const [isLoaded, setIsLoaded] = useState(false);


    const [pagination, setPagination] = useState({ page: 1, totalPage: 0 })
    const [totalItem, setTotalItem] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    // code trong useEffect sẽ chạy 1 lần đầu tiên
    // khi page thay dổi thì code trong useEffect chạy lại
    useEffect(() => {
        getSubjects();
        // eslint-disable-next-line
    }, [page, search]);

    const handlePage = (page) => {
        // ví dụ page =3 hiển thị  ?page=3
        setPage(page);
        // cập nhật param trên đường dẫn của web
        const newParams = {
            page: page,

        }
        updateParam(searchParams, setSearchParams, newParams);

    }

    const handleSearch = (e, search) => {
        console.log(search);
        e.preventDefault();//Ngăn mặc định, k cho submit lên server
        // ví dụ page =3 hiển thị  ?page=3
        setSearch(search);
        setPage(1);
        // cập nhật param trên đường dẫn của web
        // setSearchParams({ search: search });
        // lấy tất cả các param ra, rồi cập nhật cho mỗi thắng seach
        // sau đó dùng setSearchParams() để cập nhật lên đường dẫn

        const newParams = {
            page: 1,
            search: search
        }
        updateParam(searchParams, setSearchParams, newParams);
    }


    const getSubjects = async () => {
        // call api để lấy dữ liệu về, sau khi lấy dữ liệu bỏ vào biến items
        try {

            const response = await axiosAuthInstance().get(`/subjects?page=${page}&search=${search}`)

            setItems(response.data.items);
            setPagination(response.data.pagination);
            setIsLoaded(true);
            setTotalItem(response.data.totalItem);


        } catch (error) {
            console.log(error);
            setIsLoaded(true);
            toast.error(error.message)
        }
    }

    const handleConfirmDialog = async (currentID) => {

        try {

            const response = await axiosAuthInstance().delete(`/subjects/${currentID}`)
            getSubjects();
            toast.success(response.data);


        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <>
            <div>
                <Helmet>
                    <title> Danh sách môn học | {process.env.REACT_APP_NAME} </title>
                </Helmet>
                <h1>Danh sách môn học</h1>
                <NavLink to="/subject/create" className="btn btn-info">Add</NavLink>

                <Search handleSearch={handleSearch} search={search} />
                {
                    !isLoaded ? <Loading /> : <SubjectList items={items} handleConfirmDialog={handleConfirmDialog} />

                }

                <div>
                    <span>Số lượng: {totalItem}</span>
                </div>
                <Pagination pagination={pagination} handlePage={handlePage} />

            </div >


        </>
    );
}
