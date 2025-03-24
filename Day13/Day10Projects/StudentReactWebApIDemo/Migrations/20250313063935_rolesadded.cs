using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace StudentReactWebApIDemo.Migrations
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
                    { "81d4a930-1e56-494d-a9bd-32d858ddfed3", "3", "HR", "HR" },
                    { "e88d366c-2738-4421-a24f-69d317fb8e1d", "2", "User", "User" },
                    { "eea2726d-e15f-4e64-b4a9-23f2e55d1984", "1", "Admin", "Admin" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "81d4a930-1e56-494d-a9bd-32d858ddfed3");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e88d366c-2738-4421-a24f-69d317fb8e1d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eea2726d-e15f-4e64-b4a9-23f2e55d1984");
        }
    }
}
