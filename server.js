const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gym'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    console.log('⚠️ WARNING: Make sure MySQL is running and gym database exists');
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// Routes

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Admin Login
app.get('/admin-login.php', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-login.html'));
});

app.post('/admin-login.php', (req, res) => {
  const { user, pass } = req.body;
  
  if (user === 'admin' && pass === 'password') {
    res.redirect('/admin-dashboard.html');
  } else {
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Login - Gym Management</title>
        <style>
          body { font-family: Arial; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
          .error { color: #d32f2f; padding: 15px; background: #ffebee; border-radius: 5px; margin: 20px; text-align: center; }
          .back-link { text-align: center; margin-top: 20px; }
          .back-link a { color: white; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="error">
          <strong>❌ Login Failed!</strong><br>
          Username or Password is incorrect!
        </div>
        <div class="back-link">
          <a href="/admin-login.html">← Try Again</a>
        </div>
      </body>
      </html>
    `);
  }
});

// Admin Dashboard
app.get('/admin-dashboard.php', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

// Members page
app.get('/members.php', (req, res) => {
  res.sendFile(path.join(__dirname, 'members.html'));
});

app.post('/members.php', (req, res) => {
  const { id, name, date, dob, phone, coach } = req.body;
  
  const query = `INSERT INTO member (id, name, date, dob, phone, coach) VALUES (?, ?, ?, ?, ?, ?)`;
  
  connection.query(query, [id, name, date, dob, phone, coach], (err, results) => {
    if (err) {
      console.error('Error inserting member:', err);
      res.send('<script>alert("Error adding member!"); window.history.back();</script>');
    } else {
      res.send('<script>alert("Member added successfully!"); window.location.href="/members.php";</script>');
    }
  });
});

// Coach page
app.get('/coach.php', (req, res) => {
  res.sendFile(path.join(__dirname, 'coach.html'));
});

app.post('/coach.php', (req, res) => {
  const { id, name, date, experience } = req.body;
  
  const query = `INSERT INTO coach (id, name, date, experience) VALUES (?, ?, ?, ?)`;
  
  connection.query(query, [id, name, date, experience], (err, results) => {
    if (err) {
      console.error('Error inserting coach:', err);
      res.send('<script>alert("Error adding coach!"); window.history.back();</script>');
    } else {
      res.send('<script>alert("Coach added successfully!"); window.location.href="/coach.php";</script>');
    }
  });
});

// Billing page
app.get('/billing.php', (req, res) => {
  res.sendFile(path.join(__dirname, 'billing.html'));
});

app.post('/billing.php', (req, res) => {
  const { id, name, date, amount } = req.body;
  
  const query = `INSERT INTO billing (id, name, date, amount) VALUES (?, ?, ?, ?)`;
  
  connection.query(query, [id, name, date, amount], (err, results) => {
    if (err) {
      console.error('Error inserting billing:', err);
      res.send('<script>alert("Error adding billing record!"); window.history.back();</script>');
    } else {
      res.send('<script>alert("Billing record added successfully!"); window.location.href="/billing.php";</script>');
    }
  });
});

// Receptionist page
app.get('/receptionist.php', (req, res) => {
  res.sendFile(path.join(__dirname, 'receptionist.html'));
});

app.post('/receptionist.php', (req, res) => {
  const { id, name, date, address, phone } = req.body;
  
  const query = `INSERT INTO receptionist (id, name, date, address, phone) VALUES (?, ?, ?, ?, ?)`;
  
  connection.query(query, [id, name, date, address, phone], (err, results) => {
    if (err) {
      console.error('Error inserting receptionist:', err);
      res.send('<script>alert("Error adding receptionist!"); window.history.back();</script>');
    } else {
      res.send('<script>alert("Receptionist added successfully!"); window.location.href="/receptionist.php";</script>');
    }
  });
});

// Attendance page - serve HTML file with localStorage support
app.get('/attendance.php', (req, res) => {
  res.sendFile(path.join(__dirname, 'attendance.html'));
});

app.get('/attendance.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'attendance.html'));
});

// OLD DYNAMIC ATTENDANCE CODE (keeping for reference, can be removed)
app.post('/attendance-php-old', (req, res) => {
  // Fetch all members
  connection.query('SELECT * FROM member', (err, members) => {
    if (err) {
      console.error('Error fetching members:', err);
      members = [];
    }

    // Fetch today's attendance records - format as DD-MM-YYYY
    const now = new Date();
    const today = String(now.getDate()).padStart(2, '0') + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + now.getFullYear();
    connection.query(`SELECT * FROM attendance WHERE attendance_date = ? ORDER BY attendance_date DESC LIMIT 100`, [today], (err, records) => {
      if (err) {
        console.error('Error fetching attendance:', err);
        records = [];
      }

      // Generate HTML
      let membersHTML = '';
      if (members && members.length > 0) {
        members.forEach(member => {
          membersHTML += `
            <div class="col-md-12">
              <div class="member-row">
                <div class="row align-items-center">
                  <div class="col-md-3">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" name="member_ids[]" value="${member.id}" id="member_${member.id}">
                      <label class="form-check-label" for="member_${member.id}">
                        <strong>${member.name}</strong><br>
                        <small style="color: #666;">ID: ${member.id} | Phone: ${member.phone}</small>
                      </label>
                    </div>
                  </div>
                  <div class="col-md-2">
                    <select name="status_${member.id}" class="form-control" style="font-size: 14px;">
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                      <option value="Leave">Leave</option>
                    </select>
                  </div>
                  <div class="col-md-2">
                    <input type="time" name="check_in_${member.id}" class="form-control" placeholder="Check-in">
                  </div>
                  <div class="col-md-2">
                    <input type="time" name="check_out_${member.id}" class="form-control" placeholder="Check-out">
                  </div>
                </div>
              </div>
            </div>
          `;
        });
      } else {
        membersHTML = '<div class="col-md-12"><p style="color: #d32f2f;"><strong>No members found. Please add members first.</strong></p></div>';
      }

      let recordsHTML = '';
      if (records && records.length > 0) {
        records.forEach((record, index) => {
          let statusBadge = '';
          if (record.status === 'Present') {
            statusBadge = '<span class="badge badge-success">Present</span>';
          } else if (record.status === 'Absent') {
            statusBadge = '<span class="badge badge-danger">Absent</span>';
          } else {
            statusBadge = '<span class="badge badge-warning">Leave</span>';
          }
          recordsHTML += `
            <tr>
              <td>${index + 1}</td>
              <td>${record.member_id}</td>
              <td>${record.member_name}</td>
              <td>${record.attendance_date}</td>
              <td>${statusBadge}</td>
              <td>${record.check_in_time || '-'}</td>
              <td>${record.check_out_time || '-'}</td>
            </tr>
          `;
        });
      } else {
        recordsHTML = '<tr><td colspan="7" class="text-center"><em>No attendance records found for today.</em></td></tr>';
      }

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Attendance - Gym Management System</title>
    <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon.ico">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css">
    <style>
        body { background-color: #f8f9fa; padding-top: 20px; }
        .container { max-width: 1200px; margin-top: 20px; }
        .attendance-form { background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px; }
        .attendance-table { background-color: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 20px; }
        .member-row { border: 1px solid #dee2e6; padding: 15px; margin-bottom: 10px; border-radius: 5px; background-color: #f9f9f9; }
        .submit { border: none; padding: 15px 70px; border-radius: 8px; display: block; margin: auto; margin-top: 20px; background: #583672; color: #fff; font-weight: bold; cursor: pointer; box-shadow: 0px 9px 15px -11px rgba(88,54,114,0.6); }
        .submit:hover { background: #4a2a5a; }
        .success-msg { color: #155724; background-color: #d4edda; border: 1px solid #c3e6cb; padding: 12px; border-radius: 4px; margin-bottom: 20px; }
    </style>
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="admin-dashboard.html"><img src="img/TT.png" alt="Gym Logo" style="height: 40px;"> Admin Panel</a>
  <div class="collapse navbar-collapse ml-auto">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item"><a class="nav-link" href="admin-dashboard.html">Dashboard</a></li>
      <li class="nav-item"><a class="nav-link" href="members.html">Members</a></li>
      <li class="nav-item"><a class="nav-link" href="coach.html">Coach</a></li>
      <li class="nav-item"><a class="nav-link" href="billing.html">Billing</a></li>
      <li class="nav-item"><a class="nav-link" href="attendance.php">Attendance</a></li>
      <li class="nav-item"><a class="nav-link" href="receptionist.html">Receptionist</a></li>
      <li class="nav-item"><a class="nav-link" href="admin-login.html" style="color: #d32f2f; font-weight: 600;">Logout</a></li>
    </ul>
  </div>
</nav>

<div class="container">
    <h1 class="mb-4" style="color: #583672; font-weight: bold;">Member Attendance Tracking</h1>

    <div class="attendance-form">
        <h3 style="color: #583672; margin-bottom: 20px;">Mark Attendance</h3>
        
        <form method="POST" action="/attendance.php" name="attendanceForm">
            <div class="form-row mb-4">
                <div class="form-group col-md-6">
                    <label for="attendance_date"><strong>Attendance Date</strong></label>
                    <input type="text" name="attendance_date" class="form-control" id="attendance_date" placeholder="DD-MM-YYYY" required value="${today}">
                </div>
            </div>

            <h5 style="color: #583672; margin-top: 25px; margin-bottom: 15px;"><strong>Members Present Today</strong></h5>
            
            <div class="row">
                ${membersHTML}
            </div>

            <button type="submit" name="submit" class="submit">Mark Attendance</button>
        </form>
    </div>

    <div class="attendance-table">
        <h3 style="color: #583672; margin-bottom: 20px;">Attendance Records</h3>
        
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead style="background-color: #583672; color: white;">
                    <tr>
                        <th>#</th>
                        <th>Member ID</th>
                        <th>Member Name</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                    </tr>
                </thead>
                <tbody>
                    ${recordsHTML}
                </tbody>
            </table>
        </div>
    </div>
</div>

<footer style="margin-top: 50px; padding: 20px; background-color: #f8f9fa; text-align: center; color: #666;">
    <p>&copy; 2024 Gym Management System. All rights reserved.</p>
</footer>

<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"></script>

</body>
</html>`;

      res.send(html);
    });
  });
});

// Attendance POST - no longer needed (handled client-side with localStorage)
app.post('/attendance.php', (req, res) => {
  res.json({ success: true, message: 'Attendance data saved to browser storage' });
});

// Logout
app.get('/admin-logout.php', (req, res) => {
  res.redirect('/admin-login.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║   🏋️  GYM MANAGEMENT SYSTEM - SERVER STARTED              ║
╚═══════════════════════════════════════════════════════════╝

✅ Server running on: http://localhost:${PORT}
📋 Admin Login: http://localhost:${PORT}/admin-login.html
📊 Dashboard: http://localhost:${PORT}/admin-dashboard.html
🏠 Home: http://localhost:${PORT}

Credentials:
  Username: admin
  Password: password

Database: gym
Server: localhost
User: root
Password: (empty)

⚠️  Make sure MySQL is running and the 'gym' database exists!

Running... Press Ctrl+C to stop
  `);
});
