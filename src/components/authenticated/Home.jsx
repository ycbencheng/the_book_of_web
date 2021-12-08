import { useContext, useEffect } from "react";
import { NativeBaseProvider, Stack, Link, Text, Divider } from "native-base";

import { Get, Delete } from "../../utils";
import { MainContext } from "../../utils/MainContext";

export const Home = ({ setToken }) => {
  const { token, user, friends, updateContext } = useContext(MainContext);

  useEffect(() => {
    Get("home", token, updateContext);
  }, []);

  const signOut = () => {
    setToken("");
    localStorage.removeItem("the-book-of");
    Delete("users/sign_out", token);
  };

  return (
    <NativeBaseProvider>
      <Stack space={5}>
        <Stack>
          <Link onPress={() => signOut()}>Sign out</Link>
        </Stack>
        <Text>User</Text>
        <Stack>{user.first_name}</Stack>

        <Divider my="2" />

        <Text>Friends</Text>
        <Stack>
          {Object.values(friends).map((friend) => {
            return (
              <>
                <Text>
                  {friend.first_name} {""} {friend.last_name}
                </Text>
              </>
            );
          })}
        </Stack>
      </Stack>
    </NativeBaseProvider>
  );
};
