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
    setFile(e.target.files[0])
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    submit(file)
    console.log("Uploading file:", file)
  }

  console.log(fileUrl)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload a Picture</CardTitle>
        <CardDescription>Click to change picture.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {
            file ? (
                <div className={``} 
                
                >
                    <div className="relative w-72 h-64">
                        <label
                        htmlFor="dropzone-file"
                        className="absolute inset-0 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 overflow-hidden dark:bg-gray-700">
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
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadIcon className="w-10 h-10 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
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
              <Button type="submit">Upload</Button>
            </div>
          )}
        </form>
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