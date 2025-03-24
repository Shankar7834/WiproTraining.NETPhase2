open the web api of student in day 10 folder only web api so in this web api i want to include Authcontroller 

and want to provide Authentication and Authoriztion using tokens in this web api this is frist task 

Add these depencies of version 8.0.13 

Microsoft.AspNetCore.Identity.EntityFrameworkCore
Microsoft.AspNetCore.Authentication.JwtBearer


once build the project and now in Models folder which is already there just add these classes into it 
using System.ComponentModel.DataAnnotations;

namespace StudentReactWebApIDemo.Models
{
    public class RegisterUser
    {

        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string? Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}

now change the AppDbContext like this 


using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentReactWebApIDemo.Models;

namespace StudentReactWebApIDemo.Data
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Student> Students { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}

and now go to app setting file 

{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=LAPTOP-4G8BHPK9\\SQLEXPRESS;Database=StudentCRUDDatabase;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True;"
  },
  "JWT": {
    "ValidAudience": "https://localhost:3000",
    "ValidIssuer": "https://localhost:7272",
    "Secret": "JWTAuthenticationHIGHsecuredPasswordVVVp1OHsssssdddasd7Xzyrsss"
  }
}

add this jwt settings 


next in program.cs file //here i had added 

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StudentReactWebApIDemo.Data;
using System.Text;
using System.Configuration;

namespace StudentReactWebApIDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // For Identity // here i had added 
            builder.Services.AddIdentity<IdentityUser, IdentityRole>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();




            // Add services to the container.

            builder.Services.AddControllers();

            // adding basic authentication // here i had addded
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme =
                JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            });

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseCors("AllowAllOrigins");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}

so this much you do it 

next is build the solution and run the migration now 

add-migration 'iniitsetup'

update-database 


now chek in your database identity tables will be created okay 

StudentCRUDDatabase will have identity tables along with studnets table here okay 

now in AppDbContext add roles and agin run migration and update database to see the roles in aspnetroles table okay 

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StudentReactWebApIDemo.Models;

namespace StudentReactWebApIDemo.Data
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Student> Students { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedRoles(builder);
        }

        private static void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<IdentityRole>().HasData
            (
            new IdentityRole()
            {
                Name = "Admin",
                ConcurrencyStamp = "1",
                NormalizedName = "Admin"
            },
            new IdentityRole()
            {
                Name = "User",
                ConcurrencyStamp = "2",
                NormalizedName = "User"
            },
            new IdentityRole()
            {
                Name = "HR",
                ConcurrencyStamp = "3",
                NormalizedName = "HR"
            }
            );
        }
    }
}

Then first build the application and do migrations 

    add-migration 'addedroles'

    update-database

so roles are added now next users i have to create and login i have to do 

and add one class into the Models folder with the name Response.cs

namespace StudentReactWebApIDemo.Models
{
    public class Response
    {


        public string? Status { get; set; }
        public string? Message { get; set; }

    }
}

next add AuthController in controller folder of empty of api type only add it 


 private readonly UserManager<IdentityUser> _userManager;
 private readonly SignInManager<IdentityUser> _signInManager;
 private readonly RoleManager<IdentityRole> _roleManager;

 private readonly IConfiguration _configuration;

 public AuthController(UserManager<IdentityUser> userManager,
     RoleManager<IdentityRole> roleManager,
     SignInManager<IdentityUser> signInManager, IConfiguration configuration)
 {
     _userManager = userManager;
     _roleManager = roleManager;
     _signInManager = signInManager;

     _configuration = configuration;
 }


 [HttpPost]
 public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
 {
     //Check User Exist 
     var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
     if (userExist != null)
     {
         return StatusCode(StatusCodes.Status403Forbidden,
             new Response { Status = "Error", Message = "User already exists!" });
     }

     //Add the User in the database
     IdentityUser user = new()
     {
         Email = registerUser.Email,
         SecurityStamp = Guid.NewGuid().ToString(),
         UserName = registerUser.Username

     };
     if (await _roleManager.RoleExistsAsync(role))
     {
         var result = await _userManager.CreateAsync(user, registerUser.Password);
         if (!result.Succeeded)
         {
             return StatusCode(StatusCodes.Status500InternalServerError,
                 new Response { Status = "Error", Message = "User Failed to Create" });
         }
         //Add role to the user....

         await _userManager.AddToRoleAsync(user, role);





         return StatusCode(StatusCodes.Status200OK,
             new Response { Status = "Success", Message = $"User created SuccessFully" });

     }
     else
     {
         return StatusCode(StatusCodes.Status500InternalServerError,
                 new Response { Status = "Error", Message = "This Role Doesnot Exist." });
     }


 }

so righ now AuthControllr will look like tis complete code 

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentReactWebApIDemo.Models;

namespace StudentReactWebApIDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly IConfiguration _configuration;

        public AuthController(UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<IdentityUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;

            _configuration = configuration;
        }


        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
        {
            //Check User Exist 
            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "User already exists!" });
            }

            //Add the User in the database
            IdentityUser user = new()
            {
                Email = registerUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerUser.Username

            };
            if (await _roleManager.RoleExistsAsync(role))
            {
                var result = await _userManager.CreateAsync(user, registerUser.Password);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "User Failed to Create" });
                }
                //Add role to the user....

                await _userManager.AddToRoleAsync(user, role);





                return StatusCode(StatusCodes.Status200OK,
                    new Response { Status = "Success", Message = $"User created SuccessFully" });

            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "This Role Doesnot Exist." });
            }


        }

    }
}


once build the solution and then
Run the web api an insert one value of the user
Now i need to work on login method

add this class in Models folder 

