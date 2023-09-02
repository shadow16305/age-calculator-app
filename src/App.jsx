import "./App.css";
import UserInput from "./components/User_Input/UserInput";

function App() {
  return (
    <>
      <div className="container max-w-[343px] lg:max-w-[840px] h-full mx-auto mt-32 lg:mt-[5%] py-10 bg-white rounded-3xl rounded-br-[100px] lg:rounded-br-[200px]">
        <UserInput />
      </div>
    </>
  );
}

export default App;
