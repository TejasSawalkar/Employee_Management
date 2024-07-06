using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace miniprojectbackend.Migrations
{
    /// <inheritdoc />
    public partial class leavereq : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "description",
                table: "LeaveRequests",
                newName: "Description");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                table: "LeaveRequests",
                newName: "description");
        }
    }
}