using System.ComponentModel.DataAnnotations;

namespace StudentReactWebApIDemo.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? Username { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}


Now in the controller i have to add login method and before that jwt token method which will create token by taking some credentials of user 

check the wanted code from complete code 

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using StudentReactWebApIDemo.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StudentReactWebApIDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly IConfiguration _configuration;

        public AuthController(UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<IdentityUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;

            _configuration = configuration;
        }


        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterUser registerUser, string role)
        {
            //Check User Exist 
            var userExist = await _userManager.FindByEmailAsync(registerUser.Email);
            if (userExist != null)
            {
                return StatusCode(StatusCodes.Status403Forbidden,
                    new Response { Status = "Error", Message = "User already exists!" });
            }

            //Add the User in the database
            IdentityUser user = new()
            {
                Email = registerUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = registerUser.Username

            };
            if (await _roleManager.RoleExistsAsync(role))
            {
                var result = await _userManager.CreateAsync(user, registerUser.Password);
                if (!result.Succeeded)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "User Failed to Create" });
                }
                //Add role to the user....

                await _userManager.AddToRoleAsync(user, role);





                return StatusCode(StatusCodes.Status200OK,
                    new Response { Status = "Success", Message = $"User created SuccessFully" });

            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                        new Response { Status = "Error", Message = "This Role Doesnot Exist." });
            }


        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddYears(2),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            var user = await _userManager.FindByNameAsync(loginModel.Username);

            if (user != null && await _userManager.CheckPasswordAsync(user, loginModel.Password))
            {
                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
                var userRoles = await _userManager.GetRolesAsync(user);
                foreach (var role in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }


                var jwtToken = GetToken(authClaims);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                    expiration = jwtToken.ValidTo
                });
                //returning the token...

            }
            return Unauthorized();


        }


    }
}

Now Program.cs file further jwt code is written like this and for authorize button in swagger i am
writing some code in the middleware because in swagger authorize button is not there like
postman so explicitly u have to add code and finally down u have to add one method which is
app.UseAuthentication();

// change done line 583,607 by putting dot ,then line 623 to 649 and finally line 679 added

program.cs 
------------


using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using StudentReactWebApIDemo.Data;
using System.Text;
using System.Configuration;
using Microsoft.OpenApi.Models;

namespace StudentReactWebApIDemo
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // For Entity Framework
            var configuration = builder.Configuration;

            builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // For Identity
            builder.Services.AddIdentity<IdentityUser, IdentityRole>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();




            // Add services to the container.

            builder.Services.AddControllers();

            // adding basic authentication
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme =
                JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidAudience = configuration["JWT:ValidAudience"],
                    ValidIssuer = configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
                };
            }); ; ;

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(option =>
            {
                option.SwaggerDoc("v1", new OpenApiInfo { Title = "Auth API", Version = "v1" });
                option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please enter a valid token",
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    BearerFormat = "JWT",
                    Scheme = "Bearer"
                });
                option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
            });

            builder.Services.AddSwaggerGen();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder =>
                {
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                });
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();



            app.UseStaticFiles();

            app.UseCors("AllowAllOrigins");

            app.UseAuthentication();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}


now put authorize attibute on Students Controller and try to call studnet controller it will not allow and then after calling login it will work let us 
see this so i am getting 401 error as without login i am trying to access the studentscontroller which is having Authorize attribute okay 

so now login and then try it will generate token and validate that token in the above button and then try to touch students controller get method it 
will give me access and now 401 error is not coming like earlier okay 

Now waht  i will do is in students controller who will access means any valid registered user only can access 

now create some more users with role as HR and User so totally three users are there now 

Raghavendra Raghu#123  Admin

Suresh   Suresh#123  User 

Sita   Sita#123     HR 

now on students controller already Authorize is there now agin what i will do is edit ,delete and insert on student only Admin can do like that 
i will put roels on top of them like ths shown below 

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentReactWebApIDemo.Data;
using StudentReactWebApIDemo.Models;

namespace StudentReactWebApIDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentsController : ControllerBase
    {

        private readonly AppDbContext _context;

        public StudentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,User,HR")]
        public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
        {
            return await _context.Students.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,User,HR")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            return student;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<Student>> PostStudent([FromForm] StudentDto studentDto)
        {
            var student = new Student
            {
                Name = studentDto.Name,
                Email = studentDto.Email,
                Address = studentDto.Address
            };

            if (studentDto.ImageFile != null)
            {
                var filePath = Path.Combine("wwwroot/images", Guid.NewGuid() + Path.GetExtension(studentDto.ImageFile.FileName));
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await studentDto.ImageFile.CopyToAsync(stream);
                }
                student.ImageUrl = filePath.Replace("wwwroot", "");
            }

            _context.Students.Add(student);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetStudent", new { id = student.Id }, student);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutStudent(int id, [FromForm] StudentDto studentDto)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            student.Name = studentDto.Name;
            student.Email = studentDto.Email;
            student.Address = studentDto.Address;

            if (studentDto.ImageFile != null)
            {
                var filePath = Path.Combine("wwwroot/images", Guid.NewGuid() + Path.GetExtension(studentDto.ImageFile.FileName));
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await studentDto.ImageFile.CopyToAsync(stream);
                }
                student.ImageUrl = filePath.Replace("wwwroot", "");
            }

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }
            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return NoContent();
        }



    }
}

so here first login as HR and try to udpate any student it will  not allow 
then try to read get and get students it will allow 

same when  u login as admin  u can do it now in all this process tokens will be created for admin he will be having 
his own token and HR also his own like that it goes 

you will get 403 error when as a HR u are touching update or post or delete method of students controller okay 

 

















