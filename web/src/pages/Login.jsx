import { Button, ButtonWrapper, LoginWrapper } from "../components/Login"
import { Checkbox, OutputBox as Input, Title } from "../components/ShortenerComponents"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const navigate = useNavigate()

    const [pageState, setPageState] = useState({
        method: "login",
        inputs: {
            email:"",
            password:"",
            confirm:"",
            agree: false
        }
        
    })

    const handleRegister = () => {
        if (pageState.method == "login") {
            setPageState({...pageState, method: "register"})
        }

        if (pageState.method == "register") {
            // handle register
        }
    }

    const handleInput = (event, field) => {
        setPageState(prev => {
            let stx = {...prev}
            stx.inputs[field] = event.target.value
            return stx;
        })
    }

    const handleCheckbox = (event) => {
        setPageState(prev => {
            let stx = {...prev}
            stx.inputs.agree = event.target.checked // true / false
            return stx;
        })
    }

    const handleSubmit = () => {
        if (pageState.method == "login") {
            // do login
            fetch(`${import.meta.env.VITE_SHORTENER_URL}/auth/login`, {
                method: `POST`,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: pageState.inputs.email, 
                    password: pageState.inputs.password
                })
            }).then(res => res.json()).then(data => {
                console.log(data)
                // Handle POST response
                if (data.message == "Logged in!") {
                    navigate('/')
                }
                if (data.message == `ERROR`){
                    alert(JSON.stringify(data.errors))
                  }
            })
        }
        if (pageState.method == "register") {
            // check passwords match
            if (pageState.inputs.email === pageState.inputs.confirm, pageState.inputs.agree == true) {
                fetch(`${import.meta.env.VITE_SHORTENER_URL}/users`, {
                    method: `POST`,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: pageState.inputs.email, 
                        password: pageState.inputs.password
                    })
                }).then(res => res.json()).then(data => {
                    // Handle POST response
                    if (data.message == "Created") {
                        navigate('/')
                    }
                })
            }
            // ensure agree is true
            // do register
        }
    }

    return (
        <LoginWrapper>
            <Title>{pageState.method == "login" ? "Login" : "Registrar"}</Title>
                <Input onChange={e => handleInput(e, "email")} value={pageState.inputs.email} placeholder="Email"></Input>
                <Input onChange={e => handleInput(e, "password")} value={pageState.inputs.password} type="password" placeholder="Password"></Input>
                {pageState.method == "register" && 
                    <>
                        <Input onChange={e => handleInput(e, "confirm")} value={pageState.inputs.confirm} type="password" placeholder="Reenter Password"></Input>
                        <form>
                            <Checkbox checked={pageState.inputs.agree} onChange={handleCheckbox} type= "checkbox" name= "confirm" />
                            <label htmlFor="confirm">Agree to Terms and Conditions?</label>
                        </form>
                    </>
                }
                <ButtonWrapper>
                    {pageState.method == "register" && 
                        <Button onClick={() => setPageState({...pageState, method: "login"})}>Back</Button>
                    }
                    {pageState.method == "login" &&
                        <Button onClick={handleSubmit}>Login</Button>
                    }
                    <Button onClick={handleRegister}>Register</Button>
                </ButtonWrapper>
        </LoginWrapper>
    )
}

export default Login