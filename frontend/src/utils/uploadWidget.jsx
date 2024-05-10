import { useEffect, useRef, useState } from "react";

const UploadWidget = () => {
  const [imageurl,setImgurl]=useState(null);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    // console.log(cloudinaryRef.current)
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dve3n9ftf",
        uploadPreset: "moviessh",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info.secure_url);
          localStorage.setItem('imgurl',result.info.secure_url);
          setImgurl(result.info.secure_url);
        }
        console.log(result);
      }
    );
  }, []);
  return(
    <button onClick={() => widgetRef.current.open()} className="bg-gray-400 border-2 rounded-lg w-1/2">Upload your Payment Screenshot(Image) here</button>
  );
};

export default UploadWidget;
