import { useEffect, useState } from "react";
import { Card } from 'antd';
import { get } from "../API.js";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { ErrorAlert } from "../components/errorAlert";



export const UserCard = () => {

    const { Meta } = Card;
    const [singleUser, setSingleUser] = useState([]);
    const [fetchError, setFetchError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    let { id } = useParams();


    useEffect(() => {
        async function fetchSingleUser() {
            try {
                const response = await get(`/api/users/${id}`);
                setSingleUser(response.data.data);
                await setIsLoading(false);

            }
            catch (err) {
                setFetchError(true);
                console.log(err);
            }

        };
        fetchSingleUser();
    }, []);

    return (
        <>
            {isLoading
                ?
                <Loading />
                : (
                    <>
                        {fetchError && <ErrorAlert />}
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="avatar" src={singleUser.avatar} />}
                        >
                            <Meta title={`${singleUser.first_name} ${singleUser.last_name}`} description={singleUser.email} />
                        </Card>
                    </>)}
        </>);


}
