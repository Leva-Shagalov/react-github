import { SWRConfig } from "swr";
import apiConfig from "./api/api-config";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <SWRConfig value={{ fetcher: apiConfig }}>
      <MainLayout />
    </SWRConfig>
  );
}

export default App;
