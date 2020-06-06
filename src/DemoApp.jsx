import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import "./main.scss";

export default class DemoApp extends React.Component {
  calendarComponentRef = React.createRef();

  //CLIENT_ID = "144071191541-hneaq23ajirf343jc6s8lus3teo4c8pt.apps.googleusercontent.com";
  //API_KEY = "AIzaSyBtYPjPx7VhzTsKyxwxHo8t-4Br48_7EhQ";
  //DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  //SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  state = {
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { title: "Event!!!!!!!!", start: new Date() },
    ],
    personEvents: [],
    isSignedIn: null,
  };

  componentDidMount() {
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

          this.setState({ isSignedIn: auth.isSignedIn.get() });
          this.listUpcomingEvents();
        });
    });
  }

  loginWithGoogle = () => {
    window.gapi.auth2.getAuthInstance().signIn();
  };

  logoutFromGoogle = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  };

  renderAuth() {
    if (this.state.isSignedIn === null) {
      return <div>i dont know your google account</div>;
    } else if (this.state.isSignedIn) {
      // this.listUpcomingEvents();
      return <div>login with google!!</div>;
    } else {
      return <div>I can not see your google account!!</div>;
    }
  }

  render() {
    return (
      <div className="demo-app">
        <div className="demo-app-top">
          {this.renderAuth()}
          <button onClick={this.loginWithGoogle}>login with google</button>
          <button onClick={this.logoutFromGoogle}>logout from google</button>
        </div>
        <div className="demo-app-calendar">
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
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
            resourceAreaWidth="10%"
            resourceLabelText="アルバイト"
            resources={[
              {
                id: "a",
                title: "秋山",
              },
              {
                id: "b",
                title: "山川",
                eventColor: "green",
              },
              {
                id: "c",
                title: "渡部",
                eventColor: "orange",
              },
            ]}
            events={this.state.personEvents}
          />
        </div>
      </div>
    );
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends,
    });
  };

  gotoPast = () => {
    const calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  };

  handleDateClick = (arg) => {
    const temp = "Would you like to add an event to " + arg.dateStr + " ?";
    if (confirm(temp)) {
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: "New Event",
          start: arg.date,
          allDay: arg.allDay,
        }),
      });
    }
  };

  listUpcomingEvents = () => {
    window.gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then((response) => {
        const events = response.result.items;

        if (events.length > 0) {
          for (let i = 0; i < events.length; i++) {
            const event = events[i];
            let startTime = event.start.dateTime;
            const endTime = event.end.dateTime;
            if (!startTime) {
              startTime = event.start.date;
            }
            console.log(event.summary);
            this.setState({
              calendarEvents: this.state.calendarEvents.concat({
                title: event.summary,
                start: startTime,
              }),
              personEvents: this.state.personEvents.concat({
                resourceId: "a",
                title: event.summary,
                start: startTime,
                end: endTime,
              }),
            });
          }
        } else {
          console.log("event nothing");
        }
      });
  };
}
