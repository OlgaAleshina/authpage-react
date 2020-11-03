import { useState, useEffect } from "react";
import { Pagination, Table } from 'antd';
import { ErrorAlert } from "../components/errorAlert";
import { Link, useRouteMatch, Switch, Route, Router } from "react-router-dom";
import { get } from "../API.js";
import { Loading } from "./Loading";
import { UserCard } from "./UserCard";


export const UserList = () => {
    const [userData, setUserData] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    let { path, url } = useRouteMatch();


    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            render: id => <Link key={id} to={`${url}/${id}`}>{id}</Link>
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
        }
    ];


    useEffect(() => {
        async function fetchUserList() {
            try {
                const response = await get(`/api/users?page=${currentPage}`);
                setUserData(response.data);
                await setIsLoading(false);
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



    return (
        <>
            {isLoading
                ?
                <Loading />
                :
                (
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
                )}
        </>
    )
};

/*
<Switch>
                {!isLoading && userData.data.map(user => (<Route key={user.id} path={`${path}/${user.id}/`}><UserCard /></Route>))}
            </Switch>



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