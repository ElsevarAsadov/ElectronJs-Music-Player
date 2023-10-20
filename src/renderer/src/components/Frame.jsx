const { ipcRenderer } = require('electron')

function Frame() {
  function minimizeWindow() {
    ipcRenderer.invoke('window.minimize')
  }

  function destroyWindow() {
    ipcRenderer.invoke('window.destroy')
  }

  return (
    <div
      className={
        'DRAGABLE text-white w-full h-[30px] rounded-tr-[10px] rounded-tl-[10px] flex gap-3 items-center bg-black justify-between p-1 pr-3 pl-3'
      }
    >
      <p className={'NODRAG text-[12px] whitespace-nowrap'}>Electro Player</p>
      <div className={'flex items-center gap-5'}>
        <svg
          onClick={minimizeWindow}
          className={'NODRAG text-xl hover:cursor-pointer'}
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
        >
          <path
            fill={'white'}
            d="M32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H32z"
          />
        </svg>
        <svg
          onClick={destroyWindow}
          className={'NODRAG text-2xl hover:cursor-pointer'}
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 384 512"
        >
          <path
            fill={'white'}
            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
          />
        </svg>
      </div>
    </div>
  )
}

export default Frame
