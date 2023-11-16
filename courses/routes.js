import Database from "../Database/index.js";
function CourseRoutes(app) {
  app.get("/api/courses", (req, res) => {
    // console.log("GET /api/courses")
    const courses = Database.courses;
    res.send(courses);
  });
  app.get("/api/courses/:id", (req, res) => {
    // console.log("GET /api/courses/:id")
    const { id } = req.params;
    const course = Database.courses.find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });
  app.get("/api/courses/:id/title", (req, res) => {
    // console.log("GET /api/courses/:id/title")
    const { id } = req.params;
    const course = Database.courses.find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    const { number, startDate } = course;
    const [startYear, startDay] = startDate.split("-");
    res.send(`${number}.${startYear}${startDay}`);
  });
  app.get("/api/courses/:id/description", (req, res) => {
    // console.log("GET /api/courses/:id/description")
    const { id } = req.params;
    const course = Database.courses.find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    const { startDate } = course;
    const [startYear, startMonth, startDay] = startDate.split("-");
    res.send(
      `${startYear}${startMonth}_${startDay} Fall ${startYear} Semester Full Term`
    );
  });
  app.put("/api/courses/:id", (req, res) => {
    // console.log("PUT /api/courses/:id")
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { ...course, c } : c
    );
    res.send(course);
  });
  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses.filter((c) => c._id !== id);
    res.sendStatus(204);
  });
  app.post("/api/courses", (req, res) => {
    // console.log("POST /api/courses")
    const course = { ...req.body, _id: new Date().getTime().toString() };
    Database.courses.push(course);
    res.send(course);
  });
}
export default CourseRoutes;
