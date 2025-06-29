'use client'
import React,{useState} from 'react'
import Logo from '@/components/Logo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'

const Page = () => {


    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [errorMsg, setErrorMsg] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpassword(e.target.value);
    };

    async function loginUser() {
        setLoading(true)
        const { data , error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (!rememberMe) {
            window.addEventListener("beforeunload", () => {
            supabase.auth.signOut();
            });
        }

        if (error) {
            setErrorMsg(error.message);
        } else {
        router.push('/cartoonify');
        }
        setLoading(false)
    }

  return (
    <div className='w-full h-full'>
        <div className='absolute w-full h-full pointer-events-none'>
            <div className='bg-[#F472B633] rounded-full w-20 h-20 blur-sm relative top-[80px] left-[40px]'></div>
            <div className='bg-[#C084FC33] max-md:left-[250px] max-md:top-[120px] rounded-full w-32 h-32 blur-sm relative top-[160px] left-[1232px]'></div>
            <div className='bg-[#60A5FA33] max-md:left-[240px] max-md:top-[250px] rounded-full w-16 h-16 blur-sm relative top-[120px] left-[360px]'></div>
        </div>
        <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
            <Logo/>
            <div className='flex flex-col rounded-md bg-white/9 border gap-5 border-gray-300/30 p-9 justify-center items-center'>
                <div className='flex flex-col justify-center gap-3 items-center'>
                    <h1 className='font-bold text-5xl'>Welcome Back</h1>
                    <h3>Sign into your account to start converting photos</h3>
                </div>
                <div className='flex w-full flex-col justify-center gap-3 items-center'>
                    <div className='grid w-full items-center gap-3'>
                        <Label htmlFor="email" className='font-bold'>Email</Label>
                        <Input type="email" id="email" value={email} onChange={handleEmail} className='bg-white/20 text-white h-10 placeholder:text-white'/>
                    </div>
                    <div className='grid w-full items-center gap-3'>
                        <Label htmlFor="password" className='font-bold'>Password</Label>
                        <div className="relative w-full">
                            <Input
                            required
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePassword}
                                id="password"
                                className="bg-white/20 h-10 text-white placeholder:text-white pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-2 text-sm text-white"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                            </div>
                    </div>
                </div>
                {errorMsg && <p className='text-red-500 text-sm'>{errorMsg}</p>}
                <div className='w-full justify-between flex'>
                    <div className='flex items-center justify-center gap-2'>
                        <Checkbox
                            id="rememberMe"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked === true)}
                        />
                        <Label htmlFor="rememberMe">Remember me</Label>
                    </div>
                    <a>Forgot Password</a>
                </div>
                <Button onClick={loginUser} className='bg-button rounded-md w-full py-5 px-9 shadow gap-5 hover:cursor-pointer hover:opacity-80 active:scale-[0.97] transition-transform duration-100'>
                    {loading ? <Loader size={30}/>: "Sign In"}
                </Button>
                <span className='font-bold text-xs'>Don't have an account? <a href='/sign-up' className='text-pink-400'>Sign Up</a></span>
            </div>
            
        </div>
    </div>
  )
}

export default Page
