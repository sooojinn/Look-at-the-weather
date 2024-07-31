import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="bg-background-default">
      <div className="max-w-md m-auto min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
