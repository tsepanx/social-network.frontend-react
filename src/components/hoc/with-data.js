import React, {useEffect, useState} from 'react';
import Spinner from "../common/spinner/spinner";

const withData = (View) => {
    return (props) => {
        const {getData} = props

        const [loading, setLoading] = useState(true)
        const [data, setData] = useState(null)
        const [error, setError] = useState(false)

        useEffect(() => {
            update()
        })

        const update = () => {
            setLoading(true)
            setError(false)

            getData()
                .then((data) => {
                    debugger
                    setLoading(false)
                    setData(data)
                })
                .catch(() => {
                    setLoading(false)
                    setError(true)
                })
        }

        if (error) {
            console.log('Error')
        }

        return (
            <>
                {loading ? <Spinner/> : null}
                <View {...props} data={data}/>;
            </>
        )
    }
};

export default withData;
