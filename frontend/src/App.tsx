import './App.css';
import Routes from './Routes';
import backgroundImage from './components/pexels-photo-1054218.jpeg';

function App() {
  return (
   <div style={{
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed'
  }} className="container mx-0 px-4 min-h-screen max-w-full">
      <Routes />
    </div>

  );
}
export default App;