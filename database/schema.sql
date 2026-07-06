CREATE TABLE teams (
  id SERIAL PRIMARY KEY,
  team_name VARCHAR(255) NOT NULL,
  -- leader_student_id INTEGER REFERENCES students(id),
  region VARCHAR(50) NOT NULL,
  college_name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES teams(id),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  mobile VARCHAR(20) NOT NULL UNIQUE,
  region VARCHAR(50),
  is_leader BOOLEAN DEFAULT FALSE,
  email_verified BOOLEAN DEFAULT FALSE,
  mobile_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/*CREATE TABLE otp_verifications (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  mobile VARCHAR(20),
  otp_code VARCHAR(10) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);*/

CREATE TABLE email_otps (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  otp_code VARCHAR(10) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mobile_otps (
  id SERIAL PRIMARY KEY,
  mobile VARCHAR(20) NOT NULL,
  otp_code VARCHAR(10) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE announcements (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resources (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  competition_stage VARCHAR(100),
  url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE submissions (
  id SERIAL PRIMARY KEY,
  team_id INTEGER REFERENCES teams(id),
  video_url TEXT,
  deck_url TEXT,
  status VARCHAR(50) DEFAULT 'submitted',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  round VARCHAR(50)
);

CREATE TABLE jury_members (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  region VARCHAR(50) NOT NULL
);

CREATE TABLE availability_slots (
  id SERIAL PRIMARY KEY,
  jury_member_id INTEGER REFERENCES jury_members(id),
  region VARCHAR(50) NOT NULL,
  starts_at TIMESTAMP NOT NULL,
  ends_at TIMESTAMP NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE
);

CREATE TABLE booked_slots (
  id SERIAL PRIMARY KEY,
  slot_id INTEGER REFERENCES availability_slots(id),
  team_id INTEGER REFERENCES teams(id),
  meeting_url TEXT,
  booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE faq_entries (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

