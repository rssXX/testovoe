import {
    CreateShortUrl, DeleteShortUrl,
    GetInfoShortUrl,
} from './component'

function App() {
  return (
    <main>
      <section className='container'>
          <CreateShortUrl/>
          <DeleteShortUrl/>
          <GetInfoShortUrl/>
      </section>
    </main>
  )
}

export default App
