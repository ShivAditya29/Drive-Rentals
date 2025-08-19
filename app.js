require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const session = require("express-session");
const path = require("path");
const ejs = require("ejs");
const niceinvoice = require("nice-invoice");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "nodelogin",
  connectionLimit: 10,
  multipleStatements: true,
});
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));
// http://localhost:3000/
app.get("/", function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + "/static/index.html"));
});

//login as user
// http://localhost:3000/auth
app.post("/auth", function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          request.session.loggedin = true;
          request.session.username = username;
          // Redirect to home page
          response.redirect("/userdashboard");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        // response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

//logout user

app.post("/signout", function (request, response) {
  if (request.session.loggedin) {
    // Execute SQL query that'll select the account from the database based on the specified username and password

    request.session.loggedin = false;
    // Redirect to home page
    response.redirect("/");
  } else {
    response.send("Cannot logout");
  }
  // response.end();
});

// http://localhost:3000/home
app.get("/userdashboard", function (request, response) {
  // If the user is loggedin
  if (request.session.loggedin) {
    // Output username
    // response.send("Welcome back, " + request.session.username + "!");
    response.sendFile(path.join(__dirname + "/static/userdashboard.html"));
  } else {
    // Not logged in
    response.send("Please login to view this page!");
  }
  // response.end();
});

// admin login
// http://localhost:3000/auth
app.post("/auth1", function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query(
      "SELECT * FROM admin WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        // If there is an issue with the query, output the error
        if (error) throw error;
        // If the account exists
        if (results.length > 0) {
          // Authenticate the user
          request.session.loggedin = true;
          request.session.username = username;

          // Redirect to home page
          response.redirect("/admindashboard");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        // response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});
// http://localhost:3000/home
app.get("/admindashboard", function (request, response) {
  // If the user is loggedin
  if (request.session.loggedin) {
    // Output username
    // response.send("Welcome back, " + request.session.username + "!");
    response.sendFile(path.join(__dirname + "/static/admindashboard.html"));
  } else {
    // Not logged in
    response.send("Please login to view this page!");
  }
  // response.end();
});

//register user
// router.get("/register", function (req, res, next) {
//   res.render("registration-form");
// });
// to store user input detail on post request
app.post("/auth2", function (req, res, next) {
  inputData = {
    // first_name: req.body.first_name,
    // last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    // gender: req.body.gender,
    // password: req.body.password,
    // confirm_password: req.body.confirm_password,
  };
  inputData2 = {
    // first_name: req.body.first_name,
    // last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    number: req.body.number,
    license: req.body.license,
    address: req.body.address,
    state: req.body.state,
    // gender: req.body.gender,
    // password: req.body.password,
    // confirm_password: req.body.confirm_password,
  };
  // check unique email address
  var sql = "SELECT * FROM accounts WHERE email =?";
  db.query(sql, [inputData.email], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
      const ans = inputData.email + " was already exist";
      return res.status(400).send(ans);
    }
    // else if (inputData.confirm_password != inputData.password) {
    //   var msg = "Password & Confirm Password is not Matched";
    // }
    else {
      // save users data into database
      var sql = "INSERT INTO accounts SET ?";
      db.query(sql, inputData, function (err, data) {
        if (err) throw err;
      });
      var sql1 = "INSERT INTO user_profiles SET ?";
      db.query(sql1, inputData2, function (err, data) {
        if (err) throw err;
      });

      const msg = "You are successfully registered";
    }
    res.sendFile(path.join(__dirname + "/static/userdashboard.html"));
  });
});

//admin register
app.post("/admin", function (req, res, next) {
  inputData = {
    // first_name: req.body.first_name,
    // last_name: req.body.last_name,
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    // gender: req.body.gender,
    // password: req.body.password,
    // confirm_password: req.body.confirm_password,
  };

  // check unique email address
  var sql = "SELECT * FROM admin WHERE email =?";
  db.query(sql, [inputData.email], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
      const ans = inputData.email + " was already exist";
      return res.status(400).send(ans);
    }
    // else if (inputData.confirm_password != inputData.password) {
    //   var msg = "Password & Confirm Password is not Matched";
    // }
    else {
      // save users data into database
      var sql = "INSERT INTO admin SET ?";
      db.query(sql, inputData, function (err, data) {
        if (err) throw err;
      });

      const msg = "Successfully registered as admin";
    }
    res.sendFile(path.join(__dirname + "/static/admindashboard.html"));
  });
});

