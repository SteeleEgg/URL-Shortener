import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Redirector = () => {

    let { id } = useParams()
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SHORTENER_URL}/urls/one/${id}`, {
            credentials: 'include',
        }).then(res => res.json()).then(data => {
            window.location.replace(data.url)
        })
        // window.location.replace(`${import.meta.env.VITE_SHORTENER_URL}/urls/${id}`)
    })

    return (<></>)
}

export default Redirector