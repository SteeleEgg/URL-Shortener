import { useEffect } from "react"
import { useParams } from "react-router-dom"

const Redirector = () => {

    let { id } = useParams()
    useEffect(() => {
        window.location.replace(`${import.meta.env.VITE_SHORTENER_URL}/urls/${id}`)
    })

    return (<></>)
}

export default Redirector