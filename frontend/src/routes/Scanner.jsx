import { useLogin } from '@/components/LoginContext'
import { api } from '@/utils/api'
import jsQR from 'jsqr'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Scanner = () => {
  const [scanResult, setScanResult] = useState(null)
  const [scanResultInfo, setScanResultInfo] = useState(null)
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const { user } = useLogin()

  useEffect(() => {
    initializeScanner()
    return () => {
      stopCamera()
    }
  }, [navigate])

  const initializeScanner = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.addEventListener('loadedmetadata', () => {
            videoRef.current.play()
            scanQRCode()
          })
        }
      })
      .catch((err) => {
        console.error('Error accessing camera:', err)
      })
  }

  const scanQRCode = () => {
    const checkQRCode = () => {
      if (!videoRef.current || videoRef.current.videoWidth === 0) {
        requestAnimationFrame(checkQRCode)
        return
      }

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code) {
        setScanResult(code.data)
        sendApiRequest(code.data)
        stopCamera()
      } else {
        requestAnimationFrame(checkQRCode)
      }
    }
    checkQRCode()
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject
      const tracks = stream.getTracks()

      tracks.forEach((track) => {
        track.stop()
      })
      videoRef.current.srcObject = null
    }
  }

  const sendApiRequest = async (result) => {
    try {
      const response = await api.post(`/QR/check`, {
        qrData: result
      })
      if (response.status !== 200) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.data
      setScanResultInfo(data)
      if (data && data.exists && !data.used && !data.validityPassed) {
        return printTicket(data)
      }
      if (data && data.exists && data.used) {
        return alert('QR code already used')
      }
      if (data && data.exists && data.validityPassed) {
        return alert('Validity of this QR has expired')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const printTicket = (data) => {
    // <img id="logoImage" src="${document.location.origin}/images/logo.jpg" alt="Film Screening Logo" class="logo">
    const printContent = `
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                @page {
                    size: 58mm 85mm;
                    margin: 0;
                }
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                }
                .container {
                    width: 48mm; /* 44mm - (5mm * 2) */
                    height: 75mm; /* 72mm - (5mm * 2) */
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: space-between;
                    padding: 4mm;
                    border: 1mm solid #000;
                }
                .header {
                    text-align: center; 
                }
                .logo {
                    width: 20mm; /* Reduced logo size */
                    height: 20mm; /* Reduced logo size */
                    margin: auto;
                    display: block;
                }
                .title {
                    font-weight: bold;
                    font-size: 4.5mm; /* Reduced font size */
                    margin-top: 1mm; /* Reduced spacing */
                    margin-bottom: 0.5mm; /* Reduced spacing */
                }
                .subtitle {
                    font-size: 4mm; /* Reduced font size */
                    margin-top: 0.5mm; /* Reduced spacing */
                    margin-bottom: 1mm; /* Reduced spacing */
                }
                .seat-number {
                    padding: 0.5mm; /* Reduced padding */
                    text-align: center;
                    font-weight: bold;
                    font-size: 4mm; /* Reduced font size */
                    margin-top: 1mm; /* Reduced spacing */
                    margin-bottom: 1mm;
                }
                .footer {
                    text-align: center;
                    font-size: 4mm; /* Reduced font size */
                }
                .name {
                    font-weight: bold;
                    color: #333;
                    font-size: 4.5mm; /* Reduced font size */
                }
                .line-between {
                    border-bottom: 1px solid #000; /* Add line between "Movie Name" and "IIT Mandi" */
                    margin-left: 1mm; /* Add margin from the left border */
                    margin-right: 1mm; /* Add margin from the right border */
                }
            </style>
        </head>
        <body>
            <div class="container ticket w-54 h-72">
                        <div class="header">

                            <h2 class="title">IIT Mandi</h2> 
                            <p class="line-between"></p>
                            <p class="subtitle">${data.movie}</p>
                            <p class="subtitle">${new Date(data.show).toLocaleDateString('en-IN')}</p>

                        </div>
                        <div class="seat-number">Seat Number: ${data.seat}</div>
                        <div class="footer">
                            <p class="subtitle">Thanks for being a Valuable Member!</p>
                            <p class="subtitle">${data.name}</p>
                        </div>
                    </ticket>
                </body>
                </html>        
        `
    window.frames['print_frame'].document.body.innerHTML = printContent
    window.frames['print_frame'].window.focus()
    window.frames['print_frame'].window.print()
  }
  const getInfo = () => {
    if (!scanResultInfo) return 'Scanning...'
    if (!scanResultInfo.exists) return 'QR code not found'
    if (scanResultInfo.used) return 'QR code already used'
    if (scanResultInfo.validityPassed) return 'Validity of this QR has expired'
    return `Ticket for ${scanResultInfo.name} (${scanResultInfo.email}) for ${scanResultInfo.movie} on ${new Date(scanResultInfo.show).toLocaleDateString('en-IN')} `
  }
  return (
    <div className="mt-6 flex h-full w-full justify-center font-monts">
      <div style={{ maxWidth: '100%', height: 'auto' }}>
        {scanResult ? (
          <div>{getInfo()}</div>
        ) : (
          <video ref={videoRef} width="100%" height="auto"></video>
        )}
      </div>
      <iframe
        name="print_frame"
        width="0"
        height="0"
        frameborder="0"
        src="about:blank"
      ></iframe>
    </div>
  )
}

export default Scanner
