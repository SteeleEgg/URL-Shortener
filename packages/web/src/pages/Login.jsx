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
            return setPageState({...pageState, method: "register"})
        }
        if (pageState.method == "register") {
            return handleSubmit()
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
            }).then(res => {
                switch(res.status) {
                    case 200: navigate("/"); break;
                    case 400: alert("Password incorrect!"); break;
                    case 404: alert("User not found!"); break;
                    default: alert("Server Error!"); console.error("Server error!"); break;
                }
                return res.json()
            }).then(data => {
                window.sessionStorage.setItem("shortener-user", data.id)
            })
        }
    
        if (pageState.method == "register") {
            if (pageState.inputs.password !== pageState.inputs.confirm) {
                // console.log(pageState.inputs.password, pageState.inputs.confirm)
                alert("Passwords do not match!")
                return
            }
            if (pageState.inputs.agree == false){
                alert("Must agree to terms & conditions")
                return
            }
            
            fetch(`${import.meta.env.VITE_SHORTENER_URL}/users`, {
                method: `POST`,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: pageState.inputs.email, 
                    password: pageState.inputs.password
                })
            }).then(res =>  {
                switch(res.status) {
                    case 201: navigate("/"); alert("User Created!"); break;
                    case 400: alert("Email is already taken"); break;
                    default: alert("Server Error!"); console.error("Server error!"); break;
                }
                return res.json()
            }).then(data => {
                console.log(data)
                window.sessionStorage.setItem("shortener-user", data.id)
            })
        }
    }

    return (
        <LoginWrapper>
            <Title>{pageState.method == "login" ? "Login" : "Register"}</Title>
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