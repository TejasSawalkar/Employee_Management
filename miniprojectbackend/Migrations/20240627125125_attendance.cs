using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace miniprojectbackend.Migrations
{
    /// <inheritdoc />
    public partial class attendance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_attendance",
                table: "attendance");

            migrationBuilder.RenameTable(
                name: "attendance",
                newName: "AttendanceRecords");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AttendanceRecords",
                table: "AttendanceRecords",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRecords_EmployeeId",
                table: "AttendanceRecords",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AttendanceRecords_Employees_EmployeeId",
                table: "AttendanceRecords",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AttendanceRecords_Employees_EmployeeId",
                table: "AttendanceRecords");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AttendanceRecords",
                table: "AttendanceRecords");

            migrationBuilder.DropIndex(
                name: "IX_AttendanceRecords_EmployeeId",
                table: "AttendanceRecords");

            migrationBuilder.RenameTable(
                name: "AttendanceRecords",
                newName: "attendance");

            migrationBuilder.AddPrimaryKey(
                name: "PK_attendance",
                table: "attendance",
                column: "Id");
        }
    }
}
