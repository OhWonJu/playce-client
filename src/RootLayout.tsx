import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative max-w-screen min-h-screen h-screen transition">
      {children}
    </div>
  );
};

export default RootLayout;
