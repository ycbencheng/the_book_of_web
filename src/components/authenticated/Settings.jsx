import { useContext } from "react";
import { Stack, Button } from "native-base";

import { Delete } from "../../utils";
import { MainContext } from "../../utils/MainContext";

export const Settings = () => {
  const { token, setToken } = useContext(MainContext);

  const signOut = () => {
    setToken("");

    localStorage.removeItem("the-book-of");

    Delete("users/sign_out", token);
  };

  return (
    <Stack space={5} pb={10}>
      <Button onPress={() => signOut()}>Sign out</Button>
      <Button href={`/settings?user_id=${user.id}`}>Settings</Button>
    </Stack>
  );
};
