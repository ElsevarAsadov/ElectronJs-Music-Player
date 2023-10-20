import Slider from '@mui/material/Slider'
import { useState, useRef, useEffect } from 'react'
import audio from '../assets/Akon.mp3'
import {IconButton} from "@mui/material";

const { ipcRenderer } = require('electron')

function Main() {


  ipcRenderer.on('file', (e, filePath)=>{
    console.log(filePath)
  })


  function formatDuration(value) {
    const minute = Math.trunc(value / 60)
    const secondLeft = Math.trunc(value - minute * 60)
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

    const [paused, setPaused] = useState(true);

    const [audioData, setAudioData] = useState({
    name: '',
    path: '',
    size: '',
    type: '',
    duration: 0,
    currentTime: 0
  })
  /**
   *
   * @type {React.MutableRefObject<HTMLElement>}
   */
  const dropzoneRef = useRef()
  /**
   *
   * @type {React.MutableRefObject<HTMLAudioElement>}
   */
  const audioNode = useRef()

  useEffect(() => {
    if(paused){
      audioNode.current?.pause()
    }
    else{
      audioNode.current?.play()
    }
}, [paused])

  useEffect(() => {
    const audioNodeEndE = audioNode.current?.addEventListener('ended', function(){
      setPaused(true)
      setAudioData(c=>({...c, currentTime: 0}))
      this.currentTime = 0;
    })

    if (audioNode.current) {
      const audioNodeE = audioNode.current?.addEventListener('loadedmetadata', function () {
        setAudioData((c) => ({ ...c, duration: this.duration }))
      })
    }

    return (audioNodeEndE, audioNodeE)=>{

      removeEventListener('loadedmetadata', audioNodeE)
      removeEventListener('ended', audioNodeEndE)


    }
  }, [audioNode.current])

  useEffect(() => {

    const dropzoneDragE = dropzoneRef.current.addEventListener('dragover', (e) => {
      e.preventDefault()
    })
    const dropzoneDropE = dropzoneRef.current.addEventListener('drop', async ({ dataTransfer }) => {
      const { name, path, size, type } = dataTransfer.files[0]

      audioNode.current?.pause();


      setAudioData((c) => ({ ...c, name, path, size, type }))

      audioNode.current = new Audio(audio)

      //audioNode.current = new Audio(path)

      await audioNode.current.play()

        setPaused(false)

      const audioNodeE = audioNode.current.addEventListener('timeupdate', function () {
        setAudioData((c) => ({ ...c, currentTime: this.currentTime }))
      })
    })

    return (dropzoneDropE, dropzoneDragE, audioNodeE) => {
      removeEventListener('drop', dropzoneDropE)
      removeEventListener('dragover', dropzoneDragE)
      removeEventListener('timeupdate', audioNodeE)
    }
  }, [])

  return (
    <div ref={dropzoneRef} className={'h-full w-full block bg-white'}>
      <div className={'h-1/3 flex items-center justify-center'}>
        <svg
          className={'text-[12vw]'}
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" />
        </svg>
      </div>
      <div className={'flex flex-col h-2/3 w-[90%] pb-3 m-auto gap-3'}>
          <p>{audioData.name}</p>
          <IconButton sx={{alignSelf: 'center', width: '40px',}} onClick={()=>{
            setPaused(c=>!c)
          }}>
              { !paused && audioData?.name
              ? <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 320 512"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"/></svg>

              : <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg> }
          </IconButton>
        <div className={'w-full flex items-center gap-6 -mb-0.5'}>
          <p>{formatDuration(audioData.currentTime)}</p>
          <Slider
            value={audioData.currentTime}
            min={0}
            step={1}
            max={audioData.duration}
            sx={{
              color: 'black'
            }}
            onChange={(_, value) => {
              console.log('foo')
              setAudioData((c) => ({ ...c, currentTime: value }))
              audioNode.current.currentTime = value
            }}
          />
          <p>{formatDuration(audioData.duration)}</p>
        </div>
      </div>
    </div>
  )
}

export default Main
