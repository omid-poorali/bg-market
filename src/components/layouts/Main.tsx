import { Outlet } from 'react-router-dom';
import { DarkModeSwitch } from 'components';

export function Main() {
  return (
    <>
      <main className='p-2 md:p-8'>
        <Outlet />
      </main>
      <DarkModeSwitch />
    </>
  );
}
