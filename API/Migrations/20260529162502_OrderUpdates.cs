using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class OrderUpdates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaymentSummary_ExpYear",
                table: "Orders",
                newName: "PaymentSummary_Exp_Year");

            migrationBuilder.RenameColumn(
                name: "PaymentSummary_ExpMonth",
                table: "Orders",
                newName: "PaymentSummary_Exp_Month");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PaymentSummary_Exp_Year",
                table: "Orders",
                newName: "PaymentSummary_ExpYear");

            migrationBuilder.RenameColumn(
                name: "PaymentSummary_Exp_Month",
                table: "Orders",
                newName: "PaymentSummary_ExpMonth");
        }
    }
}
