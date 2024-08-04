import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="bg-background-gray">
      <div className="max-w-md m-auto min-h-screen bg-background-white">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
