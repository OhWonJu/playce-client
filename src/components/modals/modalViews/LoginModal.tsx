import ModalLayout from "../ModalLayout";

const LoginModal = () => {
  const bodyContent = (
    <div className="w-[400px] flex justify-center items-center">
      <div>로그인</div>
    </div>
  );

  const footerContent = <div>Foooter</div>;

  return (
    <ModalLayout
      title="로그인"
      body={bodyContent}
      footer={footerContent}
      containerClassName="w-full sm:w-[460px] h-screen"
      mode="slide"
    />
  );
};

export default LoginModal;
