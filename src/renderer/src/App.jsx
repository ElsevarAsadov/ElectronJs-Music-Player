import Frame from "./components/Frame";
import Main from "./components/Main";


function App() {
  return (
    <div className={'overflow-hidden w-[600px] h-[300px] app-shadow rounded-tr-[10px] rounded-tl-[10px]'}>
      <Frame/>
      <Main/>
    </div>
  )
}

export default App
