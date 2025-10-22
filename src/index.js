import express from "express";
import fs from "fs/promises";
import Main from "./components/main.js";
import UserProfile from "./components/user-profile.js";
import { sendHtml, sendJSX, sendScript } from "./utils/send-response.js";

const app = express();

app.listen(8080, "localhost", (error) => {
  if (error) throw error;
  console.log("server running on 8080...");
});

app.get("/users", async (req, res) => {
  try {
    const dataType = req.query.jsx;

    const users = JSON.parse(await fs.readFile("src/data/users.json", "utf8"));
    const jsx = (
      <Main>
        {users.map(({ name, age, occupation, bio, id }) => (
          <UserProfile
            key={id}
            id={id}
            name={name}
            age={age}
            occupation={occupation}
            bio={bio}
          />
        ))}
      </Main>
    );

    if (dataType) {
      await sendJSX(res, jsx);
    } else {
      await sendHtml(res, jsx);
    }
  } catch (error) {
    console.log(error);
    res.end(JSON.stringify(error));
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dataType = req.query.jsx;

    if (!id) throw new Error("User not found!");

    const users = JSON.parse(await fs.readFile("src/data/users.json", "utf8"));
    const user = users.find((user) => user.id == id);

    if (!user) throw new Error("User not found!");

    const jsx = (
      <Main>
        <UserProfile
          name={user.name}
          id={user.id}
          age={user.age}
          occupation={user.occupation}
          bio={user.bio}
        />
      </Main>
    );

    if (dataType) {
      await sendJSX(res, jsx);
    } else {
      await sendHtml(res, jsx);
    }
  } catch (error) {
    console.log(error);
    res.end(JSON.stringify(error));
  }
});

app.get("/client.js", (req, res) => {
  sendScript(res, "src/lib/client.js");
});

app.get("/utils/formater.js", (req, res) => {
  console.log("bal...");
  sendScript(res, "src/utils/formater.js");
});

