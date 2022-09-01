import Container from "./Container";

const Header = () => {
  return (
    <div className="border-b border-[#E9E9E9] py-5">
      <Container classes={"flex items-center justify-between px-3 md:px-5 lg:px-10"}>
        <div>
          <img src="./assets/icons/logo.svg" alt="logo" />
        </div>
        <div className="flex items-center space-x-2">
          <img src="./assets/icons/avatar.svg" alt="avatar" />
          <h2 className="text-[#0A111F] font-semibold text-base">username</h2>
        </div>
      </Container>
    </div>
  );
};

export default Header;
