import React, {useEffect, useState} from 'react';
import Spinner from "../common/spinner/spinner";
import {connect} from "react-redux";
import {compose} from "redux";

const withData = (getData, onLoaded, onError, Preloader = Spinner) => (View) => {
    const Component = (props) => {

        const [fetching, setFetching] = useState(false)
        const [loaded, setLoaded] = useState(false)
        const [error, setError] = useState(false)

        useEffect(() => {
            if (!loaded && !fetching)
                update().then()
        })

        const update = async () => {
            setFetching(true)

            try {
                let data = await getData(props)

                await onLoaded(props, data)
            } catch (e) {
                let isError = await onError(props, e)
                setError(isError)
            }

            setLoaded(true)
        }

        if (error)
            return <>Error</>

        if (!loaded)
            if (Preloader)
                return <Preloader/>
            else
                return <></>
        else
            return <View {...props} />

    };

    return compose(
        connect(() => {}, {getData})
    )(Component);
}

export default withData