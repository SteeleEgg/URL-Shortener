import { useRef, useState } from 'react'
import { Title, Middle, UrlBox, GetShortButton, OutputBox } from "../components/ShortenerComponents"

const Shortener = ({}) => {

    const inputRef = useRef(null)
    // const shortRef = useRef(null)

    const [outputState, setOutputState] = useState("")
    
    const postURL = () => {
        console.log(inputRef.current.value)
        // Handle input functionality
        let requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({
                url: inputRef.current.value
            })
        }

        console.log(requestOptions)
        fetch(`${import.meta.env.VITE_SHORTENER_URL}/urls`, requestOptions).then(res => res.json()).then(data => {
        console.log(data)
        // data.url => the newly minted short url
        // shortRef.current.value = data.url
        let url = `${import.meta.env.VITE_SHORTENER_URL}/urls/${data.id}`
        setOutputState(url)
        navigator.clipboard.writeText(url)
        })
    }

    return (
        <>
            <Title>URL Shortener</Title>
            <Middle>
            <UrlBox ref={inputRef} />
            <GetShortButton onClick={postURL}> Get Short </GetShortButton>
            </Middle> 
            <OutputBox value={outputState} onChange={() => {}} />
        </>
    )
}

export default Shortener