//buy bike responses
app.post("/info", function (req, res, next) {
  inputData = {
    // first_name: req.body.first_name,
    // last_name: req.body.last_name,
    name: req.body.username,
    mobile: req.body.mobile,
    address: req.body.address,
    license: req.body.license,
    model: req.body.model,
    area: req.body.area,

    //password: req.body.password,
    email: req.body.email,
    // gender: req.body.gender,
    // password: req.body.password,
    // confirm_password: req.body.confirm_password,
  };

  // check unique email address
  var sql = "SELECT * FROM bikes WHERE email =?";
  db.query(sql, [inputData.email], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
      const ans = inputData.email + " was already exist";
      return res.status(400).send(ans);
    }
    // else if (inputData.confirm_password != inputData.password) {
    //   var msg = "Password & Confirm Password is not Matched";
    // }
    else {
      // save users data into database
      var sql = "INSERT INTO bikes SET ?";
      db.query(sql, inputData, function (err, data) {
        if (err) throw err;
      });

      const msg = "You are booked";
    }
    res.redirect("/mybooking");
  });
});

//add bikes
app.post("/info1", function (req, res, next) {
  inputData = {
    name: req.body.name,
    description: req.body.desc,
    model: req.body.model,
    cost: req.body.cost,
    features: req.body.features,
    file_data: req.body.pic,

    //password: req.body.password,
    // email: req.body.email,
    // gender: req.body.gender,
    // password: req.body.password,
    // confirm_password: req.body.confirm_password,
  };
  // check unique email address
  var sql = "SELECT * FROM add_bikes WHERE model =?";
  db.query(sql, [inputData.model], function (err, data, fields) {
    if (err) throw err;
    if (data.length > 0) {
      const ans = inputData.model + " was already exist";
      return res.status(400).send(ans);
    }
    // else if (inputData.confirm_password != inputData.password) {
    //   var msg = "Password & Confirm Password is not Matched";
    // }
    else {
      // save users data into database
      var sql = "INSERT INTO add_bikes SET ?";
      db.query(sql, inputData, function (err, data) {
        if (err) throw err;
      });

      const msg = "You added a bike";
    }
    res.redirect("/addbikes");
  });
});
// adding data into users of mybookings
app.get("/mybooking", function (req, res, next) {
  if (req.session.loggedin) {
    var sql = `SELECT * FROM bikes where name="${req.session.username}"`;
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.render("mybooking", { title: "User List", userData: data });
    });
  } else {
    // Not logged in
    res.send("Please login to view this page!");
  }
});
//adding data into bookings
app.get("/reservation", function (req, res, next) {
  if (req.session.loggedin) {
    var sql = "SELECT * FROM bikes";
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.render("reservation", { title: "User List", userData: data });
    });
  } else {
    res.send("Please login to view this page!");
  }
});

//adding bikes cards for admin
app.get("/addbikes", function (req, res, next) {
  if (req.session.loggedin) {
    var sql = "SELECT * FROM add_bikes";
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.render("addbikes", { title: "User List", userData: data });
    });
  } else {
    res.send("Please login to view this page!");
  }
});

//adding bikes cards for user
app.get("/bikes", function (req, res, next) {
  if (req.session.loggedin) {
    var sql = "SELECT * FROM add_bikes";
    db.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.render("bikes", { title: "User List", userData: data });
    });
  } else {
    res.send("Please login to view this page!");
  }
});

//invoice details
app.get("/invoice", function (req, res, next) {
  if (req.session.loggedin) {
    var sql = "SELECT * FROM bikes";
    connection.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.render("invoice", { title: "User List", userData: data });
    });
  } else {
    res.send("  Please login to view this page");
  }
});

//user profile details

app.get("/userprofile", function (req, res, next) {
  if (req.session.loggedin) {
    var sql = `SELECT * FROM user_profiles WHERE username="${req.session.username}"`;
    connection.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.render("userprofile", { title: "User List", userData: data });
    });
  } else {
    res.send("Please login to view this page!");
  }
});
//admin profile details

app.get("/adminprofile", function (req, res, next) {
  if (req.session.loggedin) {
    var sql = `SELECT * FROM admin WHERE username="${req.session.username}"`;
    connection.query(sql, function (err, data, fields) {
      if (err) throw err;
      res.render("adminprofile", { title: "User List", userData: data });
    });
  } else {
    res.send("Please login to view this page!");
  }
});

// update password of user
// http://localhost:3000/auth
app.post("/updation", function (request, response) {
  // Capture the input fields
  let oldpass = request.body.oldpass;
  let newpass = request.body.newpass;
  // Ensure the input fields exists and are not empty

  var sql = `UPDATE accounts SET password = "${newpass}"  WHERE password = "${oldpass}" AND username = "${request.session.username}"`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows);
    if (result.affectedRows == 0) response.send("wrong old passowrd");
    else {
      console.log("record(s) updated");
      response.redirect("/userprofile");
    }
  });
});

