'use client'
import React,{useState, useEffect} from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { supabase } from '@/lib/supabaseClient'
import Loader from '@/components/Loader'
import { useRouter } from 'next/navigation'

const Page = () => {

    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [equalPass, setEqualPass] = useState("")
    const [passwordChecker, setPasswordChecker] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [fullName, setfullName] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    
    const router = useRouter();

    useEffect(() => {
        if (password && confirmPassword) {
            const isEqual = password === confirmPassword;
            const isGreaterthanSix = password.length >= 6;

            if (isEqual && isGreaterthanSix) {
                setPasswordChecker(true);
                setEqualPass(password);
            } else {
                setPasswordChecker(false);
                setEqualPass("");
            }
        } else {
            setPasswordChecker(false);
            setEqualPass("");
        }
    }, [password, confirmPassword]);



    const handleFullName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setfullName(e.target.value)
    }
    
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setpassword(e.target.value);
    };

    const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setconfirmPassword(value);
    };

    
async function signUpNewUser() {
  setLoading(true);

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password: equalPass,
  });


  if (signUpError) {
    console.error(signUpError.message);
    setLoading(false);
    return;
  }

  const { data , error: signInError } = await supabase.auth.signInWithPassword({email,password,})

  if (signInError) {
    console.error(signInError.message);
    return;
  }

  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData.session?.user;
  
    if (!user) {
    console.error("No user session found after signup");
    setLoading(false);
    return;
  }

  const { error: insertError } = await supabase.from('users').insert({
    id: user.id,
    email,
    full_name: fullName,
    history: [],
  });

  setLoading(false);

  if (insertError) {
    console.error('Failed to insert into users table:', insertError.message);
  } else {
    router.push('/cartoonify');
  }


}




  return (
    <div className='w-full h-full'>
        <div className='absolute w-full h-full pointer-events-none'>
            <div className='bg-[#F472B633] rounded-full w-20 h-20 blur-sm relative top-[80px] left-[40px]'></div>
            <div className='bg-[#C084FC33] rounded-full max-md:left-[250px] max-md:top-[120px] w-32 h-32 blur-sm relative top-[160px] left-[1232px]'></div>
            <div className='bg-[#60A5FA33] rounded-full max-md:left-[240px] max-md:top-[250px] w-16 h-16 blur-sm relative top-[120px] left-[360px]'></div>
        </div>
        <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
            <Logo/>
            <form onSubmit={(e) => {
                e.preventDefault();
                signUpNewUser();}} className='flex flex-col rounded-md bg-white/9 border gap-5 border-gray-300/30 p-9 justify-center items-center'>
                <div className='flex flex-col justify-center gap-3 items-center'>
                    <h1 className='font-bold text-5xl'>Welcome</h1>
                    <h3 className='max-md:text-center'>Sign into your account to start converting photos.</h3>
                </div>
                <div className='flex w-full flex-col justify-center gap-3 items-center'>
                    <div className='grid w-full items-center gap-3'>
                        <Label htmlFor="fullname" className='font-bold'>Full Name</Label>
                        <Input required type="text" id="fullname" onChange={handleFullName} className='bg-white/20 text-white h-10 placeholder:text-white'/>
                    </div>
                    <div className='grid w-full items-center gap-3'>
                        <Label htmlFor="email" className='font-bold'>Email</Label>
                        <Input required type="email" value={email} onChange={handleEmail} id="email" className='bg-white/20 text-white h-10 placeholder:text-white'/>
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
                    <div className='grid w-full items-center gap-3'>
                        <Label htmlFor="confirm-password" className='font-bold'>Confirm Password</Label>
                        <div className="relative w-full">
                            <Input
                            required
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={handleConfirmPassword}
                                id="confirm-password"
                                className="bg-white/20 h-10 text-white placeholder:text-white pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-2 top-2 text-sm text-white"
                            >
                                {showConfirmPassword ? 'Hide' : 'Show'}
                            </button>
                            </div>

                    </div>
                    <span className={`text-red-500 text-sm font-semibold`}>{confirmPassword && !passwordChecker ? "Your passwords do not match or is less than 6." : ""}</span>
                </div>
                <div className='w-full justify-between flex'>
                    <div className='flex items-center justify-center gap-2'>
                      <Checkbox id='termsofservices'
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    />
                      <Label htmlFor="termsofservices" className="max-md:flex max-md:w-full whitespace-nowrap">I agree to the <span className='text-pink-400'>Terms of Service</span> and <span className='text-pink-400'>Privacy Policy</span></Label>
                    </div>
                </div>
                <Button type='submit' disabled={!agreedToTerms || !passwordChecker} className={'bg-button rounded-md w-full py-5 px-9 shadow gap-5 hover:cursor-pointer hover:opacity-80 active:scale-[0.97] transition-transform duration-100'}>
                    {loading ? <Loader size={30}/>: "Sign Up"}
                </Button>
                <span className='font-bold text-xs'>Already have an account? <a href='/sign-in' className='text-pink-400'>Sign in</a></span>
            </form>
            
        </div>
    </div>
  )
}

export default Page
