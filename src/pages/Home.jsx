import { useState, useEffect } from "react";
import { Pagination, List, Table, Image } from 'antd';
import { ErrorAlert } from "../components/errorAlert";
import { get } from "../API.js";


export const Home = () => {
    const [userData, setUserData] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)


    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: avatar => (
                <Image
                    width={50}
                    src={avatar}
                />
            )
        },
        {
            title: 'First Name',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'Last Name',
            dataIndex: 'last_name',
            key: 'last_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];


    useEffect(() => {
        async function fetchUserList() {
            try {
                const response = await get(`/api/users?page=${currentPage}`);
                setUserData(response.data)

                //dispatch({ type: "SET_IS_AUTH", token: response.data.token });
            }
            catch (err) {
                setFetchError(true);
                console.log(err);
            }

        };
        fetchUserList();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }

    console.log(userData)
    return (
        <>
            {fetchError && <ErrorAlert />}
            <Table dataSource={userData.data} columns={columns} pagination={false} />

            <Pagination
                simple
                defaultCurrent={1}
                current={currentPage}
                total={userData.total}
                defaultPageSize={userData.per_page}
                onChange={handlePageChange} />

        </>
    )
};

/*
<List
                bordered
                dataSource={userData.data}
                renderItem={item => (
                    <List.Item>
                        {item.first_name} {item.last_name}
                    </List.Item>
                )}
            />
            */