//update password of admin
app.post("/updation1", function (request, response) {
  // Capture the input fields
  let oldpass = request.body.oldpass;
  let newpass = request.body.newpass;
  // Ensure the input fields exists and are not empty

  var sql = `UPDATE admin SET password = "${newpass}"  WHERE password = "${oldpass}" AND username = "${request.session.username}"`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows);
    if (result.affectedRows == 0) response.send("wrong old passowrd");
    else {
      console.log("record(s) updated");
      response.redirect("/adminprofile");
    }
  });
});
//delete booking
app.post("/delete", function (request, response) {
  // Capture the input fields
  let model = request.body.model;
  let name = request.body.name;
  // Ensure the input fields exists and are not empty

  var sql = `DELETE FROM bikes WHERE model = "${model}"  AND name = "${name}"`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows);
    if (result.affectedRows == 0) response.send("No such booking");
    else {
      console.log("deleted booking");
      response.redirect("/mybooking");
    }
  });
});

//printing invoice

const invoiceDetail = {
  shipping: {
    name: "Kirti",
    address: "123 Patel Nagar",
    city: "Bathinda",
    state: "Bathinda",
    country: "Bathinda",
    postal_code: 12345,
  },
  items: [
    {
      item: "Royal Enfield",
      description: "The real class of driving",
      quantity: 1,
      price: 50.0,
      tax: "10%",
    },
    {
      item: "Royal Enfield",
      description: "The real class of driving",
      quantity: 1,
      price: 30.0,
      tax: "10%",
    },
  ],
  subtotal: 156,
  total: 156,
  order_number: 1234222,
  header: {
    company_name: "BIKE RENTAL SERVICE",
    company_logo: "logo.png",
    company_address: "Nice Invoice. 142 GH Jhalwa, Prayagraj",
  },
  footer: {
    text: "Copyright",
  },
  currency_symbol: "Rs",
  date: {
    billing_date: "08 August 2020",
  },
};
niceinvoice(invoiceDetail, "user.pdf");

//routes
app.get("/userlogin", function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + "/static/userlogin.html"));
});

//cancel
app.get("/deleteform", function (request, response) {
  if (request.session.loggedin) {
    // Render login template
    response.sendFile(path.join(__dirname + "/static/deleteform.html"));
  } else {
    response.send("Please login to view this page!");
  }
});

app.get("/updatepass", function (request, response) {
  if (request.session.loggedin) {
    // Render login template
    response.sendFile(path.join(__dirname + "/static/updatepass.html"));
  } else {
    response.send("Please login to view this page!");
  }
});
app.get("/updatepass1", function (request, response) {
  if (request.session.loggedin) {
    // Render login template
    response.sendFile(path.join(__dirname + "/static/updatepass1.html"));
  } else {
    response.send("Please login to view this page!");
  }
});

// removed duplicate /bikes route (kept DB-backed version above)
app.get("/userregister", function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + "/static/userregister.html"));
});
// removed duplicate /userprofile route (kept DB-backed version above)

// removed duplicate /mybooking route (kept DB-backed version above)
// removed duplicate /invoice route (kept DB-backed version above)

app.get("/userinfo", function (request, response) {
  // Render login template
  response.send({
    username: request.session.username,
  });
});
// removed duplicate /addbikes route (kept DB-backed version above)
app.get("/adminlogin", function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + "/static/adminlogin.html"));
});
// removed duplicate /adminprofile route (kept DB-backed version above)
// removed duplicate /reservation route (kept DB-backed version above)
app.get("/buybike", function (request, response) {
  if (request.session.loggedin) {
    // Render login template
    response.sendFile(path.join(__dirname + "/static/buybike.html"));
  } else {
    response.send("Please login to view this page!");
  }
});
app.get("/plusbikes", function (request, response) {
  if (request.session.loggedin) {
    // Render login template
    response.sendFile(path.join(__dirname + "/static/plusbikes.html"));
  } else {
    response.send("Please login to view this page!");
  }
});

app.get("/adminregister", function (request, response) {
  // Render registration page for admin without requiring login
  response.sendFile(path.join(__dirname + "/static/adminregister.html"));
});

app.get("/contact", function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + "/static/contact.html"));
});

app.get("/features", function (request, response) {
  // Render login template
  response.sendFile(path.join(__dirname + "/static/features.html"));
});

module.exports = app;
