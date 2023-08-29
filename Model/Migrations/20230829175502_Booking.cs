using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Model.Migrations
{
    /// <inheritdoc />
    public partial class Booking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserBookings_Bookings_BookingId",
                table: "UserBookings");

            migrationBuilder.DropIndex(
                name: "IX_UserBookings_BookingId",
                table: "UserBookings");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4c2ac540-7f85-4f24-a553-354fbb64782a");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ea0d130b-10ed-425a-a8f7-889451f0fa4c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "105a466c-9914-42e2-9a80-4514bb17b3c8", "6af5783f-eafe-4345-960f-19d0173a96bb", "Admin", "ADMIN" },
                    { "2ffd8b9b-1969-4503-944b-1ac1766d943f", "93b6bb9e-9a7a-419d-bdc5-b243b3b50491", "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "105a466c-9914-42e2-9a80-4514bb17b3c8");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2ffd8b9b-1969-4503-944b-1ac1766d943f");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4c2ac540-7f85-4f24-a553-354fbb64782a", "5abd0463-7cb7-4d67-a46e-a934078b7d00", "Admin", "ADMIN" },
                    { "ea0d130b-10ed-425a-a8f7-889451f0fa4c", "b70e9e53-605c-40e0-a118-2399758de417", "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserBookings_BookingId",
                table: "UserBookings",
                column: "BookingId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserBookings_Bookings_BookingId",
                table: "UserBookings",
                column: "BookingId",
                principalTable: "Bookings",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
