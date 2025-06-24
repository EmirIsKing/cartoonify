import React from 'react'
import { Button } from './ui/button';

const DownloadButton = ({imageUrl}:{imageUrl:string}) => {

    const fileName = 'cartoonify-image.jpg';

    const handleDownload = async () => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
      } catch (error) {
        console.error('Download failed:', error);
      }
  };


  return (
          <Button className="w-full"
          onClick={()=>handleDownload()}
          >Download</Button>

  )
}

export default DownloadButton
