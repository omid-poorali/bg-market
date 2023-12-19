import { Outlet } from "react-router-dom";
import { DarkModeSwitch } from "components";

export function Main() {
  return (
    <div className="mx-auto w-[95vw] max-w-[96rem]">
      <header className="absolute w-0 h-0 border-0">
        <h1 className="opacity-0">Digital currency exchange</h1>
      </header>
      <main className="mt-4">
        <Outlet />
      </main>
      <DarkModeSwitch />
    </div>
  );
}
