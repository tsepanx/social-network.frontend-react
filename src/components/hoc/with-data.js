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
        const dependencies = deps ? deps(props) : []

        useEffect(() => {
            if (deps || (!loaded && !fetching))
                update().then()
        }, dependencies)

        const handleData = async (props) => {
            let data = await getData(props)
            await onLoaded(props, data)
        }

        const handleError = async (props, e) => {
            if ('response' in e) {
                let status = e.response.status
                return onError(props, status)
            } else {
                throw 'Unhandled error without response field'
            }
        }

        const tryHandleData = async (props) => {
            try {
                await handleData(props)
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

        if (loaded) {
            return <View {...props} />
        } else
            return Preloader ? React.createElement(Preloader) : <></>
    }
}

export default withData