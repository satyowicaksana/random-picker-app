import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory()

  return (
    <div>
      This is a PWA. :)
      <div>
        <button onClick={() => history.push('/other')}>to another page</button>
      </div>
    </div>
  )
}

export default Home;