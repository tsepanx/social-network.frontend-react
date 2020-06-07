import React, {useEffect, useState} from 'react';
import Spinner from "../common/spinner/spinner";


const withData = (getData, onLoaded, onError,
                  shouldObtainData = () => true,
                  withDeps = false,
                  deps = [],

                  Preloader = Spinner
) => (View) => {
    return (props) => {

        // const dependencies = deps(props)

        const [fetching, setFetching] = useState(false)
        const [loaded, setLoaded] = useState(false)
        const [error, setError] = useState(false)

        useEffect(() => {
            if (!loaded && !fetching)
                update().then()
        }, [])

        // if (withDeps) {
        //     // debugger
        //     useEffect(() => {
        //         checkUpdate().then()
        //         // if (shouldObtainData(props))
        //         //     setLoaded(false)
        //         //     update().then()
        //         // }, [props.id])
        //     }, dependencies)
        // }

        const update = async () => {
            setFetching(true)

            try {
                if (shouldObtainData(props)) {
                    let data = await getData(props)
                    await onLoaded(props, data)
                }
            } catch (e) {
                let isError = await onError(props, e)
                setError(isError)
            }

            setLoaded(true)
        }

        if (error)
            return <>Error</>

        if (!loaded)
            return Preloader ? React.createElement(Preloader) : <></>
        else
            return <View {...props} />

    };
}

export default withData