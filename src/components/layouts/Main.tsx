import { Outlet } from 'react-router-dom';
import { DarkModeSwitch } from 'components';

export function Main() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <DarkModeSwitch />
    </>
  );
}
