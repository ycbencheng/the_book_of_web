import { useState, useEffect } from "react";
import { TextArea, Pressable, Button } from "native-base";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { UserBar } from "./UserBar";

import { Get, Post, Put, Delete } from "../../utils";

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
          value={entries[0]?.body}
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
  const [entry, setEntry] = useState("");

  const postEntry = (data) => {
    setEntries(data.entries);
  };

  return (
    <>
      <Pressable h={100} borderWidth={1} onPress={() => setIsReadOnly(false)}>
        <TextArea
          h={100}
          placeholder={`What's on your mind today?`}
          value={entry}
          onChangeText={(text) => setEntry(text)}
          isReadOnly={isReadOnly}
        />
      </Pressable>

      <Button onPress={() => Post("create_entry", { token, body: entry }, postEntry)}>Post</Button>
    </>
  );
};

export const ShowEntry = ({ token, user, viewUser, startDate }) => {
  const [entries, setEntries] = useState([]);
  console.log("entries", entries);
  useEffect(() => {
    Get("entries", { token, user_id: viewUser.id }, (data) => {
      setEntries(data.entries);
    });
  }, []);

  const convertedStartDate = new Date(startDate).toLocaleDateString("US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const todayDate = new Date().toLocaleDateString("US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const entry = entries.filter((entry) => {
    return entry.created_at === convertedStartDate;
  });

  if (viewUser.id != user.id) {
    return (
      <TextArea
        h={100}
        value={entry.length > 0 ? entry[0]?.body : `No record for ${convertedStartDate}.`}
        isReadOnly={true}
      />
    );
  } else {
    if (convertedStartDate === todayDate) {
      if (entry.length > 0) {
        return <EditEntry token={token} entries={entries} setEntries={setEntries} />;
      } else {
        return <NewEntry token={token} entries={entries} setEntries={setEntries} />;
      }
    } else {
      return (
        <TextArea
          h={100}
          placeholder={`What's on your mind today?`}
          value={entry.length > 0 ? entry[0]?.body : `You didn't record anything on ${convertedStartDate}.`}
          isReadOnly={true}
        />
      );
    }
  }
};

export const ShowCalendar = ({ startDate, setStartDate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    handleClick();
    setStartDate(e);
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button className="example-custom-input" onPress={handleClick}>
        {new Date(startDate).toLocaleDateString()}
      </Button>

      {isOpen && <DatePicker selected={startDate} onChange={handleChange} inline />}
    </>
  );
};

export const Entry = ({ token, user, viewUser, setShowEntry }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <Button h={100} borderWidth={1}>
        <UserBar user={viewUser} />
      </Button>

      <ShowCalendar startDate={startDate} setStartDate={setStartDate} />
      <ShowEntry token={token} user={user} viewUser={viewUser} startDate={startDate} />
    </>
  );
};
