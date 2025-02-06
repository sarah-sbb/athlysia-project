import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; // Import combiné
import Home from '../components/Home';

function Index() {
  return (
  <div>
    <Home />;
    <div>
      <FontAwesomeIcon 				
				icon={faBookmark} 
				/>
    </div>
  </div>

);
}

export default Index;
