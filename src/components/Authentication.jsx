import { useState } from "react";
import { FormControl, Button, Input, Stack, Link } from "native-base";
import { Post } from "./../utils";

export const Authentication = ({ setJWT }) => {
  const [isSignUp, setIsSignUpState] = useState(false);
  const [userState, setUserState] = useState({ first_name: "", last_name: "", email: "", password: "" });

  const { first_name, last_name, email, password } = userState;

  const cleanUpState = (boolean) => {
    setIsSignUpState(boolean);

    setUserState({ first_name: "", last_name: "", email: "", password: "" });
  };

  const submit = (uri) => {
    const uriObj = {
      "users/sign_up": { first_name, last_name, email, password },
      "users/sign_in": { email, password },
    };

    Post(uri, uriObj[uri], setJWT);
  };

  return (
    <FormControl>
      <Stack space={5}>
        {isSignUp && (
          <>
            <Stack>
              <Input
                variant="underlined"
                p={2}
                placeholder="First Name"
                value={first_name}
                onChangeText={(text) => setUserState({ ...userState, first_name: text })}
              />
            </Stack>
            <Stack>
              <Input
                variant="underlined"
                p={2}
                placeholder="Last Name"
                value={last_name}
                onChangeText={(text) => setUserState({ ...userState, last_name: text })}
              />
            </Stack>
          </>
        )}

        <Stack>
          <Input
            variant="underlined"
            p={2}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setUserState({ ...userState, email: text })}
          />
        </Stack>
        <Stack>
          <Input
            variant="underlined"
            p={2}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setUserState({ ...userState, password: text })}
            secureTextEntry={true}
          />
        </Stack>
        <Stack>
          {isSignUp ? (
            <Button p={2} onPress={() => submit("users/sign_up")}>
              Sign Up
            </Button>
          ) : (
            <Button p={2} onPress={() => submit("users/sign_in")}>
              Sign In
            </Button>
          )}
        </Stack>
        <Stack>
          {isSignUp ? (
            <Link onPress={() => cleanUpState(false)}>Sign In</Link>
          ) : (
            <Link onPress={() => cleanUpState(true)}>Sign Up</Link>
          )}
        </Stack>
      </Stack>
    </FormControl>
  );
};
