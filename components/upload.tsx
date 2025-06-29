"use client"

import { useState , useMemo} from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Upload({submit}: {submit: (file:any)=>void}) {
  const [file, setFile] = useState<File>()

    const fileUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null
  }, [file])

  const handleFileChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      submit(selectedFile)
      console.log("Uploading file:", file)

    }
  }

  console.log(fileUrl)
  return (
    <Card className="bg-gray-300/30 text-white border-pink-400 dashed-border w-full max-md:p-2">
      <CardHeader>
        <CardTitle className="text-white">Upload a Picture</CardTitle>
        <CardDescription className="text-white">Click to change Image.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 pt-5">
          {
            file ? (
                <div className={`flex justify-center items-center`} 
                
                >
                    <div className="relative w-72 h-64">
                        <label
                        htmlFor="dropzone-file"
                        className="absolute bg-gray-300/30 inset-0 w-full flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer overflow-hidden dark:bg-gray-700">
                            {
                                fileUrl && (
                                        <div className="absolute inset-0">
                                        <img 
                                            src={fileUrl} 
                                            alt="Preview" 
                                            className="object-contain w-full h-full" 
                                        />
                                        </div>
                                )
                            }
                        <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                    </div>
                </div>
                
            ) : (
                <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex text-white flex-col bg-transparent items-center justify-center w-full h-64 rounded-lg cursor-pointer"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon className="w-10 h-10 text-white" />
                <p className="mb-2 text-sm text-white ">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-white ">PNG, JPG or JPEG (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
            )
          }
          {file && (
            <div className="flex items-center gap-4 justify-between w-64">
              <div className="overflow-hidden">
                <p className="font-medium text-wrap">{file.name}</p>
                <p className="text-sm text-muted-foreground text-wrap">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function UploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}