using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace IdentityDemowithTokeninCore.Migrations
{
    /// <inheritdoc />
    public partial class rolesadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2af0c8b1-e738-4395-8a6a-531e8dc3ba73", "3", "HR", "HR" },
                    { "462e0c03-97d8-4d6d-ad47-49923e58b01d", "1", "Admin", "Admin" },
                    { "6d1706c4-0069-4a44-b562-40983b757738", "2", "User", "User" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2af0c8b1-e738-4395-8a6a-531e8dc3ba73");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "462e0c03-97d8-4d6d-ad47-49923e58b01d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6d1706c4-0069-4a44-b562-40983b757738");
        }
    }
}
