using Microsoft.EntityFrameworkCore;
using miniprojectbackend.Models;
using EmployeeTask = miniprojectbackend.Models.EmployeeTask;

namespace miniprojectbackend.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        
        public DbSet<EmployeeTask> EmployeeTasks { get; set; }

        public DbSet<Team> Teams { get; set; }

        public DbSet<AttendanceRecord> AttendanceRecords { get; set; }

        public DbSet<LeaveRequest> LeaveRequests { get; set; }

        public DbSet<ProfilePhoto> ProfilePhotos { get; set; }

        public DbSet<Project> Projects { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
            .HasMany(e => e.EmployeeTasks)
            .WithOne(et => et.Employee)
            .HasForeignKey(et => et.EmployeeId);

            modelBuilder.Entity<Project>()
            .HasOne(p => p.Team)
            .WithMany(t => t.Projects)
            .HasForeignKey(p => p.TeamId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Employee>()
            .HasOne(e => e.LeaveRequest)
            .WithOne(lr => lr.Employee)
            .HasForeignKey<LeaveRequest>(lr => lr.EmployeeId);

            modelBuilder.Entity<Employee>()
                .HasMany(a => a.attendanceRecords)
                .WithOne(e => e.Employee)
                .HasForeignKey(r => r.EmployeeId);


            

        }
    }
}
