using Microsoft.EntityFrameworkCore;
using StudentReactWebApIDemo.Models;

namespace StudentReactWebApIDemo.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Student> Students { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
