import Spinner from 'react-bootstrap/Spinner'

export const Loading = () => {

    return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
};

