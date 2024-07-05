import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="bg-gray-100">
      <div className="max-w-md m-auto min-h-screen bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
