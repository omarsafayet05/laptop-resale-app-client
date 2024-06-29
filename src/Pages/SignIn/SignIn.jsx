import { Button, Label, TextInput } from "flowbite-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
const SignIn = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";
  console.log(location.state);
  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signIn(email, password)
      .then((userCredentials) => {
        const loggeduser = userCredentials.user;
        console.log(loggeduser);
        form.reset();
        Swal.fire({
          title: "Sign In",
          text: "You are log in!",
          icon: "success",
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error Message",
          text: err.message,
          icon: "failed",
        });
      });
  };

  return (
    <div className="min-h-screen">
      <h1>Sign In</h1>
      <form
        className="flex max-w-md flex-col gap-4 mt-[10%]"
        onSubmit={handleSignIn}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            name="email"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="text" name="password" required />
        </div>
        <div></div>
        <div className="flex items-center gap-2">
          <Label htmlFor="agree" className="flex">
            If you have no account,Go to
            <Link
              to={"/signup"}
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Sign In
            </Link>
          </Label>
        </div>
        <Button type="submit" className="bg-cyan-600">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
