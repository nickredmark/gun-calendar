import React, { useRef } from "react";
import { hot } from "react-hot-loader/root";
import { GunCalendar } from "./components/GunCalendar";
import uuid from "uuid/v1";

require("gun/lib/open");

const App = () => {
  const newId = useRef(null);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("calendar");

  if (!id) {
    return (
      <div className="new-calendar">
        <form
          onSubmit={e => {
            e.preventDefault();
            if (newId.current.value) {
              window.location.href = `${window.location.origin}?calendar=${newId.current.value}`;
            }
          }}
        >
          <input ref={newId} placeholder="(New) calendar ID e.g. nicksevents" />
        </form>
        or
        <button
          onClick={e =>
            (window.location.href = `${
              window.location.origin
            }?calendar=${uuid()}`)
          }
        >
          Create new calendar with random ID
        </button>
      </div>
    );
  }

  return <GunCalendar id={id} />;
};

export default hot(App);
