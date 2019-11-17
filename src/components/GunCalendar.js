import { Calendar } from "./Calendar";
import React, { useState, useEffect } from "react";

const Gun = require("gun/gun");

const getId = element => element["_"]["#"];

const useRerender = () => {
  const [, setRender] = useState({});
  const rerender = () => setRender({});
  return rerender;
};

export const GunCalendar = ({ id }) => {
  const [gun, setGun] = useState(null);
  const rerender = useRerender();

  useEffect(() => {
    const gun = Gun({
      peers: ["https://gunjs.herokuapp.com/gun"]
    });
    setGun(gun);
  }, []);

  useEffect(() => {
    if (gun) {
      gun
        .get(id)
        .on(rerender)
        .get("events")
        .map()
        .on(rerender);
    }
  }, [gun]);

  if (!gun) {
    return <div>Loading...</div>;
  }

  const data = gun._.graph;

  return (
    <Calendar
      getId={getId}
      data={data}
      id={id}
      onCreateEvent={(start, title) =>
        gun
          .get(id)
          .get("events")
          .set({
            start,
            title
          })
      }
      onSetCalendarTitle={title =>
        gun
          .get(id)
          .get("title")
          .put(title)
      }
      onUpdateEvent={(id, values) => gun.get(id).put(values)}
    />
  );
};
