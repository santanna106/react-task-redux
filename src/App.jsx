import StudyPlannerPage from './pages/StudyPlannerPage'
import { Provider } from 'react-redux';
import { store } from '../store';

function App() {
  return (
    <Provider store={store}>
      <StudyPlannerPage />
    </Provider>
  )
}

export default App