import express from "express";
import cors from "cors";
import pool from "./db/db.js";
import session from "express-session";
import pgSession from "connect-pg-simple";
import bcrypt from "bcrypt";

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: [
      "http://localhost:5175",
      "https://van-life-lrc2sok27-ahmad-metwally.vercel.app/",
    ],
    credentials: true,
  }),
);
app.use(express.json());

const pgStore = pgSession(session);

app.use(
  session({
    store: new pgStore({
      pool: pool,
      tableName: "sessions",
    }),
    secret: "vanlife-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  }),
);

app.get("/", (req, res) => {
  res.send("VanLife API is running 🚐");
});

// Get all vans
app.get("/api/vans", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM vans");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get van by id
app.get("/api/vans/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * FROM vans WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Van not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get host vans (host_id = 123)
app.get("/api/host/vans", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const result = await pool.query("SELECT * FROM vans WHERE host_id = $1", [
      req.session.userId,
    ]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get single host van
app.get("/api/host/vans/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.session.userId) {
      return res.status(401).json({
        message: "Not logged in",
      });
    }

    const result = await pool.query(
      "SELECT * FROM vans WHERE id = $1 AND host_id = $2",
      [id, req.session.userId],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Van not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name, email
      `,
      [name, email, hashedPassword],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    req.session.userId = user.id;

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.get("/api/auth/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.json({
        isLoggedIn: false,
      });
    }

    const result = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [req.session.userId],
    );

    if (result.rows.length === 0) {
      return res.json({
        isLoggedIn: false,
      });
    }

    res.json({
      isLoggedIn: true,
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/api/host/vans", async (req, res) => {
  console.log(req.body);
  console.log(req.session.userId);
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const { name, price, description, image_url, type } = req.body;

    const result = await pool.query(
      `
      INSERT INTO vans
      (name, price, description, image_url, type, host_id)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [name, price, description, image_url, type, req.session.userId],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("ADD VAN ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/api/rentals", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "You must login first",
      });
    }

    const { vanId, startDate, endDate } = req.body;

    const result = await pool.query(
      `
      INSERT INTO rentals
      (user_id, van_id, start_date, end_date)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [req.session.userId, vanId, startDate, endDate],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/api/rentals", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const { vanId, startDate, endDate } = req.body;

    const result = await pool.query(
      `
      INSERT INTO rentals
      (
        user_id,
        van_id,
        start_date,
        end_date
      )
      VALUES
      (
        $1,$2,$3,$4
      )
      RETURNING *
      `,
      [req.session.userId, vanId, startDate, endDate],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.get("/api/rentals", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const result = await pool.query(
      `
      SELECT
        rentals.*,
        vans.name,
        vans.price,
        vans.image_url,
        vans.type
      FROM rentals
      JOIN vans
        ON rentals.van_id = vans.id
      WHERE rentals.user_id = $1
      ORDER BY rentals.created_at DESC
      `,
      [req.session.userId],
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.post("/api/favorites", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const { vanId } = req.body;

    await pool.query(
      `
      INSERT INTO favorites (user_id, van_id)
      VALUES ($1, $2)
      ON CONFLICT (user_id, van_id) DO NOTHING
      `,
      [req.session.userId, vanId],
    );

    res.json({
      message: "Added to favorites",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.get("/api/favorites", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const result = await pool.query(
      `
      SELECT
        vans.*
        FROM favorites
        JOIN vans
        ON favorites.van_id = vans.id
        WHERE favorites.user_id = $1
      `,
      [req.session.userId],
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.delete("/api/favorites/:vanId", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    await pool.query(
      `
      DELETE FROM favorites
      WHERE user_id = $1
      AND van_id = $2
      `,
      [req.session.userId, req.params.vanId],
    );

    res.json({
      message: "Removed from favorites",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.delete("/api/rentals/:id", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const rentalId = req.params.id;

    await pool.query(
      `
      DELETE FROM rentals
      WHERE id = $1
      AND user_id = $2
      `,
      [rentalId, req.session.userId],
    );

    res.json({
      message: "Rental cancelled",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
