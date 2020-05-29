import React, {useEffect, useState} from 'react';
import Spinner from "../common/spinner/spinner";

const withData = (getData) => (View) => (props) => {

    const [data, setData] = useState(null)

    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        update()
    })

    const update = () => {
        setFetching(true)
        setError(false)

        getData()
            .then((data) => {
                debugger
                setTimeout(() => {
                    setFetching(false)
                    setData(data)
                }, 3000)
            })
            .catch(() => {
                setFetching(false)
                setError(true)
            })
    }

    if (error) {
        console.log('Error')
        return <>Error</>
    }

    if (fetching) {
        return <Spinner/>
    }

    if (data) {
        return <View {...props} data={data}/>
    }

    return <>Other content</>
};

export default withData;
