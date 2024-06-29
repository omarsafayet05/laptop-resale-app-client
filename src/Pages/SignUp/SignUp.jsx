import { Button, Label, Radio, TextInput } from "flowbite-react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.displayName.value;
    const photoURL = form.photoURL.value;

    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password, name, photoURL);

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(name, photoURL).then(() => {
          const userInfo = {
            name: name,
            email: email,
            timestamp: new Date(),
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user info added to the database");
              form.reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title:
                  "You are registered and user info stored to the Database",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/");
            }
          });
        });
      })
      .catch((err) =>
        Swal.fire({
          title: "Error Message",
          text: err.message,
          icon: "Failed",
        })
      );
  };
  return (
    <div className="min-h-screen ">
      <h1>Sign Up</h1>
      <form
        className="flex max-w-md flex-col gap-4 mt-[10%] mb-[10%]"
        onSubmit={handleSignUp}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="name" />
          </div>
          <TextInput
            id="name"
            name="displayName"
            type="text"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="photo-url" value="Photo URL" />
          </div>
          <TextInput
            id="photo-url"
            name="photoURL"
            type="url"
            placeholder="Photo URL"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            name="email"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput id="password1" type="text" name="password" required />
        </div>{" "}
        <div className="mb-2 block">
          <fieldset className="flex max-w-md flex-col gap-4">
            <legend className="mb-4">Choose your role</legend>
            <div className="flex items-center gap-2">
              <Radio
                id="user_role"
                name="user role"
                value="User"
                defaultChecked
              />
              <Label htmlFor="user_role">User</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="seller_id" name="Seller" value="Seller" />
              <Label htmlFor="seller_id">Seller</Label>
            </div>
          </fieldset>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="agree" className="flex">
            If you already have an account
            <Link
              to={"/login"}
              className="text-cyan-600 hover:underline dark:text-cyan-500"
            >
              Login
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

export default SignUp;
