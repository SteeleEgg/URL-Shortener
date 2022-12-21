import { useState, useEffect } from "react"
import { LoginWrapper } from "../components/Login"
import { UrlWrapper } from "../components/MyURLs"

const MyUrls = () => {

    const restrictUrlLength = url => {
        if (url.length > 50) {
            return url.substring(0, 50) + '...'
        } else {
            return url
        }
    }

    // let url = "https://www.google.com/search?q=something&sxsrf=ALiCzsaeDwxIB8D1dY3T-UBBUvoLtu9qLQ:1671241124066&source=lnms&tbm=vid&sa=X&ved=2ahUKEwiOuqKswv_7AhV5HjQIHS81BLsQ_AUoAXoECAEQAw&biw=1920&bih=930&dpr=1"

    // On component mount, fetch data
    // endpoint: /urls/all
    // Give the body the user id as "id"
    // store data in state
    // render state as table rows

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SHORTENER_URL}/urls/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-USER-ID": window.sessionStorage.getItem('shortener-user')
            },
        })
        .then(res => res.json()).then(data => {
            console.log(data)
            setTableState(data)
        }).catch(err => {
            console.error(err)
        })
    }, [])

    // establish a state for the page
    // Put the fetch in a use effect
    // On fetch.then put the data in the page state
    const [tableState, setTableState] = useState([]) 
    
    const urlBuilder = (urlId) => {

    }
    
    return (
        <UrlWrapper>
            <table style={{"zIndex": "100"}}>
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Redirect</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableState.map((data, i) => {
                        const url = `${import.meta.env.VITE_FRONTEND_URL}/u/${data.id}`
                        return (
                            <tr>
                                <td>
                                    <a href={data.url} target="blank">{restrictUrlLength(data.url)}</a>
                                </td>
                                <td style={{"padding-left": "20px"}}>
                                    <a href={url} target="blank">{url}</a>
                                </td>
                                <td>
                                    <button style={{background: `#2e2e2e`}} onClick={() => navigator.clipboard.writeText(url)}>Copy</button>
                                    <button style={{background: `#2e2e2e`}} >Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </UrlWrapper>
    )
}

export default MyUrls