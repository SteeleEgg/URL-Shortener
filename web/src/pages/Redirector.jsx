import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { API_URL } from ".."

const Redirector = () => {

    let { id } = useParams()
    
    useEffect(() => {
        fetch(`${API_URL}/urls/one/${id}`, {
            credentials: 'include',
        }).then(res => res.json()).then(data => {
            window.location.replace(data.url)
        })
    })

    return (<></>)
}

export default Redirector