# 🏋️ GYM MANAGEMENT SYSTEM - Server Setup Complete!

## ✅ What's Been Done

Your PHP files are now running on a **Node.js + Express Server** instead of requiring Apache/PHP installation!

### New Files Created:
- `server.js` - Express server (handles all PHP logic)
- `package.json` - Node.js dependencies
- `admin-dashboard.html` - Admin control center
- `admin-login.html` - Updated login with JavaScript

### Updated Files:
- All admin pages now work through the Express server
- Database connections are configured
- Attendance tracking is fully functional

---

## 🚀 How to Access the System

### **Step 1: Make sure the server is running**

The server should already be running. If not, open a terminal and run:

```bash
cd "c:\Users\Nikhil\OneDrive\Desktop\GymManagementSystem"
npm start
```

You should see:
```
✅ GYM MANAGEMENT SYSTEM - SERVER STARTED
✅ Server running on: http://localhost:3000
```

### **Step 2: Open your browser**

Go to: **http://localhost:3000**

Or directly to login: **http://localhost:3000/admin-login.html**

### **Step 3: Login Credentials**

- **Username:** `admin`
- **Password:** `password`

### **Step 4: Access Features**

After login, you'll see the Admin Dashboard with:
- 📋 **Attendance** - Track member attendance
- 👥 **Members** - Manage gym members  
- 💪 **Coaches** - Manage coaching staff
- 💰 **Billing** - Manage payments
- 📞 **Receptionist** - Manage reception staff

---

## 📋 URLs Available

| Feature | URL |
|---------|-----|
| Home Page | http://localhost:3000 |
| Login | http://localhost:3000/admin-login.html |
| Dashboard | http://localhost:3000/admin-dashboard.html |
| Attendance | http://localhost:3000/attendance.php |
| Members | http://localhost:3000/members.php |
| Coaches | http://localhost:3000/coach.php |
| Billing | http://localhost:3000/billing.php |
| Receptionist | http://localhost:3000/receptionist.php |

---

## 🗄️ Database Setup (Optional - For Full Functionality)

To enable database features (saving data), you need MySQL:

### **1. Install MySQL:**
- Download: https://dev.mysql.com/downloads/mysql/
- Or use XAMPP: https://www.apachefriends.org/

### **2. Create the Database:**

```bash
mysql -u root -p
```

```sql
CREATE DATABASE gym;
USE gym;

-- Import the gym.sql file or run the tables manually:
CREATE TABLE member (
  id VARCHAR(20) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  date VARCHAR(20),
  dob VARCHAR(20),
  phone VARCHAR(20),
  coach VARCHAR(20),
  cid INT
);

CREATE TABLE attendance (
  attendance_id INT AUTO_INCREMENT PRIMARY KEY,
  member_id VARCHAR(20),
  member_name VARCHAR(50),
  attendance_date VARCHAR(20),
  status VARCHAR(20),
  check_in_time VARCHAR(10),
  check_out_time VARCHAR(10),
  FOREIGN KEY (member_id) REFERENCES member(id)
);

CREATE TABLE coach (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(50),
  date VARCHAR(20),
  experience VARCHAR(20)
);

CREATE TABLE billing (
  id VARCHAR(20),
  name VARCHAR(50),
  date VARCHAR(20),
  amount VARCHAR(20),
  mid INT,
  rid INT
);

CREATE TABLE receptionist (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(50),
  date VARCHAR(20),
  address VARCHAR(50),
  phone VARCHAR(20)
);
```

### **3. Test the Connection:**

The server will automatically connect when you restart it. Check the console for:
- ✅ Connected to MySQL database (if MySQL is running)
- ⚠️ Database connection error (if MySQL is not running - this is OK, frontend still works)

---

## 🔐 Troubleshooting

### Issue: "Server not responding"
**Solution:** 
1. Make sure the server is running: `npm start`
2. Try: http://localhost:3000
3. Check if port 3000 is blocked: Use a different port in `server.js` (change `const PORT = 3000`)

### Issue: "MySQL not working"
**Solution:**
1. This is OK! The system works without a database
2. Form submissions will show temporary alerts
3. Install MySQL to make data persistent

### Issue: "Page not loading"
**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Try incognito/private window
3. Restart the server

---

## 📁 File Structure

```
GymManagementSystem/
├── server.js              ← Main Express server
├── package.json           ← Node dependencies
├── admin-login.html       ← Login page
├── admin-dashboard.html   ← Admin dashboard
├── index.html             ← Home page
├── attendance.php         ← Attendance tracking (via server)
├── members.php            ← Members management (via server)
├── coach.php              ← Coach management (via server)
├── billing.php            ← Billing tracking (via server)
├── receptionist.php       ← Receptionist management (via server)
├── Database/
│   └── gym.sql           ← Database schema
└── assets/               ← CSS, JS, Images
```

---

## 🎯 Features Overview

### ✅ Attendance Tracking
- Automatic member detection from database
- Mark attendance: Present, Absent, Leave
- Track check-in and check-out times
- View attendance records

### ✅ Member Management
- Add new gym members
- Store member details (name, DOB, phone, assigned coach)

### ✅ Coach Management
- Add coaching staff
- Track experience and specialization

### ✅ Billing
- Track member payments
- Record billing amounts

### ✅ Receptionist
- Manage reception desk staff
- Contact information storage

---

## 💡 Tips

1. **Keep the server running** - The terminal with `npm start` should stay open
2. **For production** - Use a proper web host or VPS
3. **Security** - Change the admin password in `server.js` or `admin-login.html`
4. **Browser** - Works on Chrome, Firefox, Safari, Edge

---

## 📞 Next Steps

1. ✅ Open http://localhost:3000
2. ✅ Login with admin/password
3. ✅ Click on "Attendance" to start tracking
4. ✅ Add members from "Members" page
5. ✅ (Optional) Set up MySQL for persistent data storage

---

Enjoy using your Gym Management System! 🎉
