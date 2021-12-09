import { useState, useContext, useEffect } from "react";
import { NativeBaseProvider, TextArea, Pressable, Button, Text } from "native-base";

import { Get, Post, Put, Delete } from "../../utils";
import { MainContext } from "../../utils/MainContext";

export const EditEntry = ({ token, entries, setEntries }) => {
  const [isReadOnly, setIsReadOnly] = useState(true);

  const updateEntry = (id, text) => {
    const newEntries = entries.map((entry) => {
      return entry.id === id && { ...entry, body: text };
    });

    setEntries(newEntries);
  };

  const deleteEntry = (id) => {
    const newEntries = entries.filter((entry) => {
      return entry.id !== id;
    });

    setEntries(newEntries);
  };

  const saveEntry = () => {
    Put("update_entry", { token, id: entries[0].id, body: entries[0].body }, () => {});
    setIsReadOnly(true);
  };

  return (
    <>
      <Pressable h={100} borderWidth={1}>
        <TextArea
          h={100}
          // Pass in the right id base on the calendar click
          value={entries[0]?.body}
          // Pass in the right id base on the calendar click
          onChangeText={(text) => updateEntry(entries[0]?.id, text)}
          isReadOnly={isReadOnly}
        />
      </Pressable>
      {isReadOnly ? (
        <Button onPress={() => setIsReadOnly(false)}>Edit</Button>
      ) : (
        <Button onPress={() => saveEntry()}>Save</Button>
      )}

      <Button onPress={() => Delete("delete_entry", { token, id: entries[0].id }, deleteEntry(entries[0]?.id))}>
        Delete
      </Button>
    </>
  );
};

export const NewEntry = ({ token, entries, setEntries }) => {
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [newEntry, setNewEntry] = useState("");

  const updateEntry = (data) => {
    setNewEntry("");
    setEntries(data.entries);
  };

  return (
    <>
      <Pressable h={100} borderWidth={1} onPress={() => setIsReadOnly(false)}>
        <TextArea
          h={100}
          placeholder={`What's on your mind today?`}
          value={newEntry}
          onChangeText={(text) => setNewEntry(text)}
          isReadOnly={isReadOnly}
        />
      </Pressable>

      <Button onPress={() => Post("create_entry", { token, body: newEntry }, updateEntry)}>Post</Button>
    </>
  );
};

export const Entry = ({ user }) => {
  const { token } = useContext(MainContext);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    Get("entries", { token }, (data) => {
      setEntries(data.entries);
    });
  }, []);

  return (
    <NativeBaseProvider>
      {entries[0]?.body ? (
        <EditEntry token={token} entries={entries} setEntries={setEntries} />
      ) : (
        <NewEntry token={token} entries={entries} setEntries={setEntries} />
      )}
    </NativeBaseProvider>
  );
};
