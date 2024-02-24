import dynamic from "next/dynamic";
import "./Account.css";

const SignIn = dynamic(() => import("@/components/SignIn/SignIn") as any, {
  ssr: true,
});

const SignUp = dynamic(() => import("@/components/SignUp/SignUp") as any, {
  ssr: true,
});

const Account = () => {
  return (
    <div className="flex gap-5">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Account;

/* <Button
        variant="outline"
        type="button"
        name="sign_in"
        className="bg-transparent border-primary"
      >
        SIGN IN
      </Button>
      <Button
        variant="outline"
        type="button"
        name="sign_up"
        className="bg-transparent border-primary"
      >
        SIGN UP
      </Button> */
