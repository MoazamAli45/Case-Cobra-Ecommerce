import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Steps from "@/components/Steps";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <MaxWidthWrapper className="flex flex-col flex-1">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
};

export default Layout;
