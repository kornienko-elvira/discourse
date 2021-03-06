import selectKit from "helpers/select-kit-helper";
import { acceptance } from "helpers/qunit-helpers";

acceptance("Topic Notifications button", {
  loggedIn: true,
  pretend(server, helper) {
    server.post("/t/280/notifications", () => {
      return helper.response({});
    });
  }
});

QUnit.test("Updating topic notification level", async assert => {
  const notificationOptions = selectKit(
    "#topic-footer-buttons .topic-notifications-options"
  );

  await visit("/t/internationalization-localization/280");

  assert.ok(
    notificationOptions.exists(),
    "it should display the notification options button in the topic's footer"
  );

  await notificationOptions.expand();
  await notificationOptions.selectRowByValue("3");

  assert.equal(
    notificationOptions.header().label(),
    "Watching",
    "it should display the right notification level"
  );

  const timelineNotificationOptions = selectKit(
    ".topic-timeline .widget-component-connector .topic-notifications-options"
  );

  assert.equal(
    timelineNotificationOptions.header().value(),
    "3",
    "it should display the right notification level"
  );

  await timelineNotificationOptions.expand();
  await timelineNotificationOptions.selectRowByValue("0");

  assert.equal(
    timelineNotificationOptions.header().value(),
    "0",
    "it should display the right notification level"
  );

  assert.equal(
    notificationOptions.header().label(),
    "Muted",
    "it should display the right notification level"
  );
});
