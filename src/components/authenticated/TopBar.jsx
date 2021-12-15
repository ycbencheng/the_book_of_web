import { useContext } from "react";
import { Stack, Button, Link } from "native-base";

import { Delete } from "../../utils";
import { MainContext } from "../../utils/MainContext";

export const TopBar = () => {
  const { token, setToken } = useContext(MainContext);

  const signOut = () => {
    setToken("");

    localStorage.removeItem("the-book-of");

    Delete("users/sign_out", token);
  };

  return (
    <Stack space={5} pb={10}>
      <Link onPress={() => window.location.reload()}>The Book Of</Link>
      <Button onPress={() => signOut()}>SignOut</Button>
    </Stack>
  );
};
