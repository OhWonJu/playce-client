import { Button } from "@/components";
import GoogleIcon from "@/components/icons/Google";

const { VITE_OAUTH_REQUEST_URI } = import.meta.env;

const GoogleAuthButton = () => {
  const handleLGoogleOauth2 = () => {
    window.location.href = VITE_OAUTH_REQUEST_URI as string;
  };

  return (
    <Button
      variant="plain"
      size="lg"
      onClick={handleLGoogleOauth2}
      className="relative bg-white border border-primary-foreground flex flex-row items-center"
    >
      <GoogleIcon className="absolute w-5 h-5 left-6" />
      <span className="text-black">
        <strong>Google</strong> 로 계속하기
      </span>
    </Button>
  );
};

export default GoogleAuthButton;
