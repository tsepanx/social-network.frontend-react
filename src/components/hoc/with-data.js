import React, {useEffect, useState} from 'react';
import Spinner from "../common/spinner/spinner";


const withData = (getData, onLoaded, onError,
                  shouldObtainData = () => true,
                  deps = null,

                  Preloader = Spinner
) => (View) => {
    return (props) => {

        const [fetching, setFetching] = useState(false)
        const [loaded, setLoaded] = useState(false)
        const [error, setError] = useState(false)

        const requestData = async (props) => {
            let data = await getData(props)
            await onLoaded(props, data)
        }

        const handleError = async (props, e) => {
            let isError = await onError(props, e)
            setError(isError)
        }

        const tryHandleData = async (props) => {
            try {
                await requestData(props)
            } catch (e) {
                await handleError(props, e)
            }
        }

        const update = async () => {
            setFetching(true)
            if (shouldObtainData(props))
                await tryHandleData(props)
            setLoaded(true)
        }

        if (deps)
            useEffect(() => {
                update().then()
            }, deps(props))
        else
            useEffect(() => {
                if (!loaded && !fetching) update().then()
            }, [])

        if (error)
            return <>Error</>

        if (!loaded)
            return Preloader ? React.createElement(Preloader) : <></>
        else
            return <View {...props} />

    };
}

export default withData