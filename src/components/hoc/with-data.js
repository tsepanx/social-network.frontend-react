import React, {useEffect, useState} from 'react';
import Spinner from "../common/spinner/spinner";
import {connect} from "react-redux";
import {compose} from "redux";

const withData = (getData) => (View) => {
    const Component = (props) => {
        const [data, setData] = useState(null)

        const [fetching, setFetching] = useState(true)
        const [error, setError] = useState(false)

        useEffect(() => {
            update()
        })

        const update = () => {
            setFetching(true)
            setError(false)

            props.obtainProfile()
                .then((data) => {
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
            return <>Error</>
        }

        if (fetching) {
            return <Spinner/>
        }

        if (data) {
            return <View {...props} />
        }

        return <>Other content</>
    };

    return compose(
        connect((state) => {}, {getData})
    )(Component);
}

// export default withData