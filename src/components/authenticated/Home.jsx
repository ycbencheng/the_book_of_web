import { NativeBaseProvider, Stack, Link } from "native-base";
import { Delete } from "../../utils";

export const Home = ({ token, setToken }) => {
  const signOut = () => {
    setToken("");
    localStorage.removeItem("the-book-of");
    Delete("users/sign_out", token);
  };

  return (
    <NativeBaseProvider>
      <Stack space={5}>
        <Link onPress={() => signOut()}>Sign out</Link>
      </Stack>
    </NativeBaseProvider>
  );
};
