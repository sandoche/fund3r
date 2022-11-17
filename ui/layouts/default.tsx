import Navbar from '@/components/common/Navbar';

export default function DefaultLayout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
