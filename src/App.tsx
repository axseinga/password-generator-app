import { GeneratePasswordContainer } from "@/containers/pass-generator-container";

const App = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-customBlack font-jetBrains text-customLightGrey">
      <GeneratePasswordContainer />
    </main>
  );
};

export default App;
