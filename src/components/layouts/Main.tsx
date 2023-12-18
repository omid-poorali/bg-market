import { Outlet } from "react-router-dom";
import { DarkModeSwitch } from "components";

export function Main() {
  return (
    <>
      <header className="absolute w-0 h-0 border-0">
        <h1 className="opacity-0">Digital currency exchange</h1>
      </header>
      <main className="p-2 md:p-8">
        <Outlet />
      </main>
      <DarkModeSwitch />
    </>
  );
}
