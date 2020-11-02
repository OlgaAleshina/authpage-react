import { useState, useEffect } from "react";
import { Pagination, List } from 'antd';
import { ErrorAlert } from "../components/errorAlert";
import { getUserList } from "../API.js";


export const Home = () => {
    const [userData, setUserData] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        async function fetchUserList() {
            try {
                const response = await getUserList(currentPage);
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
            <List
                bordered
                dataSource={userData.data}
                renderItem={item => (
                    <List.Item>
                        {item.first_name} {item.last_name}
                    </List.Item>
                )}
            />

            <Pagination simple defaultCurrent={1} current={currentPage} total={userData.total} defaultPageSize={userData.per_page} onChange={handlePageChange} />

        </>
    )
};

