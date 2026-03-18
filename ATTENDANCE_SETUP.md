# Gym Management System - Setup Instructions

## How to Access the Attendance Feature

### 1. **Login to Admin Panel**
   - Go to: `admin-login.html` or `admin-login.php`
   - **Username:** `admin`
   - **Password:** `password`

### 2. **Admin Dashboard**
   After login, you'll be redirected to the **Admin Dashboard** (`admin-dashboard.php`) which shows all available features:
   - 📋 **Attendance** (NEW) - Track member attendance
   - 👥 **Members** - Manage gym members
   - 💪 **Coaches** - Manage coaching staff
   - 💰 **Billing** - Manage payments
   - 📞 **Receptionist** - Manage reception staff

### 3. **Mark Attendance**
   - Click **"Attendance"** from the dashboard
   - Select the attendance date (defaults to today)
   - Check the members who attended
   - Set their status: Present, Absent, or Leave
   - Add check-in and check-out times (optional)
   - Click **"Mark Attendance"**

### 4. **View Attendance Records**
   - After marking attendance, scroll down to see all attendance records
   - Records are displayed in a formatted table with color-coded status badges

## File Structure

### New Files Created:
- `admin-dashboard.php` - Main admin control center
- `admin-logout.php` - Logout functionality
- `attendance.php` - Attendance tracking module
- `Database/gym.sql` - Updated with attendance table

### Updated Files:
- `admin-login.php` - Now redirects to dashboard with session handling
- `members.php` - Updated navbar with dashboard link
- `coach.php` - Updated navbar with dashboard link
- `billing.php` - Updated navbar with dashboard link
- `receptionist.php` - Updated navbar with dashboard link

## Database Schema

**Attendance Table:**
```sql
CREATE TABLE `attendance` (
  `attendance_id` INT AUTO_INCREMENT PRIMARY KEY,
  `member_id` VARCHAR(20) NOT NULL,
  `member_name` VARCHAR(50) NOT NULL,
  `attendance_date` VARCHAR(20) NOT NULL,
  `status` VARCHAR(20) NOT NULL,
  `check_in_time` VARCHAR(10),
  `check_out_time` VARCHAR(10),
  FOREIGN KEY (`member_id`) REFERENCES `member`(`id`)
)
```

## Features

✅ **Automatic Member Detection** - Fetches all members from the database
✅ **Date Selection** - Choose any date for attendance
✅ **Status Tracking** - Present, Absent, or Leave
✅ **Time Logging** - Track check-in and check-out times
✅ **Record Display** - View all attendance with color-coded badges
✅ **Session Management** - Secure login/logout
✅ **Responsive Dashboard** - Easy navigation to all features

## Important Notes

- Import the updated `gym.sql` file first
- Default admin credentials: `admin / password` (change in production)
- All admin pages now have consistent navigation
- Logout button available on all pages
- Dashboard serves as central hub for all admin functions

Enjoy your new attendance tracking system!
