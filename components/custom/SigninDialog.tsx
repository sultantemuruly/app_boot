import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";

const SigninDialog = ({
  openDialog,
  closeDialog,
}: {
  openDialog: boolean;
  closeDialog: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      const user = userInfo?.data;
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuidv4(),
      });

      if (typeof window !== undefined) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setUserDetail(userInfo?.data);

      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="font-bold text-2xl text-black">
                Sign in to continue
              </h2>
              <p>
                To use App Boot you must log into an existing account or create
                one.
              </p>
              <Button
                className="bg-blue-600 text-white hover:bg-blue-700"
                onClick={googleLogin}
              >
                Sign In With Google
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default SigninDialog;
