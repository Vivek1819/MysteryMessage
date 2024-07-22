'use client'
import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useDebounceValue } from 'usehooks-ts'
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios , {AxiosError} from 'axios'
import { ApiResponse } from "@/types/ApiResponse"



export default function Page() {

  const [username,setusername]= React.useState('')
  const [usernameMessage,setUsernameMessage]= React.useState('')
  const [isCheckingUsername, setIsCheckingUsername] = React.useState(false)
  const [isSubmitting,setIsSubmitting]=React.useState(false);

  const debouncedUsername = useDebounceValue(username,300)
  const {toast} = useToast()
  const router = useRouter()

  //zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({ //z type of is for type casting to signUpSchema
    resolver: zodResolver(signUpSchema),
    defaultValues:{
      username:"",
      email:"",
      password:""
    }
  })

  React.useEffect(()=>{
    const checkUsernameUnique = async () => { 
      if(debouncedUsername){
        setIsCheckingUsername(true)
        setUsernameMessage('')

        try{
          const response = await axios.get(`/api/check-username-unique?username=${debouncedUsername}`)
          setUsernameMessage(response.data.message)
        } catch(error){
          const axiosError = error as AxiosError<ApiResponse>
          setUsernameMessage(axiosError.response?.data.message ?? "Error Checking Username")
        } finally {
          setIsCheckingUsername(false)
        }
      }
    }
    checkUsernameUnique()
  } ,[debouncedUsername])

  const onSubmit = async (data) =>{

  }

  return (
    <div>
      Page
    </div>
  )
}