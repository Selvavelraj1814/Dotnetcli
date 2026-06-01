using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products{ get; set;}
    public required DbSet<Basket> Baskets { get; set; }
    public required DbSet<Order> Orders { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
               new IdentityRole
                {
                    Id = "603f5ef1-ce1b-456c-8d50-6d1188efd765",
                    Name = "Member",
                    NormalizedName = "MEMBER",
                    ConcurrencyStamp = "member-role"
                },
                new IdentityRole
                {
                    Id = "36bc319a-b0d1-4c55-9dcb-863fd1414f08",
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = "admin-role"
                }
            );
    }
}
