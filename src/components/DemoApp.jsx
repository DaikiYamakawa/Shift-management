import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import "./main.scss";
import { fetchMembers } from "../stores/members";
import { useSelector, useDispatch } from "react-redux";
import { fetchSkills, deleteSkill, fetchSkillSets } from "../stores/skills";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  demoAppCalendar: {
    width: 800,
  },
  card: {
    margin: "0px 20px 30px 20px",
  },
}));

export default function DemoApp() {
  const classes = useStyles();
  const calendarComponentRef = React.createRef();

  const [calendarEvents, setCalendarEvents] = React.useState([]);
  const [calendarWeekends, setCalendarWeekends] = React.useState(true);
  const [personEvents, setPersonEvents] = React.useState();
  const [isSignedIn, setIsSignedIn] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const members = useSelector((state) => state.members.members);

  const dispatch = useDispatch();

  const loginWithGoogle = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  const logoutFromGoogle = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  const renderAuth = () => {
    if (isSignedIn === null) {
      return <div>i dont know your google account</div>;
    } else if (isSignedIn) {
      // this.listUpcomingEvents();
      return <div>login with google!!</div>;
    } else {
      return <div>I can not see your google account!!</div>;
    }
  };

  const listUpcomingEvents = () => {
    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        // timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 250,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;
        console.log(events);

        if (events.length > 0) {
          let temp = calendarEvents;
          Promise.all(
            events.map((item, index) => {
              return new Promise((resolve, reject) => {
                console.log(item);
                temp.push({
                  id: temp.length + 1,
                  resourceId: item.summary,
                  title: item.summary,
                  start: new Date(item.start.dateTime),
                  end: new Date(item.end.dateTime),
                });
                resolve("ok");
              });
            })
          ).then((result) => {
            console.log(temp);
            setCalendarEvents(temp);
            console.log(loading);
          });
          // let temp = calendarEvents;
          // for (let i = 0; i < events.length; i++) {
          //   const event = events[i];
          //   let startTime = event.start.dateTime;
          //   const endTime = event.end.dateTime;
          //   if (!startTime) {
          //     startTime = event.start.date;
          //   }
          //   console.log(event.summary);
          //   temp.push({
          //     title: event.summary,
          //     start: startTime,
          //   });
          //   console.log(temp);
          //   // setPersonEvents({
          //   //   ...personEvents,
          //   //   resourceId: "a",
          //   //   title: event.summary,
          //   //   start: startTime,
          //   //   end: endTime,
          //   // });
          // }
          // setCalendarEvents(temp);
        } else {
          console.log("event nothing");
        }
        setLoading(false);
      });
  };

  const handleDateClick = (arg) => {
    // bind with an arrow function
    calendarComponentRef.current.getApi().changeView("resourceTimelineDay", arg.dateStr);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(fetchMembers());
        dispatch(fetchSkills());
        dispatch(fetchSkillSets());
      } catch (err) {
        console.log(err.response);
      }
    }

    function checkAuth() {
      window.gapi.load("client:auth2", () => {
        window.gapi.client
          .init({
            apiKey: "AIzaSyBtYPjPx7VhzTsKyxwxHo8t-4Br48_7EhQ",
            clientId: "144071191541-hneaq23ajirf343jc6s8lus3teo4c8pt.apps.googleusercontent.com",
            scope: "https://www.googleapis.com/auth/calendar.readonly",
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          })
          .then(() => {
            const auth = window.gapi.auth2.getAuthInstance();
            setIsSignedIn({ isSignedIn: auth.isSignedIn.get() });
            listUpcomingEvents();
          });
      });
    }
    checkAuth();
    fetchData();
  }, [setIsSignedIn]);

  if (loading == true) {
    return <p>loading...</p>;
  } else {
    console.log("ok");
    return (
      <div className="demo-app">
        <div className="demo-app-top">
          {renderAuth}
          <button onClick={loginWithGoogle}>login with google</button>
          <button onClick={logoutFromGoogle}>logout from google</button>
        </div>
        <div className="demoAppCalendar">
          <Grid container alignItems="center" justify="center">
            <Grid item>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <FullCalendar
                    defaultView="resourceTimelineDay"
                    header={{
                      left: "prev,next today",
                      center: "title",
                      right: "resourceTimelineDay,dayGridMonth",
                    }}
                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                    locale="ja"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
                    ref={calendarComponentRef}
                    weekends={calendarWeekends}
                    events={calendarEvents}
                    // events={[
                    //   { id: "1", resourceId: 2, start: "2020-08-30", end: "2020-08-30", title: "event 1" },
                    //   { id: "2", resourceId: "c", start: "2020-08-30", end: "2020-08-30", title: "event 2" },
                    // ]}
                    resourceAreaWidth="10%"
                    resourceLabelText="アルバイト"
                    // resources={[
                    //   {
                    //     id: 1,
                    //     title: "秋山",
                    //   },
                    //   {
                    //     id: 2,
                    //     title: "山川",
                    //     // eventColor: "green",
                    //   },
                    //   {
                    //     id: 3,
                    //     title: "渡部",
                    //     // eventColor: "orange",
                    //   },
                    // ]}
                    resources={members.map((member) => {
                      return {
                        id: member.id,
                        title: member.name,
                      };
                    })}
                    scrollTime="08:00:00" //スクロールがデフォルトで表示する位置(店舗情報で設定できるように)
                    dateClick={handleDateClick}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
